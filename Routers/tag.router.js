import express from 'express'
import { AddTags, AllTags } from '../controllers/tag.controller.js';
export let tagRouter = express.Router()
tagRouter.post('/',AddTags);
tagRouter.get('/',AllTags)