import RestaurantCard from "./RestaurantCard";

export default function Restaurants(){
    return (
        <div className="p-8" id="restaurants">
            <h1 className="font-poppins text-xl text-zinc-800">Restaurants</h1>
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
    );
}