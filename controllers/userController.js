const userController = async(req,res,User) => {
    const { username, email, password, mobile } = req.body;
    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ success:false,message: "Please enter all the fields" })
    }

    try {
      const isExist = await User.findOne({ where: { email: email } });
      if (isExist) {
        return res.status(400).json({success:false,message: "This email is already registered" });
      }
  
      const newUser = await User.create({ username, email, password, mobile,});
  
      res.status(201).json({
        success: true,
        message: "User created successfully",
        newUser,
      });
    } catch (error) {
      return res.status(500).json({success:false,message: "Internal server error" });
    }
}

export default userController