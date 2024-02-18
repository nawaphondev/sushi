import { z } from "zod";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { QRCodeSVG } from "qrcode.react";
import promptpay from "@/assets/promptpay.png";
import AddressForm from "@/components/forms/AddressForm";
import Icons from "@/components/Icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CardForm from "@/components/forms/CardForm";
import { useState } from "react";
import thaiAddress from "@/lib/thaiAddress";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "กรุณาระบุชื่อผู้รับ" }),
  lastName: z.string().min(1, { message: "กรุณาระบุนามสกุลผู้รับ" }),
  email: z.string().min(1, { message: "กรุณาระบุอีเมล" }).email(),
  phoneNumber: z
    .string()
    .max(10, "หมายเลขโทรศัพท์ต้องมี 10 ตัวเลข :)")
    .min(10, { message: "กรุณาระบุหมายเลขโทรศัพท์" }),
  paymentMethod: z.string().min(1, "กรุณาเลือกวิธีการชำระเงิน"),
  shippingAddressId: z.string().min(1, "กรุณาเลือกที่อยู่"),
  card: z.string(),
});

export default function CheckOutPage() {
  const [paymentId, setPaymentId] = useState("");
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: addresses, isLoading: addressesIsLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: () =>
      axios
        .get("http://localhost:3001/api/addresses/allbyuserid")
        .then((res) => {
          return res.data;
        }),
  });

  const { data: cards, isLoading: cardsIsLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: () =>
      axios.get("http://localhost:3001/api/cards/allbyuserid").then((res) => {
        return res.data;
      }),
  });

  const { mutate } = useMutation({
    mutationFn: (status) =>
      axios
        .put("http://localhost:3001/api/payments/update", {
          id: paymentId,
          status,
        })
        .then((res) => res.data),
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      phoneNumber: user.phoneNumber,
      paymentMethod: "",
      saveAddress: false,
      shippingAddressId: addressesIsLoading ? "" : addresses[0]?.id.toString(),
      card: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      const res = await axios.post(`http://localhost:3001/api/orders/new`, {
        ...values,
        items: state.items,
        userId: user.id,
        shoppingCartId: user.shoppingCart.id,
      });

      if (res.status === 200) {
        console.log(res.data);

        setPaymentId(res.data.paymentId);

        if (
          values.paymentMethod === "promptpay" ||
          values.paymentMethod === "qrcode"
        )
          setOpen(true);
        else navigate("/order/" + res.data.id);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (addressesIsLoading || cardsIsLoading) return <div>กำลังโหลด...</div>;

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
                // onSubmit={(e) => {
                //   e.preventDefault()
                //   e.stopPropagation()
                //   console.log(e)
                //   form.handleSubmit(onSubmit)
                // }}
                onSubmit={form.handleSubmit(onSubmit)}
                id="myForm"
                className="flex flex-col gap-8"
              >
                <div className="p-6 border rounded-md">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
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
                      <FormItem>
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
                </div>

                <FormField
                  control={form.control}
                  name="shippingAddressId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        ที่อยู่
                        <AddressForm title={"เพิ่มที่อยู่ใหม่"} />
                      </FormLabel>

                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกที่อยู่" />
                          </SelectTrigger>
                          <SelectContent>
                            {addresses.map((address) => {
                              // console.log(address)
                              return (
                                <SelectItem
                                  key={address.id}
                                  value={address.id.toString()}
                                >
                                  {thaiAddress(address)}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-4 p-4 space-y-6 border rounded-md border-md">
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
                              <Label
                                htmlFor="option-four"
                                className="flex flex-col items-center justify-center p-2 border rounded-md gap-y-4 has-[:checked]:border-primary"
                              >
                                <Icons.creditcard className="w-12 h-12 text-primary" />
                                บัตรเครดิต
                                <RadioGroupItem
                                  value="card"
                                  id="option-four"
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

                  {form.watch("paymentMethod") == "card" && (
                    <FormField
                      control={form.control}
                      name="card"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            บัตรเครดิต
                            <CardForm title={"Add new card"} />
                          </FormLabel>

                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="My Cards" />
                              </SelectTrigger>
                              <SelectContent>
                                {cards.map((card) => {
                                  return (
                                    <SelectItem
                                      key={card.id}
                                      value={card.id.toString()}
                                    >
                                      {card.name} **** **** ****{" "}
                                      {card.number.slice(
                                        card.number.length - 4
                                      )}{" "}
                                      {card.month}/{card.year}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
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
            <div className="font-normal">ค่าภาษี Vat 7% ของราคาสินค้า</div>
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>วิธีชำระเงิน</DialogTitle>
            <DialogDescription>{form.watch("paymentMethod")}</DialogDescription>
          </DialogHeader>
          <QRCodeSVG
            className="w-full"
            onClick={() =>
              mutate("COMPLETED", {
                onSuccess: (data) => navigate("/order/" + data.orderId),
              })
            }
            value={paymentId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
