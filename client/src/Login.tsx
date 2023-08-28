import React from "react";
import { checkLoggedIn } from "./spotify";

const LOGIN_URI = `http://localhost:3001/login/?in=${checkLoggedIn()}`;

export default function Login() {
    // console.log(checkLoggedIn());
    return (
                <a href={LOGIN_URI}>Login</a>
    )
}
