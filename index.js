import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to MongoDB")
    } catch(error) {
        throw(error);
    }
};

mongoose.connection.on("connected", () => {
    console.log("MongoDB Disconnected")
})

//middlewares 
app.use("/api/auth", authRoute)
app.use("/api/users", authUser)
app.use("/api/hotels", authHotel)
app.use("/api/rooms", authRoom)

app.listen(2121, () => {
    connect()
    console.log("you are connected")
});