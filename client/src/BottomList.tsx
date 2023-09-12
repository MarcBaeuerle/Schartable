import { useState } from "react";
import { DataProps, convertArrToReadableString } from "./util/util";

export default function BottomList(data: DataProps) {
    if (data.data === undefined) return;

    const [showCount, setShowCount] = useState(10);
    const [showArtists, setShowArtists] = useState(false);

    const renderArtists = () => {
        return (
            <>
                {data.data?.short_term.Artists.slice(0, showCount).map((x, i) => {
                    const textSize:any = {
                        fontSize: `${i < 10 ? (3.3 - 0.2 * i) : 1.5}em`,
                    }

                    return (
                        <a href={x.url} key={x.url} target="_blank" className={`max-w-screen-md m-auto justify-between max-w-4/5 w-fit font-medium text-blue-950 text-center hover:scale-105 duration-200 opacity-100 text-xs sm:text-base`}>
                            <p style={textSize} className="font-medium leading-none">{x.name}</p>
                        </a>
                    )
                })}
            </>
        )
    }

    const renderTracks = () => {
        return (
            <>
                {data.data?.short_term.Tracks.slice(0, showCount).map((x, i) => {
                    return (
                        <a href={x.url} key={x.url} target="_blank" className="m-auto justify-between max-w-full sm:max-w-3xl w-fit flex flex-col gap-0 font-medium text-blue-950 text-center hover:scale-[1.03] duration-200 text-xs sm:text-base">
                            <p style={{ fontSize: `${i < 10 ? (3.3 - 0.2 * i) : 1.5}em`}} className={`font-medium ${i < 10 ? 'leading-snug' : 'leading-normal'}`}>{x.name}</p>
                            <p style={{ fontSize: `${i < 10 ? (1.2 - 0.05 * i) : 1}em`}} className="text-gray-800 leading-none">{convertArrToReadableString(x.artists)}</p>
                        </a>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <div className="z-10 flex justify-center my-3 text-sm sm:text-base top-0 p-1 sm:p-3">
                    <button className={`py-1 sm:py-2 px-3 sm:px-5 rounded-l-xl border-2 border-r-0 border-blue-950 ${showArtists ? 'text-blue-950 hover:bg-blue-50' : 'bg-blue-950 text-white'} duration-300`} onClick={() => {setShowArtists(false)}}>Songs</button>
                    <button className={`py-1 sm:py-2 px-3 sm:px-5 rounded-r-xl border-2 border-blue-950 ${showArtists ? 'bg-blue-950 text-white' : 'text-blue-950 hover:bg-blue-50'} duration-300`} onClick={() => {setShowArtists(true)}}>Artists</button>
            </div>
            <section className="flex flex-col pt-0 sm:pt-0 gap-3.5 m-auto">
                {showArtists ? renderArtists() : renderTracks()}
            </section>

            <button className={`py-2 px-10 border-2 text-blue-950 duration-200 border-blue-950 border-opacity-80 hover:bg-white rounded-xl flex mx-auto mt-7 ${showCount == 50 ? 'hidden' : ''}`} onClick={() => {setShowCount(showCount + 10)}}>Show More</button>
        </>

    )
}
