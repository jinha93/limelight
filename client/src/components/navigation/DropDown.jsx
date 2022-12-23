import { useState } from "react";
import { FaDiscord, FaTwitter, FaLink } from "react-icons/fa"

function DropDown() {

    const [isOpen, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
        console.log(isOpen);
    }

    return (
        <div className="relative -my-2 -mr-1 cursor-pointer">
            <FaLink size="20" onClick={()=>toggleMenu()}/>
            <ul className={isOpen ? "absolute right-0 z-10 mt-3 bg-white border border-gray-100 rounded-md shadow-xl p-1" : "hidden"}>
                <li>
                    <a href="https://discord.gg/limelight-kor" className="flex items-center text-slate-600 hover:text-slate-400 p-2" target={"_blank"} rel="noreferrer">
                        <FaDiscord size="22" className='mr-1'/>DISCORD
                    </a>
                    
                </li>
                <li>
                    <a href="https://twitter.com/limelight_kor" className="flex items-center text-slate-600 hover:text-slate-400 p-2" target={"_blank"} rel="noreferrer">
                        <FaTwitter size="22" className='mr-1'/>TWITTER
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default DropDown;