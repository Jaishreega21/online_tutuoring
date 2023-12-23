const express = require("express");
const cors= require("cors");
const mysql=require("mysql");
const bodyParser =require("body-parser");
const app=express();

app.use(cors());

app.use(bodyParser.json());
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"enigma"
})

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204, // No Content
};

app.use(cors(corsOptions));

app.use(express.json())


app.get("/login", (req, res) => {
  console.log('student login');
  const q = "SELECT student_username,student_password FROM student";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/teacher", (req, res) => {
  console.log('teacher login');
  const q = "SELECT teacher_username,teacher_password FROM teacher";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/register", (req, res) => {
  console.log("POST request received:", req.body);

  // Assuming your table has an auto-incrementing column named `student-id`
  const qstud =
    "INSERT INTO student(student_name, student_email, student_phno, student_username, student_password) VALUES (?, ?, ?, ?, ?)";

  const values = [
    req.body.student_name,
    req.body.student_email,
    req.body.student_phno,
    req.body.student_username,
    req.body.student_password,
  ];

  db.query(qstud, values, (err, data) => {
    if (err) {
      console.error("Error inserting into the database student table:", err);
      return res.status(500).send(err);
    }
    return res.status(201).json({ message: "Student registered successfully" });
  });
});

app.get("/api/get",(req,res)=>{
  const sqlgt="SELECT * FROM teacher";
  db.query(sqlgt,(error,result)=>{
    res.send(result);
  });
});

app.get("/",(req,res)=>{
    // const sql="INSERT INTO teacher (teacher_name,teacher_email,teacher_username,teacher_password,teacher_phno) VALUES ('Gagan','gagan01@gmail.com','gagan21','teacher','8362844498')";
    // db.query(sql,(error,result)=>{
    //   console.log("error",error);
    //   console.log("result",result);
    //   res.send("Hello Express");
    // })
});

app.listen(8081,()=>{
    console.log("Connected to backend")
})





// Step 1: Create a new endpoin