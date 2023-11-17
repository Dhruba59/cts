import SearchBox from "@/components/ui/search-box";
import DragNDrop from "@/components/dnd";
import { DndCustomComponentType, DndDataType } from "@/types/common";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

interface AssignSiteProps {
  assignedData: DndDataType[];
  setAssignedData: Dispatch<SetStateAction<DndDataType[]>>;
}

const AssignSite = ({ assignedData, setAssignedData }: AssignSiteProps) => {
  const [filteredData, setFilteredData] = useState<DndDataType[]>(assignedData);

  const filterData = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredData(() => (
      assignedData.map((group: DndDataType) => {
        if (group.title === 'Sites') {
          const filteredItems = group.items.filter((item) =>
            item.text.toLowerCase().includes(searchTerm)
          );
          return { ...group, items: filteredItems };
        }
        return group;
      })
    ));
  };

  const components: DndCustomComponentType[] = [
    {
      groupIndex: 0,
      component: <SearchBox className="mb-4" onChange={filterData}/>,
    },
  ];

  const onDragFinish = (data: DndDataType[]) => {
    setAssignedData(data);
  }

  useEffect(() => {
    if(assignedData) {
      setFilteredData(assignedData);
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16 sm:gap-12"
      />
    </section>
  );
};

export default AssignSite;
