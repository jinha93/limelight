import axios from 'axios';
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

    useEffect(() => {
        if (type === 'DISCORD_ROLE') {
            getDiscordRoles();
        }
    }, [type])

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

        setValue(value);
    }

    return(
        <dl className="divide-y divide-gray-100 text-sm border rounded-lg px-3 mt-1">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Type</dt>
                <dd className="text-gray-700 sm:col-span-2">
                    <select onChange={(e) => {setType(e.target.value)}}>
                        <option value="TEXT">TEXT</option>
                        <option value="LIMEMON_LEVEL">LIMEMON LEVEL CHECK</option>
                        <option value="DISCORD_ROLE">DISCORD ROLE CHECK</option>
                    </select>

                </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">{type === 'DISCORD_ROLE' ? "DISCORD ROLE" : "Value"}</dt>
                <dd className="text-gray-700 sm:col-span-2">
                    {
                        type === 'DISCORD_ROLE'
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
                            type={type === 'LIMEMON_LEVEL' ? 'number' : 'text'}
                            id="Value"
                            placeholder={type === 'DISCORD_ROLE' ? "DISCORD ROLE ID" : "Value"}
                            onChange={(e) => {setValue(e.target.value)}}
                            className="w-full border-none focus:outline-none"
                        />
                    }
                </dd>
            </div>
        </dl>
    )
}