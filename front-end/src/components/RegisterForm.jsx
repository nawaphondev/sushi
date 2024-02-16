import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'sonner';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


const passwordFormSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  phoneNumber: z.string().min(10).max(10),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords does not match'
})

export default function RegisterForm() {
  const navigate = useNavigate()
  const passwordForm = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: ""
    },
  })


  async function passwordFormOnSubmit(values) {
    const rs = await axios.post('http://localhost:3001/auth/register', values)
    console.log(rs)
    if(rs.status === 200) {
      toast.success('ลงทะเบียนสำเร็จ')
      navigate('/login')
    }
  }

  return (
    <div className="flex flex-col w-2/5 p-8 border border-[#E4E7E9] rounded-2xl gap-4">
      <div className='flex items-center justify-center'>
        <img src="/logo.png" alt="" />
        <h1 className='text-4xl font-medium text-[#8B8E99]'>devphone</h1>
      </div>
      <div className="mb-5 text-3xl">ลงทะเบียน</div>
      
      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(passwordFormOnSubmit)} className="space-y-8">
          <FormField
            control={passwordForm.control}
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

          <Button type="submit">ยืนยันการลงทะเบียน</Button>
        </form>
      </Form>
      <div className='flex flex-row justify-center w-full gap-16'>
        <div>มีบัญชีอยู่แล้ว?</div>
        <Link className='font-bold text-primary' to="/login">เข้าสู่ระบบได้ที่นี่</Link>
      </div>
    </div>
  );
}
