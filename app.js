const express = require("express");
const cors = require("cors");
const app = express();
const networks = require("./routes/Networks");
const connectDB = require("./db/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NewNetwork, User } = require("./models/Networks");
const JWT_STRING = "kfkjfkjfdkjakdjferuej#$#$#2u3@#@$@kfj";
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(cors());
app.use(express.static("./publicVLSM"));
app.use(express.json());

// routes

app.use("/api", networks);
app.use("/api/users/change-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = jwt.verify(token, JWT_STRING);
    // console.log(user);
    const newPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      { _id: user._id },
      {
        $set: { password: newPassword },
      }
    );
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
});

app.use(notFound);
app.use(errorHandlerMiddleware);
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
