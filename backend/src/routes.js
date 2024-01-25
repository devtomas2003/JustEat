import express from "express";

import { BasicAuth, Auth } from "./Middlewares/Auth";

import { AuthenticateUser, CreateAccount, UserInfo } from "./Controllers/Users";
import { CreateRestaurant, GetAllRestaurants, GetMyRestaurant, GetRestaurant, GetRestaurants, UpdateRestaurant } from "./Controllers/Restaurants";
import { CreateFood, GetFood } from "./Controllers/Food";
import { GetAllCartFromUser, GetCartItemsById, SaveCart, UpdateCartStatus } from "./Controllers/Cart";
import { CreateOrUpdateAddresses, DeleteAddress, GetAddress, GetAllAddresses } from "./Controllers/Addresses";

const routes = express.Router();

routes.get('/login', BasicAuth, AuthenticateUser);
routes.get('/user', Auth, UserInfo);
routes.post('/createAccount', CreateAccount);
routes.get('/restaurants', GetRestaurants);
routes.get('/allRestaurants', Auth, GetAllRestaurants);
routes.get('/restaurant/:slug', GetRestaurant);
routes.get('/myRestaurant', Auth, GetMyRestaurant);
routes.get('/restaurantOverview', Auth, GetMyRestaurant);
routes.post('/createRestaurant', CreateRestaurant);
routes.put('/updateRestaurant/:restaurantId', Auth, UpdateRestaurant);
routes.post('/updateRestaurant/:restaurantId', Auth, UpdateRestaurant);
routes.post('/createFood', CreateFood);
routes.post('/createCart', Auth, SaveCart);
routes.get('/food/:foodId', GetFood);
routes.get('/GetAllCartFromUser', Auth, GetAllCartFromUser);
routes.get('/addresses', Auth, GetAllAddresses);
routes.put('/updateAddress/:addressId', Auth, CreateOrUpdateAddresses);
routes.post('/createAddress', Auth, CreateOrUpdateAddresses);
routes.get('/address', Auth, GetAddress);
routes.get('/cartItems/:cartId', Auth, GetCartItemsById);
routes.delete('/deleteAddress', Auth, DeleteAddress);
routes.patch('/updateCartStatus/:cartId', Auth, UpdateCartStatus);

export default routes;