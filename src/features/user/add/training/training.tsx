import DragNDrop from '@/components/dnd';
import Select from '@/components/ui/select';
import { useGetTrainingsByProtocol } from '@/hooks/rq-hooks/user-hooks';
import { SelectOptionType } from '@/model/drop-down-list';
import { DndDataItem, DndDataType } from '@/types/common';
import { convertTypeToSelectOption } from '@/utils/helpers';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { initialTrainingDndValue } from '..';
import ListTable from './status/table/listTable';

export interface CompletedTraining {
    completionDate: string;
    dateOfOverridden: string;
    isCertificateAvailable: boolean;
    moduleName: string;
    overridden: boolean;
    overriddenBy: string;
    protocolNumber: string;
    status: string;
    userTrainingId: number;
}

interface SiteUserSettingsProps {
  form: UseFormReturn;
  protocols: DndDataItem[];
  dndData: DndDataType[];
  setDndData: Dispatch<SetStateAction<DndDataType[]>>;
  completedTrainings: CompletedTraining[];
  setCompletedTrainings: Dispatch<SetStateAction<CompletedTraining[]>>;
}

const initialDndItem = [{
  title: 'Available Training Module',
  items: []
},
{
  title: 'selected',
  items: []
}];

export function filterDndData(data: DndDataType[]) {
  const availableItems = data[0].items;
  const selectedItems = data[1].items;

  const filteredItems = availableItems.filter(item => {
    return !selectedItems.some(selectedItem => selectedItem.value === item.value);
  });

  data[0].items = filteredItems;
  return data;
}

const Training = ({ form, protocols, dndData, setDndData, completedTrainings, setCompletedTrainings }: SiteUserSettingsProps) => {
  const { register, control, setValue, resetField, formState: { errors } } = form;
  const [protocolOptions, setProtocolOptions] = useState<SelectOptionType[]>();
  const [suppressOptions, setSuppressOptions] = useState<SelectOptionType[]>();
  const [trainingDndItem, setTrainingDndItem] = useState<DndDataType[]>(initialDndItem);
  const [selectedProtocol, setSelectedProtocol] = useState<string>();
  const { data: trainings, isLoading: isTrainingsLoading } = useGetTrainingsByProtocol({ ProtocolIds: protocols?.map((item: DndDataItem) => item.value).join(',') });

  const onDragFinish = (data: any) => {
    setDndData(filterDndData(data));

    // setTrainingDndItem(data);
    setValue('training', data[1].items);
    // setSelectedProtocols(data[1].items);
  }

  useEffect(() => {
    setProtocolOptions(convertTypeToSelectOption(protocols));
    resetField('protocol');
    setDndData(initialTrainingDndValue);
  }, [protocols]);

  useEffect(() => {
    // setTrainingDndItem(trainings?.data.trainings);
    if (trainings) {
      const items = trainings?.data?.trainings.map((item: any) => {
        return ({
          text: item.trainingName,
          value: item.trainingId,
          protocolId: selectedProtocol
        });
      });
      setValue('training', items);
      // let dndItems = [{
      //   title: 'Available Training Module',
      //   items: items
      // },
      // {
      //   title: 'selected',
      //   items: dndData[1].items
      // }
      // ];
      // setDndData(filterDndData(dndItems));

      // setTrainingDndItem(dndItems);
    }

  }, [trainings]);

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap gap-3 border rounded-md mx-4 mb-6 p-4 max-h-[300px] overflow-y-auto'>
        {
          trainings?.data?.trainings.map((item: any) => (
            <li className='p-1 w-fit border rounded-md list-none' key={item.trainingId}>
              {item?.trainingName}
            </li>
          )) ?? 'No Trainings'
        }
      </div>
      <ListTable form={form} data={completedTrainings} setCompletedTrainings={setCompletedTrainings}/>
      
      {/* <div>
        <Controller
          control={control}
          name='protocol'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              onChange={(option) => {
                onChange(option);
                setSelectedProtocol(option.value);
              }}
              label="Protocol"
              options={protocolOptions}
              value={value} />
          )}
        />
      </div>

      <DragNDrop
        onDragFinish={onDragFinish}
        data={dndData}
        // customComponents={components}
        wrapperClassName=""
        className="flex flex-col gap-x-4 sm:flex-row"
      /> */}

    </div>
  )
}

export default Training;