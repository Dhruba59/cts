import DragNDrop from '@/components/dnd';
import { useGetProtocolsBySponsor } from '@/hooks/rq-hooks/user-hooks';
import { DndDataItem, DndDataType } from '@/types/common';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { searchByIds } from '.';
import { filterDndData } from './training/training';

interface SponsorUserSettingsProps {
  form: UseFormReturn;
  dndData: DndDataType[];
  setDndData: Dispatch<SetStateAction<DndDataType[]>>;
  sponsorId: string;
  initialProtocolsIds?: string[] | undefined;
}

const SponsorUserSettings = ({ form, sponsorId, dndData, setDndData, initialProtocolsIds }: SponsorUserSettingsProps) => {
  const { setValue } = form;
  const [protocolDndItem, setProtocolDndItem] = useState<DndDataType[]>([]);
  const { data: protocols, isLoading: isProtocolsLoading } = useGetProtocolsBySponsor({ SponsorId: sponsorId });

  const onDragFinish = (data: any) => {
    setDndData(data);
    // setProtocolDndItem(data);
    setValue('protocols', data[1].items);
  }

  useEffect(() => {
    if (protocols) {
      let selectedItems: DndDataItem[] = [];
      if(initialProtocolsIds) {
        selectedItems = searchByIds(protocols?.data?.sponsors, initialProtocolsIds);
        setValue('protocols', selectedItems);
      }
      const data = [{
        title: 'Protocols',
        items: protocols?.data?.sponsors
      },
      {
        title: 'Selected',
        items: selectedItems
      }];
      setDndData(filterDndData(data));
    }
  }, [protocols, initialProtocolsIds]);

  return (
    <div className='p-6'>
      <DragNDrop
        onDragFinish={onDragFinish}
        data={dndData}
        // customComponents={components}
        wrapperClassName=""
        className="flex flex-col gap-x-4 sm:flex-row"
      />
    </div>
  )
}

export default SponsorUserSettings;