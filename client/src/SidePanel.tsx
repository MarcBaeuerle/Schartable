import React, { useEffect, useState } from "react";
import { AverageProps, convertArrToReadableString, msToMinutesAndSecond } from "./util/util";

export default function SidePanel(data: AverageProps) {
    let genre = data.data?.genre;
    return (
    <>
            <section className="flex flex-col p-5 md:p-6 rounded-3xl bg-blue-950 gap-2 h-fit my-auto shadow-2xl shadow-blue-950 text-slate-50 w-fit z-20">
                <h4 className="text-base md:text-xl ">Last Months Averages</h4>
                <hr className="bg-green-500 text-green-500"/>
                <div className="flex gap-4 text-base leading-6 md:leading-7">
                    <div className="">
                        <p>Duration:</p>
                        <p>Decade:</p>
                        <p>Tempo:</p>
                        <p>Genre:</p>
                    </div>
                    <div>
                        <p>{data ? data.data?.release[0] + "0's" : ''}</p>
                        <p>{msToMinutesAndSecond(data.data?.duration || 0)} </p>
                        <p>{Math.floor(data.data?.tempo || 0)} bpm </p>
                        <p>{genre ? genre[0] : 0}</p>
                    </div>
                </div>

            </section>
    </>
    )

}
