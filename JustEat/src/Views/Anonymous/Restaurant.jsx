import Header from "../../Components/Header";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { RxReader } from "react-icons/rx";
import FoodCard from "../../Components/FoodCard";
import Footer from "../../Components/Footer";
import CartOverview from "../../Components/CartOverview";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { IMAGES_SERVER } from "../../services/env";
import { useUtils } from "../../Contexts/Utils";

export default function Restaurant(){
    const [showCart, setShowCart] = useState(false);
    const [restaurant, setRestaurant] = useState({});
    const [foods, setFoods] = useState([]);
    const { slug } = useParams();
    const { showNotification } = useUtils();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadRestaurant(){
            api.get("/restaurant/" + slug).then((restaurantInfo) => {
                setRestaurant(restaurantInfo.data.restaurant);
                setFoods(restaurantInfo.data.foods);
            }).catch((errorResp) => {
                showNotification(errorResp.response.data.message, errorResp.response.data.code);
                navigate("/");
            })
        }

        loadRestaurant();
    }, []);

    function handleTimes(timeShift){
        const workTime = new Date(timeShift);
        return workTime.getHours().toString().padStart(2, "0") + ":" + workTime.getMinutes().toString().padStart(2, "0")
    }

    function verifyIfIsOpen(openTime, closeTime, listOfRestDays){
        const openTimeDate = new Date(openTime);
        const closeTimeDate = new Date(closeTime);
        const now = new Date();

        openTimeDate.setDate(now.getDate());
        openTimeDate.setMonth(now.getMonth());
        openTimeDate.setFullYear(now.getFullYear());

        closeTimeDate.setDate(now.getDate());
        closeTimeDate.setMonth(now.getMonth());
        closeTimeDate.setFullYear(now.getFullYear());
        
        if(now <= openTimeDate || now >= closeTimeDate){
            return false;
        }

        const nowDay = now.toLocaleDateString('en-EN', { weekday: 'long' })
 
        if(listOfRestDays.includes(nowDay)){
            return false;
        }

        return true;
    }

    function exitEditMode(){
        localStorage.removeItem("@justeat/cart");
        localStorage.removeItem("@justeat/isEditing");
        localStorage.removeItem("@justeat/userId");
        navigate("/admin/restaurants");
    }

    return (
        <div className="absolute w-full h-full flex flex-col">
            { localStorage.getItem("@justeat/isEditing") ? <div className="bg-yellow-600 p-1 flex justify-center space-x-2">
                <h1 className="text-white font-poppins">In Editing Mode!</h1>
                <a onClick={() => { exitEditMode(); }} className="text-white hover:underline">Exit mode</a>
            </div> : null }
            { showCart ? <CartOverview closeCart={setShowCart} /> : null }
            { Object.keys(restaurant).length > 0 ?
            <div className="flex flex-col min-w-full min-h-full">
                <div className="p-8 flex flex-col">
                    <Header openCart={setShowCart} />
                    <div className="flex mt-8 space-x-4">
                        <div className="w-3/4 h-full">
                            <div style={{ backgroundImage: `url(${IMAGES_SERVER + restaurant.photo})` }} className="w-full h-full rounded-xl bg-no-repeat bg-cover bg-center" />
                        </div>
                        <div className="w-1/4 h-full">
                            <p className="text-2xl text-zinc-800 underline font-poppins">Our Location</p>
                            <iframe className="w-full mt-4 h-72" src={`https://maps.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&z=17&ie=UTF8&output=embed`} />
                        </div>
                    </div>
                    <h1 className="font-poppins font-semibold text-2xl text-zinc-800 mt-2">{restaurant.name}</h1>
                    <div className="flex mt-4 flex-col space-y-4">
                        <div className="flex items-center space-x-4">
                            <FaLocationDot className="w-8 h-8 text-[#8C52FF]" />
                            <div className="flex flex-col">
                                <p className="font-poppins text-zinc-800">{restaurant.addressLineOne}</p>
                                <p className="font-poppins text-zinc-800">{restaurant.addressLineTwo}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-4">
                            <FaClock className="w-8 h-8 text-[#8C52FF]" />
                            <p className="font-poppins text-zinc-800">{handleTimes(restaurant.openingTime)}H - {handleTimes(restaurant.closedTime)}H</p>
                        </div>
                        <div className="mt-4 flex items-center space-x-4">
                            <RxReader className="w-8 h-8 text-[#8C52FF]" />
                            <p className="font-poppins text-zinc-800">Observations: {restaurant.observations}</p>
                        </div>
                    </div>
                    <h1 className="font-poppins font-semibold text-2xl text-zinc-800 mt-4">Our Menus</h1>
                    <div className="mt-1 grid lg:grid-cols-4 gap-4">
                        { foods.map((food) => {
                            return (
                                <FoodCard key={food._id} food={food} isOpen={verifyIfIsOpen(restaurant.openingTime, restaurant.closedTime, restaurant.restDays)} />
                            );
                        }) }
                    </div>
                </div>
                <Footer />
            </div> : null }
        </div>
    );
}