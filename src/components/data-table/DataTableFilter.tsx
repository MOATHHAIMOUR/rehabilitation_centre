import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { ColumnType, TFilterSchema } from "./types";
import Button from "../ui/Button";
import { CustomColumnDef } from "./Columns";
import { FaFilter } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Box from "../ui/Box";
import FilterRow from "./FilterRow";
import {
  useSensor,
  useSensors,
  PointerSensor,
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import SortableItem from "./SortableItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const filterItemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,

    transition: { duration: 0.2, ease: "easeIn" },
  },
};

interface FilterBuilderProps {
  onSubmit: (query: string) => void;
  columnsData: CustomColumnDef[];
}

export type ColumnLabelItem = {
  accessorKey: string;
  header: string;
  type: ColumnType;
  isSearchValuesMenu: boolean;
  searchValuesOptions?: { lable: string; value: string }[];
};

function DataTableFilter({ columnsData }: FilterBuilderProps) {
  const columnsDataRef = useRef<CustomColumnDef[]>(columnsData);
  const filterRef = useRef<HTMLDivElement>(null);
  const buttonfilterRef = useRef<HTMLButtonElement>(null);

  const columnLabels: ColumnLabelItem[] = useMemo(() => {
    return (
      columnsDataRef.current?.map((col) => {
        const header =
          typeof col.header === "string" ? col.header : "Custom Header";
        const accessorKey =
          "accessorKey" in col && typeof col.accessorKey === "string"
            ? col.accessorKey
            : "unknown";
        return {
          accessorKey,
          header,
          type: col.type ?? "unknown",
          isSearchValuesMenu: !!col.searchValuesOptions,
          searchValuesOptions: col.searchValuesOptions ?? [],
        };
      }) ?? []
    );
  }, []);

  const [showFilterTB, setShowFilterTB] = useState(false);

  const methods = useForm<TFilterSchema>({
    defaultValues: {
      columnNames: columnLabels.map((p) => ({
        displayColumnName: p.header,
        columnName: p.accessorKey,
      })),
    },
  });

  const { control, reset, handleSubmit, setValue, getValues } = methods;

  const { append, fields, remove, move } = useFieldArray({
    control,
    name: "filterDataTable",
  });

  const sensors = useSensors(useSensor(PointerSensor));
  const [, setActiveId] = useState<string | null>(null);

  const handleAddFilterToFilterTable = () => {
    append({
      id: crypto.randomUUID(),
      groupKey: "other",
      filterType: undefined,
      searchBy: undefined,
      opreations: [],
      selectedOpreation: undefined,
      isFirstFilter: fields.length === 0,
      joinType: fields.length === 0 ? null : "and",
    });
  };

  const onReset = () =>
    reset({
      columnNames: columnLabels.map((p) => ({
        displayColumnName: p.header,
        columnName: p.accessorKey,
      })),
      filterDataTable: [],
    });

  const onValid = (data: TFilterSchema) => {
    console.log(data);
  };

  // 🧠 Fix close-on-select by detecting Radix popper content
  useEffect(() => {
    if (!showFilterTB) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      console.log(target);
      const clickedInsideRadix =
        target.closest("[data-radix-popper-content-wrapper]") ||
        target.closest("[role='listbox']");

      if (
        document.body.style.pointerEvents === "none" ||
        document.querySelector("[data-state='open']") // Radix often uses this
      ) {
        return;
      }

      if (
        clickedInsideRadix ||
        filterRef.current?.contains(target) ||
        buttonfilterRef.current?.contains(target)
      ) {
        return;
      }

      setShowFilterTB(false);
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowFilterTB(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [showFilterTB]);

  return (
    <FormProvider {...methods}>
      {/* 🔘 Toggle Filters Panel */}
      <button
        ref={buttonfilterRef}
        onClick={() => setShowFilterTB((p) => !p)}
        className="flex items-center gap-2 rounded-md border border-gray-700 bg-white text-black px-4 py-1.5 shadow-sm hover:bg-gray-100 transition duration-150"
      >
        <FaFilter className="text-gray-700" />
        <span className="font-semibold text-xs">الفلاتر</span>
        <span className="text-xs font-medium bg-gray-800 text-white px-2 py-0.5 rounded">
          {fields.length}
        </span>
      </button>
      <AnimatePresence>
        {showFilterTB && (
          <motion.div
            ref={filterRef}
            variants={filterItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-50 absolute w-1/2 bg-white text-gray-900 shadow-2xl rounded-lg border border-gray-800"
          >
            <form onSubmit={handleSubmit(onValid)} className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-lg font-semibold">البحث المتقدم</h3>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={({ active }) => setActiveId(active.id as string)}
                onDragEnd={({ active, over }) => {
                  setActiveId(null);
                  if (active.id !== over?.id) {
                    const oldIndex = fields.findIndex(
                      (f) => f.id === active.id
                    );
                    const newIndex = fields.findIndex((f) => f.id === over?.id);
                    move(oldIndex, newIndex);
                  }
                }}
              >
                <SortableContext
                  items={fields.map((f) => f.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Box className="flex flex-col gap-4">
                    {fields.map((field, index) => (
                      <SortableItem key={field.id} id={field.id}>
                        {(listeners) => (
                          <FilterRow
                            columnLabels={columnLabels}
                            key={field.id}
                            setValue={setValue}
                            control={control}
                            field={field}
                            getValues={getValues}
                            index={index}
                            remove={remove}
                            listeners={listeners}
                          />
                        )}
                      </SortableItem>
                    ))}
                  </Box>
                </SortableContext>
              </DndContext>

              <div className="flex flex-wrap justify-end gap-2 pt-4">
                <Button
                  type="button"
                  onClick={handleAddFilterToFilterTable}
                  className="bg-teal-700 text-white py-1 px-4 rounded-md"
                >
                  إضافة شرط تصفية جديد
                </Button>
                <Button
                  type="button"
                  onClick={onReset}
                  className="bg-gray-500 text-white py-1 px-4 rounded-md"
                >
                  إعادة التصفية
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </FormProvider>
  );
}

export default DataTableFilter;
