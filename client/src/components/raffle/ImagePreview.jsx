import { FaTimesCircle } from "react-icons/fa"

function ImagePreview({ image, deleteFunc }) {
    return (
        <div className="ImagePreview w-3/4 mx-auto relative overflow-hidden" draggable>
            <img src={image} alt="preview" className="w-full h-full object-cover aspect-video"/>
            <div className="bg-white border shadow absolute top-0 right-0 rounded-md m-1"  onClick={deleteFunc}>
                <FaTimesCircle className=" w-[20px] h-[20px] m-1" color="black"/>
            </div>
        </div>
    );
}

export default ImagePreview;