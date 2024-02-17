/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useQueryClient } from '@tanstack/react-query'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useAuth from "@/hooks/useAuth"
import { toast } from "sonner"
import axios from "axios"
import { useState } from "react"

const cardFormSchema = z.object({
  name: z.string().min(3, { message: "กรุณากรอกข้อมูล" }),
  number: z
    .string()
    .max(16, "กรุณากรอกข้อมูล")
    .min(16, "กรุณากรอกข้อมูล"),
  year: z.string().min(4, "กรุณากรอกข้อมูล").max(4),
  month: z.string().min(2, "กรุณากรอกข้อมูล").max(2),
  cvv: z.string().min(3, "กรุณากรอกข้อมูล").max(3),
});

export default function CardForm({ title }) {
  // Get QueryClient from the context
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { user } = useAuth()
  // 1. Define your form.
  const cardForm = useForm({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      name: "",
      number: "",
      year: "",
      month: "",
      cvv: "",
    }
  })

  // 2. Define a submit handler.
  async function cardFormOnSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // values.province = State.getStateByCodeAndCountry(
    //   values.province,
    //   "TH"
    // ).name;
    values.userId = user.id;
    // console.log(values)

    try {
      const res = await axios.post(
        `http://localhost:3001/api/cards/new`,
        values
      );

      if (res.status === 200) {
        // console.log(res.data)
        toast.success("เพิ่มที่อยู่สำเร็จ");
        
  
        queryClient.invalidateQueries({ queryKey: ['cards'] })
        setOpen(false)
        cardForm.reset()
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (cardForm.formState.isLoading) return <div>กำลังโหลด...</div>

  return (
    
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild>
    <DialogTrigger>
        {title}
    </DialogTrigger>
      </Button>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      
      <Form {...cardForm}>
        <form
          onSubmit={e => {
            e.preventDefault()
            cardForm.handleSubmit(cardFormOnSubmit)()
            e.stopPropagation()
          }}
          className="flex flex-col gap-y-8 gap-x-8"
        >
          <FormField
            control={cardForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อที่แสดงบนบัตร</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={cardForm.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>หมายเลขบัตร</FormLabel>
                <FormControl>
                  <Input type="number" maxLength={16} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={cardForm.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ปีที่หมดอายุ</FormLabel>
                <FormControl>
                  <Input type="number" maxLength={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={cardForm.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เดือนที่หมดอายุ</FormLabel>
                <FormControl>
                  <Input type="number" maxLength={2} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={cardForm.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>หมายเลข 3 ตัวด้านหลังบัตร</FormLabel>
                <FormControl>
                  <Input type="number" maxLength={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">บันทึก</Button>
        </form>
      </Form>
    </DialogContent>
  </Dialog>

  )
}
