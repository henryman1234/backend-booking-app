import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const register = async function(req, res, next) {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt )

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })  

        await newUser.save()
        res.status(200).json("User has been registered")
    } catch (err) {
        next(err)
    }
}


export const login = async function (req, res, next) {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) return next(createError(404, "This User doesn't exist!"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Incorrect Password!"))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)

        const {password, isAdmin,...othersDetails} = user._doc

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({...othersDetails})
    } catch (err) {
        next(err)
    }
}