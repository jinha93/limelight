export default function Idle() {
    return (
        <div className="bg-[#FDF4EF] h-screen p-5">
            <div className="w-full">
                
            </div>
            <div className="border-2 border-gray-900 rounded-lg h-full flex">
                <div class="w-1/5 flex flex-col justify-between border-r border-gray-900">
                    <div class="px-4 py-6">

                        <ul class="mt-6 space-y-1">
                            <li>
                                <a href="" class="block rounded-full px-4 py-2 text-sm font-medium text-gray-500 bg-lime-200 hover:bg-lime-200 hover:text-gray-700">
                                    General
                                </a>
                            </li>

                            <li>
                                <details class="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        class="flex cursor-pointer items-center justify-between rounded-full px-4 py-2 text-gray-500 hover:bg-lime-200 hover:text-gray-700"
                                    >
                                        <span class="text-sm font-medium"> Teams </span>

                                        <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <ul class="mt-2 space-y-1 px-4">
                                        <li>
                                            <a
                                                href=""
                                                class="block rounded-full px-4 py-2 text-sm font-medium text-gray-500 hover:bg-lime-200 hover:text-gray-700"
                                            >
                                                Banned Users
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href=""
                                                class="block rounded-full px-4 py-2 text-sm font-medium text-gray-500 hover:bg-lime-200 hover:text-gray-700"
                                            >
                                                Calendar
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-4/5 bg-blue-3001">
                    content
                </div>
            </div>
        </div>
    )
}