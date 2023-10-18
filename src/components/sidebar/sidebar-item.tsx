'use client';
import { DownArrowIcon } from '@/assets/icons';
import { SidebarItemProps } from '@/model/layout';
import { Fragment, useState } from 'react';

const SidebarItem = ({ icon, text, subitems, showIconOnly=false }: SidebarItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      <div
        className="flex items-center gap-x-2 px-4 py-2 my-2 rounded-sm cursor-pointer hover:bg-gray-100"
        onClick={toggleExpand}
      >
        <div className="w-6 h-6 flex justify-center items-center">{icon}</div>
        {!showIconOnly && <div className="flex-grow font-medium text-xl">{text}</div> }
        {subitems && !showIconOnly && (
          <div className="w-6 h-6 ml-2">
            <DownArrowIcon className={`h-full ${expanded ? 'rotate-180' : ''}`}/>
          </div>
        )}
      </div>
     
      {subitems && !showIconOnly && 
        <div className={`ml-6 my-2 border-l border-l-[#b3b2b2]  ${expanded
          ? 'h-auto'
          : 'h-0 invisible'} transition duration-300`}>
          {subitems?.map((subitem, index) => (
            <SidebarItem key={index} {...subitem} showIconOnly={showIconOnly}/>
          ))}
        </div>
      }
    </Fragment>
  );
};

export default SidebarItem;