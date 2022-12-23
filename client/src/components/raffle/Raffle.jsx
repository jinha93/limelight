import { useEffect, useState } from "react";

const Raffles = [
    {
        id: 1,
        name: '🍋 LIMELIGHT x BAYC',
        href: '#',
        spot: 1,
        endDate: '20221027',
        imageSrc: require('../../assets/images/BAYC-Logo.png'),
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: '🍋 LIMELIGHT x Doodles',
        href: '#',
        spot: 1,
        endDate: '20221031',
        imageSrc: require('../../assets/images/Doodles-Logo.png'),
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 3,
        name: '🍋 LIMELIGHT x Moobirds',
        href: '#',
        spot: 1,
        endDate: '20221026',
        imageSrc: require('../../assets/images/moonbird.jpg'),
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    }
]

function Raffle(props) {

    const TimeLeft = (endDateVal) => {
        const yyyy = endDateVal.substr(0,4);
        const mm = endDateVal.substr(4,2);
        const dd = endDateVal.substr(6,2);
    
        const endDate = new Date(yyyy,mm-1,dd);
    
        const [diff, setDiff] = useState(endDate - new Date());
    
        useEffect(() => {
            setInterval(() => {
                setDiff(endDate - new Date())
            }, 1000)
        }, [endDate])

        let result = 'ended';
        if(diff > 0){
            const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
            const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const diffMin = Math.floor((diff / (1000 * 60)) % 60);
            const diffSec = Math.floor(diff / 1000 % 60);

            if(diffDay > 0){
                result = diffDay + ' days ago';
            }else{
                result = diffHour + ':' + diffMin + ':'  + diffSec + ' ago';
            }
        }
        
        return result
    }


    return (
        <div className="mx-auto w-10/12 md:w-9/12 p-5">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10">
                {Raffles.map((raffle) => (
                    <a key={raffle.id} className="group bg-white/80 rounded-lg shadow-lg">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                            <img
                                src={raffle.imageSrc}
                                alt={raffle.imageAlt}
                                className="h-48 w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <div className="p-3 text-center">
                            <h3 className="text-lg font-medium text-gray-900">{raffle.name}</h3>
                            <div className="">
                                <p className="text-sm text-gray-700 w-1/2 inline-block">{raffle.spot} spots</p>
                                <p className="text-sm text-gray-700 w-1/2 inline-block">{TimeLeft(raffle.endDate)}</p>
                            </div>
                            <button
                                type="button"
                                className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={()=>alert('test')}
                            >
                                REGISTER
                            </button>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Raffle;