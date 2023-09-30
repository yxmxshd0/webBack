import {Router} from "express"
import { HandlerCreateUser, HandlerDeleteUser } from "../../handlers/user.js";
import { HandlerCreateModel, HandlerFindAllModels, HandlerFindModelByID, HandlerDeleteModel, HandlerPatchModel} from "../../handlers/models.js";

const routerVar = Router();

routerVar.get("/models", HandlerFindAllModels)
routerVar.get("/models/:id", HandlerFindModelByID)

routerVar.post("/login", HandlerCreateUser)
routerVar.post("/models", HandlerCreateModel)

routerVar.delete("/user/delete", HandlerDeleteUser)
routerVar.delete("/models/:id", HandlerDeleteModel)


routerVar.patch("/models/:id", HandlerPatchModel);




export default routerVar;