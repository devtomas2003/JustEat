export default function CardOverview(){
    return (
        <div className="w-1/4 fixed right-0 h-screen z-10 bg-white shadow p-6">
            <h1 className="font-poppins text-2xl text-[#8C52FF] font-semibold">Cart</h1>
            <p className="font-poppins text-zinc-800">See your card bellow</p>
            <div className="mt-2">
                <div className="flex flex-col space-y-2 shadow p-4 border rounded">
                    <img src="https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg" className="w-full h-24 object-cover" title="Prato Nome" alt="Prato Nome" />
                    <p>Um Produto Teste</p>
                </div>
            </div>
        </div>
    );
}