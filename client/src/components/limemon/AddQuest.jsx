import { useState } from "react"
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

export default function AddQuest(props) {

    const [inputText, setInputText] = useState('');
    const inputTextChange = e => {
        setInputText(e.target.value);
    }

    return (
        <div className="absolute w-[100vw] h-[100vh] top-0 left-0 bg-black/25 z-20 flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-1/3 p-5 flex flex-col gap-5">
                <div className="flex">
                    <h2 className="text-2xl">New Quest</h2>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-900 ml-auto"
                        data-dismiss-target="#toast-success"
                        aria-label="Close"
                        onClick={props.isAddQuestClick}
                    >
                        <span className="sr-only">Close</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>

                <div class="flow-root p-5 border rounded-lg">
                    <dl class="-my-3 divide-y divide-gray-100 text-sm">
                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium text-gray-900">Title</dt>
                            <dd class="text-gray-700 sm:col-span-2">
                                <input
                                    type="text"
                                    id="Title"
                                    placeholder="Title"
                                    class="w-full border-none focus:outline-none"
                                />
                            </dd>
                        </div>

                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium text-gray-900">Content</dt>
                            <dd class="text-gray-700 sm:col-span-2">
                                <input
                                    type="text"
                                    id="Content"
                                    placeholder="Content"
                                    class="w-full border-none focus:outline-none"
                                />
                            </dd>
                        </div>

                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium text-gray-900">Repeat</dt>
                            <dd class="text-gray-700 sm:col-span-2">
                                <select
                                    id="Repeat"
                                >
                                    <option value="">Please select</option>
                                    <option value="ONCE">ONCE</option>
                                    <option value="DAILY">DAILY</option>
                                    <option value="WEEKLY">WEEKLY</option>
                                    <option value="MONTHLY">MONTHLY</option>
                                </select>
                            </dd>
                        </div>

                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium text-gray-900">Rewards</dt>
                            <dd class="text-gray-700 sm:col-span-2">
                                <button class="rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300">+ Add Reward</button>
                            </dd>
                        </div>

                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium text-gray-900">Mission</dt>
                            <dd class="text-gray-700 sm:col-span-2">
                                <dl class="-my-3 divide-y divide-gray-100 text-sm">
                                    <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt class="font-medium text-gray-900">Type</dt>
                                        <dd class="text-gray-700 sm:col-span-2">
                                            <select>
                                                <option value="">Please select</option>
                                                <option value="DISCORD_ROLE">DISCORD ROLE CHECK</option>
                                                <option value="TEXT">TEXT</option>
                                            </select>
                                        
                                        </dd>
                                    </div>
                                    <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt class="font-medium text-gray-900">Value</dt>
                                        <dd class="text-gray-700 sm:col-span-2">
                                            <input
                                                type="text"
                                                id="Value"
                                                placeholder="Value"
                                                class="w-full border-none focus:outline-none"
                                            />
                                        </dd>
                                    </div>
                                </dl>
                            </dd>
                        </div>
                    </dl>
                </div>
                <button className="ml-auto">
                    <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
                        <div className="rounded-lg border-2 border-gray-900 bg-white transition -translate-y-1 -translate-x-1 px-2 py-1 hover:bg-lime-200 group-hover:translate-y-0 group-hover:translate-x-0">
                            Add Quest
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}