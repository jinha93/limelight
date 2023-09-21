import { useState, useEffect } from "react";

export default function AddReward(props) {

    const [type, setType] = useState('EXP');
    const [value, setValue] = useState(1);

    useEffect(() => {
        if(type === 'LIMEMON'){
            setValue(1);
        }
    }, [type])

    useEffect(() => {
        const reward = {
            type: type,
            value: value,
        }

        const rewards = [...props.rewards];
        rewards[props.index] = reward;
        props.setRewards(rewards);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, value])

    return (
        <dl className="divide-y divide-gray-100 text-sm border rounded-lg px-3 mt-1">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Type</dt>
                <dd className="text-gray-700 sm:col-span-2">
                    <select onChange={(e) => {setType(e.target.value)}}>
                        <option value="EXP">EXP</option>
                        <option value="ITEM">ITEM</option>
                        <option value="LIMEMON">LIMEMON</option>
                    </select>

                </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Value</dt>
                <dd className="text-gray-700 sm:col-span-2">
                    <input
                        type="number"
                        value={value}
                        className="w-full border-none focus:outline-none"
                        onChange={(e) => {setValue(e.target.value)}}
                        readOnly={type === 'LIMEMON' ? true : false}
                    />
                </dd>
            </div>
        </dl>
    )
}