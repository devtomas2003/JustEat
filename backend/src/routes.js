import express from "express";

import { BasicAuth, Auth } from "./Middlewares/Auth";

import { AuthenticateUser, CreateAccount, UserInfo } from "./Controllers/Users";
import { CreateRestaurant, GetAllRestaurants, GetMyRestaurant, GetRestaurant, GetRestaurants, UpdateRestaurant } from "./Controllers/Restaurants";
import { CreateFood, GetFood } from "./Controllers/Food";
import { SaveCart } from "./Controllers/Cart";

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
routes.post('/createFood', CreateFood);
routes.post('/createCart', Auth, SaveCart);
routes.get('/food/:foodId', GetFood);

export default routes;