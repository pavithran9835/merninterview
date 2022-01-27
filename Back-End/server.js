const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

mongoose
  .connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    (res) => {
      console.log("mongodb connected");
    },
    (err) => {
      console.log(err);
    }
  );

app.get("/", (req, res) => {
  res.send("Express server works");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("server started");
});
