import express from "express"
import mongoose  from "mongoose"
import dotenv from "dotenv"
const app = express()
dotenv.config()
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import cors from "cors"
import cookieParser from "cookie-parser"


const connect = async function() {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log("Failed")
    }
}

mongoose.connection.on("disconnected", function(){
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connected", function(){
    console.log("mongoDB connected")
})

// Myddleware


app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use(function(err,req, res, next){
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Sometthing wrong occurs"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus, 
        message: errorMessage,
        stack: err.stack
    })
})


app.get("/", function(req, res){
    res.json("Hello first request")
})


app.listen(7000, function(){
    connect()
    console.log("Server is listening")
})