import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { userRouter } from './Routers/user.router.js'
import { tagRouter } from './Routers/tag.router.js'
import { blogRouter } from './Routers/post.router.js'
let app = express()
dotenv.config()
app.use(express.json())
app.use(helmet())
helmet.crossOriginResourcePolicy({ policy : 'same-site'})
app.use(morgan('common'))
app.use(cors({ origin : 'https://blogging-app-front-end-zqu5.vercel.app/', credentials : true }))
app.use(cookieParser())
let MONGODB = process.env.MONGODB
let PORT = process.env.PORT
mongoose.connect(MONGODB).then(() => app.listen(PORT,() => console.log(`App running on server ${process.env.PORT}!`))).catch((err) => console.error(err))
mongoose.connection.on('connected', () => console.log('connected again'))
mongoose.connection.on('disconnected', () => console.log('disconnected!'))
app.use('/api/auth',userRouter)
app.use('/api/tag',tagRouter)
app.use('/api/blog',blogRouter)
app.use((err,req,res,next) => {
    let errorMessage = err.message || 'Something went wrong!'
    let errorStatus = err.status || 500
    res.status(errorStatus).json({ error : errorMessage})
})