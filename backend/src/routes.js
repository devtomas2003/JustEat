import express from "express";

import { BasicAuth, Auth } from "./Middlewares/Auth";

import { AuthenticateUser, CreateAccount, GetAllUsers, GetUserPermissionsMetadata, UpdatePermissions, UserInfo } from "./Controllers/Users";
import { CreateRestaurant, DeleteRestaurant, GetAllRestaurants, GetAllRestaurantsNames, GetMyRestaurant, GetRestaurant, GetRestaurants, UpdateRestaurant, UploadRestaurantImage } from "./Controllers/Restaurants";
import { CreateFood, DeleteFood, GetAllFoods, GetFood, UpdateFood, UploadFoodImage } from "./Controllers/Food";
import { GetAllCartFromUser, GetCartMetadata, SaveCart, UpdateCart, UpdateCartStatus } from "./Controllers/Cart";
import { CreateOrUpdateAddresses, DeleteAddress, GetAddress, GetAllAddresses } from "./Controllers/Addresses";

import multer from "multer";
import Multer from "./Utils/Multer";

const routes = express.Router();

routes.get('/login', BasicAuth, AuthenticateUser);
routes.get('/user', Auth, UserInfo);
routes.post('/createAccount', CreateAccount);
routes.get('/restaurants', GetRestaurants);
routes.get('/allRestaurants', Auth, GetAllRestaurants);
routes.get('/restaurant/:slug', GetRestaurant);
routes.get('/myRestaurant', Auth, GetMyRestaurant);
routes.get('/foods', Auth, GetAllFoods);
routes.get('/restaurantOverview', Auth, GetMyRestaurant);
routes.put('/updateRestaurant/:restaurantId', Auth, UpdateRestaurant);
routes.post('/createRestaurant', Auth, CreateRestaurant);
routes.post('/createFood', Auth, CreateFood);
routes.post('/createCart', Auth, SaveCart);
routes.patch('/updateFood/:foodId', Auth, UpdateFood);
routes.delete('/food/:foodId', Auth, DeleteFood);
routes.put('/updateCart/:cartId', Auth, UpdateCart);
routes.get('/food/:foodId', GetFood);
routes.get('/GetAllCartFromUser', Auth, GetAllCartFromUser);
routes.get('/addresses', Auth, GetAllAddresses);
routes.get('/addresses/:userId', Auth, GetAllAddresses);
routes.put('/updateAddress/:addressId', Auth, CreateOrUpdateAddresses);
routes.post('/createAddress', Auth, CreateOrUpdateAddresses);
routes.get('/address', Auth, GetAddress);
routes.get('/cartMetadata/:cartId', Auth, GetCartMetadata);
routes.get('/users', Auth, GetAllUsers);
routes.get('/permission', Auth, GetUserPermissionsMetadata);
routes.delete('/deleteAddress', Auth, DeleteAddress);
routes.delete('/deleteRestaurant/:restaurantId', Auth, DeleteRestaurant);
routes.get('/restaurantsName', Auth, GetAllRestaurantsNames);
routes.patch('/updatePermissions/:userId', Auth, UpdatePermissions);
routes.patch('/updateCartStatus/:cartId', Auth, UpdateCartStatus);
routes.post('/restaurantImageUpload/:restaurantId', multer(Multer).single('file'), UploadRestaurantImage);
routes.post('/foodImageUpload/:foodId', multer(Multer).single('file'), UploadFoodImage);

export default routes;