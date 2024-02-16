import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import Icons from "./ui/Icons";
import {useDropzone} from 'react-dropzone'
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner"


export default function AdminProductAdd() {
  const [productImg, setProductImg] = useState([])
  const navigate = useNavigate()
  
  const onDrop = useCallback(acceptedFiles => {
    // console.log(acceptedFiles)
    setProductImg(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const {mutate} = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('http://localhost:3001/api/products/add', {
        method: "POST",
        body: formData,
      }).then(async(res) => await res.json())
      
      if (response.error) {
        console.log(response.error)
        return toast("upload fail " + response.error)
      }
      reset()
      setProductImg([])
      toast("Product added successfully")
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    // formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key])
    }


    // productImg.forEach(image => {
    //   formData.append('files', image, image.name)
    // });
    formData.append('productImg', productImg[0])

    mutate(formData)
  }
  
  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-start justify-between">
          <div>
            <NavLink to="/">Dashboard</NavLink>
            {" > "}
            <NavLink to="/products">List</NavLink>
            {" > "}
            <span className="text-primary">Add Product</span>
          </div>
          <div className="flex gap-x-2">
            <Button size="sm" variant="outlineAdmin" onClick={() => navigate("/products")}><Icons.cross />ยกเลิก</Button>
            <Button size="sm" type="submit"><Icons.add />เพิ่ม</Button>
          </div>
        </div>
        
        <div className="flex flex-col w-full gap-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลทั่วไป</CardTitle>
            </CardHeader>
            <CardContent>
              <Label className="font-thin">ชื่อสินค้า</Label>
              <Input type="text" placeholder="พิมพ์ชื่อสินค้าที่นี่" {...register("name")}/>
              <Label htmlFor="" className="font-thin">คำอธิบายสินค้า</Label>
              <Textarea name="" id="" cols="30" rows="6" placeholder="พิมพ์รายละเอียดสินค้าที่นี่" {...register("description")} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลจำเพาะ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center gap-x-2">
                <div className="w-full">
                  <Label className="font-thin">สี</Label>
                  <Input type="text" placeholder="ระบุสี" {...register("color")} />
                </div>
                <div className="w-full">
                  <Label htmlFor="" className="font-thin text-nowrap">ความจุ</Label>
                  <Input type="text" placeholder="ระบุความจุ" {...register("capacity")} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>รูปภาพ</CardTitle>
            </CardHeader>
            <CardContent>
              <div {...getRootProps()}>
                <Label htmlFor="" className="font-thin text-nowrap">รูปสินค้า</Label>
                <input {...getInputProps} multiple={false} />
                {
                  productImg.length > 0 ? <span>{productImg.length}</span> : isDragActive ?
                    <div className="w-full h-40 bg-[#F9F9FC] items-center justify-center flex flex-col border-[#E0E2E7] border rounded-md">
                      Drop it here
                    </div> :
                    <div className="w-full h-40 bg-[#F9F9FC] items-center justify-center flex flex-col border-[#E0E2E7] border rounded-md">
                      Drag some files, or click here select files
                    </div>
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ราคา</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center gap-x-2">
                <div className="w-full">
                  <Label className="font-thin">ราคา</Label>
                  <Input type="number" placeholder="฿ ระบุราคา . ." className="bg-[#F9F9FC] border-[#E0E2E7] border rounded-md" {...register("price")}/>
                </div>
                <div className="w-full">
                  <Label htmlFor="" className="font-thin text-nowrap">จำนวน</Label>
                  <Input type="number" placeholder="ระบุจำนวนสินค้าที่นี่ . ." className="bg-[#F9F9FC] border-[#E0E2E7] border rounded-md" {...register("stock")}/>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
