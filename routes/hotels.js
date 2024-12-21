import express from "express"
import { createHotel, getHotel, getHotels, updateHotel, deleteHotel } from "../controllers/hotel.js"
const router = express.Router()

// CREATE AN HOTEL
router.post("/", createHotel)

// UPDATE
router.put("/:id", updateHotel)

// DELETE
router.delete("/:id", deleteHotel)

// GET
router.get("/:id", getHotel)

//GET ALL
router.get("/", getHotels)

export default router