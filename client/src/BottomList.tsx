import { useState } from "react";
import { DataProps, convertArrToReadableString } from "./util/util";


export default function BottomList(data: DataProps) {
    if (data.data === undefined) return;

    const [showCount, setShowCount] = useState(10);
    const [showArtists, setShowArtists] = useState(false);

    const increaseShow = (): void => {
        setShowCount(showCount + 10);
        return;
    }

    const toggleList = ():void => {
        setShowCount(10);
        setShowArtists(!showArtists);
        return;
    }

    const buttonText = ():string => {
        return showArtists ? "Show Tracks" : "Show Artists";
    }

    const renderArtists = () => {
        return (
            <>
                {data.data?.short_term.Artists.slice(0, showCount).map((x) => {
                    return (
                        <a href={x.url} key={x.url}>{x.name}</a>
                    )
                })}
            </>
        )
    }

    const renderTracks = () => {
        return (
            <>
                {data.data?.short_term.Tracks.slice(0, showCount).map((x) => {
                    return (
                        <a href={x.url} key={x.url}>
                            <h2>{x.name}</h2>
                            <p>{convertArrToReadableString(x.artists)}</p>
                        </a>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <button onClick={() => {toggleList()}}>{buttonText()}</button>
            {showArtists ? renderArtists() : renderTracks()}
            <button onClick={() => {increaseShow()}}>Show more</button>
        </>

    )
}
