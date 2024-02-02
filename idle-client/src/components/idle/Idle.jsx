import { useState } from "react";

import { FaDiscord, FaXTwitter, FaTelegram } from "react-icons/fa6";
import { SiOpensea } from "react-icons/si";

import { ReactComponent as MYLIMEMON } from "../../assets/icons/MYLIMEMON.svg"
import { ReactComponent as ITEMS } from "../../assets/icons/ITEMS.svg"
import { ReactComponent as QUESTS } from "../../assets/icons/QUESTS.svg"
import { ReactComponent as SHOP } from "../../assets/icons/SHOP.svg"
import { ReactComponent as LEADERBOARD } from "../../assets/icons/LEADERBOARD.svg"
import { ReactComponent as EVENTS } from "../../assets/icons/EVENTS.svg"
import { ReactComponent as MORE1 } from "../../assets/icons/MORE1.svg"
import { ReactComponent as MORE2 } from "../../assets/icons/MORE2.svg"
import { ReactComponent as MORE3 } from "../../assets/icons/MORE3.svg"
import { ReactComponent as MORE4 } from "../../assets/icons/MORE4.svg"

import MyLimemon from "./MyLimemon";

export default function Idle() {

    const [currentMenu, setMenu] = useState('');
    const selectMenuHandler = (name) => {
        setMenu(name);
    };

    const menus = [
        {
            name: 'MY LIMEMON',
            icon: <MYLIMEMON width="17px" fill="none" stroke="currentColor" />,
            content: <MyLimemon />,
            disabled: false,
            dropdown: false,
        },
        {
            name: 'ITEM',
            icon: <ITEMS width="17px" fill="none" stroke="currentColor" />,
            content: <div>ITEM</div>,
            disabled: false,
            dropdown: false,
        },
        {
            name: 'QUEST',
            icon: <QUESTS width="17px" fill="none" stroke="currentColor" />,
            content: <div>QUEST</div>,
            disabled: false,
            dropdown: false,
        },
        {
            name: 'SHOP',
            icon: <SHOP width="17px" fill="none" stroke="currentColor" />,
            content: <div>SHOP</div>,
            disabled: false,
            dropdown: false,
        },
        {
            name: 'LEADERBOARD',
            icon: <LEADERBOARD width="17px" fill="none" stroke="currentColor" />,
            content: <div>LEADERBOARD</div>,
            disabled: false,
            dropdown: false,
        },
        {
            name: 'EVENT',
            icon: <EVENTS width="17px" fill="none" stroke="currentColor" />,
            content: <div>EVENT</div>,
            disabled: true,
            dropdown: false,
        },
        {
            name: 'MORE',
            icon: <MORE1 width="17px" fill="none" stroke="currentColor" />,
            content: null,
            disabled: false,
            dropdown: true,
            subMenu: [
                {
                    name: 'MORE 1',
                    content: <div>MORE 1</div>,
                    disabled: false,
                },
                {
                    name: 'MORE 2',
                    content: <div>MORE 2</div>,
                    disabled: false,
                },
                {
                    name: 'MORE 3',
                    content: <div>MORE 3</div>,
                    disabled: false,
                },
            ]
        },
    ];

    return (
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
                        {menus.map((menu, index) => {
                            return (
                                menu.disabled
                                    ?
                                    <li>
                                        <div className="SUITE-Medium flex gap-3 items-center pl-8 py-2 text-[#d0d1c5]">
                                            {menu.icon}{menu.name}
                                            <span className="text-[0.6rem] text-white bg-[#d0d1c5] px-1">
                                                UPCOMMING
                                            </span>
                                        </div>
                                    </li>
                                    :
                                    menu.dropdown
                                        ?
                                        <li>
                                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                                <summary
                                                    className="flex cursor-pointer items-center justify-between px-8 py-2 SUITE-Medium text-[#5d5a51] hover:bg-[#e3e3e3]"
                                                >
                                                    <span className="block flex gap-3 items-center">
                                                        {menu.icon}{menu.name}
                                                    </span>

                                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clip-rule="evenodd"
                                                            />
                                                        </svg>
                                                    </span>
                                                </summary>

                                                <ul className="">
                                                    {menu.subMenu.map((subMenu) => {
                                                        return(
                                                            <li>
                                                                <button 
                                                                    className={
                                                                        currentMenu === subMenu.name
                                                                        ? "w-full pl-12 py-2 SUITE-Medium text-[#5d5a51] flex gap-3 items-center bg-[#e3e3e3]"
                                                                        : "w-full pl-12 py-2 SUITE-Medium text-[#5d5a51] flex gap-3 items-center hover:bg-[#e3e3e3]"
                                                                    }
                                                                    onClick={() => selectMenuHandler(subMenu.name)}>
                                                                    {subMenu.icon}{subMenu.name}
                                                                </button>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </details>
                                        </li>
                                        :
                                        <li>
                                            <button 
                                                className={
                                                    currentMenu === menu.name
                                                    ? "w-full pl-8 py-2 SUITE-Medium text-[#5d5a51] flex gap-3 items-center bg-[#e3e3e3]"
                                                    : "w-full pl-8 py-2 SUITE-Medium text-[#5d5a51] flex gap-3 items-center hover:bg-[#e3e3e3]"
                                                }
                                                onClick={() => selectMenuHandler(menu.name, index)}>
                                                {menu.icon}{menu.name}
                                            </button>
                                        </li>
                            )
                        })}
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
                    {menus.find((menu) => menu.name === currentMenu)?.content}
                </div>
            </div>
        </div>
    )
}