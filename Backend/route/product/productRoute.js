import express from "express";
import {
    getAllEmployee,
    saveAllEmployee,
  } from "../../controller/product/productController.js";
  

const router = express.Router();

router.get("/products", getAllEmployee);

export { router };
