import SearchBox from "@/components/ui/search-box";
import DragNDrop from "@/components/dnd";
import Input from "@/components/ui/input";
import InputRange from "@/components/ui/inputRange";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { DndCustomComponentType, DndDataType } from "@/types/common";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { CriticalDataType } from "@/model/study";
import { InputRangeDataType } from "@/model/common";

interface CriticalSetupProps {
  setCriticalData: Dispatch<SetStateAction<CriticalDataType>>;
  criticalSetupData: DndDataType[];
  setCriticalSetupData: Dispatch<SetStateAction<DndDataType[]>>;
  register: any;
  control: any;
  Controller: any;
}

const CriticalSetup = ({ setCriticalData, criticalSetupData, setCriticalSetupData, register }: CriticalSetupProps) => {
  const [bmiValue, setBmiValue] = useState<InputRangeDataType>();
  const [ageValue, setAgeValue] = useState<InputRangeDataType>();
  const [filteredData, setFilteredData] = useState<DndDataType[]>(criticalSetupData);

  useEffect(() => {
    if(criticalSetupData) {
      setFilteredData(criticalSetupData);
    }
  }, [criticalSetupData])

  const filterData = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    
    setFilteredData(() => (
      criticalSetupData.map((group: DndDataType) => {
        if (group.title === 'Indications') {
          
          const filteredItems = group.items.filter((item) =>
            item.text.toLowerCase().includes(searchTerm)
          );
          console.log(filteredItems);
          return { ...group, items: filteredItems };
        }
        return group;
      })
    ));
  };

  console.log(filteredData);

  const components: DndCustomComponentType[] = [
    {
      groupIndex: 1,
      component: (
        <div className="grid grid-cols-3 gap-4 mb-4 ">
          <div className="col-span-2">
            <SearchBox onChange={filterData}/>
          </div>
          <Select placeholder="Name" />
        </div>
      ),
    },
  ];
  
  const onDragFinish = (data: DndDataType[]) => {
    setCriticalSetupData(data);
  }
  
  const onBmiChange = (values: InputRangeDataType) => {
    setBmiValue(values);
    setCriticalData((data: CriticalDataType) => ({
      ...data,
      bmi: values
    }))
  }

  const onDslpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCriticalData((data: CriticalDataType) => ({
      ...data,
      dslsp: e.target.value
    }))
  }

  const onAgeChange = (values: InputRangeDataType) => {
    setAgeValue(values);
    setCriticalData((data: CriticalDataType) => ({
      ...data,
      age: values
    }))
  }

  return (
    <section className="wrapper my-8">
      <div className="flex justify-between items-center px-6 py-3">
        <h4 className=" text-neutral-black ">Critical Setup</h4>
        <div className="hidden lg:flex gap-16">
          <div className="flex gap-2 items-center">
            <Label label="DSLSP:" />
            <Input placeholder="Enter DSLSP value" type="number" onChange={onDslpChange} {...register('dslsp', {require})}/>
          </div>
          <div className="flex gap-2 items-center">
            <Label label="BMI:" />
            <InputRange onValuesChange={onBmiChange} values={bmiValue}/>
          </div>
          <div className="flex gap-2 items-center">
            <Label label="AGE:" />
            <InputRange onValuesChange={onAgeChange} values={ageValue}/>
          </div>
        </div>
      </div>
      <hr />
      <DragNDrop
        data={filteredData}
        onDragFinish={onDragFinish}
        customComponents={components}
        wrapperClassName="p-6"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 sm:gap-12"
      />
    </section>
  );
};

export default CriticalSetup;

