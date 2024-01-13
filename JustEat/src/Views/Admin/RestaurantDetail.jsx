import Header from "../../Components/Header";
import { FaRegSave } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import Footer from "../../Components/Footer";

export default function RestaurantDetail(){
    return (
        <div className="absolute w-full h-full flex flex-col">
            <div className="flex flex-col min-w-full min-h-full">
                <div className="p-8">
                    <Header />
                    <div className="mt-4">
                        <h1 className="text-zinc-800 font-poppins text-lg">Information Of Restaurant Name</h1>
                        <form className="flex flex-col mt-4">
                            <div className="flex justify-between lg:space-x-2 lg:space-y-0 space-y-2 flex-col lg:flex-row">
                                <div className="w-full flex flex-col space-y-2">
                                    <div className="bg-slate-100 p-2 rounded">
                                        <div className="flex space-x-2">
                                            <label className="font-poppins text-zinc-700">Name</label>
                                            <input type="text" className="w-full bg-transparent outline-none" placeholder="A Nice Restaurant" />
                                        </div>
                                        <p className="text-red-600 font-poppins mt-0.5">An Error!</p>
                                    </div>
                                    <div className="bg-slate-100 p-2 rounded">
                                        <div className="flex space-x-2">
                                            <label className="font-poppins text-zinc-700">Opening Time</label>
                                            <input type="time" className="bg-transparent outline-none" placeholder="Name" />
                                        </div>
                                        <p className="text-red-600 font-poppins mt-0.5">An Error!</p>
                                    </div>
                                    <div className="bg-slate-100 p-2 rounded">
                                        <div className="flex space-x-2">
                                            <label className="w-36 font-poppins text-zinc-700">Address Line 1</label>
                                            <input type="text" className="w-full bg-transparent outline-none" placeholder="An Good Street" />
                                        </div>
                                        <p className="text-red-600 font-poppins mt-0.5">An Error!</p>
                                    </div>
                                    <div className="bg-slate-100 p-2 rounded">
                                        <div className="flex space-x-2">
                                            <label className="font-poppins text-zinc-700">Latitude</label>
                                            <input type="text" className="w-full bg-transparent outline-none" placeholder="-3.1415926535" />
                                        </div>
                                        <p className="text-red-600 font-poppins mt-0.5">An Error!</p>
                                    </div>
                                    <div className="bg-slate-100 p-2 rounded">
                                        <div className="flex space-x-2">
                                            <label className="font-poppins w-36 text-zinc-700">Rest Days</label>
                                            <select className="w-full bg-transparent outline-none" multiple>
                                                <option>Monday</option>
                                                <option>Tuesday</option>
                                                <option>Wednesday</option>
                                                <option>Thursday</option>
                                                <option>Friday</option>
                                                <option>Saturday</option>
                                                <option>Sunday</option>
                                            </select>
                                        </div>
                                        <p className="text-red-600 font-poppins mt-0.5">An Error!</p>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col space-y-2">
                                    <div className="bg-slate-100 p-2 rounded">
                                        <div className="flex space-x-2">
                                            <label className="font-poppins text-zinc-700">VAT</label>
                                            <input type="text" className="w-full bg-transparent outline-none" placeholder="999999999" />
                                        </div>
                                        <p className="text-red-600 font-poppins mt-0.5">An Error!</p>
                                    </div>
                                    <div className="bg-slate-100 p-2 rounded">
                                        <div className="flex space-x-2">
                                            <label className="font-poppins text-zinc-700">Close Time</label>
                                            <input type="time" className="bg-transparent outline-none" placeholder="Name" />
                                        </div>
                                        <p className="text-red-600 font-poppins mt-0.5">An Error!</p>
                                    </div>
                                    <div className="bg-slate-100 p-2 rounded">
                                        <div className="flex space-x-2">
                                            <label className="w-36 font-poppins text-zinc-700">Address Line 2</label>
                                            <input type="text" className="w-full bg-transparent outline-none" placeholder="Zip Code" />
                                        </div>
                                        <p className="text-red-600 font-poppins mt-0.5">An Error!</p>
                                    </div>
                                    <div className="bg-slate-100 p-2 rounded">
                                        <div className="flex space-x-2">
                                            <label className="font-poppins text-zinc-700">Longitude</label>
                                            <input type="text" className="w-full bg-transparent outline-none" placeholder="-3.1415926535" />
                                        </div>
                                        <p className="text-red-600 font-poppins mt-0.5">An Error!</p>
                                    </div>
                                    <div className="bg-slate-100 h-full p-2 flex flex-col rounded">
                                        <div className="flex space-x-2">
                                            <label className="w-36 font-poppins text-zinc-700">Description</label>
                                            <textarea type="text" className="w-full h-full bg-transparent outline-none" placeholder="We are a good restaurant!" />
                                        </div>
                                        <p className="text-red-600 font-poppins mt-0.5">An Error!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-end mt-4">
                                <button className="p-2 rounded bg-emerald-600 hover:bg-emerald-700 flex items-center space-x-1">
                                    <FaRegSave className="w-6 h-6 text-white" />
                                    <p className="font-poppins text-white font-semibold">Save</p>
                                </button>
                            </div>
                        </form>
                        <h1 className="text-zinc-800 font-poppins text-lg mt-2">Profile Photo</h1>
                        <img src="https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" className="w-96 mt-2 rounded" title="Restaurant Teste" alt="Restaurant Teste" />
                        <button className="p-2 rounded bg-emerald-600 hover:bg-emerald-700 flex items-center space-x-1 mt-2">
                            <MdAddPhotoAlternate className="w-6 h-6 text-white" />
                            <p className="font-poppins text-white font-semibold">Change</p>
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}