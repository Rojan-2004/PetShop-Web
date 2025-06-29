const express=require("express");
const{connection}=require("./Database/db");
const{Users}=require("./model/userSchema.js");
const{router}=require("./routes/userRoute.js");
const{Products}=require("./model/productSchema.js");
const { router: productRouter } = require("./routes/productRoute.js");
// const{Services}=require("./model/serviceSchema.js");
// const{router: serviceRouter}=require("./routes/serviceRoute.js");
// const cors=require("./cors");
const app= express();



const PORT=4000;
// app.use(cors());
app.use(express.json());
app.use(router);

app.use("/products", productRouter);

// app.use("/services", serviceRouter);




// app.get("/",(req,res)=> {
//     res.send(`Server is running on port ${PORT}`)
// });

connection();
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});