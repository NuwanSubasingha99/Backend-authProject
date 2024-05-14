import User from "../models/User.js";

export const getAllUsers = async (req,res,next)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: error.message + "abc" });
      }
}

export const getUser= async (req,res,next)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}