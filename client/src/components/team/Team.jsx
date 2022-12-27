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
        name: 'POGO',
        role: 'Designer',
        twitter: 'https://twitter.com/limelight_kor',
        imageSrc: require('../../assets/images/team-pogo.jpg'),
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
        twitter: 'https://twitter.com/raccoon_mon',
        imageSrc: require('../../assets/images/team-neogulmon.png'),
    },
    {
        name: 'Dolphin rice',
        role: 'Story Teller',
        twitter: 'https://twitter.com/goraegabab',
        imageSrc: require('../../assets/images/team-dolphinrice.png'),
    },
]

function Team(props) {
    return (
        <div className="mx-auto w-3/4 h-full text-center lg:grid lg:gap-5 lg:content-center pt-28 lg:pt-0">
            <h2 className="mx-auto text-5xl mb-5">Meet the Team</h2>
            <div className="mx-auto grid grid-cols-2 md:grid-cols-4 content-center gap-5">
                {teams.map((team) => (
                    <div key={team.name} className='mx-auto w-full lg:w-52 shadow-2xl border rounded-xl bg-white hover:scale-110'>
                        <img
                            className='mx-auto rounded-t-xl mb-1'
                            src={team.imageSrc}
                        />
                        <h5 className='text-lg font-bold'>{team.name}</h5>
                        <p className='text-sm text-gray-600'>{team.role}</p>
                        <ul className='list-inside flex mx-auto justify-center my-3'>
                            <a href={team.twitter} className='px-2 text-lime-400 hover:text-lime-500' target={"_blank"}>
                                <FaTwitter />
                            </a>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Team;