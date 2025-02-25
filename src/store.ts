// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { sharedApi } from "./store/services/SharedApi";
import { ministryApi } from "./store/services/ministryEducationApi";
import { applicantClassificationApi } from "./store/services/applicantClassificationApi";
import { applicantComplaintApi } from "./store/services/applicantComplaintApi";
import { newStageApi } from "./store/services/stageSliceApi";
import { stageCategoryApiSlice } from "./store/services/stageCategoryApiSlice";
import { questionApiSlice } from "./store/services/questionApiSlice";
import { answerTypeApiSlice } from "./store/services/answerTypeApiSlice";
import firstResearshReducer from "./features/first-research/store/FirstResearshSlice";
import authSlice from "./features/Auth/store/AuthSlice";
import SaveApplicantFolderSlice from "./features/open-applicant-folder/wrapper/store/SaveApplicantSlice";

import { otpCodeAPISlice } from "./store/services/otpCodeAPISlice";

export const store = configureStore({
  reducer: {
    // Slice
    firstResearsh: firstResearshReducer,
    authSlice: authSlice,
    SaveApplicantFolderSlice: SaveApplicantFolderSlice,
    // Api Slice
    [sharedApi.reducerPath]: sharedApi.reducer,
    [ministryApi.reducerPath]: ministryApi.reducer,
    [applicantClassificationApi.reducerPath]:
      applicantClassificationApi.reducer,
    [applicantComplaintApi.reducerPath]: applicantComplaintApi.reducer,
    [newStageApi.reducerPath]: newStageApi.reducer,
    [stageCategoryApiSlice.reducerPath]: stageCategoryApiSlice.reducer,
    [questionApiSlice.reducerPath]: questionApiSlice.reducer,
    [answerTypeApiSlice.reducerPath]: answerTypeApiSlice.reducer,
    [otpCodeAPISlice.reducerPath]: otpCodeAPISlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sharedApi.middleware,
      ministryApi.middleware,
      applicantClassificationApi.middleware,
      applicantComplaintApi.middleware,
      newStageApi.middleware,
      stageCategoryApiSlice.middleware,
      questionApiSlice.middleware,
      answerTypeApiSlice.middleware,
      otpCodeAPISlice.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
