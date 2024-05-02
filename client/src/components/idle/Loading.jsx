import LoadingGif from "../../assets/images/loading.gif"
import { useEffect, useState } from 'react';

export default function Loading(){

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        },1000)
    }, [])

    return(
        isLoading
        ?
        <div className="absolute w-[100vw] h-[100vh] top-0 left-0 bg-black/80 z-[100] flex flex-col items-center justify-center">
            <img src={LoadingGif} alt="loading"/>
        </div>
        :
        null
    )
}