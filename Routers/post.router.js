import express from 'express'
import { AddBlog, AllBlogs, DeletePost, EditPost, QuerySearch, RelatedBlogs, SingleBlog, SingleBlogById } from '../controllers/post.controller.js';
import { IsUserLoggedIn } from '../Token/token.js';
export let blogRouter = express.Router()
blogRouter.post('/',IsUserLoggedIn,AddBlog);
blogRouter.get('/',IsUserLoggedIn,AllBlogs);
blogRouter.get('/search',IsUserLoggedIn,QuerySearch);
blogRouter.get('/searchById/:id',IsUserLoggedIn,SingleBlogById);
blogRouter.get('/searchBytitle/:title',IsUserLoggedIn,SingleBlog);
blogRouter.put('/editPost/:id',IsUserLoggedIn,EditPost)
blogRouter.get('/relatedBlogs/:id',IsUserLoggedIn,RelatedBlogs)
blogRouter.delete('/:id',IsUserLoggedIn,DeletePost)
