import { Outlet } from 'react-router-dom';

import Header from './Header';
import SideMenu from './sidemenu/SideMenu.jsx';

export default function Layout() {
    return (
        <div className="SUITE-Regular text-[#7c7a75] bg-[#f7f7f7] h-screen">
            <div className="h-full grid grid-cols-12 grid-rows-[min-content_1fr_min-content]">
                <Header />

                <SideMenu />
                
                <div className="col-span-9 xl:col-span-10 p-8 overflow-y-auto h-full">
                    {/* 각각 컴포넌트들이 보여질 곳 Outlet으로 받아줌 */}
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}