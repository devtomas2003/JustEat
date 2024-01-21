import { useUser } from "../Contexts/User";
import { useUtils } from "../Contexts/Utils";
import { IMAGES_SERVER } from "../services/env";
import { BsFillCartPlusFill } from "react-icons/bs";

export default function FoodCard(props){
    const { showNotification } = useUtils();
    const { setUserCart, userCart } = useUser();

    function addCard(foodId){
        setUserCart([...userCart, {
            renderId: Math.random().toString(16).slice(2),
            foodId
        }]);
        localStorage.setItem("@justeat/cart", JSON.stringify([...userCart, {
            renderId: Math.random().toString(16).slice(2),
            foodId
        }]));
        showNotification("Item added to your cart!", 2);
    }

    return (
        <div className="w-full border shadow rounded-md hover:cursor-pointer group">
            <div className="overflow-hidden rounded-t-md">
                <img className="w-full h-28 rounded-t-md object-cover scale-100 transition-all duration-500 ease-in-out group-hover:scale-110" src={IMAGES_SERVER + props.food.photo} title={props.food.name} alt={props.food.name} />
            </div>
            <div className="p-4">
                <h2 className="font-poppins font-semibold text-zinc-800 text-xl">{props.food.name}</h2>
                <p className="font-poppins text-zinc-800 text-lg mt-0.5">{props.food.description}</p>
                <p className="font-poppins text-zinc-800 mt-0.5">Alergénicos: {props.food.alergy}</p>
                <div className="flex items-center justify-between">
                    <div className="bg-[#8C52FF] p-2 text-white w-fit rounded-lg mt-2">
                        <p className="text-white font-poppins text-lg">€ {parseInt(props.food.price).toFixed(2).toString().replace(".", ",")}</p>
                    </div>
                    <BsFillCartPlusFill className="w-8 h-8 text-zinc-700" onClick={() => { addCard(props.food._id); }} />
                </div>
            </div>
        </div>
    );
}