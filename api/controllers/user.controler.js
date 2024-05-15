import User from "../models/User.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        return next(CreateSuccess(200, "All users", users));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return next(CreateError(500, "user not found"));
        }
        return next(CreateSuccess(200, "user found", user));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}