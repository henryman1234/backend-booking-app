import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"
const router = express.Router()

router.get("/checkauthentication", verifyToken, function(req, res, next){
    res.send("Salut, vous etes bien connecté")
})

router.get("/checkuser/:id", verifyUser, function(req, res, next){
    res.send("Hello user,you are logged and you can delete your account ")
})

router.get("/checkadmin/:id", verifyAdmin, function(req, res, next){
    res.send("Hello Admin, youn are logged and you can delete all accounts")
})

// CREATE USER
router.delete("/:id", verifyUser, deleteUser)

// UPDATE USER
router.put("/:id", verifyUser,  updateUser)

// GET USER
router.get("/:id", verifyUser, getUser)

// GET ALL USERS
router.get("/", verifyAdmin, getUsers )

export default router