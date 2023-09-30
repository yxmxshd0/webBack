import {Router} from "express"

import IsEmptyComments from "../../middleware/middleware.js";

import {HandlerCreateComment, HandlerFindAllComments, HandlerFindOneComments} from "../../handlers/comments.js"

const routerVar = Router();

routerVar.post('/comments', IsEmptyComments, HandlerCreateComment)

routerVar.get("/comments", HandlerFindAllComments)

routerVar.get("/comments/:id", HandlerFindOneComments)

export default routerVar;