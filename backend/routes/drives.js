const express = require('express');
const { pool, initializeDB } = require('../config/db');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/init', async (req, res) => {
    try {
        await initializeDB();
        res.send("Database initialization attempted. Check logs if tables are still missing.");
    } catch (error) {
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

// Admin: Post a new job drive
router.post('/admin', verifyToken, isAdmin, async (req, res) => {
    try {
        // For simplicity, inserting company directly if needed or assuming company_id is provided
        const { company_name, role, salary, min_cgpa } = req.body;

        // Ensure company exists or create
        let company_id;
        const [companies] = await pool.query('SELECT id FROM Companies WHERE name = ?', [company_name]);
        if (companies.length > 0) {
            company_id = companies[0].id;
        } else {
            const [result] = await pool.query('INSERT INTO Companies (name) VALUES (?)', [company_name]);
            company_id = result.insertId;
        }

        await pool.query(
            `INSERT INTO Job_Drives (company_id, role, salary, min_cgpa) VALUES (?, ?, ?, ?)`,
            [company_id, role, salary, min_cgpa]
        );

        res.status(201).json({ message: "Job drive posted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Student: Get eligible drives
router.get('/eligible', verifyToken, async (req, res) => {
    try {
        // Fetch student's CGPA from the token or DB
        const studentId = req.user.id;
        const [students] = await pool.query('SELECT cgpa FROM Students WHERE id = ?', [studentId]);
        
        if (students.length === 0) return res.status(404).json({ error: "Student not found" });
        const studentCGPA = students[0].cgpa;

        // Fetch eligible drives
        const [drives] = await pool.query(`
            SELECT jd.id, c.name as company, jd.role, jd.salary, jd.min_cgpa 
            FROM Job_Drives jd
            JOIN Companies c ON jd.company_id = c.id
            WHERE ? >= jd.min_cgpa
            ORDER BY jd.created_at DESC
        `, [studentCGPA]);

        res.json({ drives, studentCGPA });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
