const express= require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const UserSchema = require('./Schema');
const StockSchema = require('./Schema2');

mongoose.connect("mongodb://localhost:27017/UserDetails",{useNewUrlParser:true});

const User = mongoose.model("users",UserSchema);
const Stock = mongoose.model("stocks",StockSchema);
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.post('/signup',(req,res)=>{
    console.log(req.body);
    // res.setHeader('Access-Control-Allow-Origin','*');
    // res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    // res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    //next(); 
    const user=new User({
        name:req.body.name,
        mob:req.body.mob,
        dob:req.body.dob,
        uname:req.body.uname,
        password:req.body.password,
        categ:req.body.categ,
        status:req.body.status
    });
    console.log(user);    
    User.create(user,(err)=>{
        if(err)
        {
            console.log(err);
            //result.redirect('/signup');
            res.send(user);

        }
        else{
            res.send(user);
         //  res.redirect('/home')
        }
    })
});
app.post('/approve',(req,res)=>{
    console.log(req.body);
    // res.setHeader('Access-Control-Allow-Origin','*');
    // res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    // res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    //next(); 
    var myquery = { uname:req.body.uname };
    var newvalues = { $set: {status: "1" } };
    User.updateOne(myquery,newvalues,(err)=>{
        if(err)
        {
            console.log(err);
            //result.redirect('/signup');
            //res.send(user);

        }
        else{
            res.send("Approved");
         //  res.redirect('/home')
        }
    })
});
app.get('/',(req,res)=>{
    User.find({UserName:req.body.username},(err,result)=>{
        if(err)
        {
            console.log("No user found");
        }
        else{
            res.send(result);
        }
    })
})

app.get('/data',(req,res)=>{
    Stock.find({},(err,result)=>{
        if(err)
        {
            console.log("No user found");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
})
// app.delete('/',(req,res)=>{
//     console.log(req.body);
//     // res.setHeader('Access-Control-Allow-Origin','*');
//     // res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     // res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
 
//     var myquery = { mob:req.body.mob };
//     User.deleteOne(myquery,(err)=>{
//         if(err)
//         {
//             console.log("No user found");
//         }
//         else{
//             res.send("User Record Deleted");
//         }
//     })
// })
app.listen(3001,(err)=>{
    console.log("server listening on port 3001");
});
