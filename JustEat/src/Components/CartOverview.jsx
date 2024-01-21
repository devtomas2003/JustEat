import { IoCloseSharp } from "react-icons/io5";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useUser } from "../Contexts/User";

export default function CartOverview(props){
    const { setUserCart, userCart } = useUser();
    const [localItemsUser, setLocalItemsUser] = useState([]);

    async function loadItem(itemId){
        try{
            const food = (await api.get('/food/' + itemId)).data;
            return food;
        }catch(err){
            console.log(err);
        }
    }

    async function handleRemoveItem(renderId){
        const allCarts = userCart.filter(item => item.renderId !== renderId);
        localStorage.setItem("@justeat/cart", JSON.stringify(allCarts));
        setUserCart(allCarts);
    }

    useEffect(() => {
        async function loadCart() {
            const localCache = [];
        
            for (const cartItem of userCart) {
                const foodAlreadyExists = localCache.find((alreadyExists) => alreadyExists.foodId === cartItem.foodId);

                if (foodAlreadyExists) {
                    const updatedFood = { ...foodAlreadyExists, renderId: cartItem.renderId };
                    localCache.push(updatedFood);
                } else {
                    const apiFood = await loadItem(cartItem.foodId);
                    cartItem.food = apiFood;
                    localCache.push(cartItem);
                }
            }

            setLocalItemsUser(localCache);
        }
        loadCart();
    }, [userCart]);

    return (
        <div className="w-1/4 fixed right-0 h-full z-10 bg-white shadow flex flex-col">
            <div className="px-6 pt-6 flex items-center justify-between">
                <div>
                    <h1 className="font-poppins text-2xl text-[#8C52FF] font-semibold">Cart</h1>
                    <p className="font-poppins text-zinc-800">See your cart bellow</p>
                </div>
                <div className="hover:cursor-pointer" onClick={() => { props.closeCart(false); }}>
                    <IoCloseSharp className="w-10 h-10 text-zinc-800" />
                </div>
            </div>
            { localItemsUser.length > 0 ? <div className="flex space-y-10 flex-col overflow-x-auto h-full p-6 mt-4">
                { localItemsUser.map((cartFoodLine) => {
                    return (<CartItem key={cartFoodLine.renderId} cartFood={cartFoodLine.food} handleRemoveItem={() => { handleRemoveItem(cartFoodLine.renderId); }} />);
                }) }
            </div> : null }
            <div className="p-6">
                <button title="Bring Me My Food" className="bg-[#8C52FF] hover:bg-[#7e48e8] rounded hover:cursor-pointer  p-3 text-white w-full font-poppins font-normal">Bring Me My Food</button>
            </div>
        </div>
    );
}