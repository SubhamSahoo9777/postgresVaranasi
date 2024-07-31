import { Router } from "express"
import complainController from "../controllers/complainController.js"
const router=Router()
const complainRouter = (UserComplain) => {
router.post("/newComplain",(req,res)=>complainController(req,res,UserComplain))

return router
}

export default complainRouter
