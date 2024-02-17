/* eslint-disable react/prop-types */
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import Icons from "../ui/Icons";
import {useDropzone} from 'react-dropzone'
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const productFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  color: z.string().min(1),
  capacity: z.string().min(1),
  price: z.number().min(1),
  stock: z.number().min(0)
})

export default function ProductForm({title}) {
  const { state: product } = useLocation();
  const [productImg, setProductImg] = useState([])
  const navigate = useNavigate()
  
  const onDrop = useCallback(acceptedFiles => {
    setProductImg(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const imageInputProps = getInputProps()
  imageInputProps.multiple = false

  const {mutate} = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('http://localhost:3001/api/products/add', {
        method: "POST",
        body: formData,
      }).then(async(res) => await res.json())
      
      if (response.error) {
        console.log(response.error)
        return toast("อัพโหลดผิดพลาด " + response.error)
      }
      form.reset()
      setProductImg([])
      toast("เพิ่มสินค้าสำเร็จ")
    },
  })

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      color: product?.color || "",
      capacity: product?.capacity || "",
      stock: product?.stock || "",
      price: product?.price || "",
    },
  })

  const onSubmit = (data) => {
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key])
    }

    if (productImg.length === 0 && !product) return form.setError("productImg", {message: "กรุณาเลือกรูปภาพสินค้า"})
    // productImg.forEach(image => {
    //   formData.append('files', image, image.name)
    // });

    formData.append('productImg', productImg.length > 0 ? productImg[0] : product.productImg)
    if (product) formData.append('id', product.id)

    mutate(formData)
  }
  
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row items-start justify-between">
          <div>
            <NavLink to="/">Dashboard</NavLink>
            {" > "}
            <NavLink to="/products">Product List</NavLink>
            {" > "}
            <span className="text-primary">{title} Product</span>
          </div>
          <div className="flex gap-x-2">
            <Button size="sm" variant="outlineAdmin" onClick={() => navigate("/products")}><Icons.cross />Cancel</Button>
            <Button size="sm" type="submit">
              {title === "Add" 
                ? <div className="flex gap-x-2"><Icons.add />Add</div>
                : <div className="flex gap-x-2"><Icons.save />Save</div>
              }
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col w-full gap-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลทั่วไป</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>ชื่อสินค้า</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>คำอธิบายสินค้า</FormLabel>
                    <FormControl>
                      <Textarea rows="6" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลจำเพาะ</CardTitle>
            </CardHeader>
            <CardContent>
              
              
              <div className="flex flex-row items-center gap-x-2">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>สี</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>ความจุ</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>รูปภาพ</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="productImg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รูปสินค้า</FormLabel>
                    <FormControl>
                      <div {...getRootProps()}>
                        <input {...field} {...imageInputProps} className="hidden"/>
                        {
                          productImg.length > 0 ? <img src={URL.createObjectURL(productImg[0])}  className="mx-auto"/> :
                          product?.productImg && <img src={`http://localhost:3001/images/${product?.productImg}`} />
                        }
                        {
                          (productImg.length <= 0 && !product) && <div className="w-full h-40 bg-[#F9F9FC] items-center justify-center flex flex-col border-[#E0E2E7] border rounded-md">
                            {isDragActive? "Drop it here" : "ลากไฟล์มาวางที่นี่ หรือ คลิ๊กเพื่อเลือกไฟล์"}
                          </div>
                        }
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ราคา</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center gap-x-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>ราคา</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>จำนวน</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  )
}
