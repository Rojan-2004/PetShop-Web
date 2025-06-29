const Products = require("../model/productSchema");
 
const getAllEmployee = async (requestAnimationFrame, res) =>{
    console.log("Get Alls");
    try{
        const product = await Products.findAll();
 
        if(Products.length === 0){
            res
            .status(200)
            .send({ data: Products, message:"sucessfully fetched data"});
 
 
        }
       
    }catch(error){
        console.log(error);
        return res.status(500).json("Error While fetching");
 
    }
 
};
 
const saveAllEmployee = async (req, res) => {
    console.log(req.body);
}
module.exports = {getAllEmployee, saveAllEmployee};