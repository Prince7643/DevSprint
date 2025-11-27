import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

export interface createRequest extends Request{
    user?:any
    body: any;
    query: any;
    cookies: any;
}
const protect =(req:createRequest,res:Response,next:NextFunction)=>{
    try {
        let token = req.cookies.token;
        
        // Check for JWT cookie first (manual login)
        if(token){
            jwt.verify(token,process.env.JWT_SECRET as string,(err:any,decoded:any)=>{
                if(err){
                    return res.status(401).json({message:"Invalid token"});
                }else{
                    req.user=decoded;
                    next();
                }
            });
        } else {

            const userId = req.headers['user_id'] as string;
            if (userId) {
                req.user = { _id: userId };
                return next();
            }
            return res.status(401).json({message:"No token provided"});
        }
    } catch (error) {
        console.error('Auth middleware error:', error)
        res.status(500).json({message:"Internal server error"})
    }
}
export default protect;