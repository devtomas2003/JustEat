import Header from "../Components/Header";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { RxReader } from "react-icons/rx";
import FoodCard from "../Components/FoodCard";
import Footer from "../Components/Footer";
import CartOverview from "../Components/CartOverview";
import { useState } from "react";

export default function Restaurant(){

    const [showCart, setShowCart] = useState(false);

    return (
        <div className="absolute w-full h-full flex flex-col">
            { showCart ? <CartOverview closeCart={setShowCart} /> : null }
            <div className="flex flex-col min-w-full min-h-full">
                <div className="p-8 flex flex-col">
                <Header openCart={setShowCart} />
                <div className="flex mt-8 space-x-4">
                    <div className="w-3/4 h-full">
                        <div className="bg-[url('https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg')] w-full h-full rounded-xl bg-no-repeat bg-cover bg-center"></div>
                    </div>
                    <div className="w-1/4 h-full">
                        <p className="text-2xl text-zinc-800 underline font-poppins">Our Location</p>
                        <iframe className="w-full mt-4 h-72" src="https://maps.google.com/maps?q=ACERT%20Tondela&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed" />
                    </div>
                </div>
                <h1 className="font-poppins font-semibold text-2xl text-zinc-800 mt-2">Restaurante Teste</h1>
                <div className="flex mt-4 flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                        <FaLocationDot className="w-8 h-8 text-[#8C52FF]" />
                        <div className="flex flex-col">
                            <p className="font-poppins text-zinc-800">Rua da Teoria das Cordas, nº21</p>
                            <p className="font-poppins text-zinc-800">3460-123 Tondela</p>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-4">
                        <FaClock className="w-8 h-8 text-[#8C52FF]" />
                        <p className="font-poppins text-zinc-800">09:00H - 18:00H</p>
                    </div>
                    <div className="mt-4 flex items-center space-x-4">
                        <RxReader className="w-8 h-8 text-[#8C52FF]" />
                        <p className="font-poppins text-zinc-800">Observations: N/A</p>
                    </div>
                </div>
                <h1 className="font-poppins font-semibold text-2xl text-zinc-800 mt-4">Our Menus</h1>
                <div className="mt-1 grid lg:grid-cols-4 gap-4">
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                </div></div>
                <Footer />
            </div>
        </div>
    );
}