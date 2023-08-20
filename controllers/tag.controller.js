import { ErrorHandle } from '../Error/error.js'
import Tag from '../models/tags.model.js'

export let AddTags = async (req,res,next) => {
    try {
        let {tag} = req.body
        if(!tag) return next(ErrorHandle(500, 'please select tag!'))
        let NewTag = await Tag.create(req.body)
        res.status(200).json({ data : NewTag })
    } catch (error) {
        next(error)
    }
}
export let AllTags = async (req,res,next) => {
    try {
        let allTag = await Tag.find({}).sort({ createdAt : -1 })
        res.status(200).json({ data : allTag})
    } catch (error) {
        next(error)   
    }
}