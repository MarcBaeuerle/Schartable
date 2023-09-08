import { useState } from "react";
import { DataProps, convertArrToReadableString } from "./util/util";


const calculateTextSize = (val: number): string => {
    if (val < 7) {
        return 'text-' + 4 + 'xl';
    } else {
        return 'text-lg';
    }
}

export default function BottomList(data: DataProps) {
    if (data.data === undefined) return;

    const [artistsShowCount, setArtistsShowCount] = useState(10);
    const [trackShowCount, setTrackShowCount] = useState(10);

    const [showArtists, setShowArtists] = useState(false);

    const increaseShow = (x: boolean): void => {
        x ? setArtistsShowCount(artistsShowCount + 10) : setTrackShowCount(trackShowCount + 10);
        return;
    }

    const renderArtists = () => {
        return (
            <>
                {data.data?.short_term.Artists.slice(0, artistsShowCount).map((x, i) => {
                    return (
                        <a href={x.url} key={x.url} target="_blank" className={`max-w-screen-md m-auto justify-between max-w-4/5 w-fit px-10 font-medium text-blue-950 text-center hover:-translate-y-0.5 duration-200 opacity-100`}>
                            <p style={{ fontSize: `${i < 10 ? (3.3 - 0.2 * i) : 1.5}rem`}} className="font-medium leading-none">{x.name}</p>
                        </a>
                    )
                })}
            </>
        )
    }

    const renderTracks = () => {
        return (
            <>
                {data.data?.short_term.Tracks.slice(0, trackShowCount).map((x, i) => {
                    return (
                        <a href={x.url} key={x.url} target="_blank" className="max-w-screen-md m-auto justify-between max-w-4/5 w-fit px-10 flex flex-col gap-0 font-medium text-blue-950 text-center hover:-translate-y-0.5 duration-200">
                            <p style={{ fontSize: `${i < 10 ? (3.3 - 0.2 * i) : 1.5}rem`}} className={`font-medium ${i < 10 ? 'leading-snug' : 'leading-normal'}`}>{x.name}</p>
                            <p style={{ fontSize: `${i < 10 ? (1.2 - 0.05 * i) : 0.9}rem`}} className="text-black leading-none">{convertArrToReadableString(x.artists)}</p>
                        </a>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <div className="z-10 flex sticky my-3 top-0 p-3 bg-white bg-opacity-70 backdrop-blur-md">
                <div className="m-auto">
                    <button className={`py-2 px-5 rounded-l-xl border-2 border-r-0 border-blue-950 border-opacity-80 ${showArtists ? 'text-blue-950 bg-white hover:bg-blue-50' : 'bg-blue-950 text-white'} duration-300`} onClick={() => {setShowArtists(false)}}>Songs</button>
                    <button className={`py-2 px-5 rounded-r-xl border-2 border-blue-950 border-opacity-80 ${showArtists ? 'bg-blue-950 text-white' : 'text-blue-950 bg-white hover:bg-blue-50'} duration-300`} onClick={() => {setShowArtists(true)}}>Artists</button>
                </div>
            </div>
            <div className="flex flex-col pt-12 sm:pt-0 gap-3.5 m-auto ">
                {showArtists ? renderArtists() : renderTracks()}
            </div>

            <div className="m-auto w-fit mt-7">
                <button className={`py-2 px-10 border-2 text-blue-950 duration-200 hover:bg-blue-50 border-blue-950 border-opacity-80 rounded-xl ${showArtists ? (artistsShowCount == 50 ? 'hidden' : '') : trackShowCount == 50 ? 'hidden' : ''}`} onClick={() => {increaseShow(showArtists)}}>Show More</button>
            </div>
        </>

    )
}
