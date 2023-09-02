export interface Track {
    name: string;
    artists: Array<string>;
    url: string;
    ID: string;
}

export interface TrackStats {
    duration: number;
    tempo: number;
    popularity: number;
    mood: number;
    energy: number;
}


export const groupConsole = (name: string, access_token: string, refresh_token: string): void => {
    console.group(name);
    console.log(`AC: ${access_token.slice(0,5)}`);
    console.log(`RT: ${refresh_token.slice(0,5)}`);
    console.groupEnd();
}
