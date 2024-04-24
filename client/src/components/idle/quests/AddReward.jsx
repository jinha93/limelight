import axios from 'axios';
import { useState, useEffect } from "react";

export default function AddReward(props) {

    const { index, setRewards } = props;

    const [type, setType] = useState('POINT');
    const [value, setValue] = useState(1);
    const [roleId, setRoleId] = useState('');

    useEffect(() => {
        if (type === 'LIMEMON') {
            setValue(1);
        } else if (type === 'ROLE') {
            getDiscordRoles();
        }
    }, [type])

    useEffect(() => {
        const reward = {
            type: type,
            value: value,
            roleId: roleId,
        }

        setRewards(prevRewards => {
            const updatedRewards = [...prevRewards];
            updatedRewards[index] = reward;
            return updatedRewards;
        });

    }, [type, value, roleId, index, setRewards])


    const [discordRoles, setDiscordRoles] = useState([]);
    const getDiscordRoles = () => {
        axios({
            url: '/api/discord/roles',
            method: 'GET'
        }).then((response) => {
            // 퀘스트 목록
            const discordRolesData = [...response.data.result];

            const sortedJsonString = JSON.stringify(
                discordRolesData.sort((a, b) => {
                    // 문자열로 비교하거나 숫자로 비교할 수 있습니다.
                    return a.name.localeCompare(b.name);
                    // 또는
                    // return a.name - b.name;
                })
            );

            // 정렬된 JSON 문자열을 다시 JSON 객체로 파싱
            const sortedJsonObject = JSON.parse(sortedJsonString);

            setDiscordRoles(sortedJsonObject);
        }).catch((error) => {
            console.log(error);
        })
    }



    // roles select onchange
    const rolseOnChange = () => {
        const target = document.getElementById('roles');
        const value = target.options[target.selectedIndex].value;
        const text = target.options[target.selectedIndex].innerText;

        setRoleId(value);
        setValue(text);
    }

    return (
        <dl className="divide-y divide-gray-100 text-sm border rounded-lg px-3 mt-1">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Type</dt>
                <dd className="text-gray-700 sm:col-span-2">
                    <select onChange={(e) => { setType(e.target.value) }}>
                        <option value="POINT">POINT</option>
                        <option value="ROLE">ROLE</option>
                        <option value="LIMEMON">LIMEMON</option>
                    </select>

                </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Value</dt>
                <dd className="text-gray-700 sm:col-span-2">
                    {
                        type === 'ROLE'
                            ?
                            <select id="roles" onChange={rolseOnChange}>
                                {discordRoles.map((role) => (
                                    <option
                                        key={role.id}
                                        value={role.id}
                                    >
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            :
                            <input
                                type="number"
                                value={value}
                                className="w-full border-none focus:outline-none"
                                onChange={(e) => { setValue(e.target.value) }}
                                readOnly={type === 'LIMEMON'}
                            />
                    }
                </dd>
            </div>
        </dl>
    )
}