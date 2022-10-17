require("dotenv").config();
const express = require("express");
const app = express();
require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/auth", require("./routes/auth"));
app.use("/hostel", require("./routes/hostel"));
app.use("/notification", require("./routes/notification"));

app.listen(PORT, () => `Server running on port ${PORT}`);
