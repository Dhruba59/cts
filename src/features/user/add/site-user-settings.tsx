import DragNDrop from '@/components/dnd';
import Select from '@/components/ui/select';
import { DropDownItem, SelectOptionType } from '@/model/drop-down-list';
import { DndDataItem } from '@/types/common';
import { convertTypeToSelectOption } from '@/utils/helpers';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { searchByIds } from '.';
import { filterDndData } from './training/training';
import useProtocolListStore from '@/store';

interface SiteUserSettingsProps {
  form: UseFormReturn;
  sites: DropDownItem[];
  suppressMatchTypes: DropDownItem[];
  setSiteUserSiteId: Dispatch<SetStateAction<string | undefined>>;
  isSiteFieldDisabled?: boolean;
}

const SiteUserSettings = ({ form, sites, suppressMatchTypes, setSiteUserSiteId, isSiteFieldDisabled=false }: SiteUserSettingsProps) => {
  const { control, setValue, formState: { errors }, getValues } = form;
  const [siteOptions, setSiteOptions] = useState<SelectOptionType[]>();
  const [matchTypeOptions, setMatchTypeOptions] = useState<SelectOptionType[]>();
  // const [selectedSiteId, setSelectedSiteId] = useState<number>();
  // const [siteDndItem, setSiteDndItem] = useState<DndDataType[]>([]);
  // const setProtocols = useProtocolListStore((state) => state.setProtocols)
  const storeSetSelectedProtocols = useProtocolListStore((state) => state.setSelectedProtocols)

  const storeSiteDetail = useProtocolListStore((state) => state.siteDetail)
  const storeSelectedProtocols = useProtocolListStore((state) => state.selectedProtocols)
  const storeInitialSiteProtocolIds = useProtocolListStore((state) => state.initialSiteProtocolIds)
  const storeDndData = useProtocolListStore((state) => state.dndData)
  const storeSetDndData = useProtocolListStore((state) => state.setDndData)

  const onDragFinish = (data: any) => {    
    storeSetDndData(data)
    storeSetSelectedProtocols(data[1].items);
    setValue('protocols', data[1].items);
  }

  useEffect(() => {
    if (storeSiteDetail) {
      const items = storeSiteDetail?.data?.protocols.map((item: any) => {
        return ({
          text: item.protocolNumber,
          value: item.protocolId
        });
      });
      let newSelectedProtocolIds = storeSelectedProtocols ? storeSelectedProtocols.map(item => item.value) : [];
      let selectedItems: DndDataItem[] = [];
      if (storeInitialSiteProtocolIds) {
        selectedItems = searchByIds(items, newSelectedProtocolIds.length? newSelectedProtocolIds : storeInitialSiteProtocolIds);
        storeSetSelectedProtocols(selectedItems);
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

      storeSetDndData(filterDndData(dndItems) as any)
      setValue('city', storeSiteDetail?.data?.city);
      const address1 = getValues('address1')
      setValue('address1', storeSiteDetail?.data?.address1 || address1);
      setValue('state', storeSiteDetail?.data?.state);
      setValue('zip', storeSiteDetail?.data?.zip);
    }
  }, [storeSiteDetail, storeInitialSiteProtocolIds]);

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
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              onChange={(option) => {
                onChange(option);
                setSiteUserSiteId(option.value);
                // setSelectedProtocols([]);
                storeSetSelectedProtocols([])
              }}
              isDisabled={isSiteFieldDisabled}
              label="Site Name"
              options={siteOptions}
              value={value} />
          )}
        />
        {errors.site && (
          <span className="text-red-500 -mt-10">{errors.site.message as string}</span>
        )}
      </div>

      <DragNDrop
        onDragFinish={onDragFinish}
        data={storeDndData}
        wrapperClassName=""
        className="flex flex-col gap-x-4 sm:flex-row"
      />

      <div>
        <Controller
          control={control}
          name='suppressMatchType'
          rules={{}}
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