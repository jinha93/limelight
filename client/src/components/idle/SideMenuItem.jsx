export default function SideMenuItem({ icon, name, isActive}){
    return(
        <div
            className={
                isActive 
                ? "w-full px-8 py-2 SUITE-Medium text-[#5d5a51] flex gap-3 items-center bg-[#e3e3e3]" 
                : "w-full px-8 py-2 SUITE-Medium text-[#5d5a51] flex gap-3 items-center hover:bg-[#e3e3e3]"
            }
        >
            {icon}{name}
        </div>
    )
}