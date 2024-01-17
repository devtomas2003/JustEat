import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import api from "../services/api";

export default function Restaurants(){
    const [listRestaurants, setListRestaurants] = useState([]);

    useEffect(() => {
        async function loadRestaurants(){
            api.get("/restaurants").then((respRest) => {
                setListRestaurants(respRest.data);
            }).catch(() => {
                alert("API Error!");
            })
        }
        loadRestaurants();
    }, []);

    return (
        <div className="p-8" id="restaurants">
            <h1 className="font-poppins text-xl text-zinc-800">Restaurants</h1>
            <div className="mt-4 grid lg:grid-cols-5 gap-4">
                { listRestaurants.map((restaurant) => {
                    return (
                        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                    );
                }) }
            </div>
        </div>
    );
}