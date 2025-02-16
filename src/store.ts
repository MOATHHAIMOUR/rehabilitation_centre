// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { sharedApi } from "./store/SharedApi";
import { ministryApi } from "./store/ministryEducationApi";
import { applicantClassificationApi } from "./store/applicantClassificationApi";
import { applicantComplaintApi } from "./store/applicantComplaintApi";
import { newStageApi } from "./store/stageSliceApi";
import { stageCategoryApiSlice } from "./store/stageCategoryApiSlice";
import { questionApiSlice } from "./store/questionApiSlice";
import { answerTypeApiSlice } from "./store/answerTypeApiSlice";
import firstResearshReducer from "./features/first-research/store/FirstResearshSlice";

export const store = configureStore({
  reducer: {
    // Slice
    firstResearsh: firstResearshReducer,
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
      answerTypeApiSlice.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
