import { checkLoggedIn } from "./spotify";

// export const LOGIN_URI = `http://localhost:3001/login/?in=${checkLoggedIn()}`;
export const LOGIN_URI = `http://https://schartable.onrender.com/login/?in=${checkLoggedIn()}`;

export default function Login() {
    return (
        <section className='relative flex h-fit w-full'>
            <div className='mx-auto mt-16 mb-auto font-rale rounded-3xl h-96 w-80 bg-blue-950 text-gray-200 p-7 flex flex-col items-center justify-around shadow-2xl shadow-black'>
                <h1 className='text-3xl font-mont'>Schartable</h1>
                <div className='flex flex-col items-center'>
                    <p className='text-center'>Your personal Spotify listening preferences all in one digestable chart.</p>
                </div>
                <a href={LOGIN_URI} className='bg-green-500 hover:bg-blue-950 hover:text-white border-2 border-green-500 text-black font-extrabold py-3 px-6 w-fit relative rounded-xl duration-200'>
                    Login with Spotify
                </a>
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
