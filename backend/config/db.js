const mysql = require('mysql2/promise');

const pool = mysql.createPool(process.env.MYSQL_URL || {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.DB_NAME,
    port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const initializeDB = async () => {
    try {
        const connection = await pool.getConnection();

        // Create Students table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                roll_number VARCHAR(100) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                cgpa DECIMAL(4,2) NOT NULL,
                encrypted_phone VARCHAR(255),
                encrypted_email VARCHAR(255),
                role ENUM('STUDENT', 'ADMIN') DEFAULT 'STUDENT',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create Companies table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Companies (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                website VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create Job_Drives table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Job_Drives (
                id INT AUTO_INCREMENT PRIMARY KEY,
                company_id INT,
                role VARCHAR(255) NOT NULL,
                salary DECIMAL(10,2),
                min_cgpa DECIMAL(4,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (company_id) REFERENCES Companies(id) ON DELETE CASCADE
            )
        `);

        connection.release();
        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Database initialization failed:", error);
        throw error;
    }
};

module.exports = { pool, initializeDB };
