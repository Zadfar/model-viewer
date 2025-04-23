import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/modelRoute.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/models', router);



const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });