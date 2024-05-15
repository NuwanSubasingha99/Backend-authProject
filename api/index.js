import express from 'express';
import dotenv from 'dotenv';
import roleRoute from './routes/role.route.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
const app = express();

// middleware
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user",userRoute);

app.use((obj, req, res, next) => {
  const statusCode = obj.status || 500;
  const message = obj.message || "something went wrong..";
  return res.status(statusCode).json({
    success: [200, 201, 2004].some(a => a === obj.status) ? true : false,
    status: statusCode,
    message: message,
    data:obj.data,
    stack: obj.stack
  })
})




mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });


