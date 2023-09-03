import { useEffect, useState } from "react";
import { Track, TrackStats, CombinedData, ChartAverages, AverageStats } from "./util/util"
import { getTracksAnalysis } from "./spotify";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';

interface Props {
    data: CombinedData | undefined
}



export default function RadarGraph(data: Props) {
    console.log(data);
    let short_averages: AverageStats;
    let long_averages: AverageStats;

    const [finalAverages, setFinalAverages] = useState<ChartAverages>();
    const [errorMsg, setErrorMsg] = useState<Boolean>(false);

    const checkData = (): void => {
        if (short_averages && long_averages) {
            const final: ChartAverages = {
                long_term: long_averages,
                short_term: short_averages
            }
            setFinalAverages(final);
            console.log(final);
        }
        return;

    }

    const getAnalysis = (time: "short_term" | "long_term") => {
        const range = (time === "short_term") ? data.data!.short_term.Tracks : data.data!.long_term.Tracks;

        let [popularityTotal, tempoTotal, moodTotal, durationTotal, energyTotal] = [0,0,0,0,0];

        range.forEach((x) => {
            popularityTotal += x.popularity;
        })

        getTracksAnalysis(range).then((res) => {
            const len = res.data.audio_features.length;

            res.data.audio_features.map((x: any) => {
                tempoTotal += x.tempo;
                moodTotal += x.valence;
                durationTotal += x.duration_ms;
                energyTotal += x.energy;
            })

            const averages: AverageStats = {
                tempo: tempoTotal / len,
                mood: moodTotal / len,
                duration: durationTotal / len,
                popularity: popularityTotal / len,
                energy: energyTotal / len
            };

            switch (time) {
                case "short_term":
                    short_averages = averages;
                    break;
                case "long_term":
                    long_averages = averages;
                    break;
            }
            checkData();
        }).catch((error) => {
                console.log(error);
                setErrorMsg(true);
            })


        return;
    }

    useEffect(() => {
        if (data.data == undefined || finalAverages) return;
        getAnalysis("short_term");
        getAnalysis("long_term");
    });

    return (
        <>
            <h1>Chart</h1>
        </>
    )
}
