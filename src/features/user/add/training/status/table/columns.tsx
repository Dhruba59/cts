import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import Checkbox, { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { Indication, IndicationQuery } from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";
import Datepicker from "@/components/ui/datepicker";
import { DateValueType } from "react-tailwindcss-datepicker";
import { ChangeEvent, ChangeEventHandler, useMemo } from "react";
import { CompletedTraining } from "../../training";
import Button from "@/components/ui/button";
import { Controller, UseFormReturn } from "react-hook-form";
import { searchTrainingIndexById } from "./listTable";

type StatusListColumnsProps = {
  onDownload: (id: any) => void;
  onOverridenDateChange: (date: DateValueType, id: number) => void;
  onOverrideCheckboxChange: (value: ChangeEvent<HTMLInputElement>, id: number) => void;
  form: UseFormReturn;
}

export const getColumns = ({ onDownload, onOverrideCheckboxChange, onOverridenDateChange, form }: StatusListColumnsProps): ColumnDef<CompletedTraining>[] => {
  const { register, control, formState: { errors } } = form;


  
  return ([
    {
      header: "Protocol",
      accessorKey: "protocolNumber",
    },
    {
      header: "Module Name",
      accessorKey: "moduleName"
    },
    {
      header: "Status",
      accessorKey: "status"
    },
    {
      header: "Completion Date",
      accessorKey: "completionDate"
    },
    {
      header: "Date Of Overridden",
      accessorKey: "dateOfOveridden",
      cell: ({ row }) => {
        const date = {
          startDate: row.original.dateOfOverridden,
          endDate: row.original.dateOfOverridden
        }
        return (
          <div className="relative">
            <div>
              <Controller
                control={control}
                name={`overriddenDate${row.original.userTrainingId}`}
                rules={{
                  // required: "Date is required!",
                }}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Datepicker
                    inputClassName='w-[120px]'
                    onChange={(date) => {
                      onChange(date);
                      onOverridenDateChange(date, row.original.userTrainingId)
                    }}
                    value={value ?? date}
                    useRange={false}
                    asSingle
                    popoverDirection="down"
                  />
                )}
              />
              {errors.overridenDate && (
                <span className="text-red-500 -mt-10">{errors.overridenDate.message as string}</span>
              )}
            </div>
          </div>
        );
      }
    },
    {
      header: "Override",
      accessorKey: "overridden",
      cell: ({ row }) => {
        return (
          <div className="">
            <Controller
              name="isOverridden"
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Checkbox onChange={onChange} value={value} />
              )}
            />
          </div>
        );
      }
    },
    {
      header: "Overridden By	",
      accessorKey: "overriddenBy",
    },
    {
      header: "Certificate",
      accessorKey: "certificate",
      cell: ({ row }) => {
        return (
          <div className="cursor-pointer text-blue-500">{row.original.isCertificateAvailable ? 'Download' : 'Not available'}</div>
        );
      }
    },
  ])
};
