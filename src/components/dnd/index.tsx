"use client";
import { cn } from "@/libs/utils";
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

interface DragItem {
  groupIndex: number;
  itemIndex: number;
}

interface Props extends ComponentPropsWithoutRef<"div"> {
  wrapperClassName?: string;
  data: DndDataType[];
  onDragFinish?: (value: DndDataType[]) => void;
  customComponents?: DndCustomComponentType[];
}

const DragNDrop = ({
  wrapperClassName,
  className,
  data,
  customComponents,
  onDragFinish,
  ...props
}: Props) => {
  const [list, setList] = useState(data);
  const [selectedItems, setSelectedItems] = useState<DragItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragItem = useRef<any>();
  const currentDragNode = useRef<any>();

  useEffect(() => {
    setList(data);
  }, [data])

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, params: DragItem) => {
    dragItem.current = params;
    currentDragNode.current = e.target;
    currentDragNode.current.addEventListener("dragend", handleDragEnd);
    setSelectedItems((prevSelected) => {
      // Check if params is already present in prevSelected
      const isParamsSelected = prevSelected.some(
        (selectedItem) =>
          selectedItem.groupIndex === params.groupIndex &&
          selectedItem.itemIndex === params.itemIndex
      );
      // Add params only if it's not already in prevSelected
      return isParamsSelected ? prevSelected : [params];
    });
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, params: any) => {
    const sourceItem = dragItem.current; // currently dragging item
    const destinationItem = params; // where I want to put it
    if (!isDragging || e.target === currentDragNode.current || sourceItem.groupIndex === destinationItem.groupIndex) {
      return;
    }

    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList));

      selectedItems.forEach((item: DragItem) => {
        const removedItem = newList[item.groupIndex]?.items[item.itemIndex];
        newList[destinationItem?.groupIndex]?.items.splice(0, 0, removedItem);
      });
      selectedItems.forEach((item: DragItem, index) => {
        delete newList[item.groupIndex]?.items[item.itemIndex];
      });
      newList[sourceItem.groupIndex].items = newList[sourceItem.groupIndex]?.items.filter((item: any) => item !== null)
      dragItem.current = destinationItem;
      setSelectedItems((prevSelectedItem: any) => {
        return prevSelectedItem.map((item: any, index: number) => {
          return { itemIndex: prevSelectedItem.length - index - 1, groupIndex: destinationItem.groupIndex }
        })
      })
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
    setSelectedItems([]);
  };

  const toggleSelection = (item: DragItem) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (selectedItem) =>
          selectedItem.groupIndex === item.groupIndex &&
          selectedItem.itemIndex === item.itemIndex
      );

      if (isSelected) {
        // Remove item from selection
        return prevSelectedItems.filter(
          (selectedItem) =>
            selectedItem.groupIndex !== item.groupIndex ||
            selectedItem.itemIndex !== item.itemIndex
        );
      } else if (prevSelectedItems.length !== 0 && prevSelectedItems[prevSelectedItems.length - 1]?.groupIndex !== item.groupIndex) {
        return prevSelectedItems;
      } else {
        // Add item to selection
        return [...prevSelectedItems, item];
      }
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
            className="bg-light-200 rounded-md p-3"
            key={groupIndex}
            onDragEnter={
              isDragging
                ? (e) => handleDragEnter(e, { groupIndex, itemIndex: 0 })
                : undefined
            }
          >
            <div className="text-dark-900 pb-4 pt-2">{group?.title}</div>
            <div className="bg-white h-[290px] overflow-y-auto">
              {renderCustomComponent(groupIndex)}
              <div className="p-4 pt-0">
                {group?.items?.map((item, itemIndex) => (
                  <div
                    onClick={() => toggleSelection({ groupIndex, itemIndex })}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, { groupIndex, itemIndex })
                    }
                    className={`${isDragging
                      ? getStyles({ groupIndex, itemIndex })
                      : "dnd-item transition-all ease-in-out duration-300"
                      } ${selectedItems.some(
                        (selectedItem) =>
                          selectedItem.groupIndex === groupIndex &&
                          selectedItem.itemIndex === itemIndex
                      )
                        ? '!bg-red-200'
                        : ''
                      }`}
                    key={itemIndex}
                  >
                    <div>
                      <p>{item?.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragNDrop;
