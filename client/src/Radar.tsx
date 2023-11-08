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
import { ErrorIcon, ErrorExit } from "./Profile";
import { Loader } from "./Loader";

const easing = BezierEasing(0.45,0,0.55,1);
const durationEasing = BezierEasing(0.25,0,0.75,1);
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

const topKFrequent = (array: Array<string>, k: number, genre: boolean): Array<string> => {
    let hash:any = {};
    array.forEach((x) => {
        let val = (genre ? x : x.slice(0,3));
        if (!hash[val]) hash[val] = 0;
        hash[val]++;
    })
    let arr = [...Object.keys(hash)].sort((a, b) => hash[b] - hash[a]).splice(0, k);
    return arr;
}

export default function RadarGraph(data: DataProps) {
    let short_averages: AverageStats;
    let long_averages: AverageStats;

    const [finalAverages, setFinalAverages] = useState<ChartAverages>();
    const [error, setError] = useState<Boolean>(false);
    const [windowSmall, setWindowSmall] = useState<Boolean>(window.innerWidth < 1024);

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

    const detechResize = () => {
        setWindowSmall(window.innerWidth > 1024 ? false : true);
    }

    useEffect(() => {
        window.addEventListener('resize', detechResize);

        return() => {
            window.removeEventListener('resize', detechResize);
        }
    }, [windowSmall])

    const getAnalysis = (time: "short_term" | "long_term") => {
        const range = (time === "short_term") ? data.data!.short_term.Tracks : data.data!.long_term.Tracks;
        let [popularityTotal, tempoTotal, moodTotal, durationTotal, energyTotal] = [0,0,0,0,0];

        getTracksAnalysis(range, time).then((res) => {
            let len: number;
            let release: Array<string> = [];
            let genres: Array<string> = [];
            const gre = (time === "short_term") ? data.data!.short_term.Artists : data.data!.long_term.Artists;

            console.log(time);
            console.log(gre);
            (time === "short_term") ? len = 10 : len = res.data.audio_features.length;

            for (let i = 0; i < len; i++) {
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
                release = [...release, range[i].release];
            }

            //handled on its own because of difference lenths between gre and res
            gre.forEach((artists: any) => {
                genres = [...genres, ...artists.genre];
            })

            const averages: AverageStats = {
                duration: durationTotal / len,
                tempo: tempoTotal / len,
                popularity: popularityTotal / len,
                mood: moodTotal / len,
                energy: energyTotal / len,
                genre: topKFrequent(genres, 3, true),
                release: topKFrequent(release, 1, false),
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
                console.error(error);
                setError(true);
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
    
    const chartOptions = {
        scales: {
            r: {
                ticks: { //Removes numbers
                    display: false,
                    stepSize: 2,
                },
                angleLines: {
                    color: 'black',
                },
                pointLabels: {
                    color: 'black',
                    font: {
                        size: windowSmall ? 14 : 17,
                    }
                },
                suggestedMin: 0,
                suggestedMax: 10,
            }
        },
        plugins: {
            legend: {
                labels: {
                    boxWidth: windowSmall ? 20 : 40,
                    font: {
                        size: windowSmall ? 14 : 16,
                    }
                }
            }
        }
    }

    return (
        <>
            <section className="flex relative flex-wrap justify-center gap-1 sm:gap-10 py-3 px-1">

            {error ? 
                <section className="z-50 w-full h-full fixed bg-opacity-50 bg-gray-400 top-0">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 flex p-3 rounded-md items-center whitespace-nowrap text-white">
                        <ErrorIcon />
                        <div className="flex flex-col ml-2 mr-5">
                            <p> Opps! Something went wrong. </p>
                            <p> Try refreshing in a bit. </p>
                        </div>
                        <button onClick={() => setError(false)}>
                            <ErrorExit />
                        </button>
                    </div>
                </section> : null}
                {(finalAverages && !error)  ? null : 
                    <div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <Loader />
                    </div>
                }

                <div className="w-5/6 aspect-square sm:w-1/2 md:w-2/5 max-w-md">
                    <Radar data={chartData} options={chartOptions} />
                </div>
                <SidePanel data={finalAverages?.short_term} />
            </section>
        </>
    )
}
