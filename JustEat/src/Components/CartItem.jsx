import { FaMinus } from "react-icons/fa";

export default function CartItem(props){
    return (
        <div className="flex flex-col shadow border rounded relative">
            <div className="bg-red-500 hover:bg-red-600 hover:cursor-pointer p-2 text-white rounded-full items-center justify-center absolute -right-4 -top-5">
                <FaMinus className="w-4 h-4 text-white" />
            </div>
            <img src="https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg" className="w-full h-24 rounded-t object-cover" title="Prato Nome" alt="Prato Nome" />
            <div className="flex flex-col p-4">
                <h2 className="font-poppins font-semibold text-zinc-800 text-xl">{props.cartFood.name}</h2>
                <p className="font-poppins text-zinc-800 text-lg mt-0.5">Uma descrição sobre os menus</p>
                <p className="font-poppins text-zinc-800 mt-0.5">Alergénicos: Contem glúten!</p>
                <div className="bg-[#8C52FF] p-2 text-white w-fit rounded-lg mt-2">
                    <p className="text-white font-poppins text-lg">€ 21,22</p>
                </div>
            </div>
        </div>
    );
}