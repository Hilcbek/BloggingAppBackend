import { ErrorHandle } from '../Error/error.js';
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export let Register = async (req,res,next) => {
    try {
        let genSalt = await bcrypt.genSalt(10)
        let {username,email,password, profile} = req.body;
        if (!username || !email || !password || !profile) return next(ErrorHandle(500, 'please fill all fields!'))
        let Username = await User.findOne({ username : username });
        if(Username) return next(ErrorHandle(500, 'username exist!'))
        let Email = await User.findOne({ email : email })
        if(Email) return next(ErrorHandle(500, 'email exist!'))
        let NewUser = await User.create({
            ...req.body,
            password : await bcrypt.hash(password,genSalt)
        })
        res.status(200).json({ data : NewUser })
    } catch (error) {
        next(error)
    }
}
export let Login = async (req,res,next) => {
    try {
        let {username,password} = req.body;
        if(!username || !password) return next(ErrorHandle(500, 'please fill all the fields'))
        let Username = await User.find({ $or : [{ username : username}, { email : username }]});
        if (!Username[0]) return next(ErrorHandle(500, 'wrong username or email !'))
        let Password = await bcrypt.compare(password,Username[0].password);
        if(!Password) return next(ErrorHandle(500, 'wrong username or email or password!'))
        
        let token = jwt.sign({ _id  : Username[0]._id, isAdmin : Username[0].isAdmin }, process.env.JWT, {expiresIn : '1d'});
        res.status(200).cookie('token',token,{ httpOnly : true, sameSite : true, maxAge : 24 * 60 * 60 * 1000 }).json({ data : Username[0]})
    } catch (error) {
        next(error)
    }
}
export let Logout = (req,res,next) => {
    try {
        res.clearCookie('token').status(200).json({ data : 'Logged Out'});
    } catch (error) {
        next(error)
    }
}