import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Views/Anonymous/Home";
import SignUp from "./Views/Anonymous/SignUp";
import Restaurant from "./Views/Anonymous/Restaurant";
import ListRestaurants from "./Views/Admin/ListRestaurants";
import RestaurantDetail from "./Views/Shared/RestaurantDetail";
import Orders from "./Views/Shared/Orders";
import ListPermissions from "./Views/Admin/Permissions";
import Addresses from "./Views/User/Addresses";
import AddressDetail from "./Views/User/AddressesDetail";
import PermissionDetail from "./Views/Admin/PermissionDetail";
import Foods from "./Views/Restaurant/Foods";
import FoodDetail from "./Views/Restaurant/FoodDetails";
import RecoverAccount from "./Views/Anonymous/Recover";
import Profile from "./Views/Shared/Profile";

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
                        <Route path="/recover" element={<RecoverAccount />} />

                        <Route path="/profile" element={<Profile />} />
                        <Route path="/address/:addressId" element={<AddressDetail />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/addresses" element={<Addresses />} />

                        <Route path="/restaurant/:slug" element={<Restaurant />} />
                        <Route path="/restaurant/overview" element={<RestaurantDetail isOwn={true} />} />
                        <Route path="/restaurant/orders" element={<Orders />} />
                        <Route path="/restaurant/foods" element={<Foods />} />
                        <Route path="/food/:foodId" element={<FoodDetail />} />

                        <Route path="/admin/restaurants" element={<ListRestaurants />} />
                        <Route path="/admin/restaurant/:slug" element={<RestaurantDetail />} />
                        <Route path="/admin/orders" element={<Orders />} />
                        <Route path="/admin/permissions" element={<ListPermissions />} />
                        <Route path="/admin/permission/:userId" element={<PermissionDetail />} />
                    </Routes>
                    <Notification />
                </UserProvider>
            </UtilsProvider>
        </BrowserRouter>
    );
}