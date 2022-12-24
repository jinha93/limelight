import main from "../../assets/images/main.png";
import lala_long from "../../assets/images/lala-long.jpg";
import lala from "../../assets/images/lala.jpg";

function Main() {
    return (
        <div className="h-full flex align-middle" >
            {/* <img
                className="w-full h-full absolute blur-lg z-[-1]"
                src={lala_long}
            /> */}
            <img
                className="w-full h-full align-middle my-auto object-cover"
                src={lala_long}
            />
            
        </div>
    )
}

export default Main;