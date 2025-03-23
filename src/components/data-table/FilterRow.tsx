import { Trash2, GripVertical } from "lucide-react";
import { ControlledSelectMenu } from "../ControlledSelectMenu";
import { DynamicFilterInput } from "./DynamicFilterInput";
import Box from "../ui/Box";
import {
  dateOperations,
  numberOperations,
  statusOperations,
  stringOperations,
  TFilterSchema,
} from "./types";
import {
  Control,
  UseFieldArrayRemove,
  Path,
  useWatch,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { memo, useEffect } from "react";
import { ColumnLabelItem } from "./DataTableFilter";

interface FilterRowProps {
  index: number;
  field: TFilterSchema["filterDataTable"][0];
  control: Control<TFilterSchema>;
  remove: UseFieldArrayRemove;
  setValue: UseFormSetValue<TFilterSchema>;
  getValues: UseFormGetValues<TFilterSchema>;
  columnLabels: ColumnLabelItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listeners?: any;
  isOver?: boolean;
  isOverOtherGroup?: boolean;
  isOverExistingGroup?: boolean;
}

const FilterRow = ({
  index,
  field,
  control,
  remove,
  setValue,
  getValues,
  columnLabels,
  listeners,
  isOver,
}: FilterRowProps) => {
  const watchedRow = useWatch({
    name: `filterDataTable.${index}`,
  });

  const columnData = useWatch({ name: "columnNames", control });

  useEffect(() => {
    const colType = columnLabels.find(
      (col) => col.accessorKey === watchedRow.searchBy
    )?.type;
    if (!colType) return;

    setValue(`filterDataTable.${index}.filterType`, colType);
    setValue(`filterDataTable.${index}.selectedOpreation`, undefined);

    switch (colType) {
      case "string":
        setValue(`filterDataTable.${index}.opreations`, stringOperations);
        break;
      case "number":
        setValue(`filterDataTable.${index}.opreations`, numberOperations);
        break;
      case "date":
        setValue(`filterDataTable.${index}.opreations`, dateOperations);
        break;
      case "status":
        setValue(`filterDataTable.${index}.opreations`, statusOperations);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedRow.searchBy]);

  // Optional: auto-sync all joinTypes if the second one changes
  useEffect(() => {
    const values = getValues("filterDataTable");
    const firstJoinType = values?.[1]?.joinType;
    if (firstJoinType) {
      values.forEach((_p, idx) => {
        setValue(`filterDataTable.${idx}.joinType`, firstJoinType);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedRow.joinType]);

  return (
    <Box
      className={`filter-row flex items-center gap-4 w-full relative ${
        isOver ? "dragging-over" : ""
      }`}
      style={{
        border: isOver ? "2px solid green" : "none",
        padding: isOver ? "8px" : "0",
      }}
    >
      <Box>
        {index === 0 ? (
          <p className="w-[100px]">حسب</p>
        ) : (
          <ControlledSelectMenu
            disabled={index > 1}
            options={[
              { label: "and", value: "and" },
              { label: "or", value: "or" },
            ]}
            name={`filterDataTable.${index}.joinType` as Path<TFilterSchema>}
            label=""
            control={control}
            width="w-[100px]"
          />
        )}
      </Box>

      <ControlledSelectMenu
        control={control}
        name={`filterDataTable.${index}.searchBy` as Path<TFilterSchema>}
        options={
          columnData?.map((p) => ({
            label: p.displayColumnName,
            value: p.columnName,
          })) ?? []
        }
        width="w-[140px]"
      />

      <ControlledSelectMenu
        control={control}
        name={
          `filterDataTable.${index}.selectedOpreation` as Path<TFilterSchema>
        }
        options={watchedRow.opreations.map((op: string) => ({
          label: op,
          value: op,
        }))}
        width="w-[140px]"
        placeholder="اختر خيارا"
      />

      <DynamicFilterInput
        index={index}
        name={`filterDataTable.${index}`}
        field={field}
      />

      <button
        type="button"
        onClick={() => remove(index)}
        className="rounded-md bg-red-100 p-2 text-red-600 hover:bg-red-200"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <span
        {...listeners}
        className="rounded-md bg-gray-200 p-2 text-gray-600 cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" />
      </span>
    </Box>
  );
};

export default memo(FilterRow);
