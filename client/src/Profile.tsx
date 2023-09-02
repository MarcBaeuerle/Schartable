import { useState, useEffect } from "react";
import { getTopTracks, getUser } from "./spotify";
import { Track, TrackStats } from "./util/util";
import RadarGraph from "./Radar";
import TopList from "./TopList";

export default function Profile() {
    const [name, setName] = useState('');
    const [shortArtists, setShortArtists] = useState<Track[]>([]);

    useEffect(() => {
        getUser().then((res) => {
            setName(res.data.display_name);
        });
    }, [])

    const getTracks = async () => {
        let tempList: Array<Track> = [];
        getTopTracks("short_term")
            .then((res) => {
                res.data.items.map((track: any) => {
                    let artist_list: Array<string> = [];
                    track.artists.map((list: any) => {
                        artist_list.push(list.name);
                    })
                    console.log(artist_list);

                    let tempTrack: Track = {
                        name: track.name,
                        artists: track.artists,
                        url: track.external_urls.spotify,
                        ID: track.id
                    }
                    tempList.push(tempTrack);
                })
            }).then(() => setShortArtists(tempList));
    }

    // get short term stats
    useEffect(() => {
        getTracks();
    }, [])

    return (
        <>
            <h1>{name}'s</h1>
            <RadarGraph />
            {shortArtists.map((song, i) => {
                return (
                    <a href={song.url} key={i}>
                        <h5>{i + 1}: {song.name}</h5>
                        <p>{song.artists.map((name: string) => {return name})}</p>
                    </a>
                )
            })}
        </>
    )
}

