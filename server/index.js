require('dotenv').config();
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const EventRouter = require("./routes/events");

const PORT = process.env.PORT || 3005;
const app = express();

app.get("/api/status", (req, res) => {
  res.json({ message: "DalClub.", status: true });
});

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json())

app.use("/api/events", EventRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});