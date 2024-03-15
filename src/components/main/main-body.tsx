'use client'
import { useSidebarContext } from '@/context/sidebar-context';
import React, { useContext } from 'react'

const MainBody = ({children}: {
    children: React.ReactNode;}) => {
    const { isSidebarOpen, isSidebarMinimize } = useSidebarContext();
    return (
        <div className={`mx-auto mt-16 mb-12 ${isSidebarMinimize ? 'w-[95%]' : 'w-[95%] md:w-[86%]'}`}>
            {children}
        </div>
    )
}
export default MainBody