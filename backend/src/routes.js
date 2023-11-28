import express from "express";

import { GetRestaurants } from "./Controllers/Restaurants";

const routes = express.Router();

routes.get('/', GetRestaurants);

export default routes;