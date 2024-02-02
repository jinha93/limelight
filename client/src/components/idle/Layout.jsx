import { Outlet } from 'react-router-dom';

import Header from './Header';
import SideMenu from './SideMenu';

export default function Layout() {
    return (
        <div className="SUITE-Regular text-[#7c7a75] bg-[#f7f7f7] h-screen">
            <div className="h-full grid grid-cols-7 grid-rows-[min-content_1fr_min-content]">
                <Header />

                <SideMenu />
                
                <div className="col-span-6 p-8 overflow-y-auto">
                    {/* 각각 컴포넌트들이 보여질 곳 Outlet으로 받아줌 */}
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}