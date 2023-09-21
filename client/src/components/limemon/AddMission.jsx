import { useState, useEffect } from "react";

export default function AddMission(props) {

    const [type, setType] = useState('TEXT');
    const [value, setValue] = useState('');

    useEffect(() => {
        const mission = {
            type: type,
            value: value,
        }

        props.setMission(mission);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, value])

    return(
        <dl className="divide-y divide-gray-100 text-sm border rounded-lg px-3 mt-1">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Type</dt>
                <dd className="text-gray-700 sm:col-span-2">
                    <select onChange={(e) => {setType(e.target.value)}}>
                        <option value="TEXT">TEXT</option>
                        <option value="DISCORD_ROLE">DISCORD ROLE CHECK</option>
                    </select>

                </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">{type === 'DISCORD_ROLE' ? "DISCORD ROLE ID" : "Value"}</dt>
                <dd className="text-gray-700 sm:col-span-2">
                    <input
                        type="text"
                        id="Value"
                        placeholder={type === 'DISCORD_ROLE' ? "DISCORD ROLE ID" : "Value"}
                        onChange={(e) => {setValue(e.target.value)}}
                        className="w-full border-none focus:outline-none"
                    />
                </dd>
            </div>
        </dl>
    )
}