import jwt from 'jsonwebtoken'
import { ErrorHandle } from '../Error/error.js'
export let IsUserLoggedIn = (req,res,next) => {
    try {
        let {token} = req.cookies;
        if (!token) return next (ErrorHandle(500, 'please login!'))
        jwt.verify(token, process.env.JWT,(err,payload) => {
            if(err) return next(ErrorHandle(500, 'Session is expired!'))
            req.user = payload
            next()
        })
    } catch (error) {
        next(error)
    }
}
export let IsLoggedInUserAdmin = (req,res,next) => {
    try {
        this.IsUserLoggedIn(req,res,() => {
            if(!req.user.isAdmin) return next(ErrorHandle(500, 'Admin privillage only!'))
            next() 
        })
    } catch (error) {
        next(error)
    }
}