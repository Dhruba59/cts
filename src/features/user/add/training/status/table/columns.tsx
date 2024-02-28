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
import { formatDate } from "@/utils/helpers";
import { ChangeTrainingStatusPayload } from "@/model/user";

type StatusListColumnsProps = {
  onDownload: (id: any) => void;
  onUpdateTraining: (row: any, checked: boolean) => void;
  // onOverridenDateChange: (date: DateValueType, id: number) => void;
  // onOverrideCheckboxChange: (value: ChangeEvent<HTMLInputElement>, id: number) => void;
  form: UseFormReturn;
}

export const getColumns = ({ onDownload, onUpdateTraining, form }: StatusListColumnsProps): ColumnDef<CompletedTraining>[] => {
  const { register, control, getValues, formState: { errors } } = form;

  // const onUpdate = (row: any, checked: boolean) => {
  //   let payload: ChangeTrainingStatusPayload = {
  //     dateOfOverride: getValues(`overriddenDate${row.original.userTrainingId}`),
  //     override: false,
  //     restart: true,
  //     userTrainingId: row.original.userTrainingId
  //   }
  //   if(checked) {
  //     payload.override = true,
  //     payload.restart = false
  //   }

  //   onUpdateTraining(payload);
  // }

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
      accessorKey: "completionDate",
      cell: ({ row }) => {
        return (
          <div>{formatDate(row.original.completionDate)}</div>
        )
      }
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
          <div className="">
            <Controller
              control={control}
              name={`overriddenDate${row.original.userTrainingId}`}
              rules={{
                // required: "Date is required!",
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Datepicker
                  inputClassName=''
                  onChange={(date) => {
                    onChange(date);
                    // onOverridenDateChange(date, row.original.userTrainingId);
                  }}
                  value={value ?? date}
                  useRange={false}
                  asSingle
                  popoverDirection="down"
                />
              )}
            />
            {errors[`overriddenDate${row.original.userTrainingId}`] && (
              <span className="text-red-500 -mt-10">{errors[`overriddenDate${row.original.userTrainingId}`]?.message as string}</span>
            )}
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
              name={`isOverridden${row.original.userTrainingId}`}
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Checkbox
                  className="disabled:cursor-not-allowed"
                  onChange={(e) => {
                    onChange(e);
                    onUpdateTraining(row, e.target.checked);
                    // onOverrideCheckboxChange(e, row.original.userTrainingId);
                  }}
                  checked={value ?? row.original.overridden}
                  disabled={row.original.status === 'Completed'}
                />
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
        const handleDownload = () => {
          onDownload(row.original.trainingId);
        }
        return (
          <div>
            {row.original.isCertificateAvailable ? <div className="cursor-pointer text-blue-500" onClick={handleDownload} >Download</div> : <div>Not available</div>}
          </div>
        );
      }
    },
  ])
};
