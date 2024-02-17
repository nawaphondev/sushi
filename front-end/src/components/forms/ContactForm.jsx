import axios from 'axios'
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1, { message: "เราจะได้รับข้อความจากคุณอะไรเอ่ย" }),
  message: z.string().min(1, "เขียนอะไรสักอย่างถึงเรา"),
  email: z.string().min(1, {message: "ระบุอีเมลเพื่อให้เราติดต่อกลับด้วยน้า"}).email(),
});


export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    }
  })

    // 2. Define a submit handler.
    async function onSubmit(values) {  
      try {
        const rs = await axios.post('http://localhost:3001/contact', values)
        console.log(rs)
        if(rs.status === 200) {
          toast.success('ส่งข้อความสำเร็จ. ขอบคุณที่ส่งข้อความถึงเรา')
        }
      } catch (error) {
        console.log(error.message);
      }
    }

  return (
    <div className="flex flex-col w-full px-6">
      <Form {...form}>
        <form className="grid grid-cols-2 gap-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
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
                <FormLabel>โทรศัพท์</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>ข้อความ</FormLabel>
                <FormControl>
                  <Textarea rows="9" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full p-3 text-center rounded-lg bg-primary text-primary-foreground">ส่งข้อความ</Button>
        </form>
      </Form>
    </div>
  );
}
