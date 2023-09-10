import axios from "axios";
import { groupConsole, Track } from "./util/util";

const DEBUG = false;
const EXPIRATION_TIME: number = 3600 * 1000;
const SERVER = `http://localhost:3001`;
let USER: any;
let TOP_ARTISTS_SHORT: any;
let TOP_ARTISTS_LONG: any;
let TOP_SONGS_SHORT: any;
let TOP_SONGS_LONG: any;
let TRACK_ANALYSIS_SHORT:any;
let TRACK_ANALYSIS_LONG:any;

const setTokenTimeStamp = (): void => {
    window.localStorage.setItem('token_timestamp', Date.now().toString());
}

const setLocalAccessToken = (token: string): void => {
    setTokenTimeStamp();
    window.localStorage.setItem('access_token', token);
}

const setLocalRefreshToken = (token: string): void => {
    window.localStorage.setItem('refresh_token', token);
}

export const getTokenTimeStamp = (): number => {
    let str = window.localStorage.getItem('token_timestamp') || '';
    if (DEBUG) console.log(`TokenTimestamp: ${str.slice(0,5)}`);
    return Number(str);
}

const getLocalAccessToken = (): string => {
    let str = window.localStorage.getItem('access_token') || '';
    if (DEBUG) groupConsole(`getLocalAccessToken`, str, '');
    return str;
}

const getLocalRefreshToken = (): string => {
    let str = window.localStorage.getItem('refresh_token') || '';
    if (DEBUG) groupConsole(`getRefreshToken`, '', str);
    return str;
}

const refreshAccessToken = async (): Promise<void> => {
    axios.get(`${SERVER}/refresh_token?refresh_token=${getLocalRefreshToken()}`)
        .then((res: any) => {
            setLocalAccessToken(res.access_token);
            window.location.reload();
        })
        .catch((error) => {
            console.error(error);
        })
}

//called after the user presses login and URL params are present
export const setAccessToken = (access_token: string, refresh_token: string): boolean => {
    if (DEBUG) groupConsole(`setAccessToken`, access_token, refresh_token);

    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    setTokenTimeStamp();
    return true;
}

const getAccessToken = (): string => {
    if ((Date.now() - getTokenTimeStamp()) > EXPIRATION_TIME) {
        refreshAccessToken();
    }
    const localAccessToken = getLocalAccessToken();
    return localAccessToken;
}

export const logout = (): void => {
    window.localStorage.removeItem('token_timestamp');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.location.reload();
}

export const checkLoggedIn = (): boolean => {
    if (localStorage.getItem("access_token") === null) {
        return true;
    }
    return false;
}


const getHeaders = (): Object => {
    let headers = {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
    }
    return {headers};
}

export const example = async () => {
    console.log(await axios.get('https://api.spotify.com/v1/me', getHeaders()));
}

export const getUser = async () => {
    if (USER) return USER;
    return USER = await axios.get('https://api.spotify.com/v1/me', getHeaders());
}

export const getTopTracks = async (time: "short_term" | "long_term") => {
    if (time === "short_term") {
        if (TOP_SONGS_SHORT) return TOP_SONGS_LONG;
        return TOP_SONGS_SHORT = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${time}`, getHeaders());
    } else {
        if (TOP_SONGS_LONG) return TOP_SONGS_LONG;
        return TOP_SONGS_LONG = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${time}`, getHeaders());
    }
}

export const getTopArtists = async (time: "short_term" | "long_term") => {
    if (time === "short_term") {
        if (TOP_ARTISTS_SHORT) return TOP_ARTISTS_SHORT;
        return TOP_ARTISTS_SHORT = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${time}`, getHeaders());
    } else {
        return TOP_ARTISTS_LONG = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${time}`, getHeaders());
    }
}

export const getTracksAnalysis = async (tracksObj: Array<Track>): Promise<any> => {
    let id_arr: Array<string> = [];
    tracksObj.map((data) => {
        id_arr.push(data.ID);
    })

    let params = id_arr.toString().split(',').join('%2C');
    let URL = 'https://api.spotify.com/v1/audio-features?ids=' + params;
    return (await axios.get(URL, getHeaders()));
}




