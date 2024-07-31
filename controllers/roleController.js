
const roleController = async(req,res,Role) => {
      const {userRole}=req.body
      console.log(userRole,"userRole")
      if(!userRole){
        return res.status(400).json({message:"Please enter a role"})
      }
      const isExist= await Role.findOne({where:{userRole:userRole}})
      if(isExist){
        return res.status(400).json({message:"Role already exist"})
      }
      const newRole = await Role.create({userRole:userRole})

      res.status(201).json({
        success:true,
        message:"Role created successfully",
        newRole,
      })

}

export default roleController
