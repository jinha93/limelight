import { useState } from "react";

export default function QuestTabs( {setRecurrence} ){
    const [currentTab, setTab] = useState(0);
    const selectMenuHandler = (index) => {
        setTab(index);
        setRecurrence(tabs[index].name);
    };

    const tabs = [
        {name:'ALL'},
        {name:'ONCE'},
        {name:'DAILY'},
        {name:'WEEKLY'},
        {name:'MONTHLY'},
    ];

    return (
        <div className="flex gap-3">
            {tabs.map((tap, index) => {
                return(
                    <button key={index}>
                        <div
                            className={currentTab === index
                                ? "group relative block h-full bg-white"
                                : "group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900"
                            }
                        >
                            <div
                                className={currentTab === index
                                    ? "rounded-lg border-2 border-gray-900 bg-white px-2 py-1 bg-lime-200"
                                    : "rounded-lg border-2 border-gray-900 bg-white transition px-2 py-1 -translate-y-1 -translate-x-1 hover:bg-lime-200 group-hover:translate-y-0 group-hover:translate-x-0"
                                }
                                onClick={() => selectMenuHandler(index)}
                            >
                                {tap.name}
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}