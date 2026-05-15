const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const { encrypt } = require('../utils/encryption');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, roll_number, password, cgpa, phone, email, role } = req.body;

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Encrypt sensitive data
        const encryptedPhone = phone ? encrypt(phone) : null;
        const encryptedEmail = email ? encrypt(email) : null;

        const assignedRole = role === 'ADMIN' ? 'ADMIN' : 'STUDENT';

        const [result] = await pool.query(
            `INSERT INTO Students (name, roll_number, password_hash, cgpa, encrypted_phone, encrypted_email, role) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, roll_number, passwordHash, cgpa, encryptedPhone, encryptedEmail, assignedRole]
        );

        res.status(201).json({ message: "User registered successfully", userId: result.insertId });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Roll number already exists" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { roll_number, password } = req.body;

        const [users] = await pool.query(`SELECT * FROM Students WHERE roll_number = ?`, [roll_number]);
        if (users.length === 0) return res.status(401).json({ error: "Invalid credentials" });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, role: user.role, cgpa: user.cgpa }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
