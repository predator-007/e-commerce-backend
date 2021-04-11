//express imports
const express=require('express');
const app=express();
const verify=require('./Routes/verifytoken');
const cors=require('cors');

//environment variables
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


//authentication routes
const authroutes= require('./Routes/auth.js');


//middlewares
app.use('/user',authroutes);
app.use(express.json());
app.use(cors());

//private
app.get('/private',verify,(req,res)=>{

    res.send("This is private route and you accessed it");
});

app.listen(process.env.PORT || 5000);