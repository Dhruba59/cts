'use client'
import { useSidebarContext } from '@/context/sidebar-context';
import React, { useContext } from 'react'
import Button from '../ui/button';
import { useRouter } from 'next/navigation';

const TableTopWithAddButtin = ({ headerText, addButtonLink, children }: {
    headerText: string;
    addButtonLink: string;
    children?: React.ReactNode;
}) => {
    const router = useRouter();
    return (
        <div className="hidden sm:flex justify-between item-center py-3 px-2">
            <h4 className="font-semibold  text-dark-900">
                {headerText}
            </h4>
            <Button variant="secondary" size="small"
                onClick={() => router.push(addButtonLink)} className="outline-primary font-bold py-2 px-4 rounded inline-flex items-center">
                <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                >
                    <path
                        fill="currentColor"
                        d="M15.5 6H10V.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5V6H.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5H6v5.5a.5.5 0 00.5.5h3a.5.5 0 00.5-.5V10h5.5a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5z"
                    />
                </svg>
                <span> Add New </span>
            </Button>
        </div>
    )
}
export default TableTopWithAddButtin