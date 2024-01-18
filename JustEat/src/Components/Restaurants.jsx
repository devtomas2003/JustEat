import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import api from "../services/api";

export default function Restaurants(){
    const [listRestaurants, setListRestaurants] = useState([]);

    useEffect(() => {
        async function loadRestaurants(){
            navigator.geolocation.getCurrentPosition((geoCords) => {
                api.get(`/restaurants?lat=${geoCords.coords.latitude}&long=${geoCords.coords.longitude}`).then((respRest) => {
                    setListRestaurants(respRest.data);
                }).catch(() => {
                    alert("API Error!");
                })
            }, (e) => {
                
            });
        }
        loadRestaurants();
    }, []);

    return (
        <div className="p-8" id="restaurants">
            <h1 className="font-poppins text-xl text-zinc-800">Restaurants</h1>
            { listRestaurants.length > 0 ?
            <div className="mt-4 grid lg:grid-cols-5 gap-4">
                { listRestaurants.map((restaurant) => {
                    return (
                        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                    );
                }) }
            </div> :
            <div className="flex mt-8 flex-col items-center">
                <img src="/notarrive.svg" className="w-[50rem]" title="Not Arrive" alt="Not Arrive" />
                <p className="text-2xl mt-4 font-poppins font-semibold">We not arrive to your location!</p>
            </div>
            }
        </div>
    );
}