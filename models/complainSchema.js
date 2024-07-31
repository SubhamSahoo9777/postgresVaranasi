import { DataTypes } from "sequelize"

const complainSchema = (sequelize) => {
    const UserComplain=sequelize.define("UserComplain",{
        comId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
            },
        complainType:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        location:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        comment:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true,
        },
    },{tableName:"UserComplains",timestamps: true})
    UserComplain.associate=(models)=>{
    UserComplain.belongsTo(models.User,{foreignKey:"userId"})
}



    return UserComplain

}

export default complainSchema