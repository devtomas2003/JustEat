import { FaStar, FaRegStar } from "react-icons/fa";

export default function RestaurantCard(){
    return (
        <div className="w-full rounded-t-md border border-gray-300 shadow-lg hover:cursor-pointer group">
            <div className="overflow-hidden rounded-t-md">
                <div className="w-full rounded-t-md h-24 transition-all duration-500 ease-in-out bg-cover bg-center scale-100 group-hover:scale-110 bg-[url('https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg')]" />
            </div>
            <div className="p-2 mt-2">
                <h1 className="font-poppins font-semibold text-zinc-800">Restaurante Teste</h1>
                <div className="mt-1 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-600" />
                    <p className="font-poppins font-extralight ml-2 text-zinc-800">Horario: 09:30 até às 22:00</p>
                </div>
                <div className="flex space-x-1 mt-3">
                    <FaStar className="w-5 h-5 text-yellow-400" />
                    <FaStar className="w-5 h-5 text-yellow-400" />
                    <FaRegStar className="w-5 h-5 text-yellow-400" />
                    <FaRegStar className="w-5 h-5 text-yellow-400" />
                    <FaRegStar className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="font-poppins mt-2 font-extralight text-zinc-800">Rua do Node.JS, nº24</p>
                <p className="font-poppins font-extralight text-zinc-800">3460-325 Tondela</p>
            </div>
        </div>
    );
}