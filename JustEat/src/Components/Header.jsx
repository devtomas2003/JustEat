import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { Fragment, useState } from "react";
import { useUser } from "../Contexts/User";
import { IMAGES_SERVER } from "../services/env";
import { useUtils } from "../Contexts/Utils";

export default function Header(props){
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { user, makeLogout } = useUser();
    const { showNotification } = useUtils();

    function getUserSmallName(fullName){
        const listOfNames = fullName.split(" ");
        if(listOfNames.length === 0){
            return fullName;
        }else{
            return listOfNames[0] + " " + listOfNames[listOfNames.length - 1];
        }
    }

    function logout(){
        makeLogout();
        showNotification("Logout completed!", 2);
    }

    return (
        <Fragment>
            { isMobileMenuOpen ?
            <div className="w-1/2 h-full bg-zinc-200 border shadow fixed top-0 left-0 p-4 lg:hidden z-10">
                <div className="flex items-center justify-between">
                    <img src="/logo.svg" title="JustEat" alt="JustEat" className="w-32" onClick={()=>{navigate('/')}}/>
                    <div className="hover:cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); }}>
                        <IoMdClose className="w-8 h-8 text-zinc-700" />
                    </div>
                </div>
                <ul className="mt-8 space-y-2 text-lg font-poppins flex flex-col font-extralight">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li><a href="#restaurants" className="hover:underline">Restaurants</a></li>
                    <li><Link to="/help" className="hover:underline">Help</Link></li>
                    <li><Link to="/more" className="hover:underline">Know More</Link></li>
                </ul>
                <div className="flex bg-slate-100 hover:bg-slate-200 hover:cursor-pointer p-2 items-center space-x-2 rounded w-fit mt-5" onClick={() => { props.openCart(true); }}>
                    <FaCartShopping className="w-6 h-6 text-[#8C52FF]" />
                    <p className="font-poppins text-[#8C52FF]">2 Itens</p>
                </div>
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
                        <img src="/logo.svg" title="JustEat" alt="JustEat" className="lg:w-52 w-32" onClick={()=>{ navigate('/'); }}/>
                    </div>
                    <ul className="ml-24 space-x-8 text-lg font-poppins lg:flex hidden font-extralight">
                        { Object.keys(user).length > 0 ?
                        <>
                            { user.role === "user" ?
                            <>
                                <li><a href="#restaurants" className="hover:underline">Restaurants</a></li>
                                <li><Link to="/orders" className="hover:underline">My Orders</Link></li>
                                <li><Link to="/more" className="hover:underline">Addresses</Link></li>
                            </> : user.role === "manager" ?
                            <>
                                <li><a href="#restaurants" className="hover:underline">Restaurants</a></li>
                                <li><Link to="/help" className="hover:underline">My Requests</Link></li>
                                <li><Link to="/more" className="hover:underline">My Restaurant</Link></li>
                            </> : user.role === "admin" ?
                            <>
                                <li><a href="#restaurants" className="hover:underline">Restaurants</a></li>
                                <li><Link to="/help" className="hover:underline">Requests</Link></li>
                            </> : null }
                        </> :
                        <>
                            <li><Link to="/" className="hover:underline">Home</Link></li>
                            <li><a href="#restaurants" className="hover:underline">Restaurants</a></li>
                            <li><Link to="/help" className="hover:underline">Help</Link></li>
                            <li><Link to="/more" className="hover:underline">Know More</Link></li>
                        </> }
                    </ul>
                </div>
                <div className="lg:flex hidden font-poppins items-center space-x-8">
                    { Object.keys(user).length > 0 ?
                    <>
                        { user.role === "user" ? <div className="flex bg-slate-100 hover:bg-slate-200 hover:cursor-pointer p-2 items-center space-x-2 rounded" onClick={() => { props.openCart(true); }}>
                            <FaCartShopping className="w-6 h-6 text-[#8C52FF]" />
                            <p className="font-poppins text-[#8C52FF]">2 Itens</p>
                        </div> : null }
                        <div className="flex items-center space-x-2 hover:cursor-pointer" onClick={() => { setShowProfileMenu(!showProfileMenu); }}>
                            <img src={IMAGES_SERVER + user.photo} className="w-10" />
                            <p>{getUserSmallName(user.nome)}</p>
                            <div className="flex flex-col relative items-end">
                                <IoMdArrowDropdown className="w-8 h-8 text-zinc-700" />
                                { showProfileMenu ? <div className="shadow fixed mt-10 space-y-1 border flex flex-col rounded">
                                    <button className="flex items-center space-x-1 p-2 hover:bg-slate-100">
                                        <MdAccountCircle className="w-6 h-6 text-zinc-700" />
                                        <p>Perfil</p>
                                    </button>
                                    <button className="flex items-center space-x-1 p-2 hover:bg-slate-100" onClick={() => { logout(); }}>
                                        <PiSignOut className="w-6 h-6 text-zinc-700" />
                                        <p>Terminar Sessão</p>
                                    </button>
                                </div> : null }
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <Link to="/" className="border-b-2 font-bold border-[#8C52FF]">Sign In</Link>
                        <Link to="/signup" className="shadow p-3 rounded-xl border font-bold text-[#8C52FF]">Create Account</Link>
                    </> }
                </div>
            </div>
        </Fragment>
    );
}