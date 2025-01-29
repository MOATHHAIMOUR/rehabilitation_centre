import { useRef } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import SelectMenu from "../../../components/ui/SelectMenu";
import {
  useGetRegionsQuery,
  useLazyGetCitiesByRegionIdQuery,
  useLazyGetDistrictsByRegionAndCityIdQuery,
} from "../../shared/store/SharedApi";
import { IOpenApplicantFolder } from "../interface";
import CustomTextInput from "../../../components/ui/CustomTextInput";

interface LocationInfoProps {
  control: Control<IOpenApplicantFolder>;
  errors: FieldErrors<IOpenApplicantFolder>;
}

const LocationInfo = ({ control, errors }: LocationInfoProps) => {
  /* ────────────── STATE  ────────────── */
  const { data: RegionsResponse } = useGetRegionsQuery();
  const [citiesTrigger, { data: CitiesResponse, isLoading: citiesLoading }] =
    useLazyGetCitiesByRegionIdQuery();
  const [
    DistrictsTrigger,
    { data: DistrictsResponse, isLoading: districtsLoading },
  ] = useLazyGetDistrictsByRegionAndCityIdQuery();

  const selectedRegionRef = useRef<number>(0);

  const regions = RegionsResponse?.data?.map((region) => ({
    label: region.nameAr,
    value: region.regionId,
  }));
  const cities = CitiesResponse?.data?.map((c) => ({
    label: c.nameAr,
    value: c.cityId,
  }));
  const districts = DistrictsResponse?.data?.map((district) => ({
    label: district.nameAr,
    value: district.districtId,
  }));

  /* ────────────── HANDLERS  ────────────── */
  function onChangeRegion(val: number) {
    try {
      citiesTrigger(val);
      selectedRegionRef.current = val;
    } catch {
      //
    }
  }
  function onChangeCity(val: number) {
    try {
      DistrictsTrigger({
        cityId: val,
        regionId: selectedRegionRef.current,
      });
    } catch {
      //
    }
  }

  return (
    <>
      <Controller
        name="applicantLocationInfo.regionId"
        control={control}
        render={({ field }) => (
          <SelectMenu
            isRequired={true}
            error={errors.applicantLocationInfo?.regionId?.message ?? ""}
            {...field}
            onChange={(selected) => {
              if (selected && "value" in selected) {
                field.onChange(selected.value); // Handle single value
                onChangeRegion(selected.value);
              } else {
                field.onChange(null); // Handle no selection
              }
            }}
            value={regions?.find((option) => option.value === field.value)}
            label="المنطقة التي يسكن فيها"
            options={regions ?? []}
          />
        )}
      />
      <Controller
        name="applicantLocationInfo.cityId"
        control={control}
        render={({ field }) => (
          <SelectMenu
            isRequired={true}
            error={errors.applicantLocationInfo?.cityId?.message ?? ""}
            placeholder="إختر المدينة"
            {...field}
            onChange={(selected) => {
              if (!Array.isArray(selected)) {
                field.onChange(selected); // Handle single value
                if (selected) onChangeCity(selected);
              } else {
                field.onChange(null); // Handle no selection
              }
            }}
            value={
              cities?.find((option) => option.value === field.value) || null
            }
            label="المدينة التي يسكن فيها"
            isLoading={citiesLoading}
            options={cities ?? []}
          />
        )}
      />
      <Controller
        name="applicantLocationInfo.districtId"
        control={control}
        render={({ field }) => (
          <SelectMenu
            isRequired={true}
            error={errors.applicantLocationInfo?.districtId?.message ?? ""}
            {...field}
            label="الحي السكني"
            isLoading={districtsLoading}
            onChange={(selected) => {
              if (!Array.isArray(selected)) {
                field.onChange(selected); // Handle single value
              } else {
                field.onChange(null); // Handle no selection
              }
            }}
            value={
              districts?.find((option) => option.value === field.value) || null
            } // Map the field value to React Select's format
            options={districts ?? []}
          />
        )}
      />
      <CustomTextInput name="streetNumber" label="رقم الشارع" />
      <CustomTextInput name="HomeNumber" label="رقم المنزل" />
    </>
  );
};

export default LocationInfo;
