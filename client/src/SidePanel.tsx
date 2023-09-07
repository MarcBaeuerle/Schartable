import React, { useEffect, useState } from "react";
import { AverageProps, msToMinutesAndSecond } from "./util/util";

export default function SidePanel(data: AverageProps) {
    let genre = data.data?.genre;
    return (
    <>
            <div>
                <h2>Last Months Averages</h2>
                <div>
                    <div>
                        <p>Duration:</p>
                        <p>Tempo:</p>
                        <p>Decade:</p>
                        <p>Genre:</p>
                    </div>
                    <div>
                        <p>{msToMinutesAndSecond(data.data?.duration || 0)} </p>
                        <p>{Math.floor(data.data?.tempo || 0)} bpm </p>
                        <p>{data.data?.release + "0's"}</p>
                        <p>{genre ? genre?.charAt(0).toUpperCase() + genre?.slice(1) : ''}</p>
                    </div>
                </div>

            </div>
    </>
    )

}
