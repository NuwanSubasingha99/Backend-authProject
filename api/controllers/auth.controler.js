import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"

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
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        const user = await User.findOne({ userName: userName });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        const validePassword = await bcrypt.compare(req.body.password, user.password);

        if(validePassword){
            return res.status(201).json({ message: 'login success..'} );
        }
        
        return res.status(401).json({ message: 'Invalid username or password'+ validePassword});
        


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}