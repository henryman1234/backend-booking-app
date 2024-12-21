import Hotel from "../models/Hotel.js"


export const createHotel = async function(req, res, next) {
    const newHotel = new Hotel(req.body)
    try {
        const savedHoted = await newHotel.save()
        res.status(200).json(savedHoted)
    } catch (err) {
        next(err)
    }
}

export const updateHotel = async function(req, res, next) {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set : req.body}, {new: true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

export const deleteHotel = async function(req, res, next) {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    } catch (err) {
        next(err)
    }
}

export const getHotel = async function(req, res, next) {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}

export const getHotels = async function(req, res, next) {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}