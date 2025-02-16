import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../interfaces";

interface ICountry {
  countryId: number;
  nameAr: string;
}

interface IRegion {
  regionId: number;
  nameAr: string;
}

interface ICity {
  cityId: number;
  nameAr: string;
}

interface IDistrict {
  districtId: number;
  nameAr: string;
}

export const sharedApi = createApi({
  reducerPath: "sharedApi", // Name of the reducer in the store
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7196/api/Shared/" }), // Replace '/api' with your API's base URL
  endpoints: (builder) => ({
    getCountries: builder.query<IGenericApiResponse<ICountry[]>, void>({
      query: () => "Countries",
    }),
    getRegions: builder.query<IGenericApiResponse<IRegion[]>, void>({
      query: () => "Regions",
    }),
    getCitiesByRegionId: builder.query<IGenericApiResponse<ICity[]>, number>({
      query: (regionId) => `GetCitiesByRegionId?RegionId=${regionId}`,
    }),
    getDistrictsByRegionAndCityId: builder.query<
      IGenericApiResponse<IDistrict[]>,
      { regionId: number; cityId: number }
    >({
      query: ({ regionId, cityId }) =>
        `GetDistrictsByRegionId_CityId?RegionId=${regionId}&CityId=${cityId}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCountriesQuery,
  useGetRegionsQuery,
  useLazyGetCitiesByRegionIdQuery,
  useLazyGetDistrictsByRegionAndCityIdQuery,
} = sharedApi;
