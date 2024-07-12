const express = require("express");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const app = express();

const corsOptions = {
  origin: 'https://write-x-frontend.vercel.app',  // Your frontend URL without the trailing slash
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const DataBase = require("./DataBase/Db");
DataBase();

const blogrouter = require("./Routes/blog.routes");
app.use("/blog", blogrouter);

const userrouter = require("./Routes/user.route");
app.use("/user", userrouter);

app.listen(PORT, () => {
  console.log("Server is Up Bro");
});

app.get("/", (req, res) => {
  res.send("Everything is perfect");
});
