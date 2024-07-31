import pg from "pg"
import { Sequelize } from "sequelize"
const { Client } = pg
const connectDB=async()=>{
const client=new Client({
    user:process.env.USER ,
    password:process.env.PASSWORD,
    host:process.env.HOST,
    port:process.env.DB_PORT,
})
try {
    await client.connect()
    const isDBExist= await client.query(`select 1 from pg_database where datname='${process.env.DB_NAME}'`)
    if(isDBExist.rowCount==0){
        await client.query(`create database "${process.env.DB_NAME}"`)
        console.log("database created successfully")
        
    }else{
        console.log("database already exist")
    }
} catch (error) {
   console.log('something went wrong') 
   await client.end()
}
const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host:process.env.HOST,
        dialect:'postgres',
        port:process.env.DB_PORT,
    }
)
try {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully.`.bgGreen.white);
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`.bgRed.white);
  }
  return sequelize
}
export default connectDB