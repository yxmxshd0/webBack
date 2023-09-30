import express from "express";
import bodyParser from "body-parser"
import routerVar from "../routes/v1/routes.js";
import routerVar2 from "../routes/v2/routes.js";
import routerVar3 from "../routes/v3/routes.js";
import helmet from "helmet"
import morgana from "morgan"
import {QueryParamView, BadUrlReq, ErrorValid, Authorisation}  from "../middleware/middleware.js"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Документация",
            version: "1.0.0",
            contact: {
                name: "Роман Гаврилов",
                url: "https://t.me/yxmxshd",
                email: "yxmxsh1do@gmail.com",
            },
        },
        servers: [
            {
                url:"/"
            },
            {
                url: `/api/v1`,
            },
            {
                url: `/api/v2`
            },
            {
                url: `/api/v3`
            }
        ],
        tags:[
            {
                name: "API",
                description: "Создать или удалить API ключ",
            },
            {
                name: "Модели",
                description: "CRUD для моделей",
            },
            {
                name: "Комментарии",
                description: "CRUD для комментариев",
            },
            {
                name: "Домашняя",
                description: "Домашняя страница",
            },
        ],
        host: `localhost:3000`,

    },
    apis: ['docs/docs.yaml']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)



app.use(helmet());

app.use(morgana("dev"))

app.use(bodyParser.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use("/api/v1", QueryParamView, routerVar);

app.use("/api/v2", QueryParamView, routerVar2);

app.use("/api/v3", Authorisation, routerVar3);

app.use("/", express.static('src/public'))

app.use(BadUrlReq)

app.use(ErrorValid)

app.listen(3000, () => 
{
    console.log('Server is listening on 3000 port')
})