const express = require("express");
const cors = require("cors");

const requestRoutes = require("./routes/requestRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "KSA Requests API is running"
    });
});

app.use("/api/requests", requestRoutes);

module.exports = app;