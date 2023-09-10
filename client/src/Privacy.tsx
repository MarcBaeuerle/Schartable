import React from "react";

export default function Privacy() {
    return (
        <section className='relative flex h-fit w-full px-5'>
            <div className="mx-auto mt-16 bg-blue-950 text-gray-200 mb-auto font-rale rounded-3xl p-7 flex flex-col justify-around shadow-2xl shadow-black w-150 gap-7 pt-11">
                <h1 className="text-3xl font-mont text-center">Privacy Policy</h1>
                <div>
                    <p className=''>By logging into spotify through this site, you are agreeing to provide the following information from your spotify account: </p>
                    <ul className='pl-10 list-disc'>
                        <li>Your most played songs</li>
                        <li>Your most played artists</li>
                        <li>Your account name</li>
                    </ul>
                </div>
                <p>None of the data used from Spotify is being stored or shared with third parties. All the information obtained is used solely for displaying you average listening stats and top songs of the month. </p>
                <p>If you would like to remove this sites permission from fetching your data through Spotifies developer API, then you can visit <a className='font-semibold underline hover:text-green-500 duration-200' href='https://www.spotify.com/us/account/apps/'>this page</a> and remove "Schartify"'s access.</p>
                <div className='items-center flex flex-col text-sm'>
                    <p className=''>Built by Marc Baeuerle</p>
                    <p className=''>Project Hosted on <a className='underline duration-200 hover:text-green-500'
                        href='https://github.com/MarcBaeuerle/Spotify-Radar'>Github</a>
                    </p>
                </div>
            </div>

        </section>
    )

}
