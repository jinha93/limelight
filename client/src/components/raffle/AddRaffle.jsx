import axios from 'axios';
import { useState } from "react";
import ImageUploadBox from "./ImageUploadBox";

function AddRaffle() {

    // 이미지파일
    const [imgFile, setImgFile] = useState({files: []});

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        const file = imgFile[0];
        formData.append('image',file)
        formData.append('raffleName',e.target.raffleName.value)
        formData.append('raffleEndDate', e.target.raffleEndDate.value)
        formData.append('rafflePoint',e.target.rafflePoint.value)
        formData.append('winner',e.target.winner.value)
        formData.append('rate',e.target.rate.value)

        if(file === undefined){
            alert('이미지는 필수입니다.')
            return false;
        }

        if(file.size > 1024 * 1024 * 10){
            alert('이미지 크기는 10MB 이하만 가능합니다.')
            return false;
        }

        axios({
            url: '/api/raffle/addRaffle',
            method: "POST",
            header:{
                'Content-Type': 'multipart/form-data'
            },
            data: formData,
            dataType: 'json',
        }).then((result) => {
            alert(result.data);
            window.location.href = '/raffle';
        }).catch((error) => {
            // 어드민 에러
            if (error.response.status === 403) {
                alert('관리자만 사용 가능합니다.')
            }
            console.log(error);
        })
    }

    function minDay(){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + (date.getDate()+1)).slice(-2);
    
        return year + '-' + month + '-' + day
    }

    return (
        <div className='bg min-h-screen pt-32'>
            <div className="bg-gray-100 w-3/4 mx-auto p-5 rounded-2xl">
                <div>
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Profile</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form encType='multipart/form-data' onSubmit={handleSubmit}>
                                <div className="shadow overflow-hidden rounded-xl">
                                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                        <ImageUploadBox setImgFile={setImgFile}/>

                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="raffleName" className="block text-sm font-medium leading-6 text-gray-900">
                                                    RAFFLE NAME
                                                </label>
                                                <div className="mt-2 flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        id="raffleName"
                                                        name="raffleName"
                                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#be86ea] sm:text-sm sm:leading-6 outline outline-0"
                                                        placeholder="RAFFLE NAME"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="raffleEndDate" className="block text-sm font-medium leading-6 text-gray-900">
                                                    RAFFLE END DATE
                                                </label>
                                                <div className="mt-2 flex rounded-md shadow-sm">
                                                    <input
                                                        type="datetime-local"
                                                        id="raffleEndDate"
                                                        name="raffleEndDate"
                                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#be86ea] sm:text-sm sm:leading-6 outline outline-0"
                                                        placeholder="Raffle Name"
                                                        required
                                                        // min={'2023-03-09'}
                                                        min={minDay()}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="rafflePoint" className="block text-sm font-medium leading-6 text-gray-900">
                                                    RAFFLE POINT
                                                </label>
                                                <div className="mt-2 flex rounded-md shadow-sm">
                                                    <input
                                                        type="number"
                                                        id="rafflePoint"
                                                        name="rafflePoint"
                                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#be86ea] sm:text-sm sm:leading-6 outline outline-0"
                                                        placeholder="0"
                                                        required
                                                        min="1"
                                                    />
                                                    <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">P</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="winner" className="block text-sm font-medium leading-6 text-gray-900">
                                                    WINNER
                                                </label>
                                                <div className="mt-2 flex rounded-md shadow-sm">
                                                    <input
                                                        type="number"
                                                        id="winner"
                                                        name="winner"
                                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#be86ea] sm:text-sm sm:leading-6 outline outline-0"
                                                        placeholder="0"
                                                        required
                                                        min="1"
                                                    />
                                                    <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">?</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="rate" className="block text-sm font-medium leading-6 text-gray-900">
                                                    RATE
                                                </label>
                                                <div className="mt-2 flex rounded-md shadow-sm">
                                                    <input
                                                        type="number"
                                                        id="rate"
                                                        name="rate"
                                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#be86ea] sm:text-sm sm:leading-6 outline outline-0"
                                                        placeholder="0"
                                                        required
                                                        min="1"
                                                        max="100"
                                                    />
                                                    <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div>
                                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                About
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="about"
                                                    name="about"
                                                    rows={3}
                                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#be86ea] sm:text-sm sm:leading-6 outline outline-0"
                                                    placeholder="you@example.com"
                                                    defaultValue={''}
                                                />
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Brief description for your profile. URLs are hyperlinked.
                                            </p>
                                        </div> */}

                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md bg-[#be86ea] py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddRaffle;