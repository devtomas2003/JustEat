import Users from "../Models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function BasicAuth(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            "message": "Auth Header is missing!",
            "field": "notification",
            "alertType": 0
        });
    }

    const headerList = authHeader.split(" ");
    const authData = atob(headerList[1]);
    const authList = authData.split(":");

    const user = await Users.findOne({
        email: authList[0]
    }, {
        isActive: true,
        password: true
    });

    if(!user){
        return res.status(401).json({
            "message": "The user or password are incorrect!",
            "field": "notification",
            "alertType": 0
        });
    }
     
    if(!user.isActive){
        return res.status(401).json({
            "message": "User is not active!",
            "field": "notification",
            "alertType": 1
        });
    }

    const validatePassword = await bcrypt.compare(authList[1], user.password);

    if(!validatePassword){
        return res.status(401).json({
            "message": "The user or password are incorrect!",
            "field": "notification",
            "alertType": 0
        });
    }
    
    req.userId = user._id;
    next();
}

export async function Auth(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(400).json({ "message": "User not authorized!" });
    }

    const parts = authHeader.split(' ');
    if(parts.length !== 2){
        return res.status(400).json({ "message": "Authentication Problems!" });
    }

    const [ scheme, token ] = parts;
    if(scheme !== "Bearer"){
        return res.status(400).json({ "message": "Invalid Token Format!" });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if(err){
            return res.status(403).json({ "message": "Token Time Out!" });
        }

        req.userId = decoded.userId;
        next();
    });
}