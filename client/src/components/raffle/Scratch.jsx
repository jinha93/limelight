import { useState, useEffect } from "react";
import { conteffi } from "../../App";
import Toast from '../common/Toast'

import nomal from "../../assets/images/nomal.png"
import win_1 from "../../assets/images/win_1.png"
import win_2 from "../../assets/images/win_2.png"
import lose_1 from "../../assets/images/lose_1.png"
import lose_2 from "../../assets/images/lose_2.png"
import lose_3 from "../../assets/images/lose_3.png"
import Auto from "../../assets/images/Auto.png"
import Close from "../../assets/images/Close.png"

export default function Scratch(props) {

    // Congratulation
    const Congratulation = () => {
        conteffi.addConfetti({
            emojis: ["🎉"],
            emojiSize: 50,
            confettiNumber: 200,
        });
    };

    useEffect(() => {

        var isDrawing, lastPoint;
        var container = document.getElementById('js-img'),
            canvas = document.getElementById('js-canvas');
            canvas.width = container.width;
            canvas.height = container.height;

        var canvasWidth = canvas.width,
            canvasHeight = canvas.height,
            ctx = canvas.getContext('2d'),
            image = new Image(),
            brush = new Image();    

        // base64 Workaround because Same-Origin-Policy
        image.src = require('../../assets/images/scratch.png')
        image.onload = function () {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            // Show the form when Image is loaded.
            document.querySelectorAll('.form')[0].style.visibility = 'visible';
        };
        // brush.src = require('../../assets/images/scratch.png')
        brush.src = 'data:image/png;base64,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';

        canvas.addEventListener('mousedown', handleMouseDown, false);
        canvas.addEventListener('touchstart', handleMouseDown, false);
        canvas.addEventListener('mousemove', handleMouseMove, false);
        canvas.addEventListener('touchmove', handleMouseMove, false);
        canvas.addEventListener('mouseup', handleMouseUp, false);
        canvas.addEventListener('touchend', handleMouseUp, false);

        function distanceBetween(point1, point2) {
            return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
        }

        function angleBetween(point1, point2) {
            return Math.atan2(point2.x - point1.x, point2.y - point1.y);
        }

        // Only test every `stride` pixel. `stride`x faster,
        // but might lead to inaccuracy
        function getFilledInPixels(stride) {
            if (!stride || stride < 1) { stride = 1; }

            var pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
                pdata = pixels.data,
                l = pdata.length,
                total = (l / stride),
                count = 0;

            // Iterate over all pixels
            for (var i = count = 0; i < l; i += stride) {
                if (parseInt(pdata[i]) === 0) {
                    count++;
                }
            }

            return Math.round((count / total) * 100);
        }

        function getMouse(e, canvas) {
            var offsetX = 0, offsetY = 0, mx, my;

            if (canvas.offsetParent !== undefined) {
                do {
                    offsetX += canvas.offsetLeft;
                    offsetY += canvas.offsetTop;
                } while ((canvas = canvas.offsetParent));
            }

            // mx = (e.pageX || e.touches[0].clientX) - offsetX;
            // my = (e.pageY || e.touches[0].clientY) - offsetY;
            mx = (e.clientX || e.touches[0].clientX) - offsetX;
            my = (e.clientY || e.touches[0].clientY) - offsetY;

            return { x: mx, y: my };
        }

        function handlePercentage(filledInPixels) {
            filledInPixels = filledInPixels || 0;
            if (filledInPixels > 98) {
                if(canvas != null) canvas.parentNode.removeChild(canvas);
                if(props.winYn === 'Y') Congratulation();
                isScratch(true);
                props.getRaffle();
            }
        }

        function handleMouseDown(e) {
            isDrawing = true;
            lastPoint = getMouse(e, canvas);
        }

        function handleMouseMove(e) {
            if (!isDrawing) { return; }

            e.preventDefault();

            var currentPoint = getMouse(e, canvas),
                dist = distanceBetween(lastPoint, currentPoint),
                angle = angleBetween(lastPoint, currentPoint),
                x, y;

            for (var i = 0; i < dist; i++) {
                x = lastPoint.x + (Math.sin(angle) * i) - 25;
                y = lastPoint.y + (Math.cos(angle) * i) - 25;
                ctx.globalCompositeOperation = 'destination-out';
                ctx.drawImage(brush, x, y);
            }

            lastPoint = currentPoint;
            handlePercentage(getFilledInPixels(32));
        }

        function handleMouseUp(e) {
            isDrawing = false;
        }

    },[props.winYn])

    const [imgSrc, isImgSrc] = useState(nomal);
    useEffect(() => {
        if (props.winYn === 'Y'){
            const srcArr = [win_1, win_2];
            const ranNum = Math.floor((Math.random() * srcArr.length));
            isImgSrc(srcArr[ranNum]);
        }else if(props.winYn === 'N'){
            const srcArr = [lose_1, lose_2, lose_3];
            const ranNum = Math.floor((Math.random() * srcArr.length));
            isImgSrc(srcArr[ranNum]);
        }
    }, [props.winYn])

    // 결과 확인 여부
    const [scratch, isScratch] = useState(false);


    function handlePercentage(filledInPixels) {
        const canvas = document.getElementById('js-canvas');
        filledInPixels = filledInPixels || 0;
        if (filledInPixels > 98) {
            if(canvas != null) canvas.parentNode.removeChild(canvas);
            if(props.winYn === 'Y') Congratulation();
            isScratch(true);
            props.getRaffle();
        }
    }

    // Toast
    const [isToast, setIsToast] = useState(false);
    const fnClose = () => {
        setIsToast(false)
    }
    

    return (
        <>
            {/* 포인트 부족 Toast */}
            {
                isToast 
                    ? 
                        <Toast type={'success'} text={'Scratch to reveal or press the auto button'} fnClose={fnClose}></Toast>
                    : 
                        null
            }
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none">
                <div className="relative">
                    {/*content*/}
                    <canvas className="canvas absolute top-0" id="js-canvas"></canvas>
                    <img className="form visibility w-[375px] h-[291px] sm:w-[600px] sm:h-[466px] md:w-[800px] md:h-[621px]" id="js-img" src={imgSrc} alt="scratch"/>
                    <div className="relative mt-[-8%]">
                        
                        <button 
                            type="button" 
                            className="mx-3"
                            onClick={() => handlePercentage(100)}
                        >
                            <img src={Auto} className="h-14 hover:scale-110" alt="Auto"/>
                        </button>
                        
                        {
                            scratch 
                            ?
                                <button 
                                    type="button"
                                    className="mx-3"
                                    onClick={props.setIsScratch}
                                >
                                    <img src={Close} className="h-14 hover:scale-110" alt="Close"/>
                                </button>
                            : 
                                <button 
                                    type="button" 
                                    className="mx-3"
                                    onClick={() => setIsToast(true)}
                                >
                                    <img src={Close} className="h-14 hover:scale-110" alt="Close"/>
                                </button>
                        }
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
        </>
    );
}