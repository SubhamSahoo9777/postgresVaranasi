import dotenv from "dotenv";

import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import connectDB from "./config/connectDB.js";
import userSchema from "./models/userSchema.js";
import roleSchema from "./models/roleSchema.js";
import RoleRouter from "./routers/RoleRouter.js";
import complainSchema from "./models/complainSchema.js";
import DepartMentUserSchema from "./models/DepartMentUserSchema.js";
import departMentUserRouter from "./routers/departMentUserRouter.js";
import UserRouter from "./routers/UserRouter.js";
import complainRouter from "./routers/complainRouter.js";

dotenv.config();
const app = express();
//middlewares
app.use(express.json());
app.use(morgan("dev"))
app.use(cors());
//connect to database
const startServer=async()=>{
    const sequelize= await connectDB();
    if(!sequelize){
        console.log(`failed to connect DB`.bgRed.white)
    }
    //all schemas
   
    const User=userSchema(sequelize)
    const UserComplain=complainSchema(sequelize)
    const Role=roleSchema(sequelize)
    const DepartmentUser=DepartMentUserSchema(sequelize)
    //conform association
    User.associate({UserComplain})
    UserComplain.associate({User})
    Role.associate({DepartmentUser})
    DepartmentUser.associate({Role})
    //create table
    await sequelize.sync({force:false})
    // await UserComplain.sync({ force: true });
    //routers
    app.use("/",RoleRouter(Role))
    app.use("/",departMentUserRouter(DepartmentUser))
    app.use("/",UserRouter(User))
    app.use("/",complainRouter(UserComplain))
}
startServer();

const appPort = process.env.PORT || 8080;
app.listen(appPort, () => console.log(`Server running on port ${appPort}`.bgGreen.white));
