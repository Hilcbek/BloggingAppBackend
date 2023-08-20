import express from 'express'
import { AddBlog, AllBlogs, EditPost, QuerySearch, RelatedBlogs, SingleBlog, SingleBlogById } from '../controllers/post.controller.js';
import { IsUserLoggedIn } from '../Token/token.js';
export let blogRouter = express.Router()
blogRouter.post('/',AddBlog);
blogRouter.get('/',AllBlogs);
blogRouter.get('/search',QuerySearch);
blogRouter.get('/searchById/:id',SingleBlogById);
blogRouter.get('/searchBytitle/:title',SingleBlog);
blogRouter.put('/editPost/:id',EditPost)
blogRouter.get('/relatedBlogs/:id',RelatedBlogs)
