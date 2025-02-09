// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { sharedApi } from "./features/shared/store/SharedApi";
import { ministryApi } from "./features/open-applicant-folder/store/ministryEducationApi";
import { applicantClassificationApi } from "./features/open-applicant-folder/store/applicantClassificationApi";
import { applicantComplaintApi } from "./features/open-applicant-folder/store/applicantComplaintApi";
import { newStageApi } from "./features/question-management/store/stageSliceApi";
import { stageCategoryApiSlice } from "./features/question-management/store/stageCategoryApiSlice";
import { questionApiSlice } from "./features/shared/store/questionApiSlice";
import { answerTypeApiSlice } from "./features/question-management/store/answerTypeApiSlice";

export const store = configureStore({
  reducer: {
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
