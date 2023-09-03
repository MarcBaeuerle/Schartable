import { useState, useEffect } from "react";
import { getTopArtists, getTopTracks, getUser } from "./spotify";
import { Artist, CombinedData, Track, TrackStats, convertArrToReadableString } from "./util/util";
import RadarGraph from "./Radar";

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
        let tempTracks: Array<Track> = [];
        getTopTracks(time)
            .then((res) => {
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
                        popularity: track.popularity
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
                console.log(error);
                setError(true);
            })
    }

    const getArtists = async (time: "short_term" | "long_term") => {
        let tempArtists: Array<Artist> = [];
        getTopArtists(time)
            .then((res) => {
                res.data.items.map((artists: any) => {
                    let tempArtist: Artist = {
                        name: artists.name,
                        url: artists.external_urls.spotify
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
                console.log(error);
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
            <h1>{combinedData?.user_name}'s Schartify</h1>
            <RadarGraph data={combinedData} />

        </>
    )
}


