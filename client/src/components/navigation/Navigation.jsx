import logo from "../../assets/images/lime.png";
import { NavLink } from "react-router-dom";
import { FaListUl } from "react-icons/fa"
import { useState, useEffect } from "react";
import Login from './Login';
import DropDown from './DropDown';

const menus = [
    {
        name: 'HOME',
        href: '',
        spaYn: 'Y'
    },
    {
        name: 'ABOUT',
        href: 'about',
        spaYn: 'Y'
    },
    {
        name: 'TEAM',
        href: 'team',
        spaYn: 'Y'
    },
    {
        name: 'RANK',
        href: '/rank',
        spaYn: 'N'
    },
    {
        name: 'RAFFLE',
        href: '/raffle',
        spaYn: 'N'
    }
]


function Navigation() {
    //모바일 메뉴 토글 버튼 동작 함수
    const [isOpen, setMenu] = useState(false);
    const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
    }

    //SPA와 MPA 동시에 쓰기 위한 변수 설정
    const [isSpa, setIsSpa] = useState(false);
    useEffect(() => {
        const pathname = window.location.pathname;
        console.log(pathname);
        if(pathname === '/'){
            setIsSpa(true)
        }
    },[])


    return (
        <nav className="fixed w-full items-center py-5 z-20">
            <div className="mx-auto rounded-2xl w-3/4 p-5 h-20 bg-white shadow flex items-center justify-between">
                {isSpa == true
                ?
                <a href='/#'>
                    <span className="text-xl cursor-pointer">
                        <img className="h-8 inline mr-3" alt='logo' src={logo}/>
                        LIMELIGHT
                    </span>
                </a>
                :
                <NavLink to="/" onClick={()=>setIsSpa(true)}>
                    <span className="text-xl cursor-pointer">
                        <img className="h-8 inline mr-3" alt='logo' src={logo}/>
                        LIMELIGHT
                    </span>
                </NavLink>
                }

                <ul className="hidden lg:flex items-center">
                    {menus.map((menu, idx) => (
                        isSpa == true
                        ?
                            menu.spaYn == 'Y'
                            ?
                            <a 
                                key={idx}
                                href={'#'+menu.href}
                                className="mx-4 cursor-pointer hover:text-[#ABDB25]"
                            >
                                {menu.name}
                            </a>
                            :
                            <NavLink
                                key={idx}
                                to={menu.href}
                                className="mx-4 cursor-pointer hover:text-[#ABDB25]"
                                onClick={()=>setIsSpa(false)}
                            >
                                {menu.name}
                            </NavLink>
                        :
                            menu.spaYn == 'Y'
                            ?
                            <NavLink
                                key={idx}
                                to={'/'}
                                className="mx-4 cursor-pointer hover:text-[#ABDB25]"
                                onClick={()=>setIsSpa(true)}
                            >
                                {menu.name}
                            </NavLink>
                            :
                            <NavLink
                                key={idx}
                                to={menu.href}
                                className="mx-4 cursor-pointer hover:text-[#ABDB25]"
                            >
                                {menu.name}
                            </NavLink>
                    ))}
                </ul>

                <div className="lg:hidden -my-2 -mr-1">
                    <FaListUl size="24" onClick={()=>toggleMenu()}/>
                    <div className={isOpen ? "relative z-20" : "hidden"}>
                        <div className="absolute right-0 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg p-2" onClick={()=>toggleMenu()}>
                            <div>
                            {menus.map((menu, idx) => (
                                isSpa == true
                                ?
                                    menu.spaYn == 'Y'
                                    ?
                                    <a 
                                        key={idx}
                                        href={'#'+menu.href}
                                        className="block px-4 py-2 text-sm rounded-lg"
                                    >
                                        {menu.name}
                                    </a>
                                    :
                                    <NavLink
                                        key={idx}
                                        to={menu.href}
                                        className="block px-4 py-2 text-sm rounded-lg"
                                        onClick={()=>setIsSpa(false)}
                                    >
                                        {menu.name}
                                    </NavLink>
                                :
                                    menu.spaYn == 'Y'
                                    ?
                                    <NavLink
                                        key={idx}
                                        to={'/'}
                                        className="block px-4 py-2 text-sm rounded-lg"
                                        onClick={()=>setIsSpa(true)}
                                    >
                                        {menu.name}
                                    </NavLink>
                                    :
                                    <NavLink
                                        key={idx}
                                        to={menu.href}
                                        className="block px-4 py-2 text-sm rounded-lg"
                                    >
                                        {menu.name}
                                    </NavLink>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex justify-between items-center gap-3">
                    <Login/>
                    <div className="border border-black"></div>
                    <DropDown/>
                </div>
            </div>
        </nav >
    )
}

export default Navigation;