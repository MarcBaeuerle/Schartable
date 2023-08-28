import { useState, useEffect } from "react";
import { getUser } from "./spotify";

export default function Profile() {
    const [name, setName] = useState('');

    useEffect(() => {
        getUser().then(res => {
            setName(res.data.display_name)
        })
        console.log(`Setting Name`);
    }, [])

    return (
    <>
            <h1>{name}'s Schartify</h1>
    </>
    )
}

