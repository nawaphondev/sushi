import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Icons from "@/components/ui/Icons";
import promptpay from "../assets/promptpay.png";
import { State, City } from "country-state-city";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

const formSchema = z.object({
  firstname: z.string().min(3, { message: "กรุณาระบุชื่อผู้รับ" }),
  lastname: z.string().min(3, { message: "กรุณาระบุนามสกุลผู้รับ" }),
  address: z.string().min(3, { message: "กรุณาระบุที่อยู่" }),
  postalCode: z
    .string()
    .max(5, "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 ตัวเลข")
    .min(5, "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 ตัวเลข"),
  email: z.string().min(10, { message: "กรุณาระบุอีเมล" }).email(),
  phoneNumber: z
    .string()
    .max(10, "รหัสไปรษณีย์ต้องเป็นตัวเลข 10 ตัวเลข")
    .min(10, { message: "หมายเลขโทรศัพท์ต้องมี 10 ตัวเลข" }),
  province: z.string().min(1, "กรุณาระบุจังหวัด"),
  district: z.string().min(1, "กรุณาระบุอำเภอ"),
  subdistrict: z.string().min(1, "กรุณาระบุตำบล"),
  paymentMethod: z.string().min(1, "กรุณาเลือกวิธีการชำระเงิน"),
  saveAddress: z.boolean().nullable(),
});

export default function CheckOutPage() {
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      address: "",
      subdistrict: "",
      district: "",
      province: "",
      postalCode: "",
      email: "",
      phoneNumber: "",
      paymentMethod: "",
      saveAddress: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    values.province = State.getStateByCodeAndCountry(
      values.province,
      "TH"
    ).name;
    values.userId = user.id;
    values.items = state.items;

    try {
      const res = await axios.post(
        `http://localhost:3001/api/orders/new`,
        values
      );

      if (res.status === 200) {
        // console.log(res.data)
        navigate("/order/" + res.data.id);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center flex-grow w-8/12 mx-auto">
      <div className="flex flex-row gap-x-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>ข้อมูลการเรียกเก็บเงิน</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="myForm"
                className="grid grid-cols-4 gap-y-8 gap-x-8"
              >
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>ชื่อ</FormLabel>
                      <FormControl>
                        <Input placeholder="ชื่อ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>นามสกุล</FormLabel>
                      <FormControl>
                        <Input placeholder="นามสุกล" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormLabel>ที่อยู่</FormLabel>
                      <FormControl>
                        <Input placeholder="กรุณาระบุที่อยู่" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>จังหวัด</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="เลือกจังหวัด" />
                          </SelectTrigger>
                          <SelectContent>
                            {State.getStatesOfCountry("TH").map((item) => (
                              <SelectItem key={item.name} value={item.isoCode}>
                                {item.name}
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
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อำเภอ</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!form.watch("province")}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="เลือกอำเภอ" />
                          </SelectTrigger>
                          <SelectContent>
                            {City.getCitiesOfState(
                              "TH",
                              form.watch("province")
                            ).map((item) => (
                              <SelectItem key={item.name} value={item.name}>
                                {item.name}
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
                  control={form.control}
                  name="subdistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ตำบล</FormLabel>
                      <FormControl>
                        <Input placeholder="กรุณาระบุตำบล" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>อีเมล</FormLabel>
                      <FormControl>
                        <Input placeholder="อีเมล" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>หมายเลขโทรศัพท์</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="หมายเลขโทรศัพท์"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="saveAddress"
                  render={() => (
                    <FormItem className="col-span-4 space-x-2">
                      <FormControl>
                        <Checkbox />
                      </FormControl>
                      <FormLabel>ใช้ที่อยู่นี้ในการสั่งซื้อครั้งถัดไป</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-4 p-4 border rounded-md border-md">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>ตัวเลือกการชำระเงิน</FormLabel>
                          <Separator />
                          <FormControl>
                            <RadioGroup
                              className="flex flex-row justify-evenly"
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <Label
                                htmlFor="option-one"
                                className="flex flex-col items-center justify-center p-2 border rounded-md gap-y-4 has-[:checked]:border-primary"
                              >
                                <Icons.cod className="w-12 h-12 text-primary" />
                                บริการเก็บเงินปลายทาง
                                <RadioGroupItem
                                  value="cod"
                                  id="option-one"
                                  className="hidden"
                                />
                              </Label>
                              <Label
                                htmlFor="option-two"
                                className="flex flex-col items-center justify-center p-2 border rounded-md gap-y-4 has-[:checked]:border-primary"
                              >
                                <img src={promptpay} className="h-12" />
                                พร้อมเพย์
                                <RadioGroupItem
                                  value="promptpay"
                                  id="option-two"
                                  className="hidden"
                                />
                              </Label>
                              <Label
                                htmlFor="option-three"
                                className="flex flex-col items-center justify-center p-2 border rounded-md gap-y-4 has-[:checked]:border-primary"
                              >
                                <Icons.qrcode className="w-12 h-12 text-primary" />
                                QR CODE
                                <RadioGroupItem
                                  value="qrcode"
                                  id="option-three"
                                  className="hidden"
                                />
                              </Label>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col w-2/5">
          <CardHeader>
            <CardTitle>สรุปการสั่งซื้อ</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-y-8">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex flex-row col-span-2">
                <img
                  src={`http://localhost:3001/images/${item.product.productImg}`}
                  className="w-12 h-12"
                />
                <div className="flex flex-col">
                  <div className="font-light">
                    {item.product.name} ({item.product.capacity}) -{" "}
                    {item.product.color}
                  </div>
                  <div className="font-extralight">
                    {item.quantity} X{" "}
                    <span className="text-primary">{item.product.price}฿</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="font-normal">ยอดรวม</div>
            <div className="font-medium place-self-end">{state.total} บาท</div>
            <div className="font-normal">ค่าจัดส่ง</div>
            <div className="font-medium place-self-end">ฟรี</div>
            <div className="font-normal">ค่าภาษี Vat 7%</div>
            <div className="font-medium place-self-end">
              {(state.total / 100) * 7} บาท
            </div>
          </CardContent>
          <CardFooter className="flex-col flex-1 mt-auto gap-y-4">
            <Separator />
            <div className="flex flex-row justify-between w-full">
              <div className="font-medium">ยอดรวมสุทธิ</div>
              <div className="font-semibold place-self-end">
                {state.total * 1.07} บาท
              </div>
            </div>
            <Button className="w-full" type="submit" form="myForm">
              สั่งซื้อ
            </Button>
          </CardFooter>
        </Card>

      </div>

    </div>
  );
}
