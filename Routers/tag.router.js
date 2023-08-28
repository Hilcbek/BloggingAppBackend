import express from 'express'
import { AddTags, AllTags } from '../controllers/tag.controller.js';
import { IsUserLoggedIn } from '../Token/token.js';
export let tagRouter = express.Router()
tagRouter.post('/',IsUserLoggedIn,AddTags);
tagRouter.get('/',IsUserLoggedIn,AllTags)