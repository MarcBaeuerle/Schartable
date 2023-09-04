export interface CombinedData {
    user_name: string;
    long_term: {
        Artists: Array<Artist>;
        Tracks: Array<Track>;
    }
    short_term: {
        Artists: Array<Artist>;
        Tracks: Array<Track>;
    }
}

export interface Track {
    name: string;
    artists: Array<string>;
    url: string;
    ID: string;
    popularity: number;
}

export interface Artist {
    name: string;
    url: string;
}

export interface TrackStats {
    duration: number;
    tempo: number;
    popularity: number;
    mood: number;
    energy: number;
}

export interface ChartAverages {
    long_term: AverageStats;
    short_term: AverageStats
}

export interface AverageStats {
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


export function convertArrToReadableString(arr: Array<string>): string {
    if (arr.length === 0) return '';
    if (arr.length === 1) return arr[0].toString();

    return arr.reduce((prevText, nextNum, i, array) => {
        const isLastItem = i === array.length - 1;
        const delimiter = isLastItem ? ', and' : ',';
        return `${prevText}${delimiter} ${nextNum}`;
    });
}

export const calculateBezier = (t: number): number => {
    const p0 = 0;
    const p1 = 0.4;
    const p2 = 0.6;
    const p3 = 1;

    return (
            (1 - t) * (1 - t) * (1 - t) * p0 +
            3 * (1 - t) * (1 - t) * t * p1 +
            3 * (1 - t) * t * t * p2 +
            t * t * t * p3
    )

    // return (
    //     Math.pow(1 - t, 3) * p0 +
    //         3 * Math.pow(1 - t, 2) * t * p1 +
    //         3 * (1 - t) * Math.pow(t, 2) * p2 +
    //         Math.pow(t, 3) * p3
    // )
}

















