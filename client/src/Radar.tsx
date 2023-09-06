import { useEffect, useState } from "react";
import { clamp, ChartAverages, AverageStats, DataProps } from "./util/util"
import { getTracksAnalysis } from "./spotify";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import BezierEasing from "bezier-easing";
import SidePanel from "./SidePanel";

const easing = BezierEasing(0.4,0,0.6,1);
const durationEasing = BezierEasing(0.2,0,0.8,1);
const MIN_D = 60000; //1 minute
const MAX_D = 360000; //6 minutes
const MIN_T = 40;
const MAX_T = 180;
const EMPTY = [0,0,0,0,0];

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const computeScores = (data: AverageStats): Array<number> => {
    const newDuration = durationEasing((clamp(data.duration, MIN_D, MAX_D) - MIN_D) / (MAX_D - MIN_D));
    const newTempo = easing((clamp(data.tempo, MIN_T, MAX_T) - MIN_T) / (MAX_T - MIN_T));
    const newPopularity = easing(data.popularity / 100);
    const newMood = easing(data.mood);
    const newEnergy = easing(data.energy);

    return [newDuration, newTempo, newPopularity, newMood, newEnergy].map(x => x * 10);
}

export default function RadarGraph(data: DataProps) {
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
        }
        return;
    }

    const getAnalysis = (time: "short_term" | "long_term") => {
        const range = (time === "short_term") ? data.data!.short_term.Tracks : data.data!.long_term.Tracks;

        let [popularityTotal, tempoTotal, moodTotal, durationTotal, energyTotal] = [0,0,0,0,0];

        getTracksAnalysis(range).then((res) => {
            let len: number;

            (time === "short_term") ? len = 10 : len = res.data.audio_features.length;

            for (let i = 0; i < ((time === "short_term") ? 10 : len); i++) {
                if (res.data.audio_features[i] === undefined) {
                    len = i - 1;
                    break;
                }
                let x = res.data.audio_features[i];
                tempoTotal += x.tempo;
                moodTotal += x.valence;
                durationTotal += x.duration_ms;
                energyTotal += x.energy;
                popularityTotal += range[i].popularity;
            }

            const averages: AverageStats = {
                duration: durationTotal / len,
                tempo: tempoTotal / len,
                popularity: popularityTotal / len,
                mood: moodTotal / len,
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

    const chartData = {
        labels: ['Duration', 'Tempo', 'Popularity', 'Mood', 'Energy'],
        datasets: [{
            label: "Last Month",
            data: finalAverages ? computeScores(finalAverages.short_term) : EMPTY,
            fill: true,
            backgroundColor: 'rgba(30, 215, 96, 0.3)',
            borderColor: 'rgb(19, 145, 64)',
            pointBackgroundColor: 'rgb(19, 145, 64)',
            pointBorderColor: '#000',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(19, 145, 64)'
        }, {
                label: "All Time",
                data: finalAverages ? computeScores(finalAverages.long_term) : EMPTY,
                fill: true,
                backgroundColor: 'rgba(37,76,218, 0.2)',
                borderColor: 'rgb(15, 30, 87)',
                pointBackgroundColor: 'rgb(15, 30, 87)',
                pointBorderColor: '#000',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(15, 30, 87)'
            }]
    }

    return (
        <>
            <section className="flex flex-wrap justify-center gap-10 pt-4">
                <div>
                    <Radar data={chartData} options={{
                        scales: {
                            r: {
                                ticks: { //Removes numbers
                                    display: false,
                                },
                                angleLines: {
                                    color: 'black',
                                },
                                pointLabels: {
                                    color: 'black',
                                    font: {
                                        size: 17,
                                    }
                                },
                                suggestedMin: 0,
                                suggestedMax: 10,
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    font: {
                                        size: 16,
                                    }
                                }
                            }
                        }
                    }} />
                </div>
                <SidePanel data={finalAverages?.short_term} />
            </section>
        </>
    )
}
