import express from "express";

import { BasicAuth, Auth } from "./Middlewares/Auth";

import { AuthenticateUser, CreateAccount, UserInfo } from "./Controllers/Users";
import { CreateRestaurant, GetMyRestaurant, GetRestaurant, GetRestaurants } from "./Controllers/Restaurants";
import { CreateFood, GetFood } from "./Controllers/Food";

const routes = express.Router();

routes.get('/login', BasicAuth, AuthenticateUser);
routes.get('/user', Auth, UserInfo);
routes.post('/createAccount', CreateAccount);
routes.get('/restaurants', GetRestaurants);
routes.get('/restaurant/:slug', GetRestaurant);
routes.get('/myRestaurant', Auth, GetMyRestaurant);
routes.post('/createRestaurant', CreateRestaurant);
routes.post('/createFood', CreateFood);
routes.get('/food/:foodId', GetFood);

export default routes;