import jwt from "jsonwebtoken";
import Users from "../Models/Users";
import bcrypt from "bcryptjs";
import { validateEmail } from "../Utils/Functions";
import Restaurants from "../Models/Restaurants";

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
        photo: true,
        role: true
    });

    res.status(200).json(userInfo);
}

export async function CreateAccount(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const vat = req.body.vat;
    const password = req.body.password;

    if(!name || !email || !phone || !password || !vat){
        return res.status(400).json({
            "field": "notification",
            "alertType": 0,
            "message": "Invalid parameters!"
        });
    }

    if(password < 8){
        return res.status(400).json({
            "field": "password",
            "message": "The password must be at least 8 characters"
        });
    }

    if(!validateEmail(email)){
        return res.status(400).json({
            "field": "email",
            "message": "The email is not valid!"
        });
    }

    if(name.length < 3){
        return res.status(400).json({
            "field": "name",
            "message": "The name needs to be at least 3 characters!"
        });
    }

    if(phone.length < 9){
        return res.status(400).json({
            "field": "phone",
            "message": "The phone needs to be at least 9 characters!"
        });
    }

    if(vat.length < 9){
        return res.status(400).json({
            "field": "vat",
            "message": "The VAT needs to be at least 9 characters!"
        });
    }

    const checkPreexisting = await Users.findOne({
        email
    });

    if(checkPreexisting){
        return res.status(400).json({
            "field": "email",
            "message": "The email already exists!"
        });
    }

    const passwordEnc = await bcrypt.hash(password, 12);

    await Users.create({
        email,
        nome: name,
        phone,
        nif: vat,
        photo: 'default.png',
        password: passwordEnc
    });

    res.status(200).json({
        "field": "notification",
        "alertType": 2,
        "message": "User created successfully!"
    });
}

export async function GetAllUsers(req, res){
    const usersData = await Users.find({}, {
        entityConnected: true,
        nome: true,
        email: true,
        phone: true,
        role: true
    });

    const usersPerformaceData = await Promise.all(usersData.map(async (user) => {
        if (user.role === "manager") {
            const findEntity = await Restaurants.findById(user.entityConnected);
            const updatedCartInfo = {
                ...user.toObject(),
                entity: findEntity.name
            };

            return updatedCartInfo;
        } else {
            const updatedCartInfo = {
                ...user.toObject(),
                entity: "N/A"
            };

            return updatedCartInfo;
        }
    }));

    res.status(200).json(usersPerformaceData);
}

export async function GetUserPermissionsMetadata(req, res){
    const userId = req.query.userId;
    
    if(!userId){
        return res.status(400).json({
            "message": "Missing fields! See API documentation",
            "code": 0
        });
    }

    try {
        const userPermsData = await Users.findById(userId, {
            role: true,
            entityConnected: true,
            nome: true
        });
        res.status(200).json(userPermsData);
    }catch(e){
        res.status(400).json({
            "message": "User not found!",
            "code": 1
        });
    }
}

export async function UpdatePermissions(req, res){
    const userId = req.params.userId;
    const role = req.body.role;
    const entityConnected = req.body.entityConnected;
    
    if(!userId || !role || !entityConnected){
        return res.status(400).json({
            "message": "Missing fields! See API documentation",
            "code": 0
        });
    }

    await Users.updateOne({
        _id: userId,
    }, {
        role,
        entityConnected
    });

    res.status(200).json({
        "message": "Permissions updated successfully!"
    });
}