const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    fs.readdir("./files",(err,files)=>{
        res.render("index",{files:files})
    })
})

app.post("/create",(req,res)=>{
    let final = req.body.New.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join('');
   fs.writeFile(`./files/${final}.txt`,req.body.description,(err)=>{
    if(err) console.log(err);
        res.redirect("/")
    
  })
})

app.get("/files/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
        if(err){   
          console.log(err);
          return;
        }
        res.render("show",{data : data, name: req.params.filename})
    })
})
app.get("/edit/:filename",(req,res)=>{
    res.render("edit",{name:req.params.filename})
})

app.post("/edit",(req,res)=>{
    let final = req.body.New.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join('');
    fs.rename(`./files/${req.body.Previous}.txt`,`./files/${final.replace(".txt",'')}.txt`,(err)=>{
        res.redirect("/")
    })
})

app.listen(3000);
