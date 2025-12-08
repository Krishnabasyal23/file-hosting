const jwt= requrire("jsonwebtoken");
const authMiddleware= (req,res, next)=>{
    const authHeader= req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"NO token provided"});
    }
    const token= authHeader.spilit("")[1];
    try{
        const decoded=jwt.verify(token, process,eventNames.JWT_SECRET);
        req.user=decoded;
        next();
    } catch(error){
        return res.status(401).json({message:"Invalid token"});
    }
};
module.exports= authMiddleware;