import SearchBox from "@/components/ui/search-box";
import DragNDrop from "@/components/dnd";
import { DndCustomComponentType, DndDataType } from "@/types/common";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface AssignSiteProps {
  assignedData: DndDataType[];
  setAssignedData: Dispatch<SetStateAction<DndDataType[]>>;
}

const AssignSite = ({ assignedData, setAssignedData }: AssignSiteProps) => {
  const [filteredData, setFilteredData] = useState<DndDataType[]>(assignedData);
  const searchRef = useRef();
  const filterData = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredData(() => {
      const selectedItems = assignedData?.find(group => group.title === 'Selected')?.items ?? [];

      const filteredAssignedData = assignedData?.map((group: DndDataType) => {
        if (group.title === 'Sites') {
          const filteredItems = group?.items?.filter(item => {
            return !selectedItems.some(selectedItem => selectedItem.value === item.value);
          });

          return {
            ...group,
            items: filteredItems,
          };
        }
        return group;
      });
      const newData = filteredAssignedData.map((group: DndDataType) => {
        if (group.title === 'Sites') {
          const filteredItems = group.items.filter((item) =>
            item.text.toLowerCase().includes(searchTerm)
          );
          return { ...group, items: filteredItems };
        }
        return group;
      })
      return newData;
    });
  };

  const components: DndCustomComponentType[] = [
    {
      groupIndex: 0,
      component: <div className="sticky top-0 p-4 pb-1 bg-white">
        <SearchBox onChange={filterData} />
      </div>,
    },
  ];

  const onDragFinish = (data: DndDataType[]) => {
    setAssignedData((prevAssignedData) => {
      const newData = JSON.parse(JSON.stringify(prevAssignedData));
      newData[1].items = data[1].items;
      return newData;
    });
  }

  useEffect(() => {
    if (assignedData) {
      setFilteredData((data: DndDataType[]) => {
        const selectedItems = assignedData?.find(group => group.title === 'Selected')?.items ?? [];
        const newData = assignedData?.map((group: DndDataType) => {
          if (group.title === 'Sites') {
            const filteredItems = group?.items?.filter(item => {
              return !selectedItems.some(selectedItem => selectedItem.value === item.value);
            });

            return {
              ...group,
              items: filteredItems,
            };
          }
          return group;
        });

        return newData;
      });
    }
  }, [assignedData]);


  return (
    <section className="wrapper my-8">
      <h4 className=" text-neutral-black px-6 py-4">Assign Sites</h4>
      <hr />
      <DragNDrop
        onDragFinish={onDragFinish}
        data={filteredData}
        customComponents={components}
        wrapperClassName="p-6"
        className="flex flex-col sm:flex-row "
      />
    </section>
  );
};

export default AssignSite;
