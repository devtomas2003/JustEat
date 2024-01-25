import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Views/Anonymous/Home";
import SignUp from "./Views/Anonymous/SignUp";
import Restaurant from "./Views/Anonymous/Restaurant";
import ListRestaurants from "./Views/Admin/ListRestaurants";
import RestaurantDetail from "./Views/Shared/RestaurantDetail";
import Orders from "./Views/Shared/Orders";
import Addresses from "./Views/User/Addresses";

import { UserProvider } from "./Contexts/User";
import { UtilsProvider } from "./Contexts/Utils";

import Notification from "./Components/Notification";
import AddressDetail from "./Views/User/AddressesDetail";

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
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/addresses" element={<Addresses />} />
                        <Route path="/admin/orders" element={<Orders />} />
                        <Route path="/restaurant/orders" element={<Orders />} />
                        <Route path="/address/:addressId" element={<AddressDetail />} />
                    </Routes>
                    <Notification />
                </UserProvider>
            </UtilsProvider>
        </BrowserRouter>
    );
}