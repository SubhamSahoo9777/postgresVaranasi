
const complainController = async(req,res,UserComplain) => {
    const {complainType, location, status, comment,userId, } = req.body;
  console.log(complainType, location, status, comment,userId,)
    if (!complainType || !location || !status || !comment || userId === undefined || userId === null) {
      return res.status(400).json({ success:false,message: "Please enter all the fields" })
    }

    try {
  
      const newComplain = await UserComplain.create({ complainType, location, status, comment,userId,});
  
      res.status(201).json({
        success: true,
        message: "Complain registered successfully",
        newComplain,
      });
    } catch (error) {
      return res.status(500).json({success:false,message: "Internal server error" });
    }
}

export default complainController