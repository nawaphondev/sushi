/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import thaiProvince from "@/lib/thai_province.json";
import thaiDistrict from "@/lib/thai_district.json";
import thaiSubdistrict from "@/lib/thai_subdistrict.json";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

const addressFormSchema = z.object({
  address: z.string().min(3, { message: "กรุณาระบุที่อยู่" }),
  postalCode: z
    .string()
    .max(5, "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 ตัวเลขนะครับ:)")
    .min(5, "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 ตัวเลข"),
  province: z.string().min(1, "กรุณาระบุจังหวัด"),
  district: z.string().min(1, "กรุณาระบุอำเภอ"),
  subdistrict: z.string().min(1, "กรุณาระบุตำบล"),
});

export default function AddressForm({ title, data }) {
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  // 1. Define your form.
  const addressForm = useForm({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address: data ? data.address : "",
      subdistrict: data ? data.subdistrict : "",
      district: data ? data.district : "",
      province: data ? data.province : "",
      postalCode: data ? data.postalCode : "",
    },
  });

  // 2. Define a submit handler.
  async function addressFormOnSubmit(values) {
    // e.preventDefault()
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // values.province = State.getStateByCodeAndCountry(
    //   values.province,
    //   "TH"
    // ).name;
    values.userId = user.id;
    if (data) values.id = data.id;
    // console.log(values)

    try {
      const res = await axios.post(
        `http://localhost:3001/api/addresses/new`,
        values
      );

      if (res.status === 200) {
        // console.log(res.data)
        toast.success("เพิ่มที่อยู่สำเร็จ");

        queryClient.invalidateQueries({ queryKey: ["addresses"] });
        setOpen(false);
        addressForm.reset();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (addressForm.formState.isLoading) return <div>กำลังโหลด...</div>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild>
        <DialogTrigger>{title}</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...addressForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addressForm.handleSubmit(addressFormOnSubmit)();
              e.stopPropagation();
            }}
            className="flex flex-col gap-y-8 gap-x-8"
          >
            <FormField
              control={addressForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ที่อยู่</FormLabel>
                  <FormControl>
                    <Input placeholder="กรุณาระบุที่อยู่" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addressForm.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>จังหวัด</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกจังหวัด" />
                      </SelectTrigger>
                      <SelectContent>
                        {thaiProvince.map((province) => (
                          <SelectItem
                            key={province.id}
                            value={province.id.toString()}
                          >
                            {province.name_th} - {province.name_en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addressForm.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อำเภอ</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!addressForm.watch("province")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกอำเภอ" />
                      </SelectTrigger>
                      <SelectContent>
                        {thaiDistrict
                          .filter(
                            (district) =>
                              district.province_id ==
                              addressForm.watch("province")
                          )
                          .map((district) => (
                            <SelectItem
                              key={district.id}
                              value={district.id.toString()}
                            >
                              {district.name_th} - {district.name_en}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addressForm.control}
              name="subdistrict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ตำบล</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!addressForm.watch("district")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกตำบล" />
                      </SelectTrigger>
                      <SelectContent>
                        {thaiSubdistrict
                          .filter(
                            (subdistrict) =>
                              subdistrict.amphure_id ==
                              addressForm.watch("district")
                          )
                          .map((subdistrict) => (
                            <SelectItem
                              key={subdistrict.id}
                              value={subdistrict.id.toString()}
                            >
                              {subdistrict.name_th} - {subdistrict.name_en}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addressForm.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รหัสไปรษณีย์</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="รหัสไปรษณีย์"
                      {...field}
                      maxLength={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">บันทึกการเปลี่ยนแปลง</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
