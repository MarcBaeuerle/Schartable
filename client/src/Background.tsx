export default function Background() {
    function randomBackground() {
        const d = new Date();
        let time = d.getHours();
        let string = ' noise';
        return string + ((time) % 4) + '';
    }

    return (
        <div className={`-z-50 ${randomBackground()} h-screen w-full fixed top-0 opacity-[40%] brightness-95`}></div>
    )

}
