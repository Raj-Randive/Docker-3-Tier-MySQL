const express = require("express");
const mysql = require("mysql");

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "db",
  user: "admin",
  password: "12345678",
  port: 3306,
  database: "rajdb",
});

const app = express();

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ******************************** ADD *******************************************************
// Endpoint to handle student form submission
app.post("/api/student", (req, res) => {
  const { name, roll_number, enrolled_courses, grades } = req.body;

  const sqlQuery =
    "INSERT INTO Student (name, roll_number, enrolled_courses, grades) VALUES (?, ?, ?, ?)";
  pool.query(
    sqlQuery,
    [name, roll_number, enrolled_courses, grades],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        res.status(500).send(err);
        return;
      }
      console.log("Student form data inserted successfully.");
      res.send("Student form submitted successfully.");
    }
  );
});

// Endpoint to handle faculty form submission
app.post("/api/faculty", (req, res) => {
  const { employee_id, faculty_name, phone_number, subjects } = req.body;

  const sqlQuery =
    "INSERT INTO Faculty (employee_id, faculty_name, phone_number, subjects) VALUES (?, ?, ?, ?)";
  pool.query(
    sqlQuery,
    [employee_id, faculty_name, phone_number, subjects],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        res.status(500).send(err);
        return;
      }
      console.log("Faculty form data inserted successfully.");
      res.send("Faculty form submitted successfully.");
    }
  );
});

// ******************************** GET *******************************************************

// Retrieve students data from the database
app.get("/api/studentdata", (req, res) => {
  const sqlQuery = "SELECT * FROM Student";
  pool.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err.stack);
      res.status(500).send(err);
      return;
    }
    res.send(results);
  });
});

// Retrieve faculty data from the database
app.get("/api/facultydata", (req, res) => {
  const sqlQuery = "SELECT * FROM Faculty";
  pool.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err.stack);
      res.status(500).send(err);
      return;
    }
    res.send(results);
  });
});

// ********************************** DELETE *****************************************************
// Endpoint to delete a student by ID
app.delete("/api/student/:id", (req, res) => {
  const studentId = req.params.id;
  const sqlQuery = "DELETE FROM Student WHERE id = ?";
  pool.query(sqlQuery, [studentId], (err, result) => {
    if (err) {
      console.error("Error executing SQL query: " + err.stack);
      res.status(500).send(err);
      return;
    }
    console.log("Student deleted successfully.");
    res.send("Student deleted successfully.");
  });
});

// Endpoint to delete a faculty member by ID
app.delete("/api/faculty/:id", (req, res) => {
  const facultyId = req.params.id;
  const sqlQuery = "DELETE FROM Faculty WHERE id = ?";
  pool.query(sqlQuery, [facultyId], (err, result) => {
    if (err) {
      console.error("Error executing SQL query: " + err.stack);
      res.status(500).send(err);
      return;
    }
    console.log("Faculty member deleted successfully.");
    res.send("Faculty member deleted successfully.");
  });
});

// ********************************** UPDATE *****************************************************
// Endpoint to update student information by ID
app.put("/api/student/:id", (req, res) => {
  const studentId = req.params.id;
  const { name, roll_number, enrolled_courses, grades } = req.body;

  const sqlQuery =
    "UPDATE Student SET name = ?, roll_number = ?, enrolled_courses = ?, grades = ? WHERE id = ?";
  pool.query(
    sqlQuery,
    [name, roll_number, enrolled_courses, grades, studentId],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        res.status(500).send(err);
        return;
      }
      console.log("Student information updated successfully.");
      res.send("Student information updated successfully.");
    }
  );
});

// Endpoint to update faculty information by ID
app.put("/api/faculty/:id", (req, res) => {
  const facultyId = req.params.id;
  const { employee_id, faculty_name, phone_number, subjects } = req.body;

  const sqlQuery =
    "UPDATE Faculty SET employee_id = ?, faculty_name = ?, phone_number = ?, subjects = ? WHERE id = ?";
  pool.query(
    sqlQuery,
    [employee_id, faculty_name, phone_number, subjects, facultyId],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        res.status(500).send(err);
        return;
      }
      console.log("Faculty information updated successfully.");
      res.send("Faculty information updated successfully.");
    }
  );
});

// ***************************************************************************************
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
