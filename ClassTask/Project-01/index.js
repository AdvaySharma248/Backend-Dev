const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/users", function (req, res) {
  let html = "<ul>";

  for (let i = 0; i < users.length; i += 1) {
    html += `<li>${users[i].first_name}</li>`;
  }

  html += "</ul>";
  return res.send(html);
});

// Routes
app.get("/api/users", function (req, res) {
  return res.json(users);
});

app.get("/api/users/:id", function (req, res) {
  const id = Number(req.params.id);
  const user = users.find(function (oneUser) {
    return oneUser.id === id;
  });

  if (!user) {
    return res.status(404).json({ status: "User not found" });
  }

  return res.json(user);
});

app.post("/api/users", function (req, res) {
  const body = req.body;
  const newUser = { id: users.length + 1, ...body };
  users.push(newUser);

  fs.writeFile("./Project-01/MOCK_DATA.json", JSON.stringify(users), function (err) {
    if (err) {
      return res.status(500).json({ status: "error", message: "Could not save user" });
    }

    return res.status(201).json({ status: "success", user: newUser });
  });
});

app.patch("/api/users/:id", function (req, res) {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(function (user) {
    return user.id === id;
  });

  if (userIndex === -1) {
    return res.status(404).json({ status: "User not found" });
  }

  users[userIndex] = { ...users[userIndex], ...req.body };

  fs.writeFile("./Project-01/MOCK_DATA.json", JSON.stringify(users), function (err) {
    if (err) {
      return res.status(500).json({ status: "error", message: "Could not update user" });
    }

    return res.json({ status: "success", user: users[userIndex] });
  });
});

app.delete("/api/users/:id", function (req, res) {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(function (user) {
    return user.id === id;
  });

  if (userIndex === -1) {
    return res.status(404).json({ status: "User not found" });
  }

  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);

  fs.writeFile("./Project-01/MOCK_DATA.json", JSON.stringify(users), function (err) {
    if (err) {
      return res.status(500).json({ status: "error", message: "Could not delete user" });
    }

    return res.json({ status: "success", user: deletedUser });
  });
});

app.listen(PORT, function () {
  console.log("Server start at port 8000...");
});
