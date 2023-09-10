import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "./spotify";
import { LOGIN_URI } from "./Login";

export default function Nav({ test } :any) {
    const [openMenu, setOpenMenu] = useState(false);
    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    const logHandler = ():void => {
        if (test) {
            logout();
        } else {
            window.location.href = LOGIN_URI;
        }
        return;
    }

    const home = (
        <Link to="/" onClick={toggleMenu} className="transform duration-300 p-3 hover:-translate-y-1">Home</Link>
    )

    const privacy = (
        <Link to="/Privacy" onClick={toggleMenu} className="transform duration-300 p-3 hover:-translate-y-1">Privacy Policy</Link>
    )

    const log = (
        <button onClick={logHandler} className="transform duration-300 p-3 hover:-translate-y-1">{test ? "Log out" : "Log in"}</button>
    )

    return (
        <>
            <nav className={`${openMenu ? ' opacity-100 ' : ' opacity-0 pointer-events-none '} duration-500 z-10 ease-in-out flex flex-col sm:hidden text-blue-950 font-rale font-bold text-xl absolute w-full h-fit bg-red-100 p-7 shadow-xl text-center`}>
                {home}
                {privacy}
                {log}
            </nav>
            <nav className="flex justify-between p-7 font-rale font-semibold text-center items-center text-blue-950 text-xl">
                <img src="./src/assets/spotify_banner_black.png" className="h-14 hidden sm:inline" />
                <img src="./src/assets/spotify_icn_black.png" className="h-14 inline sm:hidden" />
                <div onClick={toggleMenu} className="flex z-10 flex-col gap-2 p-3 sm:hidden align-middle cursor-pointer">
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                </div>

                <div className="hidden sm:flex gap-3 h-fit items-center">
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
