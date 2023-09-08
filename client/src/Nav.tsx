import React from "react";
import { Link } from "react-router-dom";
import { logout } from "./spotify";

export default function Nav() {
    return (
        <>
            <nav className="flex justify-between p-7 text-center items-center text-blue-950 text-xl font-medium">
                <img src="./src/assets/spotify_banner_black.png" className="h-14" />
                <div className="flex gap-3 bg-white h-fit items-center">
                    <Link to="/" className="transform duration-300 p-3 hover:-translate-y-1">Home</Link>
                    <div className="bg-black w-0.5 h-8"></div>
                    <Link to="/Privacy" className="transform duration-300 p-3 hover:-translate-y-1">Privacy Policy</Link>
                    <div className="bg-black w-0.5 h-8"></div>
                    <button onClick={logout} className="transform duration-300 p-3 hover:-translate-y-1">Log out</button>
                </div>
            </nav>
        </>
    )

}
