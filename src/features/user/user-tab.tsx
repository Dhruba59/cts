"use client";
import React, { ReactElement, ReactNode, useState } from "react";

interface TabItem {
  content: ReactNode | ReactElement;
  title: string;
}

interface SelectionTabProps {
  tabItems: TabItem[];
  wrapperClassname?: string;
  titleClassname?: string;
}

const Tab = ({ tabItems, wrapperClassname, titleClassname }: SelectionTabProps) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabClick = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCurrentTab(index);
  };

  return (
    <div className={wrapperClassname}>
      <div className={`border-b-[1px] border-b-gray-200 ${titleClassname}`}>
        {tabItems.map((item, index) => (
          <button
            type="button"
            key={index}
            className={`${currentTab === index && 'border-b-red-400 border-b-2 font-medium' }`}
            onClick={(e) => handleTabClick(index, e)}
            style={{
              padding: "8px 16px",
              marginRight: "8px",
              borderBottom: '',
              // backgroundColor: currentTab === index ? "#ddd" : "transparent",
            }}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div>{tabItems[currentTab]?.content}</div>
    </div>
  );
};

export default Tab;
