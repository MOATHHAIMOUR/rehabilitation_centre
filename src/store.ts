// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { sharedApi } from "./Features/shared/store/SharedApi";
import { ministryApi } from "./Features/open_applicant_folder/store/ministryEducationApi";
import { applicantClassificationApi } from "./Features/open_applicant_folder/store/applicantClassificationApi";
import { applicantComplaintApi } from "./Features/open_applicant_folder/store/applicantComplaintApi";

export const store = configureStore({
  reducer: {
    [sharedApi.reducerPath]: sharedApi.reducer,
    [ministryApi.reducerPath]: ministryApi.reducer,
    [applicantClassificationApi.reducerPath]:
      applicantClassificationApi.reducer,
    [applicantComplaintApi.reducerPath]: applicantComplaintApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sharedApi.middleware,
      ministryApi.middleware,
      applicantClassificationApi.middleware,
      applicantComplaintApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
