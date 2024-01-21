import Food from "../Models/Food";
import Restaurants from "../Models/Restaurants";
import Users from "../Models/Users";
import { calcCrow, validateEmail } from "../Utils/Functions";

export async function GetRestaurants(req, res){
    const lat = req.query.lat;
    const long = req.query.long;

    if(!lat || !long){
        return res.status(404).json({
            "message": "Cannot find geo points in request"
        });
    }

    const restaurantsNearBy = [];

    const allActiveRestaurants = await Restaurants.find({
        isActive: true
    });
    
    allActiveRestaurants.forEach((restaurant) => {
        const calDist = calcCrow(lat, long, restaurant.latitude, restaurant.longitude);
        if(calDist <= 25){
            restaurantsNearBy.push(restaurant);
        }
    });

    res.status(200).json(restaurantsNearBy);
}

export async function CreateRestaurant(req, res){
    const name = req.body.name;
    const photo = req.body.photo;
    const email = req.body.email;
    const vat = req.body.vat;
    const phone = req.body.phone;
    const observations = req.body.observations;
    const addressLineOne = req.body.addressLineOne;
    const addressLineTwo = req.body.addressLineTwo;
    const openingTime = req.body.openingTime;
    const closedTime = req.body.closedTime;
    const latitude = req.body.latitude;
    const restDays = req.body.restDays;
    const longitude = req.body.longitude;

    if(!name || !email || !vat || !phone || !addressLineOne || !addressLineTwo || !openingTime || !closedTime || !latitude || !restDays || !longitude){
        return res.status(400).json({
            "message": "Missing fields! See API documentation"
        });
    }

    if(!validateEmail(email)){
        return res.status(400).json({
            "message": "The email address is invalid!"
        });
    }

    if(vat.toString().length !== 9){
        return res.status(400).json({
            "message": "The VAT is invalid!"
        });
    }

    if(phone.toString().length !== 9){
        return res.status(400).json({
            "message": "The Phone Number is invalid!"
        });
    }

    const openingTimeList = openingTime.split(":");
    const closedTimeList = closedTime.split(":");

    const openingTimeDate = new Date();
    openingTimeDate.setHours(openingTimeList[0]);
    openingTimeDate.setMinutes(openingTimeList[1]);
    openingTimeDate.setSeconds(0);

    const closingTimeDate = new Date();
    closingTimeDate.setHours(closedTimeList[0]);
    closingTimeDate.setMinutes(closedTimeList[1]);
    closingTimeDate.setSeconds(0);

    if(openingTimeDate >= closingTimeDate){
        return res.status(400).json({
            "message": "The opening time cannot be greater than the closing time"
        });
    }

    await Restaurants.create({
        name,
        photo: photo || 'default.png',
        email,
        vat,
        phone,
        observations: observations || 'N/A',
        addressLineOne,
        addressLineTwo,
        openingTime: openingTimeDate,
        closedTime: closingTimeDate,
        latitude,
        longitude,
        restDays
    });

    res.status(200).json({
        "message": "Restaurant created successfully!"
    });
}

export async function GetRestaurant(req, res) {
    const slug = req.params.slug;

    if(!slug){
        return res.status(400).json({
            "message": "ID parameter not found!"
        });
    }

    Restaurants.findById(slug, {
        addressLineOne: true,
        addressLineTwo: true,
        openingTime: true,
        closedTime: true,
        email: true,
        longitude: true,
        latitude: true,
        photo: true,
        name: true,
        observations: true,
        stars: true,
        phone: true,
        restDays: true
    }).then((restaurant) => {
        Food.find({
            restaurant: slug
        }).then((foods) => {
            res.status(200).json({
                restaurant,
                foods
            });
        })
    });

}

export async function GetMyRestaurant(req, res){
    const userId = req.userId;

    const userRestaurant = await Users.findById(userId, {
        entityConnected: true
    });

    if(!userRestaurant.entityConnected){
        return res.status(400).json({
            "message": "The user is not connected to a restaurant!"
        });
    }
    
    const restaurant = await Restaurants.findById(userRestaurant.entityConnected, {
        name: true,
        vat: true,
        openingTime: true,
        closedTime: true,
        addressLineOne: true,
        addressLineTwo: true,
        latitude: true,
        longitude: true,
        restDays: true,
        observations: true,
        phone: true,
        email: true,
        photo: true
    });

    res.status(200).json(restaurant);
}