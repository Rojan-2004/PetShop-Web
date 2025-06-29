import Products from "../../model/product/productSchema.js";

const getAllEmployee = async (req, res) => {
  console.log("Get Alls");

  try {
    const products = await Products.findAll();

    if (products.length === 0) {
      return res.status(200).json({ data: [], message: "No products found" });
    }

    return res.status(200).json({ data: products, message: "Successfully fetched data" });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Error while fetching" });
  }
};

const saveAllEmployee = async (req, res) => {
  console.log("Received data:", req.body);
  // You can add saving logic here (e.g., Products.create(req.body))
};

export { getAllEmployee, saveAllEmployee };
