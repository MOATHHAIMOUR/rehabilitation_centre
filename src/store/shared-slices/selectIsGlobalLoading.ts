import { RootState } from "../../store";

export const selectIsGlobalLoading = (state: RootState) => {
  const apiState = state.applicantFolderApiSlice; // Change this to match your actual reducerPath

  if (!apiState) return false; // Defensive check

  return (
    Object.values(apiState.queries ?? {}).some(
      (query) => query?.status === "pending"
    ) ||
    Object.values(apiState.mutations ?? {}).some(
      (mutation) => mutation?.status === "pending"
    )
  );
};
