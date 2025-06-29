const {DataTypes} = require("sequelize");
const { sequelize }= require("../Database/db");
 
 
const Users = sequelize.define("users",
    {
        name:{
            type:DataTypes.STRING,
            allowNull: false,
 
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
 
        },
    }
);
(async () =>{
    try{
        await Users.sync();
        console.log("The Users table has been created or updated.");
   
    }catch (error){
        console.error("Error syncing the User model:",error.message);
 
    }
})();
module.exports= Users;