import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Views/Anonymous/Home";
import SignUp from "./Views/Anonymous/SignUp";
import Restaurant from "./Views/Anonymous/Restaurant";
import ListRestaurants from "./Views/Admin/ListRestaurants";
import RestaurantDetail from "./Components/RestaurantDetail";
import Orders from "./Views/Admin/Orders";
import { UserProvider } from "./Contexts/User";
import { UtilsProvider } from "./Contexts/Utils";

import Notification from "./Components/Notification";

export default function Router(){
    return (
        <BrowserRouter>
            <UtilsProvider>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/restaurant/:slug" element={<Restaurant />} />
                        <Route path="/admin/restaurants" element={<ListRestaurants />} />
                        <Route path="/admin/restaurant/:slug" element={<RestaurantDetail />} />
                        <Route path="/admin/orders" element={<Orders />} />
                        <Route path="/restaurant/overview" element={<RestaurantDetail />} />
                    </Routes>
                    <Notification />
                </UserProvider>
            </UtilsProvider>
        </BrowserRouter>
    );
}