import DragNDrop from '@/components/dnd';
import Select from '@/components/ui/select';
import { useGetSiteDetailWithProtocol } from '@/hooks/rq-hooks/user-hooks';
import { DropDownItem, SelectOptionType } from '@/model/drop-down-list';
import { DndDataItem, DndDataType } from '@/types/common';
import { convertTypeToSelectOption } from '@/utils/helpers';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, UseFormReturn, useWatch } from 'react-hook-form';
import { searchByIds } from '.';
import { filterDndData } from './training/training';

interface SiteUserSettingsProps {
  form: UseFormReturn;
  dndData: any,
  setDndData: any,
  sites: DropDownItem[];
  suppressMatchTypes: DropDownItem[];
  setSelectedProtocols: Dispatch<SetStateAction<DndDataItem[]>>;
  initialProtocolsIds?: string[] | undefined;
  initialSiteId?: string;
}

const SiteUserSettings = ({ form, sites, dndData, initialProtocolsIds, setDndData, suppressMatchTypes, setSelectedProtocols, initialSiteId }: SiteUserSettingsProps) => {
  const { register, watch, control, setValue, formState: { errors } } = form;
  const [siteOptions, setSiteOptions] = useState<SelectOptionType[]>();
  const [matchTypeOptions, setMatchTypeOptions] = useState<SelectOptionType[]>();
  const [selectedSiteId, setSelectedSiteId] = useState<number>();
  const [siteDndItem, setSiteDndItem] = useState<DndDataType[]>([]);
  const { data: siteDetail, isLoading: isSiteDetailLoading } = useGetSiteDetailWithProtocol({ SiteId: selectedSiteId?.toString() ?? initialSiteId });



  const onDragFinish = (data: any) => {
    setDndData(data);

    // setSiteDndItem(data);
    setSelectedProtocols(data[1].items);
    setValue('protocols', data[1].items);
  }

  useEffect(() => {
    // setSiteDndItem(siteDetail?.data.protocols);

    if (siteDetail) {
      const items = siteDetail?.data?.protocols.map((item: any) => {
        return ({
          text: item.protocolNumber,
          value: item.protocolId
        });
      });
      let selectedItems: DndDataItem[] = [];
      if (initialProtocolsIds) {
        selectedItems = searchByIds(items, initialProtocolsIds);
        setSelectedProtocols(selectedItems);
        setValue('protocols', selectedItems);
      }
      const dndItems = [{
        title: 'Protocols',
        items: items
      },
      {
        title: 'Selected',
        items: selectedItems
      }
      ];
      setDndData(filterDndData(dndItems));

      // setSiteDndItem(dndItems);

      setValue('city', siteDetail?.data?.city);
      setValue('address1', siteDetail?.data?.address1);
      setValue('state', siteDetail?.data?.state);
      setValue('zip', siteDetail?.data?.zip);
    }
  }, [siteDetail, initialProtocolsIds]);

  useEffect(() => {
    setSiteOptions(convertTypeToSelectOption(sites));
  }, [sites]);

  useEffect(() => {
    setMatchTypeOptions(convertTypeToSelectOption(suppressMatchTypes));
  }, [suppressMatchTypes]);

  return (
    <div className='flex flex-col gap-3 p-6'>
      <div>
        <Controller
          control={control}
          name='site'
          rules={{
            // required: 'User type is required!',
          }}
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              onChange={(option) => {
                onChange(option);
                setSelectedSiteId(option.value);
                setSelectedProtocols([]);
              }}
              label="Site Name"
              options={siteOptions}
              value={value} />
          )}
        />
        {errors.siteName && (
          <span className="text-red-500 -mt-10">{errors.siteName.message as string}</span>
        )}
      </div>

      <DragNDrop
        onDragFinish={onDragFinish}
        data={dndData}
        // customComponents={components}
        wrapperClassName=""
        className="flex flex-col gap-x-4 sm:flex-row"
      />

      <div>
        <Controller
          control={control}
          name='suppressMatchType'
          rules={{
            required: 'Suppress match type is required!',
          }}
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select onChange={onChange} label="Suppress match type" options={matchTypeOptions} value={value} />
          )}
        />
        {errors.suppressMatchType && (
          <span className="text-red-500 -mt-10">{errors.suppressMatchType.message as string}</span>
        )}
      </div>
    </div>
  )
}

export default SiteUserSettings