import { NavLink } from "react-router-dom";
import Button from "./Button";
import { useForm } from "react-hook-form"
import Icons from "../assets/Icons";
import {useDropzone} from 'react-dropzone'
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";


export default function AdminProductAdd() {
  const {mutate} = useMutation({
    mutationFn: async (body) => {
      const response = await fetch('http://localhost:3001/api/products/add', {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          'Content-Type': 'application/json'
        })

      })
      const data = await response.json()
      return data
    },
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      console.log(data)
      alert('Success')
    }
  })



  const [productImg, setProductImg] = useState(null)
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    setProductImg(acceptedFiles[0])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const uploaderProps = {...getInputProps(), multiple: false}

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const res = await fetch('https://api.imgur.com/3/image', {
      body: productImg,
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Client-ID 03238e1f4891134', 
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })

    const uploadResult = await res.json()

    let imageLink;

    if (uploadResult.success === false) {
      alert(uploadResult.data.error)
      imageLink = "to be changed manually in DB"
    } else {
      imageLink = uploadResult.data.link
    }

    //upload images
    //get image link from response
    //save to db
    const body = {...data, productImg: imageLink}
    console.log(body)
    mutate(body)
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
            <Button size="sm" variant="outlineAdmin"><Icons.cross />ยกเลิก</Button>
            <Button size="sm" type="submit"><Icons.add />เพิ่ม</Button>
          </div>
        </div>
        
        <div className="flex flex-row w-full gap-x-4">
          <div className="flex flex-col w-full gap-y-4">
            <div className="flex flex-col p-4 bg-white rounded-md gap-y-2">
              <h2>ข้อมูลทั่วไป</h2>
              <label htmlFor="" className="font-thin">ชื่อสินค้า</label>
              <input type="text" placeholder="พิมพ์ชื่อสินค้าที่นี่" className="bg-[#F9F9FC] border-[#E0E2E7] border rounded-md" {...register("name")}/>
              <label htmlFor="" className="font-thin">คำอธิบายสินค้า</label>
              <textarea name="" id="" cols="30" rows="6" placeholder="พิมพ์รายละเอียดสินค้าที่นี่" className="bg-[#F9F9FC] border-[#E0E2E7] border rounded-md" {...register("description")} />
            </div>
            <div className="flex flex-col p-4 bg-white rounded-md">
              <h2>ข้อมูลจำเพาะ</h2>
              <div className="flex flex-row gap-x-2 justify-evenly">
                <label htmlFor="" className="flex flex-col font-thin">สี</label>
                <input type="text" placeholder="ระบุสี" className="bg-[#F9F9FC] border-[#E0E2E7] border rounded-md" {...register("color")} />
                <label htmlFor="" className="flex flex-col font-thin">ความจุ</label>
                <input type="text" placeholder="ระบุความจุ" className="bg-[#F9F9FC] border-[#E0E2E7] border rounded-md" {...register("capacity")} />
              </div>
            </div>
            <div className="p-4 bg-white rounded-md">
              <h2>รูปภาพ</h2>
              <label htmlFor="" className="font-thin">รูปสินค้า</label>
              <div {...getRootProps()}>
                <input {...uploaderProps} multiple={false} />
                {
                  productImg ? <span>{productImg.name}</span> : isDragActive ?
                    <div className="w-full h-40 bg-[#F9F9FC] items-center justify-center flex flex-col border-[#E0E2E7] border rounded-md">
                      Drop it here
                    </div> :
                    <div className="w-full h-40 bg-[#F9F9FC] items-center justify-center flex flex-col border-[#E0E2E7] border rounded-md">
                      Drag some files, or click here select files
                    </div>
                }
              </div>
            </div>
            <div className="flex flex-col p-4 bg-white rounded-md gap-y-2">
              <h2>ราคา</h2>
              <div className="flex flex-row justify-evenly">
                <label htmlFor="" className="font-thin">ราคา</label>
                <input type="number" placeholder="฿ ระบุราคา . ." className="bg-[#F9F9FC] border-[#E0E2E7] border rounded-md" {...register("price")}/>
                <label htmlFor="" className="font-thin">จำนวน</label>
                <input type="number" placeholder="ระบุจำนวนสินค้าที่นี่ . ." className="bg-[#F9F9FC] border-[#E0E2E7] border rounded-md" {...register("stock")}/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
