export default function TopInfo({ title, description }){
    return (
        <div className="mb-5">
            <h3 className="SUITE-Bold text-2xl text-[#5d5a51] uppercase">{title}</h3>
            <p className="mt-2 text-sm">{description}</p>
        </div>
    )
}