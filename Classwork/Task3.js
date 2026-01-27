// http module jo web server banane me help karta hai
const http = require("http");
// file system module jo files me data likhne ke liye use hota hai
const fs = require("fs");
// url module jo urls parse karne me help karta hai
const url = require("url");

// students array jo saare student records store karega
let students = [
  { id: 1, name: "Rahul", branch: "CSE" },
  { id: 2, name: "Ankit", branch: "IT" }
];

// ye function har request ko log file me likhta hai
function logRequest(req) {
  // log entry format banana hai with timestamp, method aur url
  const log = `${new Date().toISOString()} | ${req.method} | ${req.url}\n`;
  // log file me synchronously data append karo
  fs.appendFileSync("log.txt", log);
}

// server create karo jo student API requests handle karega
const server = http.createServer((req, res) => {
  // har request ko log karo
  logRequest(req);

  // url ko parse karo query parameters ke saath
  const parsedUrl = url.parse(req.url, true);
  // pathname nikalo
  const path = parsedUrl.pathname;
  // http method nikalo
  const method = req.method;

  // response ka content type set karo json ke liye
  res.setHeader("Content-Type", "application/json");

  // GET request for /students - saare students return karo
  if (method === "GET" && path === "/students") {
    res.end(JSON.stringify(students));
  }

  // GET request for /students/:id - specific student return karo
  else if (method === "GET" && path.startsWith("/students/")) {
    // url se student id nikalo
    const id = parseInt(path.split("/")[2]);
    // id se student find karo array me
    const student = students.find(s => s.id === id);

    // agar student mila to return karo
    if (student) {
      res.end(JSON.stringify(student));
    } else {
      // agar nahi mila to 404 error
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Student not found" }));
    }
  }

  // POST request for /students - naya student add karo
  else if (method === "POST" && path === "/students") {
    // body data collect karne ke liye empty string
    let body = "";

    // request se data chunks me aata hai
    req.on("data", chunk => {
      body += chunk;
    });

    // jab saara data aajaye
    req.on("end", () => {
      // json data parse karo
      const newStudent = JSON.parse(body);
      // nayi id assign karo based on array length
      newStudent.id = students.length + 1;
      // student array me push karo
      students.push(newStudent);

      // status code 201 (created) set karo
      res.statusCode = 201;
      // naya student return karo
      res.end(JSON.stringify(newStudent));
    });
  }

  // DELETE request for /students/:id - student delete karo
  else if (method === "DELETE" && path.startsWith("/students/")) {
    // url se id nikalo
    const id = parseInt(path.split("/")[2]);
    // student ka index find karo
    const index = students.findIndex(s => s.id === id);

    // agar index mila to student delete karo
    if (index !== -1) {
      students.splice(index, 1);
      res.end(JSON.stringify({ message: "Student deleted" }));
    } else {
      // agar nahi mila to 404 error
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Student not found" }));
    }
  }

  // agar koi aur route ho to 404 error
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

// server ko port 3000 par listen karo
server.listen(3000, () => {
  console.log("Server running on port 3000");
});