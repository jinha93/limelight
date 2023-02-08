import lala_long from "../../assets/images/lala-long2.jpg";

function Main() {
    return (
        <div className="h-full flex align-middle" >
            {/* <img
                className="w-full h-full absolute blur-lg z-[-1]"
                src={lala_long}
            /> */}
            <img
                className="w-full align-middle object-cover"
                src={lala_long}
                alt="main"
            />
            
        </div>
    )
}

export default Main;