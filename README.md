# IIT Jammu Placement Automation System

A full-stack, secure, and modern Placement Automation System built for IIT Jammu. This platform seamlessly connects students with job drives, employing strict role-based access control and dynamic eligibility filtering based on academic performance (CGPA).

## 🚀 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, JSON Web Tokens (JWT) for authentication
- **Database**: MySQL 8.0 (Normalized Schema)
- **Security**: 
  - **Bcrypt**: For password hashing (12 salt rounds).
  - **AES-256-CBC**: Application-level encryption for sensitive user data (Phone Number, Personal Email).
- **Infrastructure**: Docker Compose (Containerized MySQL and Node.js backend)

---

## 👥 Role-Based Features (Who can do what?)

The platform features two distinct roles: **STUDENT** and **ADMIN**.

### 🎓 STUDENT
Students use the platform to monitor their eligibility and discover job opportunities.
- **Register/Login**: Securely create an account and log in.
- **View Profile Overview**: Check their current registered CGPA on the dashboard.
- **View Eligible Job Drives**: Students will *only* see job drives where their CGPA is greater than or equal to the `Minimum CGPA` required by the company. If a student's CGPA is too low for a specific drive, it is completely hidden from their dashboard.

### 🛡️ ADMIN
Admins are responsible for managing the placement drives and company data.
- **Register/Login**: Create an admin account and access the secure Admin Dashboard.
- **Post Job Drives**: Add new job opportunities into the system by specifying:
  - Company Name
  - Job Role
  - Salary (in LPA)
  - **Minimum CGPA** (The threshold required for a student to be eligible to apply)

---

## 🛠️ Getting Started (Local Setup)

Follow these steps to run the application locally on your machine.

### Prerequisites
- Docker & Docker Compose (or Docker Desktop)
- Node.js & npm

### 1. Start the Backend and Database
The backend and MySQL database are entirely containerized.

1. Open your terminal in the root directory of the project.
2. Spin up the containers using Docker Compose:
   ```bash
   docker compose up -d --build
   ```
3. The Node.js API will be running at `http://localhost:5000` and the MySQL Database will be accessible on port `3306`.

*Note: The database tables and schemas will be automatically created upon the first successful connection from the Node.js server.*

### 2. Start the Frontend
The frontend is a fast Vite React application.

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000` in your browser to interact with the application!
