import QuestTabs from "./QuestTabs"
import QuestList from "./QuestList"

export default function Limemon() {
    return (
        <div className='bg min-h-screen max-h-screen pt-32 h-screen'>
            <div className="w-3/4 mx-auto md:flex gap-5 h-[80vh]">
                <div className="grid grid-rows-6 gap-5 md:w-1/3">
                    <div className="bg-white rounded-lg shadow-sm p-5 row-span-4">
                        <img src={require('../../assets/images/team-rex2.png')} className="w-full h-full border-2 border-gray-900 rounded-lg h-[90%]" alt="myLimemon"/>
                        <div className="mt-3">
                            <span>EXP</span>
                            <span className="block rounded-full bg-gray-200" >
                                <span
                                    className="block h-4 rounded-full bg-yellow-400 text-center text-sm"
                                    style={{width: '50%'}}
                                >
                                    <span className="font-bold text-white">50%</span>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-5 row-span-2">
                        <div className="border-2 border-gray-900 rounded-lg h-full grid grid-cols-6 gap-3 p-3 overflow-y-auto">
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full h-14"/>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm py-5 px-10 col-span-2 gap-5 overflow-y-hidden md:w-2/3 h-full">
                    <QuestTabs />
                    <QuestList />
                </div>
            </div>
        </div>
    )
}