const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{

    const token=req.body.token;
    if(!token)
    return res.send("Access Denied");

    try{
        const verified=jwt.verify(token,process.env.jwt_secret);
        req.user=verified;
        next();
    }
    catch(err){
        res.status(400).send("Invalid Token");
    }

}