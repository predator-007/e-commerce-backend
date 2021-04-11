const auth=require('express').Router();
const express=require('express');
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
//middleware
auth.use(express.json());


auth.post('/login',async(req,res)=>{
    const user= await User.findOne({email:req.body.email});
    if(!user)
    res.send("user does not exists");

    const validp=await bcrypt.compare(req.body.password,user.password);
    if(!validp)
    res.send("incorrect password");
    
    const token= await jwt.sign({user:user._id,username:user.username},process.env.jwt_secret);
    res.send(token);
});


auth.post('/signup',async(req,res)=>{
    const emailexists=await User.findOne({email:req.body.email});
    const usernameexits=await User.findOne({username:req.body.username});

    if(usernameexits)
    res.send("username already exits");

    if(emailexists)
    res.send("email already exits");
    
    const salt=await bcrypt.genSalt(10);
    const hashedpassword= await bcrypt.hash(req.body.password,salt);
    
    const user=new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedpassword,
    });
    try{
        const saveduser=await user.save();
        res.send(req.body.username+" account created");
    }
    catch(err){
        console.log(err);
    }    
});


module.exports = auth;