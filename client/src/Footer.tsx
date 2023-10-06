export default function Footer() {
    return (
        <>
            <div className='flex-col text-center pb-7 pt-5'>
                <hr className='my-7 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-blue-950 to-transparent opacity-0 dark:opacity-100 w-1/2 m-auto' />
                <p className='font-light'>Built by Marc Baeuerle</p>
                <p className='opacity font-light'>Project Hosted on <a className='underline hover:text-green-600 duration-300'
                    href='https://github.com/MarcBaeuerle/Schartable'>Github</a>
                </p>
            </div>
        </>
    )
}
