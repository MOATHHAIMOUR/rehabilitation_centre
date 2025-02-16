import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFirstResearshFormsData {
  key: number;
  IsFirstPath: boolean;
  IsLastPath: boolean;
  name: string;
  path: string;
  stageCategoryId: number;
}

export interface ICurrentFormInfo {
  formKey: number;
  stageCategoryId: number;
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
    stageCategoryId: 0,
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
        formKey: -1,
        currentPath: action.payload[0].path,
        IsFirstForm: true,
        IsLastForm: false,
        NextPath: action.payload[1].path,
        prevPath: null,
        stageCategoryId: action.payload[0].stageCategoryId,
      };
    },
    setForm: (state, action: PayloadAction<ICurrentFormInfo>) => {
      state.CurrentFormInfo = action.payload;
    },
  },
});

export const { setUpResearshForm, setForm } = firstResearsh.actions;

export default firstResearsh.reducer;
