import Header from "../../Components/Header";
import RestaurantCard from "../../Components/RestaurantCard";

import { IoIosAddCircle } from "react-icons/io";

export default function ListRestaurants(){
    return (
        <div className="absolute w-full h-full flex flex-col">
            <div className="flex flex-col min-w-full min-h-full p-8">
                <Header />
                <div className="mt-6">
                    <div className="flex items-center justify-between">
                        <h1 className="font-poppins text-zinc-800 text-xl font-semibold">List of Restaurants</h1>
                        <div className="hover:cursor-pointer group" title="Add Restaurant">
                            <IoIosAddCircle className="w-10 h-10 text-emerald-600 group-hover:text-emerald-700" />
                        </div>
                    </div>
                    <div className="mt-4 grid lg:grid-cols-5 gap-4">
                        <RestaurantCard />
                        <RestaurantCard />
                        <RestaurantCard />
                        <RestaurantCard />
                        <RestaurantCard />
                        <RestaurantCard />
                        <RestaurantCard />
                    </div>
                </div>
            </div>
        </div>
    );
}