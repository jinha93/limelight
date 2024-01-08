import { useEffect, useState } from "react";

function About(props) {

    // const imgArr = [img1, img2, img3, img4, img5, img6, img7, img8];
    const imgArr = importAll(require.context("../../assets/images/limemon"));

    function importAll(r) {
        let files = {};
        r.keys().map((item, index) => {
            return files[item.replace("./", "")] = r(item);
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
                <h2 className="text-5xl text-[#ABDB25] font-bold mb-5">LimeLight</h2>
                <p className="">
                {/* 안녕하세요 글로벌 알파 커뮤니티 라임라잇입니다! */}
                Hello, this is the global alpha community Limelight!<br/>
                {/* 다양한 NFT 정보와 각 프로젝트의 화이트리스트를 제공하고 있습니다. */}
                We provide a variety of NFT informations and whitelists for each project.<br/>
                <br/>
                {/* 우리는 커뮤니티 기여자들에게 그 무엇도 강요하지 않습니다. */}
                We don’t force anything on our community contributors.<br/>
                {/* 누구나, 언제든지, 편하게 방문해서 쉬어가시면 됩니다. */}
                Anyone can visit us at any time and take a break comfortably.<br/>
                <br/>
                {/* 파운더가 독싱되어 한국에서 활동하고 있고, 방향성을 함께 고민하는 2명의 코파운더 겸 콜랍 매니저와 CM 겸 디자이너, 개발자 그리고 귀여운 모더가 함께하고 있습니다. */}
                Our founder, who is known publicly, is based in South Korea and we have two co-founders (also works as Collab Manager) who constantly think about our direction together.<br/>
                We also have CM/Designer, Developer, and cute Moderator.<br/>
                <br/>
                {/* 라임라잇 팀은 세상에서 가장 편안하고 재밌는 알파 커뮤니티를 만듭니다. */}
                Limelight team is working to create the most comfortable and exciting “Alpha Community” in the WORLD!<br/>
                {/* 함께 다음 웨이브에 올라 탈 준비를 하시죠! */}
                Let’s get ready to hang out with us!<br/>
                </p>
            </div>
            <div className='text-center content-center grid grid-cols-3 gap-3'>
                {imgSrcArr.map((imgSrc, idx) => (
                    <img
                        key={imgSrc}
                        className='w-full object-cover rounded-xl'
                        src={imgSrc}
                        alt='about-img'
                    />
                ))}
            </div>
        </div>
    )
}

export default About;
