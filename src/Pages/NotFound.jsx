import { useEffect, useState } from "react";

const NotFound = () => {
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        document.title = "Not Found!"
    }, [])

    useEffect(() => {
        if(timer === 0) {
            window.location = "/"
        }
        const count = timer > 0 && setInterval(() => setTimer(timer - 1), 1000)
        return () => clearInterval(count)
        
    }, [timer])
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-900/80 text-white">
            <h1 className="text-6xl font-bold text-red-600 mb-5">404 NOT FOUND!</h1>
            <h1>The site your looking for does not exist. Redirecting to page within {timer}.</h1>
        </div>
    );
}

export default NotFound;