import jwt from "jsonwebtoken";
import Users from "../Models/Users";

export function AuthenticateUser(req, res){
    const userId = req.userId;

    const token = jwt.sign({
        userId
    }, process.env.SECRET_KEY, {
        expiresIn: "1h"
    });

    res.status(200).json({
        token
    });
}

export async function UserInfo(req, res){
    const userId = req.userId;

    const userInfo = await Users.findById(userId, {
        nome: true,
        photo: true
    });

    res.status(200).json(userInfo);
}