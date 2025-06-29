const express= require("express");
const{
    getAllEmployee,
    savedAllEmployee,
}=require("../controller/productController");

const router=express.Router();

router.get("/products", getAllEmployee);

module.exports={ router};
