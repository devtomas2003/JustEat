import jwt from "jsonwebtoken";
import Users from "../Models/Users";
import bcrypt from "bcryptjs";
import { validateEmail } from "../Utils/Functions";

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