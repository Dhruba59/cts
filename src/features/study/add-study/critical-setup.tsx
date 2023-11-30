import SearchBox from "@/components/ui/search-box";
import Input from "@/components/ui/input";
import InputRange from "@/components/ui/inputRange";
import Label from "@/components/ui/label";
import Select from "@/components/ui/Select";
import { DndCustomComponentType, DndDataType } from "@/types/common";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { CriticalDataType, CriticalDndDataType, CriticalDndItem } from "@/model/study";
import CriticalDnd from "@/components/dnd/critical-setup-dnd";
import { getIndicationList } from "@/service/study-service";
import { useQuery } from "react-query";
import { SelectOptionType } from "@/model/drop-down-list";
import { SingleValue } from "react-select";

interface CriticalSetupProps {
  criticalSetupData: CriticalDndDataType[];
  setCriticalSetupData: Dispatch<SetStateAction<CriticalDndDataType[]>>;
  register: any;
  control: any;
  Controller: any;
  errors: any;
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
    label: 'Name'
  },
  {
    value: SearchFieldEnum.CODE,
    label: 'Code'
  },
  {
    value: SearchFieldEnum.CODE_TYPE,
    label: 'Code Type'
  }
]

const CriticalSetup = ({ criticalSetupData, setCriticalSetupData, register, errors }: CriticalSetupProps) => {
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
            const newData = indicationData?.data?.indications as CriticalDndItem[];

            const inclusionItems = data.find(g => g.title === 'Inclusion Criteria')?.items ?? [];
            const exclusionItems = data.find(g => g.title === 'Exclusion Criteria')?.items ?? [];

            const filteredData = newData.filter(item => {
              return !inclusionItems.some(i => i.value === item.value) &&
                !exclusionItems.some(i => i.value === item.value);
            });

            return {
              ...group,
              items: filteredData,
            };
          }
          return group;
        });
      });
    }
  }, [indicationData, setCriticalSetupData]);

  const handleSearchFieldTypeChange = (option: SingleValue<SelectOptionType>) => {
    if (option) {
      setQueryData((queryData) => ({ ...queryData, searchField: option.value.toString() as SearchFieldEnum }));
    }
  }

  const filterData = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQueryData((queryData) => ({ ...queryData, searchValue: searchTerm }));
  };

  const components: DndCustomComponentType[] = [
    {
      groupIndex: 1,
      component: (
        <div className="sticky p-4 pb-1 bg-white top-0 flex flex-col xl:grid xl:grid-cols-5 gap-2 ">
          <div className="col-span-3">
            <SearchBox onChange={filterData} />
          </div>
          <div className="col-span-2">
            <Select placeholder="Name" options={searchValueTypeOptions} onChange={handleSearchFieldTypeChange} />
          </div>
          <hr className="w-full xl:hidden" />
        </div>
      ),
    },
  ];

  const onDragFinish = (data: CriticalDndDataType[]) => {
    setCriticalSetupData(data);
  }

  return (
    <section className="wrapper my-8">
      <div className="flex justify-between items-start lg:items-center px-6 py-5">
        <h4 className=" text-neutral-black min-w-[140px]">Critical Setup</h4>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 items-center">
            <Label label="DSLSP:" />
            <div className="relative">
              <Input placeholder="Enter DSLSP value" type="number" {...register('dslsp', { required: 'DSLSP required' })} />
              {errors.dslsp && (
                <span className="absolute -bottom-5 text-red-500 -mt-10">{errors.dslsp.message}</span>
              )}
            </div>

          </div>
          <div className="flex gap-2 items-center">
            <Label label="BMI:" />
            <div className="relative">
              <InputRange minInputProps={...register('minBmi', { required: 'Required' })} maxInputProps={...register('maxBmi', { required: 'Required' })} />
              {(errors.minBmi || errors.maxBmi) && (
                <span className="absolute -bottom-5 text-red-500 -mt-10">{'BMI required'}</span>
              )}
            </div>

          </div>
          <div className="flex gap-2 items-center">
            <Label label="AGE:" />
            <div className="relative">
              <InputRange minInputProps={...register('minAge', { required: 'Required' })} maxInputProps={...register('maxAge', { required: 'Required' })} />
              {(errors.minAge || errors.maxAge) && (
                <span className="absolute -bottom-5 text-red-500 -mt-10">{'Age required'}</span>
              )}
            </div>

          </div>
        </div>
      </div>
      <hr />
      <CriticalDnd
        data={criticalSetupData}
        onDragFinish={onDragFinish}
        customComponents={components}
        wrapperClassName="p-6"
        className="flex flex-col lg:flex-row gap-x-2"
      />
    </section>
  );
};

export default CriticalSetup;

