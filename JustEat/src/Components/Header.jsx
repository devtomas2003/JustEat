import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Fragment, useState } from "react";

export default function Header(props){

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <Fragment>
            { isMobileMenuOpen ?
            <div className="w-1/2 h-full bg-zinc-200 border shadow fixed top-0 left-0 p-4 lg:hidden z-10">
                <div className="flex items-center justify-between">
                    <img src="/logo.svg" title="JustEat" alt="JustEat" className="w-32" />
                    <div className="hover:cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); }}>
                        <IoMdClose className="w-8 h-8 text-zinc-700" />
                    </div>
                </div>
                <ul className="mt-8 space-y-2 text-lg font-poppins flex flex-col font-extralight">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li><Link to="/restaurants" className="hover:underline">Restaurants</Link></li>
                    <li><Link to="/help" className="hover:underline">Help</Link></li>
                    <li><Link to="/more" className="hover:underline">Know More</Link></li>
                </ul>
                <div className="flex flex-col font-poppins space-y-4 mt-8">
                    <Link to="/" className="border-b-2 font-bold border-[#8C52FF] w-fit">Sign In</Link>
                    <Link to="/signup" className="bg-white shadow p-3 rounded-xl border flex items-center justify-center font-bold text-[#8C52FF]">Create Account</Link>
                </div>
            </div> : null }
            <div className="flex w-full justify-between">
                <div className="flex items-center">
                    <div className="flex items-center lg:space-x-0 space-x-4">
                        <div className="lg:hidden hover:cursor-pointer" onClick={() => { setIsMobileMenuOpen(true); }}>
                            <GiHamburgerMenu className="text-zinc-800 w-8 h-8" />
                        </div>
                        <img src="/logo.svg" title="JustEat" alt="JustEat" className="lg:w-52 w-32" />
                    </div>
                    <ul className="ml-24 space-x-8 text-lg font-poppins lg:flex hidden font-extralight">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/restaurants" className="hover:underline">Restaurants</Link></li>
                        <li><Link to="/help" className="hover:underline">Help</Link></li>
                        <li><Link to="/more" className="hover:underline">Know More</Link></li>
                    </ul>
                </div>
                <div className="lg:flex hidden font-poppins items-center space-x-8">
                    <div className="flex bg-slate-100 hover:bg-slate-200 hover:cursor-pointer p-2 items-center space-x-2 rounded" onClick={() => { props.openCart(true); }}>
                        <FaCartShopping className="w-6 h-6 text-[#8C52FF]" />
                        <p className="font-poppins text-[#8C52FF]">2 Itens</p>
                    </div>
                    <Link to="/" className="border-b-2 font-bold border-[#8C52FF]">Sign In</Link>
                    <Link to="/signup" className="shadow p-3 rounded-xl border font-bold text-[#8C52FF]">Create Account</Link>
                </div>
            </div>
        </Fragment>
    );
}