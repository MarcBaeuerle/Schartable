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

    const getAnalysis = () => {
        getTracksAnalysis(data.data!.short_term.Tracks).then((res) => {
            console.log(res);
        })
        return;
    }

    useEffect(() => {
        if (data.data == undefined) return
        getAnalysis();
    })


    return (
        <>
            <h1>Chart</h1>
        </>
    )
}
