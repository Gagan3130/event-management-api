const express = require("express");

const dotenv = require("dotenv");
const {
  ConflictError,
  NotFoundError,
  UnAuthorisedError,
  ValidationError,
} = require("./src/utils/custom-error");
dotenv.config();
const userRoutes = require("./src/routes/user.routes");
const eventRoutes = require("./src/routes/events.routes")
const connectDB = require("./src/config/db");
const createInitialAdmin = require("./src/utils/createInitialAdmin")

const app = express();
const port = 4000;
connectDB();
createInitialAdmin()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes)

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message, code: err.code });
  } else if (err instanceof UnAuthorisedError) {
    res.status(401).json({ error: err.message, code: err.code });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message, code: err.code });
  } else if (err instanceof ConflictError) {
    res.status(409).json({ error: err.message, code: err.code });
  } else {
    console.log(err, "err");
    res.status(500).json({
      error: "Internal Server Error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});
