# Student CRUD - Vite + React Frontend

A modern, responsive frontend for the Student CRUD application built with **React 19**, **Vite**, and **Tailwind CSS**, connected to the Spring Boot REST API.

---

## 🚀 Features

- **Full CRUD Operations**:
  - **Create**: Add new students with field validation.
  - **Read**: View all students in a responsive data table.
  - **Update**: Edit student details via modal dialog.
  - **Delete**: Safe deletion with confirmation modal.
- **Search & Filter**: Real-time multi-field search (Name, Student ID, Course, Section) and Course dropdown filter.
- **Sorting**: Click any column header (ID, Name, Course, Section) to sort ascending or descending.
- **Dashboard Stats**: Summary metrics for Total Enrolled, Active Courses, and Sections.
- **CORS-Free Proxy**: Pre-configured Vite reverse proxy forwarding `/hernandez` to `http://localhost:8080`.
- **Status & Alerts**: Toast notifications and offline backend alert banner if Spring Boot isn't running.

---

## 📋 API Model Mapping

The frontend maps directly to the [`Student`](file:///C:/Users/Student-00/Desktop/HERNANDEZ/FULLSTACK/STUDENT-CRUD/student/src/main/java/com/hernandez/student/Student.java) entity:
- `id`: Auto-generated integer
- `firstname`: String
- `lastname`: String
- `course`: String (e.g. `BSIT`, `BSCS`, `BSIS`, etc.)
- `section`: String (e.g. `3A`, `4B`)

### REST Endpoints
- `GET /hernandez/students` - List all students
- `GET /hernandez/students/:id` - Fetch student by ID
- `POST /hernandez/students` - Create student
- `PUT /hernandez/students/:id` - Update student
- `DELETE /hernandez/students/:id` - Delete student

---

## 🛠️ How to Run

### 1. Start the Spring Boot Backend
Open a terminal in the `student/` directory:
```bash
cd student
./mvnw spring-boot:run
```
*(Backend runs on `http://localhost:8080`)*

### 2. Start the Frontend Dev Server
Open a terminal in the `frontend/` directory:
```bash
cd frontend
npm run dev
```
*(Frontend runs on `http://localhost:5173`)*
