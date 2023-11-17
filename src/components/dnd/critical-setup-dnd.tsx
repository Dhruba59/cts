"use client";
import { cn } from "@/libs/utils";
import { CriticalDndDataType } from "@/model/study";
import { DndCustomComponentType, DndDataType } from "@/types/common";
import React, { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

/* DATA FORMAT */

// const defaultData = [
//   { title: "group 1", items: ["1", "2", "3"], customComponent: SearchBox },
//   { title: "group 2", items: ["4", "5"] },
// ];

// const customComponents = [
//   {
//     groupIndex: 0,
//     component: <SearchBox className="mb-4" />,
//   },
// ];

interface Props extends ComponentPropsWithoutRef<"div"> {
  wrapperClassName?: string;
  data: CriticalDndDataType[];
  onDragFinish?: (value:CriticalDndDataType[]) => void; 
  customComponents?: DndCustomComponentType[];
}

const CriticalDnd = ({
  wrapperClassName,
  className,
  data,
  customComponents,
  onDragFinish,
  ...props
}: Props) => {
  const [list, setList] = useState(data);
  const [isDragging, setIsDragging] = useState(false);
  const dragItem = useRef<any>();
  const currentDragNode = useRef<any>();

  useEffect(() => {
    setList(data);
  }, [data])

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, params: any) => {
    dragItem.current = params;
    currentDragNode.current = e.target;
    currentDragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, params: any) => {    
    const sourceItem = dragItem.current; // currently dragging item
    const destinationItem = params; // where I want to put it
    if (!isDragging || e.target === currentDragNode.current || sourceItem.groupIndex === destinationItem.groupIndex) {
      return;
    }

    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList));

      const removedItem = newList[sourceItem?.groupIndex]?.items.splice(
        sourceItem?.itemIndex,
        1
      )[0];

      newList[destinationItem?.groupIndex]?.items.splice(
        destinationItem?.itemIndex,
        0,
        removedItem
      );

      dragItem.current = destinationItem;
      return newList;
    });
  };

  const handleDragEnd = () => {
    currentDragNode.current.removeEventListener("dragend", handleDragEnd);
    setIsDragging(false);
    dragItem.current = null;
    currentDragNode.current = null;
    setList((prevList) => {
      if (onDragFinish) {
        onDragFinish(prevList);
      }
      return prevList;
    });
  };

  // styling for dragging item
  const getStyles = (item: any) => {
    if (
      dragItem?.current?.groupIndex === item.groupIndex &&
      dragItem?.current?.itemIndex === item.itemIndex
    ) {
      return "dnd-item current transition-all ease-in-out duration-300";
    }
    return "dnd-item transition-all ease-in-out duration-300";
  };

  const renderCustomComponent = (groupIndex: number) => {
    const isComponentAvailable = customComponents?.find(
      (comp) => comp.groupIndex === groupIndex
    );
    return isComponentAvailable ? isComponentAvailable?.component : null;
  };

  return (
    <div className={cn("mb-2", wrapperClassName)}>
      <div className={cn("", className)} {...props}>
        {list?.map((group, groupIndex) => (
          <div
            className="bg-light-200 rounded-md p-3 "
            key={groupIndex}
            onDragEnter={
              isDragging
                ? (e) => handleDragEnter(e, { groupIndex, itemIndex: 0 })
                : undefined
            }
          >
            <div className="text-dark-900 pb-4 pt-2">{group?.title}</div>
            <div className="bg-white p-4 h-[290px] overflow-y-auto">
              {renderCustomComponent(groupIndex)}
              {group?.items?.map((item, itemIndex) => (
                <div
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { groupIndex, itemIndex })
                  }
                  // onDragEnter={(e) =>
                  //   handleDragEnter(e, { groupIndex, itemIndex })
                  // }
                  className={
                    isDragging
                      ? getStyles({ groupIndex, itemIndex })
                      : "dnd-item transition-all ease-in-out duration-300"
                  }
                  key={itemIndex}
                >
                  <div>
                    <p>{item?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriticalDnd;
