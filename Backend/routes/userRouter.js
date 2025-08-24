import express from "express"
import { adminUpdateUser, deleteuser, login, register, updateuser, viewAllUsers, viewuser } from "../controllers/userController.js"
import { requireAuth, requireRole } from "../middleware/auth.js"

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)

userRouter.put("/update/", requireAuth, updateuser)

userRouter.delete("/delete/:id", requireAuth, deleteuser)

userRouter.get("/viewuser/:id", requireAuth, viewuser)


userRouter.put("/adminupdate/:id", requireAuth, requireRole, adminUpdateUser)
userRouter.get("/viewall/:id", requireAuth, requireRole, viewAllUsers)


export default userRouter