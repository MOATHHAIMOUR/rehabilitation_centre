// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { sharedApi } from "./store/services/SharedApi";
import { ministryApi } from "./store/services/ministryEducationApi";
import { applicantClassificationApi } from "./store/services/applicantClassificationApi";
import { applicantComplaintApi } from "./store/services/applicantComplaintApi";
import { researchCategoryApiSlice } from "./store/services/researchCategoryApiSlice";
import { questionApiSlice } from "./store/services/questionApiSlice";
import { answerTypeApiSlice } from "./store/services/answerTypeApiSlice";
import researshSlice from "./features/first-research/store/researshSlice";
import authSlice from "./features/Auth/store/AuthSlice";
import SaveApplicantFolderSlice from "./features/open-applicant-folder/wrapper/store/SaveApplicantSlice";

import { otpCodeAPISlice } from "./store/services/otpCodeAPISlice";
import { researchTypeSliceApi } from "./store/services/researchTypeSliceApi";
import { applicantFolderApiSlice } from "./store/services/applicantFolderApiSlice";

export const store = configureStore({
  reducer: {
    // Slice
    researshSlice: researshSlice,
    authSlice: authSlice,
    SaveApplicantFolderSlice: SaveApplicantFolderSlice,
    // Api Slice
    [sharedApi.reducerPath]: sharedApi.reducer,
    [ministryApi.reducerPath]: ministryApi.reducer,
    [applicantClassificationApi.reducerPath]:
      applicantClassificationApi.reducer,
    [applicantComplaintApi.reducerPath]: applicantComplaintApi.reducer,
    [researchTypeSliceApi.reducerPath]: researchTypeSliceApi.reducer,
    [researchCategoryApiSlice.reducerPath]: researchCategoryApiSlice.reducer,
    [questionApiSlice.reducerPath]: questionApiSlice.reducer,
    [answerTypeApiSlice.reducerPath]: answerTypeApiSlice.reducer,
    [otpCodeAPISlice.reducerPath]: otpCodeAPISlice.reducer,
    [applicantFolderApiSlice.reducerPath]: applicantFolderApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sharedApi.middleware,
      ministryApi.middleware,
      applicantClassificationApi.middleware,
      applicantComplaintApi.middleware,
      researchTypeSliceApi.middleware,
      researchCategoryApiSlice.middleware,
      questionApiSlice.middleware,
      answerTypeApiSlice.middleware,
      otpCodeAPISlice.middleware,
      applicantFolderApiSlice.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
