import DragNDrop from '@/components/dnd';
import { DropDownItem } from '@/model/drop-down-list';
import useProtocolListStore from '@/store';
import { DndDataType } from '@/types/common';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface SysAdminUserSettingsProps {
  form: UseFormReturn;
  matchTypes: DropDownItem[];
  sites: DropDownItem[];
}


const SysAdminUserSettings = ({ form, matchTypes, sites }: SysAdminUserSettingsProps) => {
  const { register, control, setValue, formState: { errors } } = form;
  const [matchTypesDndItem, setMatchTypesDndItem] = useState<DndDataType[]>([]);
  const [sitesDndItem, setSitesDndItem] = useState<DndDataType[]>([]);
  const storeAdminDndData = useProtocolListStore((state) => state.adminDndData);
  const storeAddAdminDndData = useProtocolListStore((state) => state.addAdminDndData);

  const onMatchTypesDragFinish = (data: any) => {
    storeAddAdminDndData(data)
    // setMatchTypesDndItem(data);
    setValue('matchTypes', data[1].items);
  }

  const onSitesDragFinish = (data: any) => {
    storeAddAdminDndData(data)
    // setSitesDndItem(data);
    setValue('notificationSites', data[1].items);
  }

  // useEffect(() => {
  //   setMatchTypesDndItem([{
  //     title: 'Match Type',
  //     items: matchTypes
  //   },
  //   {
  //     title: 'Selected',
  //     items: []
  //   }]);
  // }, [matchTypes]);

  // useEffect(() => {
  //   setSitesDndItem([{
  //     title: 'Site',
  //     items: sites
  //   },
  //   {
  //     title: 'Selected',
  //     items: []
  //   }]);
  // }, [sites]);

  return (
    <div className='p-6 flex flex-col gap-3'>
      <DragNDrop
        onDragFinish={onMatchTypesDragFinish}
        data={storeAdminDndData.matchTypes}
        // customComponents={components}
        wrapperClassName=""
        className="flex flex-col gap-x-4 sm:flex-row"
      />

      {/* <DragNDrop
        onDragFinish={onSitesDragFinish}
        data={dndData.sites}
        // customComponents={components}
        wrapperClassName=""
        className="flex flex-col gap-x-4 sm:flex-row"
      /> */}

    </div>
  )
}

export default SysAdminUserSettings;