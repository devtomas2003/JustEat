import { IoCloseSharp } from "react-icons/io5";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function CartOverview(props){
    const [cartItems, setCartItems] = useState([]);
    const [foodLoaded, setFoodLoaded] = useState([]);

    async function loadItem(itemId){
        try{
            const food = (await api.get('/food/' + itemId)).data;
            return food;
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        async function getCartItems(){
            if(localStorage.getItem("@justeat/cart")){
                const cart = JSON.parse(localStorage.getItem("@justeat/cart"));
                const updatedCart = await Promise.all(cart.map(async (cartLine) => {
                    const lastModelFood = { ...cartLine };
                    const findExistent = foodLoaded.find((alreadyExists) => { console.log(alreadyExists); console.log(cartLine); return (alreadyExists._id === cartLine.foodId); });
                    console.log(findExistent);
                    if(findExistent){
                        lastModelFood.food = findExistent;
                    }else{
                        const checkFood = await loadItem(cartLine.foodId);
                        lastModelFood.food = checkFood;
                        setFoodLoaded([...foodLoaded, checkFood]);
                    }
                    return lastModelFood;
                }));
                setCartItems(updatedCart);
            }
        }
        getCartItems();
    }, []);

    async function handleRemoveItem(renderId){
        const lastCartData = JSON.parse(localStorage.getItem("@justeat/cart")) || [];
        const allCarts = lastCartData.filter(item => item.renderId !== renderId);
        localStorage.setItem("@justeat/cart", JSON.stringify(allCarts));
        setCartItems(allCarts);
    }

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
            { cartItems.length > 0 ? <div className="flex space-y-10 flex-col overflow-x-auto h-full p-6 mt-4">
                { cartItems.map((cartFoodLine) => {
                    return (<CartItem key={cartFoodLine.renderId} renderId={cartFoodLine.renderId} cartFood={cartFoodLine.food} handleRemoveItem={handleRemoveItem} />);
                }) }
            </div> : null }
            <div className="p-6">
                <button title="Bring Me My Food" className="bg-[#8C52FF] hover:bg-[#7e48e8] rounded hover:cursor-pointer  p-3 text-white w-full font-poppins font-normal">Bring Me My Food</button>
            </div>
        </div>
    );
}