const Users = require("../model/userSchema");
 
const getAllEmployee = async (requestAnimationFrame, res) =>{
    console.log("Get Alls");
    try{
        const users = await Users.findAll();
 
        if(users.length >= 0){
            res
            .status(200)
            .send({ data: users, message:"sucessfully fetched data"});
 
 
        }
       
    }catch(error){
        console.log(error);
        return res.status(500).json("Error While fetching");
 
    }
 
};
 
const saveAllEmployee = async (req, res) => {
    console.log(req.body);
    const { name, userId } = req.body;
    try {
        const user = await Users.findOne({ where: { userId: userId } });

        if (user == null) {
            await Users.create(req.body);
            res.status(201).json({ message: "User created successfully" });
        }
        return res.status(500).json({ message: "User already exists" });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getAllEmployee, saveAllEmployee};