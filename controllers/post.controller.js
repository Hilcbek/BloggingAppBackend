import { ErrorHandle } from '../Error/error.js';
import Blog from '../models/post.model.js'
import User from '../models/user.model.js'
export let AddBlog = async (req,res,next) => {
    try {
        let {title, desc,  tag, images, author} = req.body;
        if(!title || !desc || !tag || !images || !author) return next(ErrorHandle(500, 'please provide all information!'))
        let Title = await Blog.findOne({ title : title })
        if(Title) return next(ErrorHandle(500, 'Post exist with this title!'))
        let NewBlog = await Blog.create(req.body);
        res.status(200).json({ data : NewBlog})
    } catch (error) {
        next(error)   
    }
}
export let AllBlogs = async (req,res,next) => {
    try {
        let AllBlog = await Blog.find({}).sort({ createdAt : -1 }).populate('author').populate('tag')
        res.status(200).json({ data : AllBlog })
    } catch (error) {
        next(error)
    }
}
export let SingleBlog = async (req,res,next) => {
    try {
        let Single = await Blog.findOne({ title : req.params.title })
        res.status(200).json({ data : Single })
    } catch (error) {
        next(error)
    }
}
export let SingleBlogById = async (req,res,next) => {
    try {
        let Single = await Blog.findById(req.params.id).populate('author').populate('tag');
        res.status(200).json({ data : Single })
    } catch (error) {
        next(error)
    }
}
export let QuerySearch = async (req,res,next) => {
    try {
        let {title} = req.query;
        let Blogs = []
        if(title){
            Blogs = await Blog.find({ title : title })
        }
        res.status(200).json({ data : Blogs}).populate('author').populate('tag')
    } catch (error) {
        next(error)
    }
}
export let RelatedBlogs = async (req,res,next) => {
    let {id} = req.params
    try {
        let BlogPost = await Blog.find(
            { $or : 
                [
                    { 
                        tag : { 
                            $in : [id]
                        } 
                    },
                    { 
                        author : id 
                    }
                ]
            }
        ).populate('tag').populate('author')
        if(BlogPost.length > 0){
            res.status(200).json({ data : BlogPost})
        }else{
            res.status(200).json({ data : 'No Result!' })
        }
    } catch (error) {
        next(error)
    }
}
export let DeletePost = async (req,res,next) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ data : 'deleted!'})
    } catch (error) {
        
    }
}
export let EditPost = async (req,res,next) => {
    try {
        let UpdatedPost = await Blog.findByIdAndUpdate(req.params.id,{
            $set : req.body
        }, { new : true })
        res.status(200).json({ data : UpdatedPost})
    } catch (error) {
        next(error)
    }
}