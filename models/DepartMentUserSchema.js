import { DataTypes } from "sequelize"
const DepartMentUserSchema = (sequelize) => {
const DepartmentUser=sequelize.define('DepartmentUser',{
    deptUserId:{
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
      roleId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"Roles",
            key:"roleId"
        }
      }
},
{
    tableName:"DepartmentUsers",
    timestamps: true

}
)
DepartmentUser.associate=(models)=>{
    DepartmentUser.belongsTo(models.Role,{foreignKey:'roleId'})
}
return DepartmentUser
}

export default DepartMentUserSchema
