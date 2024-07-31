import { Router } from "express"
import roleController from "../controllers/roleController.js"
const router=Router()
const RoleRouter = (Role) => {
router.post("/newRole",(req,res)=>roleController(req,res,Role))

return router
}

export default RoleRouter
