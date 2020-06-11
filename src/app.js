const express=require("express");
const path=require('path');
const hbs=require("hbs");
const geocode=require("./utils/geocode");
const forcast=require("./utils/forecast");

const app=express();
const port=process.env.PORT||3000;
const publicdirectory=path.join(__dirname,"../public");
const Viewspath=path.join(__dirname,"../template/views");
const Partialspath=path.join(__dirname,"../template/partials")

console.log(__dirname);
console.log(path.join(__dirname,"../public"));

app.set("view engine","hbs");
app.set("views",Viewspath);
hbs.registerPartials(Partialspath);
app.use(express.static(publicdirectory));

app.get("",(req,res)=>{
    res.render("index",{
        title:"weather app",
        name:"allen"
    });
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"allen"
    });
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        helptext:"this is some helptext",
        name:"allen"
    });
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404 page",
        errormessage:"Help article not found",
        name:"allen"
    });
})

app.get('',(req,res)=>{
    res.send('<h1>weather</h1>');
})

app.get("/products",(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:"you must provide a message"
        })
    }
    res.send({
        product:[]
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"no address"
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({
                error:error
            })
        }
            forcast(latitude,longitude,(error,forcastdata)=>{
                if(error)
                {
                    return res.send({error})
                }
                    return res.send({
                        location:location,
                        temp:forcastdata,
                        address:req.query.address
                    })
            })
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title:"404 page",
        errormessage:"Page not found",
        name:"allen"
    });
})

app.listen(port,()=>{
    console.log("server is up at 3000"+port);
});
