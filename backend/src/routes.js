import express from "express";

import { BasicAuth, Auth } from "./Middlewares/Auth";

import { AuthenticateUser, CreateAccount, UserInfo } from "./Controllers/Users";

const routes = express.Router();

routes.get('/login', BasicAuth, AuthenticateUser);
routes.get('/user', Auth, UserInfo);
routes.post('/createAccount', CreateAccount);

export default routes;