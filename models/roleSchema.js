import { DataTypes } from "sequelize"

const roleSchema = (sequelize) => {
    const Role=sequelize.define("Role",{
        roleId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
            },
        userRole:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        }
    },{tableName:"Roles"})
Role.associate=(models)=>{
    Role.hasMany(models.DepartmentUser,{foreignKey:"roleId"})
}



    return Role

}

export default roleSchema