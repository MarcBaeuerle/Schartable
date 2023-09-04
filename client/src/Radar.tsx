import { useEffect, useState } from "react";
import { calculateBezier, CombinedData, ChartAverages, AverageStats } from "./util/util"
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Props {
    data: CombinedData | undefined
}

const computeScores = (data: AverageStats): Array<number> => {
    return [0];
}

export default function RadarGraph(data: Props) {
    let short_averages: AverageStats;
    let long_averages: AverageStats;
    console.log(calculateBezier(0.2));

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
            }

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

    const chartData = {
        labels: ['Duration', 'Tempo', 'Popularity', 'Mood', 'Energy'],
        datasets: [{
            label: "Last Month",
            data: [10,4,5,9,2],
            fill: true,
            backgroundColor: 'rgba(30, 215, 96, 0.3)',
            borderColor: 'rgb(19, 145, 64)',
            pointBackgroundColor: 'rgb(19, 145, 64)',
            pointBorderColor: '#000',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(19, 145, 64)'
        }, {
            label: "All Time",
            data: [7,3,2,1,9],
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
            <h1>Chart</h1>
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
        </>
    )
}
