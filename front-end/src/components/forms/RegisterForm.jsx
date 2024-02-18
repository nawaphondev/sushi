/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const passwordFormSchema = z
  .object({
    username: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    phoneNumber: z.string().min(10).max(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "รหัสผ่านไม่ตรงกัน",
  });

export default function RegisterForm({ isAdmin = false }) {
  const navigate = useNavigate();
  const passwordForm = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  async function passwordFormOnSubmit(values) {
    if (isAdmin) values.userType = "ADMIN";
    const rs = await axios.post("http://localhost:3001/auth/register", values);
    console.log(rs);
    if (rs.status === 200) {
      toast.success("ลงทะเบียนสำเร็จ");
      if (!isAdmin) navigate("/login");
    }
  }

  return (
    <Form {...passwordForm} autoComplete="off">
      <form
        onSubmit={passwordForm.handleSubmit(passwordFormOnSubmit)}
        autoComplete="off"
        className="space-y-4"
      >
        <FormField
          control={passwordForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อผู้ใช้</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" aria-autocomplete="none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={passwordForm.control}
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
          control={passwordForm.control}
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
          control={passwordForm.control}
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
          control={passwordForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>หมายเลขโทรศัพท์</FormLabel>
              <FormControl>
                <Input type="phoneNumber" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={passwordForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รหัสผ่าน</FormLabel>
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
          disabled={!passwordForm.watch("password")}
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

        <div className="pt-4">
          <Button type="submit" className="w-full">
            ยืนยันการลงทะเบียน
          </Button>
        </div>
      </form>
    </Form>
  );
}
