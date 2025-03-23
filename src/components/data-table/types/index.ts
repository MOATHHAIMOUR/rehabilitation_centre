import { z } from "zod";

export const columnTypes = ["string", "number", "date", "status"] as const;

// 2. Infer the union type (optional if you already have ColumnType)
export type ColumnType = (typeof columnTypes)[number];

// ---------------------------------------------
// Step 1:  OPREATIONS
// ---------------------------------------------

// string Operations
export const stringOperations = [
  "Contains",
  "Does not contain",
  "Is",
  "Is not",
  "Is empty",
  "Is not empty",
];

// Number Operations
export const numberOperations = [
  "Is",
  "Is not",
  "Is greater than",
  "Is less than",
  "Is greater than or equal to",
  "Is less than or equal to",
  "Is between",
  "Is not between",
  "Is empty",
  "Is not empty",
];

// Date Operations
export const dateOperations = [
  "Is",
  "Is not",
  "Is before",
  "Is after",
  "Is on or before",
  "Is on or after",
  "Is between",
  "Is relative to today",
  "Is empty",
  "Is not empty",
];

// Status Operations
export const statusOperations = ["Is", "Is not", "Is empty", "Is not empty"];
// ---------------------------------------------
// Step 2: Base schema for all filters
// ---------------------------------------------

const baseFilterSchema = z.object({
  id: z.string().describe("Unique ID"),
  groupKey: z.string(),
  searchBy: z.string().optional(),
  opreations: z.array(z.string()),
});

// ---------------------------------------------
// 🔤 Step 3: Specific filter schemas
// ---------------------------------------------

const stringFilterSchema = baseFilterSchema.merge(
  z.object({
    filterType: z.literal("string"),
    selectedOpreation: z
      .enum([
        "Contains",
        "Does not contain",
        "Is",
        "Is not",
        "Is empty",
        "Is not empty",
      ])
      .optional(),
    isFirstFilter: z.boolean(),
    joinType: z.enum(["and", "or"]).nullable(),
    searchValue: z.string().optional(),
  })
);

const numberFilterSchema = baseFilterSchema.merge(
  z.object({
    filterType: z.literal("number"),
    selectedOpreation: z
      .enum([
        "Is",
        "Is not",
        "Is greater than",
        "Is less than",
        "Is greater than or equal to",
        "Is less than or equal to",
        "Is between",
        "Is not between",
        "Is empty",
        "Is not empty",
      ])
      .optional(),
    isFirstFilter: z.boolean(),
    joinType: z.enum(["and", "or"]).nullable(),
    searchValue: z.number().optional(),
  })
);

const dateFilterSchema = baseFilterSchema.merge(
  z.object({
    filterType: z.literal("date"),
    selectedOpreation: z
      .enum([
        "Is",
        "Is not",
        "Is before",
        "Is after",
        "Is on or before",
        "Is on or after",
        "Is between",
        "Is relative to today",
        "Is empty",
        "Is not empty",
      ])
      .optional(),
    isFirstFilter: z.boolean(),
    searchValue: z.date().optional(),
    joinType: z.enum(["and", "or"]).nullable(),
  })
);

const statusFilterSchema = baseFilterSchema.merge(
  z.object({
    filterType: z.literal("status").optional(),
    selectedOpreation: z
      .enum(["Is", "Is not", "Is empty", "Is not empty"])
      .optional(),
    isFirstFilter: z.boolean(),
    searchValues: z
      .array(
        z.object({
          lable: z.string(),
          value: z.string(),
        })
      )
      .optional(),
    joinType: z.enum(["and", "or"]).nullable(),
  })
);

// ---------------------------------------------
// 🔗 Step 4: Add Join Logic (AND / OR)
// ---------------------------------------------

// ---------------------------------------------
// 🧩 Step 5: Combine full filter
// ---------------------------------------------

export const filterItemSchema = z.union([
  stringFilterSchema,
  numberFilterSchema,
  dateFilterSchema,
  statusFilterSchema,
]);

// ---------------------------------------------
// 📦 Step 6: Final filters array schema
// ---------------------------------------------

export const filterbySchema = z.object({
  columnNames: z.array(
    z.object({
      displayColumnName: z.string(),
      columnName: z.string(),
    })
  ),
  filterDataTable: z.array(filterItemSchema),
});

// Infer type
export type TFilterSchema = z.infer<typeof filterbySchema>;
