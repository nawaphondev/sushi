import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AddressForm from "../../components/forms/AddressForm";
import { toast } from "sonner";
import { thaiAddressIdToString } from "@/lib/thaiAddress";

export default function UserAddress() {
  const queryClient = useQueryClient();
  const {
    data: addresses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: () =>
      axios
        .get("http://localhost:3001/api/addresses/allbyuserid")
        .then((res) => {
          return res.data;
        }),
  });

  if (isError) {
    return <div>เกิดข้อผิดพลาด</div>;
  }

  if (isLoading) {
    return <div>กำลังโหลด...</div>;
  }

  return (
    <div className="flex flex-col justify-center flex-1 gap-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ที่อยู่</CardTitle>
          <AddressForm title="เพิ่มที่อยู่ใหม่" />
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          {addresses.length > 0
            ? addresses.map((address) => (
                <div
                  key={address.id}
                  className="flex items-center justify-between"
                >
                  <p>
                    {address.address},{" "}
                    {thaiAddressIdToString(address.subdistrict, "subdistrict")},{" "}
                    {thaiAddressIdToString(address.district, "district")},{" "}
                    {thaiAddressIdToString(address.province, "province")},{" "}
                    {address.postalCode}
                  </p>
                  <div className="flex items-center gap-x-2">
                    <AddressForm title="แก้ไขที่อยู่" data={address} />
                    <Button
                      variant="destructive"
                      onClick={() =>
                        axios
                          .post(
                            "http://localhost:3001/api/addresses/delete",
                            address
                          )
                          .then((res) => {
                            if (res.status === 200) {
                              toast.success("ลบที่อยู่สำเร็จ");
                              queryClient.invalidateQueries({
                                queryKey: ["addresses"],
                              });
                            }
                          })
                      }
                    >
                      ลบที่อยู่
                    </Button>
                  </div>
                </div>
              ))
            : "ไม่พบที่อยู่ เพิ่มเลย!"}
        </CardContent>
      </Card>
    </div>
  );
}
