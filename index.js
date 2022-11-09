const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(express.static(__dirname + "/public"))
app.use("/views",express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youssefsalah469@gmail.com',
        pass: "pvznvnpaisuddvak"
    }
});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/index.html"));
})
app.post("/sendemail",(req,res)=>{
    const body = req.body;
    mailTransporter.sendMail({
        from:"youssefsalah469@gmail.com",
        to:"elbltagi.company@gmail.com",
        subject:body.subject,
        html:`
        <div style="background-color:#005458;padding:10px;color:white">
        <p>Name: ${body.name}</p>
        <p>Email: ${body.email}</p>
        <pre style="word-break: break-all;word-wrap: break-word;white-space: pre-wrap;">Message:\n${body.message}</pre>
        </div>`
    },(err,inf)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    })
    
})

server.listen(8080)