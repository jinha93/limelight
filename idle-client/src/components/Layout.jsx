import { NavLink, Outlet } from 'react-router-dom';

import { FaDiscord, FaXTwitter, FaTelegram } from "react-icons/fa6";
import { SiOpensea } from "react-icons/si";

import { ReactComponent as MYLIMEMON } from "../assets/icons/MYLIMEMON.svg"
import { ReactComponent as ITEMS } from "../assets/icons/ITEMS.svg"
import { ReactComponent as QUESTS } from "../assets/icons/QUESTS.svg"
import { ReactComponent as SHOP } from "../assets/icons/SHOP.svg"
import { ReactComponent as LEADERBOARD } from "../assets/icons/LEADERBOARD.svg"
import { ReactComponent as EVENTS } from "../assets/icons/EVENTS.svg"
import { ReactComponent as MORE1 } from "../assets/icons/MORE1.svg"
import { ReactComponent as MORE2 } from "../assets/icons/MORE2.svg"
import { ReactComponent as MORE3 } from "../assets/icons/MORE3.svg"
import { ReactComponent as MORE4 } from "../assets/icons/MORE4.svg"

export default function Layout() {
    return (
        // <>
        //     <div>
        //         <NavLink to="/">Home</NavLink>
        //         <NavLink to="/pageA">pageA</NavLink>
        //         <NavLink to="/pageB">pageB</NavLink>
        //         <NavLink to="/pageC">pageC</NavLink>
        //     </div>
        //     <div>
        //         <div>사이드 메뉴</div>
        //         <div>
        //             {/* 각각 컴포넌트들이 보여질 곳 Outlet으로 받아줌 */}
        //             <Outlet/>
        //         </div>
        //     </div>
        // </>

        <div className="SUITE-Regular text-[#7c7a75] bg-[#f7f7f7] h-screen">
            <div className="h-full grid grid-cols-7 grid-rows-[min-content_1fr_min-content]">
                <div className="col-span-full border-b border-[#7c7a75]">
                    <h2 className="SUITE-Heavy text-[#5d5a51] text-3xl p-5 text-center">
                        LIMELIGHT
                    </h2>
                </div>
                <div className="col-span-1 border-r border-[#7c7a75] overflow-y-auto relative">

                    <div className="text-center my-5">
                        <button type="button" className="SUITE-ExtraBold rounded-full text-[#5d5a51] bg-[#dcefda] px-7 py-0.5">CONNECT WALLET</button>
                    </div>

                    <h3 className="block px-5 py-2 SUITE-ExtraBold text-[#80b272]">MENU</h3>
                    <ul className="">

                        <NavLink 
                            to="/"
                            className="w-full pl-8 py-2 SUITE-Medium text-[#5d5a51] flex gap-3 items-center hover:bg-[#e3e3e3]"
                        >
                            MY LIMEMON
                        </NavLink>


                    </ul>
                    <div className="absolute bottom-0 w-full py-2">
                        <h3 className="block px-5 py-2 mt-5 SUITE-ExtraBold text-[#80b272]">SOCIAL LINKS</h3>
                        <div className="flex justify-between px-8 py-2 text-[#9B9C98]">
                            <FaDiscord size={22} />
                            <FaXTwitter size={22} />
                            <SiOpensea size={22} />
                            <FaTelegram size={22} />
                        </div>
                    </div>
                </div>
                <div className="col-span-6 p-8 overflow-y-auto">
                    {/* 각각 컴포넌트들이 보여질 곳 Outlet으로 받아줌 */}
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}