import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Views/Home";
import SignUp from "./Views/SignUp";
import Restaurant from "./Views/Restaurant";
import ListRestaurants from "./Views/Admin/ListRestaurants";
import RestaurantDetail from "./Views/Admin/RestaurantDetail";
import Orders from "./Views/Admin/Orders";
import { UserProvider } from "./Contexts/User";

export default function Router(){
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/restaurant/:slug" element={<Restaurant />} />
                    <Route path="/admin/restaurants" element={<ListRestaurants />} />
                    <Route path="/admin/restaurant/:slug" element={<RestaurantDetail />} />
                    <Route path="/admin/orders" element={<Orders />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}