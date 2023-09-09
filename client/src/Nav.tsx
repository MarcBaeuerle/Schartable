import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "./spotify";

export default function Nav() {
    const [openMenu, setOpenMenu] = useState(false);
    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    const home = (
        <Link to="/" className="transform duration-300 p-3 hover:-translate-y-1">Home</Link>
    )

    const privacy = (
        <Link to="/Privacy" className="transform duration-300 p-3 hover:-translate-y-1">Privacy Policy</Link>
    )

    const log = (
        <button onClick={logout} className="transform duration-300 p-3 hover:-translate-y-1">Log out</button>
    )

    return (
        <>
            <div className={`${openMenu ? ' opacity-100 ' : ' opacity-0 pointer-events-none '} duration-500 z-10 ease-in-out flex flex-col sm:hidden text-blue-950 font-rale font-bold text-xl absolute w-full h-fit bg-red-100 p-7 shadow-xl text-center`}>
                {home}
                {privacy}
                {log}
            </div>
            <nav className="flex justify-between p-7 text-center items-center text-blue-950 text-xl font-medium">
                <img src="./src/assets/spotify_banner_black.png" className="h-14 hidden sm:inline" />
                <img src="./src/assets/spotify_icn_black.png" className="h-14 inline sm:hidden" />
                <div onClick={toggleMenu} className="flex z-10 flex-col gap-2 p-3 sm:hidden align-middle cursor-pointer">
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                </div>

                <div className="hidden sm:flex gap-3 bg-white h-fit items-center">
                    {home}
                    <div className="bg-black w-0.5 h-8"></div>
                    {privacy}
                    <div className="bg-black w-0.5 h-8"></div>
                    {log}
                </div>
            </nav>
        </>
    )

}
