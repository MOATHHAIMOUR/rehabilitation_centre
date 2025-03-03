import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TResearchInfoSchema } from "../types/researchInfoSchema";
import { IResearchCategory } from "../../../store/services/researchCategoryApiSlice";

export interface IResearch {
  isStarted: boolean;
  researchTypeId: number;
  researchTypeName: string;
  nationalNo: string;
  researchFormsData: IResearchFormData[];
  researchCategoriesData: IResearchCategory[];
  currentResearchCategoryForm: IResearchFormData;
}

export interface IResearchFormData {
  researchCategoryId: number;
  formData: TResearchInfoSchema;
  prevpath: string | null;
  currentPath: string;
  nextpath: string | null;
  IsFirstPath: boolean;
  IsLastPath: boolean;
  researchCategoriesIdsPath: number[];
}

export interface IResearchTypeData {
  name: string;
  id: number;
}
export interface IResearchSliceState {
  researchTypesData: IResearchTypeData[];
  researchDic: Record<string, IResearch>;
}

const initialState: IResearchSliceState = {
  researchDic: {},
  researchTypesData: [],
};

const researshSlice = createSlice({
  name: "researshSlice",
  initialState,
  reducers: {
    startResearch: (state, action: PayloadAction<IResearch>) => {
      if (action.payload.researchTypeName in state.researchDic) return;
      state.researchDic[action.payload.researchTypeName] = action.payload;
    },

    updateResarchCategoryFormData: (
      state,
      action: PayloadAction<{
        researchTypeName: string;
        currentFormPath: string;
        updatedForm: IResearchFormData["formData"];
      }>
    ) => {
      const research = state.researchDic[action.payload.researchTypeName];

      const formIndex = research.researchFormsData.findIndex(
        (p) => p.currentPath === action.payload.currentFormPath
      );

      if (formIndex !== -1) {
        research.researchFormsData[formIndex] = {
          ...research.researchFormsData[formIndex],
          formData: { ...action.payload.updatedForm },
        };

        // if (action.payload.direction === "next") {
        //   state.researchDic[
        //     action.payload.researchTypeName
        //   ].currentResearchCategoryForm =
        //     state.researchDic[action.payload.researchTypeName].researchFormsData[
        //       formIndex + 1
        //     ];
        // } else if (action.payload.direction === "prev") {
        //   state.researchDic[
        //     action.payload.researchTypeName
        //   ].currentResearchCategoryForm =
        //     state.researchDic[action.payload.researchTypeName].researchFormsData[
        //       formIndex - 1
        //     ];
      }
    },

    setResearchTypes: (state, action: PayloadAction<IResearchTypeData[]>) => {
      state.researchTypesData = action.payload;
    },
  },
});

export const {
  startResearch,
  setResearchTypes,

  updateResarchCategoryFormData,
} = researshSlice.actions;

export default researshSlice.reducer;
