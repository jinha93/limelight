import lala_long from "../../assets/images/lala-long2.jpg";

function Main() {
    return (
        <div className="h-full flex align-middle" >
            <img
                className="w-full align-middle object-cover"
                src={lala_long}
                alt="main"
            />
            {/* <video 
                className="w-full align-middle object-cover"
                src={video}
                autoPlay
                loop
                muted
                playsInline
            /> */}
            
        </div>
    )
}

export default Main;