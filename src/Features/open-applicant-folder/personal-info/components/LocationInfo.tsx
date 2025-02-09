import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import {
  useGetRegionsQuery,
  useLazyGetCitiesByRegionIdQuery,
  useLazyGetDistrictsByRegionAndCityIdQuery,
} from "../../../shared/store/SharedApi";
import ControlledSelectMenu from "../../../../components/ControlledSelectMenu";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import { TapplicantPersonalInfoSchema } from "../types/applicantPersonalInfoSchema";

const LocationInfo = () => {
  /* ────────────── REACT HOOK FORM ────────────── */
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TapplicantPersonalInfoSchema>(); // ✅ Using useFormContext to avoid prop drilling

  /* ────────────── STATE ────────────── */
  const { data: RegionsResponse } = useGetRegionsQuery();
  const [citiesTrigger, { data: CitiesResponse }] =
    useLazyGetCitiesByRegionIdQuery();
  const [DistrictsTrigger, { data: DistrictsResponse }] =
    useLazyGetDistrictsByRegionAndCityIdQuery();

  const selectedRegionRef = useRef<number>(0);

  const regions =
    RegionsResponse?.data?.map((region) => ({
      label: region.nameAr,
      value: region.regionId,
    })) ?? [];

  const cities =
    CitiesResponse?.data?.map((c) => ({
      label: c.nameAr,
      value: c.cityId,
    })) ?? [];

  const districts =
    DistrictsResponse?.data?.map((district) => ({
      label: district.nameAr,
      value: district.districtId,
    })) ?? [];

  /* ────────────── HANDLERS ────────────── */
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
      {/* Region Select */}
      <ControlledSelectMenu
        control={control}
        label="المنطقة التي يسكن فيها"
        name={"applicantLocationInfo.regionId"}
        options={regions}
        isRequired={true}
        error={errors.applicantLocationInfo?.regionId}
        externalOnChange={(val) => onChangeRegion(val as number)}
      />

      {/* City Select */}
      <ControlledSelectMenu
        control={control}
        label="المدينة التي يسكن فيها"
        name={"applicantLocationInfo.cityId"}
        options={cities}
        isRequired
        error={errors.applicantLocationInfo?.cityId}
        isMulti={false}
        externalOnChange={(val) => onChangeCity(val as number)}
      />

      {/* District Select */}
      <ControlledSelectMenu
        control={control}
        label="الحي السكني"
        name={"applicantLocationInfo.districtId"}
        error={errors.applicantLocationInfo?.districtId}
        options={districts}
        isRequired
        // error={(errors[name as keyof T] as any)?.districtId?.message ?? ""}
      />

      {/* Street Number */}
      <CustomTextInput
        {...register("applicantLocationInfo.streetNumber")}
        error={errors.applicantLocationInfo?.streetNumber?.message}
        label="رقم الشارع"
      />

      {/* Home Number */}
      <CustomTextInput
        {...register("applicantLocationInfo.homeNumber")}
        error={errors.applicantLocationInfo?.homeNumber?.message}
        label="رقم المنزل"
      />
    </>
  );
};

export default LocationInfo;
