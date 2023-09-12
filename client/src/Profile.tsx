import { useState, useEffect } from "react";
import { getTopArtists, getTopTracks, getUser } from "./spotify";
import { Artist, CombinedData, Track } from "./util/util";
import RadarGraph from "./Radar";
import BottomList from "./BottomList";
import Footer from "./Footer";

export default function Profile() {
    let name: string;
    let long_tracks: Track[];
    let long_artists: Artist[];
    let short_tracks: Track[];
    let short_artists: Artist[];
    const [combinedData, setCombinedData] = useState<CombinedData>();
    const [error, setError] = useState<Boolean>(false);

    // There has to be a better way to do this
    const checkData = (): void => {
        if (name && long_tracks && long_artists && short_tracks && short_artists) {
            setCombinedData({
                user_name: name,
                long_term: {
                    Artists: long_artists,
                    Tracks: long_tracks
                },
                short_term: {
                    Artists: short_artists,
                    Tracks: short_tracks
                }
            })
        }
        return;
    }

    const getTracks = async (time: "short_term" | "long_term") => {
        getTopTracks(time)
            .then((res) => {
                let tempTracks: Array<Track> = [];
                res.data.items.map((track: any) => {
                    let artist_list: Array<string> = [];
                    track.artists.map((list: any) => {
                        artist_list.push(list.name);
                    })

                    let tempTrack: Track = {
                        name: track.name,
                        artists: artist_list,
                        url: track.external_urls.spotify,
                        ID: track.id,
                        popularity: track.popularity,
                        release: track.album.release_date
                    }
                    tempTracks.push(tempTrack);
                })
                
                switch (time) {
                    case "short_term":
                        short_tracks = [...tempTracks];
                        break;
                    case "long_term":
                        long_tracks = [...tempTracks];
                        break;
                }

                checkData();
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
    }

    const getArtists = async (time: "short_term" | "long_term") => {
        getTopArtists(time)
            .then((res) => {
                let tempArtists: Array<Artist> = [];
                res.data.items.map((artists: any) => {
                    let tempArtist: Artist = {
                        name: artists.name,
                        url: artists.external_urls.spotify,
                        genre: artists.genres
                    }
                    tempArtists.push(tempArtist);
                })

                switch (time) {
                    case "short_term":
                        short_artists = [...tempArtists];
                        break;
                    case "long_term":
                        long_artists = [...tempArtists];
                        break;
                }
                checkData();
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
    }

    useEffect(() => {
        if (combinedData) return;

        getUser().then((res) => {name = res.data.display_name})
        getTracks("short_term");
        getTracks("long_term");
        getArtists("short_term");
        getArtists("long_term");
    }, [])

    return (
        <>
            <section className="py-1 sm:py-4 text-center">
                <h1 className="text-4xl sm:text-5xl font-semibold font-mont text-blue-950">
                    {combinedData?.user_name ? `${combinedData.user_name}'s` : ''} Schartly</h1>
                <p className="text-center text-gray-600 font-semibold text-xs sm:text-sm">{new Date().toDateString()}</p>
            </section>
            {error ? 
                <section className="z-50 w-full h-full fixed bg-opacity-50 bg-gray-400 top-0">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 flex p-3 rounded-md items-center whitespace-nowrap text-white">
                        <ErrorIcon />
                        <div className="flex flex-col ml-2 mr-5">
                            <p> Opps! Something went wrong. </p>
                            <p> Try refreshing in a bit. </p>
                        </div>
                        <button onClick={() => setError(false)}>
                            <ErrorExit />
                        </button>
                    </div>
                </section> : null}
            <RadarGraph data={combinedData} />
            <BottomList data={combinedData} />
            {combinedData ? <Footer /> : null}
        </>
    )
}

export function ErrorIcon(): any {
    return (
        <div className="error__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none">
                <path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z">
                </path>
            </svg>
        </div>
    )
}

export function ErrorExit(): any {
    return (
        <div className="error__close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20">
                <path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z">
                </path>
            </svg>
        </div>
    )
}
