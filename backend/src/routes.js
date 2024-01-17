import express from "express";

import { BasicAuth, Auth } from "./Middlewares/Auth";

import { AuthenticateUser, CreateAccount, UserInfo } from "./Controllers/Users";
import { CreateRestaurant, GetRestaurant, GetRestaurants } from "./Controllers/Restaurants";

const routes = express.Router();

routes.get('/login', BasicAuth, AuthenticateUser);
routes.get('/user', Auth, UserInfo);
routes.post('/createAccount', CreateAccount);
routes.get('/restaurants', GetRestaurants);
routes.get('/restaurant/:slug', GetRestaurant);
routes.post('/createRestaurant', CreateRestaurant);

export default routes;