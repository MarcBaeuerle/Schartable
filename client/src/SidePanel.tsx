import React, { useEffect, useState } from "react";
import { AverageProps, msToMinutesAndSecond } from "./util/util";

export default function SidePanel(data: AverageProps) {
    return (
    <>
            <div>
                <h2>Last Months Averages</h2>
                <div>
                    <div>
                        <p>Duration:</p>
                        <p>Tempo:</p>
                        <p>Popularity:</p>
                        <p>Mood:</p>
                        <p>Energy:</p>
                    </div>
                    <div>
                        <p>{msToMinutesAndSecond(data.data?.duration || 0)} </p>
                        <p>{Math.floor(data.data?.tempo || 0)} bpm </p>
                        <p>{Math.round(data.data?.popularity || 0) / 10} / 10 </p>
                        <p>{Math.round((data.data?.mood || 0) * 100) / 10} / 10 </p>
                        <p>{Math.round((data.data?.energy || 0) * 100) / 10} / 10 </p>
                    </div>
                </div>

            </div>
    </>
    )

}
