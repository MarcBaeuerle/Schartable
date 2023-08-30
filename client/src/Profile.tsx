import { useState, useEffect } from "react";
import { getTopTracks, getUser } from "./spotify";

export default function Profile() {
    const [name, setName] = useState('');
    console.log(`PROFILE RENDERED`);

    useEffect(() => {
        getUser().then((res) => {
            setName(res.data.display_name);
        });
    }, [])

    return (
    <>
            <h1>{name}'</h1>
    </>
    )
}

