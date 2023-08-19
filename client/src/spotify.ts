import axios from "axios";
import { groupConsole } from "./util/util";

const DEBUG = true;
const EXPIRATION_TIME: number = 3600 * 1000;
const SERVER = `http://localhost:3001`;

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

const getTokenTimeStamp = (): number => {
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

export const setAccessToken = (access_token: string, refresh_token: string): void => {
    if (DEBUG) groupConsole(`setAccessToken`, access_token, refresh_token);

    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    setTokenTimeStamp();
}

const getAccessToken = (): string => {
    if ((Date.now() - getTokenTimeStamp()) > EXPIRATION_TIME) {
        refreshAccessToken();
    }
    const localAccessToken = getLocalAccessToken();
    return localAccessToken;
}

export const logout = (): void => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
}

