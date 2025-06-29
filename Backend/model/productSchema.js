const {DataTypes} = require("sequelize");
const { sequelize }= require("../Database/db");
 
 
const Products = sequelize.define("Product",
    {
        productName:{
            type:DataTypes.STRING,
            allowNull: false,
 
        },
        productCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
 
        },
        productDescription:{
            type:DataTypes.STRING,
            allowNull: false,
        
        },
    }
);
(async () =>{
    try{
        await Products.sync();
        console.log("The product table has been created or updated.");
   
    }catch (error){
        console.error("Error syncing the Product model:",error.message);
 
    }
})();
module.exports= Products;