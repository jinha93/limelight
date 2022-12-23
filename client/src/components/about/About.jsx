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
        for(let i in files){
            arr.push(files[i])
        }
        return arr;
    }    

    const [imgSrcArr, setImgSrcArr] = useState([imgArr[0],imgArr[1],imgArr[2],imgArr[3]]);
    useEffect(() => {
        setInterval(() => {
            const imgArrCopy = imgArr.map((x) => x);
            const arr = [];
            for(let i=0; i<4; i++){
                let ranIdx = Math.floor(Math.random() * imgArrCopy.length);
                arr.push(imgArrCopy[ranIdx]);
                imgArrCopy.splice(ranIdx,1);
            }
            setImgSrcArr(arr);
        }, 1000)
    }, []);
    
    return (
        <div className="mx-auto w-10/12 md:w-9/12 p-6 rounded-2xl shadow bg-white/80 lg:flex lg:justify-center gap-5 mb-5">
            <div className="">
                <h2 className="text-3xl font-bold leading-normal mb-3">
                    ABOUT <span className="text-lime-300 text-shadow">LIMELIGHT</span>
                </h2>
                <p className="text-gray-700 text-base mb-4">
                    안녕하세요 글로벌 알파 커뮤니티 라임라잇입니다!<br />
                    다양한 NFT 정보와 각 프로젝트의 화이트리스트를 제공하고 있습니다.<br />
                    <br />
                    우리는 커뮤니티 기여자들에게 그 무엇도 강요하지 않습니다.<br />
                    누구나, 언제든지, 편하게 방문해서 쉬어가시면 됩니다.<br />
                    <br />
                    파운더가 독싱되어 한국에서 활동하고 있고,<br />
                    방향성을 함께 고민하는 2명의 코파운더 겸 콜랍 매니저와<br />
                    CM 겸 디자이너, 개발자 그리고 귀여운 모더가 함께하고 있습니다.<br />
                    <br />
                    라임라잇 팀은 <br />
                    세상에서 가장 편안하고 재밌는 알파 커뮤니티를 만듭니다.<br />
                    함께 다음 웨이브에 올라 탈 준비를 하시죠!<br />
                </p>
            </div>
            <div className='text-center content-center grid grid-cols-2 gap-3'>
                {imgSrcArr.map((imgSrc, idx) => (
                    <img
                        key={imgSrc}
                        className='w-full lg:w-44 object-cover rounded-xl'
                        src={imgSrc}
                    />
                ))}
            </div>
            
        </div>

    )
}

export default About;