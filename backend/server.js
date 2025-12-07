const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const auth = require("./routes/authRoutes");
const fileRoutes= require("./routes/fileRoutes");
connectDB();
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use("/api", auth)
app.use("/api", fileRoutes);

// status check
app.get("/health", (req, res) => res.json({ ok: true }));

// time end point
app.get("/api/time", (req, res) => {
    res.json({ serverTime: new Date().toISOString() });
});
// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));

