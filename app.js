const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const logger=require('morgan');
//const http=require('http');

const app=express();
const PORT= process.env.PORT || 8084;
const entries=[];


app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));

app.get('/',(req,res)=>{
    res.render('index',{
        entries:entries
    });
})

app.get('/new-entry',(req,res)=>{
    res.render('new-entry')
})

app.post('/new-entry',(req,res)=>{
    console.log("req.body.name="+req.body.name);
    console.log("req.body.msg="+req.body.msg);

    if(!req.body.name || !req.body.msg){
        //res.status(401).send("Entries must have name & message ");
        //alert("Please enter all entry")
        res.redirect('/new-entry')
    }

    entries.push({
        name:req.body.name,
        msg:req.body.msg,
        published:new Date()
    })

    res.redirect('/')
})

// http.createServer(app).listen(PORT,()=>{
//     console.log(`Server listening at port ${PORT}`);
// })

app.listen(PORT,()=>{
         console.log(`Server listening at port ${PORT}`);
     })