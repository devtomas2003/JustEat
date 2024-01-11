export default function FoodCard(){
    return (
        <div className="w-full border shadow rounded-md hover:cursor-pointer group">
            <div className="overflow-hidden rounded-t-md">
                <img className="w-full h-28 rounded-t-md object-cover scale-100 transition-all duration-500 ease-in-out group-hover:scale-110" src="https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg" title="Pizza" alt="Pizza" />
            </div>
            <div className="p-4">
                <h2 className="font-poppins font-semibold text-zinc-800 text-xl">Prato Teste</h2>
                <p className="font-poppins text-zinc-800 text-lg mt-0.5">Uma descrição sobre os menus</p>
                <p className="font-poppins text-zinc-800 mt-0.5">Alergénicos: Contem glúten!</p>
                <div className="bg-[#8C52FF] p-2 text-white w-fit rounded-lg mt-2">
                    <p className="text-white font-poppins text-lg">€ 21,22</p>
                </div>
            </div>
        </div>
    );
}