import { Link } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Header from "../Components/Header";

export default function Home(){
    return (
        <div className="p-8 flex flex-col absolute w-full h-full">
            <Header />
            <div className="h-full flex flex-col lg:flex-row justify-center items-center">
                <div className="lg:w-1/2 w-full flex flex-col lg:items-center justify-center">
                    <div className="w-[28rem]">
                        <h1 className="text-zinc-800 leading-[1.4] text-6xl font-bold">Log in to start ordering now!</h1>    
                        <p className="mt-6 text-lg">Don't have an account yet?</p>
                        <a href="#" className="font-bold text-[#8C52FF] text-lg">Create Account</a>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full flex flex-col items-center justify-center mt-8 lg:mt-0">
                    <form className="w-full lg:w-auto flex flex-col space-y-4">
                        <div className="lg:w-96 w-full bg-[#EEF2F6] rounded-lg flex items-center">
                            <input type="email" placeholder="Email" autoCapitalize="off" autoComplete="email" autoCorrect="off" className="p-2 rounded-lg bg-[#EEF2F6] w-full outline-none" />
                            <div className="mr-2">
                                <VscError className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                        <div className="lg:w-96 w-full bg-[#EEF2F6] rounded-lg flex items-center">
                            <input type="password" placeholder="Password" autoCapitalize="off" autoComplete="off" autoCorrect="off" className="p-2 rounded-lg bg-[#EEF2F6] w-full outline-none" />
                            <div className="mr-2 hover:cursor-pointer">
                                <FaRegEye className="w-6 h-6 text-zinc-600" />
                            </div>
                        </div>
                        <Link to="/forgot-password" className="text-[#8C52FF] font-bold hover:underline">Recover Account</Link>
                        <button className="bg-[#8C52FF] p-3 rounded-lg shadow-xl text-white font-bold">Sign In</button>
                    </form>
                    <div className="mt-4 flex items-center space-x-2">
                        <div className="h-[0.1rem] w-full bg-zinc-300" />
                        <p className="text-zinc-400 w-80">Or sign in with</p>
                        <div className="h-[0.1rem] w-full bg-zinc-300" />
                    </div>
                    <div className="lg:w-96 w-full mt-4 flex space-x-2">
                        <button className="border rounded-lg w-full p-1 justify-center items-center flex hover:bg-slate-100">
                            <img src="/google.svg" title="Google" alt="Google" className="w-11" />
                        </button>
                        <button className="border rounded-lg w-full p-1 justify-center items-center flex hover:bg-slate-100">
                            <img src="/github.svg" title="GitHub" alt="GitHub" className="w-11" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}