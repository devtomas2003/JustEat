import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header(){
    return (
        <div className="flex w-full justify-between">
            <div className="flex items-center">
                <div className="flex items-center lg:space-x-0 space-x-4">
                    <div className="lg:hidden">
                        <GiHamburgerMenu className="text-zinc-800 w-8 h-8" />
                    </div>
                    <img src="/logo.svg" title="JustEat" alt="JustEat" className="lg:w-52 w-32" />
                </div>
                <ul className="ml-24 space-x-8 text-lg font-poppins lg:flex hidden">
                    <li><Link to="/" className="hover:underline font-poppins font-extralight">Home</Link></li>
                    <li><Link to="/restaurants" className="hover:underline font-poppins font-extralight">Restaurants</Link></li>
                    <li><Link to="/help" className="hover:underline font-poppins font-extralight">Help</Link></li>
                    <li><Link to="/more" className="hover:underline font-poppins font-extralight">Know More</Link></li>
                </ul>
            </div>
            <div className="lg:flex hidden items-center space-x-8">
                <Link to="/" className="border-b-2 font-poppins font-bold border-[#8C52FF]">Sign In</Link>
                <Link to="/" className="shadow p-3 font-poppins rounded-xl border font-bold text-[#8C52FF]">Create Account</Link>
            </div>
        </div>
    );
}