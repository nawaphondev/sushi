import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1).max(10),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "รหัสผ่านไม่ตรงกัน",
  });

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    axios
      .put(
        "http://localhost:3001/api/users/update",
        { ...values, id: user.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          logout();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function passwordFormOnSubmit(values) {
    axios
      .post(
        "http://localhost:3001/auth/changePassword",
        { ...values, id: user.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        logout();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="flex flex-col justify-center flex-1 gap-y-6">
      <Card>
        <CardHeader>
          <CardTitle>โปรไฟล์</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-x-6">
          <Avatar className="w-48 h-48">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>The Optimus Prime</AvatarFallback>
          </Avatar>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อ</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อผู้ใช้</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input type="email" {...field} />
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
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="col-span-2">
                บันทึการเปลี่ยนแปลง
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>เปลี่ยนรหัสผ่าน</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(passwordFormOnSubmit)}
              className="space-y-8"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสผ่านปัจจุบัน</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสผ่านใหม่</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                disabled={!passwordForm.watch("newPassword")}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">บันทึการเปลี่ยนแปลง</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
