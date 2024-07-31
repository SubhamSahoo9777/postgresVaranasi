import { Router } from "express"
import departmentController from "../controllers/departmentController.js"
const router=Router()
const departMentUserRouter = (DepartmentUser) => {
router.post("/newDeptUser",(req,res)=>departmentController(req,res,DepartmentUser))

return router
}

export default departMentUserRouter
