//express imports
const express=require('express');
const app=express();
const verify=require('./Routes/verifytoken');
const cors=require('cors');
app.use(cors());
//environment variables
//nothing
const dotenv=require('dotenv');
dotenv.config();

//mongodb connection
const mongoose=require('mongoose');
mongoose.connect(process.env.DB,
{ useNewUrlParser: true }
,()=>{
    console.log("connected to database mongo");
}
);
app.post('/test',(req,res)=>{
    res.send(req.body);
})
app.get('/',(req,res)=>{
    res.send("api working");
});

//authentication routes
const authroutes= require('./Routes/auth.js');


//middlewares
app.use('/user',authroutes);
app.use(express.json());


//private
app.get('/private',verify,(req,res)=>{
    res.send("This is private route and you accessed it");
});

app.listen(process.env.PORT || 5000);