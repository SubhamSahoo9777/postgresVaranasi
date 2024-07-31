import { DataTypes } from "sequelize"
const userSchema = (sequelize) => {
const User=sequelize.define('User',{
    userId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,    
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:{
                args:[8,100],
                msg: "Password must be between 8 and 100 characters long",
            }
        } 
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            len:{
                args:10,
                msg: "length of mobile number should be 10",
            }
        } 
      },
},
{
    tableName:"Users",
    timestamps: true

}
)

User.associate=(models)=>{
    User.hasMany(models.UserComplain,{foreignKey:'userId'})
}
return User
}

export default userSchema
