import logo from "../../assets/images/lime.png";
import { NavLink } from "react-router-dom";
import { FaListUl } from "react-icons/fa"
import { useState, useEffect } from "react";
import Login from './Login';
import DropDown from './DropDown';

const menus = [
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
        <nav className="fixed w-full items-center py-5">
            <div className="mx-auto rounded-2xl w-10/12 md:w-9/12 p-5 bg-white shadow flex items-center justify-between">
                {isSpa == true
                ?
                <a href='#main' spy={true} smooth={true}>
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
                                spy={true}
                                smooth={true}
                            >
                                {menu.name}
                            </a>
                            :
                            <NavLink
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
                                to={'/'}
                                className="mx-4 cursor-pointer hover:text-[#ABDB25]"
                                onClick={()=>setIsSpa(true)}
                            >
                                {menu.name}
                            </NavLink>
                            :
                            <NavLink
                                to={menu.href}
                                className="mx-4 cursor-pointer hover:text-[#ABDB25]"
                            >
                                {menu.name}
                            </NavLink>
                    ))}
                </ul>

                <div className="relative lg:hidden -my-2 -mr-1">
                    <FaListUl size="24" onClick={()=>toggleMenu()}/>
                    <div className={isOpen ? "" : "hidden"}>
                        <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg p-2">
                            {menus.map((menu, idx) => (
                                <a
                                    key={menu.idx}
                                    href={menu.name} 
                                    className="block px-4 py-2 text-sm rounded-lg"
                                    spy={true}
                                    smooth={true}
                                    onClick={()=>toggleMenu()}
                                >
                                    {menu.name}
                                </a>
                            ))}
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