import { useEffect, useState } from "react";

function About(props) {

    // const imgArr = [img1, img2, img3, img4, img5, img6, img7, img8];
    const imgArr = importAll(require.context("../../assets/images/limemon"));

    function importAll(r) {
        let files = {};
        r.keys().map((item, index) => {
            files[item.replace("./", "")] = r(item);
        });

        const arr = [];
        for (let i in files) {
            arr.push(files[i])
        }
        return arr;
    }

    const [imgSrcArr, setImgSrcArr] = useState([imgArr[0], imgArr[1], imgArr[2], imgArr[3], imgArr[4], imgArr[5]]);
    useEffect(() => {
        setInterval(() => {
            const imgArrCopy = imgArr.map((x) => x);
            const arr = [];
            for (let i = 0; i < 6; i++) {
                let ranIdx = Math.floor(Math.random() * imgArrCopy.length);
                arr.push(imgArrCopy[ranIdx]);
                imgArrCopy.splice(ranIdx, 1);
            }
            setImgSrcArr(arr);
        }, 1000)
    }, []);

    return (
        <div className="mx-auto w-3/4 h-full lg:grid lg:grid-cols-2 gap-5 content-center pt-28 lg:pt-0">
            <div className="mb-5 lg:mb-0">
                <h2 className="text-5xl text-[#ABDB25] font-bold mb-3">LimeLight</h2>
                <p className="">
                    Hello<br />
                    Global Alpha Community Limelight Team!<br />
                    We provide various NFT information and whitelists for each project.<br />
                    <br />
                    We don't force anything on community contributors.<br />
                    Anyone, at any time, can visit and relax comfortably.<br />
                    <br />
                    The founder has been poisoned and is active in Korea,<br />
                    Two co-founders and collab managers who are thinking about the direction together<br />
                    CM, designer, developer, and cute modder are together.<br />
                    <br />
                    Limelight Team<br />
                    We create the most comfortable and fun alpha community in the world.<br />
                    Get ready to ride on the next wave together!<br />
                </p>
            </div>
            <div className='text-center content-center grid grid-cols-3 gap-3'>
                {imgSrcArr.map((imgSrc, idx) => (
                    <img
                        key={imgSrc}
                        className='w-full object-cover rounded-xl'
                        src={imgSrc}
                    />
                ))}
            </div>
        </div>
    )
}

export default About;
