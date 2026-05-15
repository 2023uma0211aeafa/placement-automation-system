require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const drivesRoutes = require('./routes/drives');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/drives', drivesRoutes);

// Database initialization and server start
initializeDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to database. Exiting.", err);
    process.exit(1);
});
