import { Router } from "express"
import userController from "../controllers/userController.js"
const router=Router()
const UserRouter = (User) => {
router.post("/newUser",(req,res)=>userController(req,res,User))

return router
}

export default UserRouter
