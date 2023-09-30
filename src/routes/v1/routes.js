import {Router} from "express"

import IsEmptyComments from "../../middleware/middleware.js";

const routerVar = Router();

let users = {};

routerVar.get("/stats", (req, res) => 
{
    let data = req.body
    const name = req.headers['user-agent']
    let firstHtml =
    `<meta charset="utf-8">
        <style>
            table tr td:first-child 
            {
                max-width: 200px;
                padding-right: 100px;
            }
        </style>` +
            `<table>`+
                '<tr>' +
                    '<td>Имя</td>' +
                    '<td>Счётчик</td>' +
                '</tr>'
    let secondHtml = ''
    if (users[name]) 
    {
        users[name] += 1
    }  
    else
    {
        users[name] = 1
    }
    for (const key in users) {
        secondHtml +=
				`<tr>
					<td>${key}</td>
					<td>${users[key]}</td>
				</tr>`
    }
    let resHtml = firstHtml + secondHtml + '</table>'
    return res.send(resHtml);
})

let comments = 
[
    {
        id:1,
        name:`Michael`,
        Age:21
    },
    {
        id:2,
        name:`Sara`,
        Age:21
    }
];
 
routerVar.get(`/comments`, function(req,res)
{
    return res.send(comments);
})



routerVar.post('/comments', IsEmptyComments, (req, res) =>
{
    let data = req.body
    if (data)
    {
        data.dateCreated = new Date();
        comments.push((data))
    }
    return res.send(comments);    
})



export default routerVar;