const express = require("express");

const app = express();
const PORT = 3000;


app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello World from Express server!");
});

app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
