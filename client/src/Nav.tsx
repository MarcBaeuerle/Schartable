import React from "react";
import { Link } from "react-router-dom";
import { logout } from "./spotify";

export default function Nav() {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/Privacy">Privacy Policy</Link>
            <button onClick={logout}>Logout</button>
        </>
    )

}
