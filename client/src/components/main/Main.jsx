import lala_long from "../../assets/images/lala-long2.jpg";
import test1 from "../../assets/images/1.webp";
import test2 from "../../assets/images/2.webp";
import test3 from "../../assets/images/3.svg";
import video from "../../assets/images/beanz2.mp4";

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