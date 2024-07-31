const departmentController = async (req, res, DepartmentUser) => {
    const { username, email, password, mobile, roleId } = req.body;
    console.log(username, email, password, mobile, roleId);
  
    if (!username || !email || !password || !mobile || roleId === undefined || roleId === null) {
      return res.status(400).json({ success:false,message: "Please enter all the fields" })
    }

    try {
      const isExist = await DepartmentUser.findOne({ where: { email: email } });
      if (isExist) {
        return res.status(400).json({success:false,message: "This email is already registered" });
      }
  
      const newUser = await DepartmentUser.create({ username, email, password, mobile, roleId });
  
      res.status(201).json({
        success: true,
        message: "User created successfully",
        newUser,
      });
    } catch (error) {
      return res.status(500).json({success:false,message: "Internal server error" });
    }
  };
  
  export default departmentController;
  