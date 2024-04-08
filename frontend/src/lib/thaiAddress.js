import thaiProvince from "@/lib/thai_province.json";
import thaiDistrict from "@/lib/thai_district.json";
import thaiSubdistrict from "@/lib/thai_subdistrict.json";

export function thaiAddressIdToString(id, type) {
  let data;
  switch (type) {
    case "province":
      data = thaiProvince.find((province) => province.id == id);
      break;
    case "district":
      data = thaiDistrict.find((district) => district.id == id);
      break;
    case "subdistrict":
      data = thaiSubdistrict.find((subdistrict) => subdistrict.id == id);
      break;
    default:
      break;
  }

  return data.name_th;
}

export default function thaiAddress(address) {
  return `${address.address}, ${thaiAddressIdToString(
    address.subdistrict,
    "subdistrict"
  )}, ${thaiAddressIdToString(
    address.district,
    "district"
  )}, ${thaiAddressIdToString(address.province, "province")}, ${
    address.postalCode
  }`;
}
