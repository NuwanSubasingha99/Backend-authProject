import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import roleRoute from './routes/role.route.js'
import authRoute from './routes/auth.route.js'
import mongoose from 'mongoose'
const app = express();

// middleware
dotenv.config();
app.use(express.json());

app.use("/api/role",roleRoute);
app.use("/api/auth",authRoute);




mongoose
  .connect(
    "mongodb+srv://sahanperera:12345@cluster0.203zw5r.mongodb.net/authDB?retryWrites=true&w=majority&appName=Cluster0"
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


