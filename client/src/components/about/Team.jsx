import { FaTwitter } from "react-icons/fa"

const teams = [
    {
        name: 'Cowooding',
        role: 'Founder',
        twitter: 'https://twitter.com/cowooding',
        imageSrc: require('../../assets/images/team-cowooding.png'),
    },
    {
        name: 'Hanya',
        role: 'Co-Founder',
        twitter: 'https://twitter.com/LLHanya',
        imageSrc: require('../../assets/images/team-hanya.png'),
    },
    {
        name: 'BlackCow',
        role: 'Co-Founder',
        twitter: 'https://twitter.com/shsl1513',
        imageSrc: require('../../assets/images/team-blackcow.png'),
    },
    {
        name: 'PDDprof',
        role: 'Designer',
        twitter: 'https://twitter.com/pddprof',
        imageSrc: require('../../assets/images/team-pddprof.png'),
    },
    {
        name: 'REX',
        role: 'Developer',
        twitter: 'https://twitter.com/parkjinha93',
        imageSrc: require('../../assets/images/team-rex.png'),
    },
    {
        name: 'neogulmon',
        role: 'Moderator',
        twitter: 'https://twitter.com/cowooding',
        imageSrc: require('../../assets/images/team-neogulmon.png'),
    },
]

function Team(props) {
    return (
        <div className='mx-auto w-10/12 md:w-9/12 p-3 text-center rounded-2xl shadow bg-white/80'>
            <h2 className="text-3xl font-bold leading-normal">
                MEET THE <span className="text-lime-300 text-shadow">LIMELIGHT</span> TEAM
            </h2>

            <div className='grid grid-cols-2 xl:grid-cols-6 gap-3 lg:flex lg:justify-center'>
                {teams.map((team) => (
                <div key={team.name} className='mx-auto w-full lg:w-44 shadow-2xl border rounded-xl bg-white'>
                    <img 
                        className='mx-auto rounded-t-xl mb-1'
                        src={team.imageSrc}
                    />
                    <h5 className='text-lg font-bold'>{team.name}</h5>
                    <p className='text-sm text-gray-600'>{team.role}</p>
                    <ul className='list-inside flex mx-auto justify-center my-3'>
                        <a href={team.twitter} className='px-2 text-lime-400 hover:text-lime-500' target={"_blank"}>
                            <FaTwitter/>
                        </a>
                    </ul>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Team;