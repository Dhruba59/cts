import SearchBox from "@/components/ui/search-box";
import Input from "@/components/ui/input";
import InputRange from "@/components/ui/inputRange";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { DndCustomComponentType, DndDataType } from "@/types/common";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { CriticalDataType, CriticalDndDataType, CriticalDndItem } from "@/model/study";
import { InputRangeDataType } from "@/model/common";
import CriticalDnd from "@/components/dnd/critical-setup-dnd";
import { getIndicationList } from "@/service/study-service";
import { useQuery } from "react-query";
import { SelectOptionType } from "@/model/drop-down-list";
import { SingleValue } from "react-select";

interface CriticalSetupProps {
  setCriticalData: Dispatch<SetStateAction<CriticalDataType>>;
  criticalSetupData: CriticalDndDataType[];
  setCriticalSetupData: Dispatch<SetStateAction<CriticalDndDataType[]>>;
  register: any;
  control: any;
  Controller: any;
}

export interface CriticalIndicationQueryDataType {
  searchValue: string;
  searchField: SearchFieldEnum;
}
enum SearchFieldEnum {
  NAME = '1',
  CODE = '2',
  CODE_TYPE = '3'
}
const initialQueryData: CriticalIndicationQueryDataType = {
  searchField: SearchFieldEnum.NAME,
  searchValue: 'S'
}

const searchValueTypeOptions = [
  {
    value: SearchFieldEnum.NAME,
    label: 'Indication Name'
  },
  {
    value: SearchFieldEnum.CODE,
    label: 'Indication Code'
  },
  {
    value: SearchFieldEnum.CODE_TYPE,
    label: 'Code Type'
  }
]

const CriticalSetup = ({ setCriticalData, criticalSetupData, setCriticalSetupData, register }: CriticalSetupProps) => {
  const [bmiValue, setBmiValue] = useState<InputRangeDataType>();
  const [ageValue, setAgeValue] = useState<InputRangeDataType>();
  const [queryData, setQueryData] = useState<CriticalIndicationQueryDataType>(initialQueryData);

  const { data: indicationData } = useQuery({
    queryFn: getIndicationList,
    queryKey: ['search', queryData],
  });

  useEffect(() => {
    if (indicationData) {
      setCriticalSetupData((data: CriticalDndDataType[]) => {
        return data.map((group: CriticalDndDataType) => {
          if (group.title === 'Indications') {
            console.log('indi test', data);
            const newData = indicationData?.data?.indications as CriticalDndItem[];
            return {
              ...group,
              items: newData,
            };
          }
          return group;
        });
      });
    }
  }, [indicationData, setCriticalSetupData]);

  const handleSearchFieldTypeChange = (option: SingleValue<SelectOptionType>) => {
    if(option) {
      setQueryData((queryData) => ({...queryData, searchField: option.value.toString() as SearchFieldEnum}));
    }
  }

  const filterData = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQueryData((queryData) => ({...queryData, searchValue: searchTerm}));
  };

  const components: DndCustomComponentType[] = [
    {
      groupIndex: 1,
      component: (
        <div className="grid grid-cols-3 gap-4 mb-4 ">
          <div className="col-span-2">
            <SearchBox onChange={filterData}/>
          </div>
          <Select placeholder="Name" options={searchValueTypeOptions} onChange={handleSearchFieldTypeChange}/>
        </div>
      ),
    },
  ];
  
  const onDragFinish = (data: CriticalDndDataType[]) => {
    setCriticalSetupData(data);
  }
  
  const onBmiChange = (values: InputRangeDataType) => {
    setBmiValue(values);
    console.log(values);
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
            <Input placeholder="Enter DSLSP value" type="number" onChange={onDslpChange}/>
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
      <CriticalDnd
        data={criticalSetupData}
        onDragFinish={onDragFinish}
        customComponents={components}
        wrapperClassName="p-6"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 sm:gap-12"
      />
    </section>
  );
};

export default CriticalSetup;

