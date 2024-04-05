import { useState } from "react"

export default function InputText({ cliam, fnClose, questId }) {

    const [inputText, setInputText] = useState('');
    const inputTextChange = e => {
        setInputText(e.target.value);
    } 

    return (
        <div className="absolute w-[100vw] h-[100vh] top-0 left-0 bg-black/25 z-20 flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-1/6 p-5 flex flex-col gap-5">
                <button 
                    type="button" 
                    className="text-gray-400 hover:text-gray-900 ml-auto" 
                    data-dismiss-target="#toast-success" 
                    aria-label="Close"
                    onClick={fnClose}
                >
                    <span className="sr-only">Close</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>

                <textarea
                    type="text"
                    id="inputText"
                    placeholder="Write your proof here..."
                    className="border border-[#7c7a75] rounded-lg p-2"
                    onChange={inputTextChange}
                />
                <button 
                    type="button" 
                    className='bg-[#f48a94] rounded-full text-white px-7'
                    onClick={() => cliam(`${questId}`, `${inputText}`)}
                >
                    Claim
                </button>
            </div>
        </div>
    )
}