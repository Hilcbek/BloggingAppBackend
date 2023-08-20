import jwt from 'jsonwebtoken'
export let IsUserLoggedIn = (req,res,next) => {
    try {
        let token = req.cookies.token;
        if (!token) return next (ErrorHandle(500, 'please login!'))
        jwt.verify(token, process.env.JWT,(err,payload) => {
            if(err) return next(error.Error_Handle(500, 'token expired!'))
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
            if(!req.user.isAdmin) return next(error.Error_Handle(500, 'Admin privillage only!'))
            next() 
        })
    } catch (error) {
        next(error)
    }
}