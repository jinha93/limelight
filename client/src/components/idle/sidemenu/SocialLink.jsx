import { FaDiscord, FaXTwitter, FaTelegram } from "react-icons/fa6";
import { SiOpensea } from "react-icons/si";

export default function SocialLink() {
    return (
        <div className="absolute bottom-0 w-full py-2">
            <h3 className="block px-5 py-2 mt-5 SUITE-ExtraBold text-[#80b272]">SOCIAL LINKS</h3>
            <div className="flex justify-between px-8 py-2 text-[#9B9C98]">
                <a href="https://discord.gg/limelight-kor" className="hover:text-[#7c7a75]" target="_blank" rel="noreferrer">
                    <FaDiscord size={22} />
                </a>
                <a href="https://twitter.com/limelight_kor" className="hover:text-[#7c7a75]" target="_blank" rel="noreferrer">
                    <FaXTwitter size={22} />
                </a>
                <a href="#!" className="hover:text-[#7c7a75]">
                    <SiOpensea size={22} />
                </a>
                <a href="https://t.me/limelight_kor" className="hover:text-[#7c7a75]" target="_blank" rel="noreferrer">
                    <FaTelegram size={22} />
                </a>
            </div>
        </div>
    )
}