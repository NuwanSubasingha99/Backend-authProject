import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"

export const register = async (req, res, next) => {

    try {
        const role = await Role.find({ role: 'user' });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
            roles: role
        });
        await newUser.save();
        // res.status(200).json(newUser);
        return next(CreateSuccess(200, "User registration succesfull.."));

    } catch (error) {
        // res.status(500).json({ message: error.message });
        return next(CreateError(400, "bad request"));
    }
}


export const registerAdmin = async (req, res, next) => {

    try {
        const role = await Role.find({});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
            isAdmin: true,
            roles: role
        });
        await newUser.save();
        // res.status(200).json(newUser);
        return next(CreateSuccess(200, "Admin registration succesfull.."));

    } catch (error) {
        // res.status(500).json({ message: error.message });
        return next(CreateError(400, "bad request"));
    }
}

export const login = async (req, res, next) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;

        if (!userName || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user by username
        const user = await User.findOne({ userName: userName }).populate("roles", "role");

        const { roles } = user;

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        const validePassword = await bcrypt.compare(req.body.password, user.password);

        if (validePassword) {
            // return res.status(201).json({ message: 'login success..'} );

            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, roles: roles }, process.env.JWT_SECRET)

            // return next(CreateSuccess(200,"User login succesfull.."));
            res.cookie("access_token", token, { httpOnly: true }).status(200).json({
                status: 200,
                message: "Login Success",
                data: user
            })
        }

        return res.status(401).json({ message: 'Invalid username or password'});

    } catch (error) {
        return next(CreateError(400, "bad request"));
    }
}