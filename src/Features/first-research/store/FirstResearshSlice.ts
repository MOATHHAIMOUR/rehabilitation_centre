import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFirstResearshFormsData {
  key: number;
  IsFirstPath: boolean;
  IsLastPath: boolean;
  name: string;
  path: string;
  stageCategoryIdsPath: number[];
}

export interface ICurrentFormInfo {
  formKey: number;
  stageCategoryIdsPath: number[];
  currentStageCategoryId: number;
  currentPath: string;
  prevPath: string | null;
  NextPath: string | null;
  IsLastForm: boolean;
  IsFirstForm: boolean;
}

export interface IFirstResearshState {
  IsDataFetched: boolean;
  FirstResearshFormsData: IFirstResearshFormsData[];
  CurrentFormInfo: ICurrentFormInfo;
}

const initialState: IFirstResearshState = {
  IsDataFetched: false,
  CurrentFormInfo: {
    formKey: -1,
    currentPath: "",
    IsFirstForm: false,
    IsLastForm: false,
    NextPath: "",
    prevPath: "",
    stageCategoryIdsPath: [],
    currentStageCategoryId: -1,
  },
  FirstResearshFormsData: [],
};

const firstResearsh = createSlice({
  name: "firstResearsh",
  initialState,
  reducers: {
    setUpResearshForm: (
      state,
      action: PayloadAction<IFirstResearshFormsData[]>
    ) => {
      state.IsDataFetched = true;
      state.FirstResearshFormsData = action.payload;
      state.CurrentFormInfo = {
        formKey: action.payload[0].key,
        currentPath: action.payload[0].path,
        IsFirstForm: true,
        IsLastForm: false,
        NextPath: action.payload[1].path,
        prevPath: null,
        stageCategoryIdsPath: action.payload[0].stageCategoryIdsPath,
        currentStageCategoryId:
          action.payload[0].stageCategoryIdsPath[
            action.payload[0].stageCategoryIdsPath.length - 1
          ],
      };
    },
    setForm: (state, action: PayloadAction<ICurrentFormInfo>) => {
      state.CurrentFormInfo = action.payload;
    },
  },
});

export const { setUpResearshForm, setForm } = firstResearsh.actions;

export default firstResearsh.reducer;
