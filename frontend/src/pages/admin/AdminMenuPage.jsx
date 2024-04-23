import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const productFormSchema = z.object({
  name: z.string().min(1),
  category: z.enum(["NIGIRI", "MAKI", "GUNKAN", "OTHERS"]),
  price: z.number(),
  image: z.any(),
});

export default function AdminMenuPage() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);

  const [image, setImage] = useState(null);
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return axios
        .get("http://localhost:3001/api/products/all")
        .then((res) => res.data);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "Category",
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setValue("image", acceptedFiles[0], {
      shouldValidate: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const imageInputProps = getInputProps();
  imageInputProps.multiple = false;

  function setFormValues(product) {
    reset();
    setImage(null);
    setSelected(product.id);
    setValue("name", product.name);
    setValue("image", product.image);
    setValue("category", product.category);
    setValue("price", product.price);
  }

  // console.log(products)

  async function productFormOnSubmit(values) {
    // console.log(values)
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    formData.append("id", selected ?? 0);

    const res = await axios
      .put("http://localhost:3001/api/products/update", formData)
      .then((res) => res.data);

    console.log(res);
    if (res) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (!selected) {
        setImage(null);
        reset();
      }
    }
  }

  return (
    <div className="flex justify-between flex-1">
      {/* <div className="flex flex-col items-center justify-center flex-1"> */}

      {/* <SimpleBar /> */}
      {/* <SimplePie /> */}
      {/* </div> */}
      <div className="flex items-start justify-center flex-1 overflow-y-scroll max-h-[1000px]">
        {isLoading ? (
          <div>กำลังโหลด...</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>ชื่อ</th>
                  <th>หมวดหมู่</th>
                  <th>ราคา</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="cursor-pointer text-center bg-orange-500 text-white font-bold py-2 px-4 rounded-md"
                  onClick={() => setFormValues({})}
                >
                  <th colSpan={10}>เพิ่มเมนูใหม่</th>
                </tr>

                {products?.map((product) => (
                  <tr
                    key={product.id}
                    className="cursor-pointer hover"
                    onClick={() => setFormValues(product)}
                  >
                    <th>{product.id}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="size-20 mask mask-squircle">
                            <img
                              src={
                                "http://localhost:3001/images/" + product.image
                              }
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}

                <tr>
                  <th colSpan={10}> </th>
                </tr>
              </tbody>
              {/* <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                </tr>
              </tfoot> */}
            </table>
          </div>
        )}
      </div>
      <div>
        <form
          onSubmit={handleSubmit(productFormOnSubmit)}
          autoComplete="off"
          className="card w-[500px]"
        >
          <div className="items-center justify-center card-body">
            <h1 className="card-title">
              {selected ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่"}
            </h1>

            <div className="avatar" {...getRootProps()}>
              <input
                {...imageInputProps}
                name="image"
                {...register("image")}
                className="hidden"
              />
              <div className="rounded ring ring-primary ring-offset-base-100 ring-offset-2">
                {selected && !image ? (
                  <img src={`http://localhost:3001/images/${watch("image")}`} />
                ) : image ? (
                  <img src={URL.createObjectURL(image)} />
                ) : (
                  <label className="flex items-center justify-center text-center label">
                    {isDragActive
                      ? "ลากไฟล์มาวางที่นี่"
                      : "ลากไฟล์มาวางที่นี่ หรือ คลิ๊กเพื่อเลือกไฟล์"}
                  </label>
                )}
              </div>
            </div>

            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">ชื่อเมนู</span>
              </div>
              <input
                type="text"
                name="name"
                {...register("name")}
                className="w-full input input-bordered"
              />
              <div className="label">
                {errors.name && (
                  <span className="text-red-600 label-text-alt">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </label>

            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">ราคา</span>
              </div>
              <input
                type="number"
                name="price"
                {...register("price", {
                  valueAsNumber: true,
                })}
                className="w-full input input-bordered"
              />
              <div className="label">
                {errors.price && (
                  <span className="text-red-600 label-text-alt">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </label>

            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">หมวดหมู่</span>
              </div>
              <select
                className="w-full select select-bordered"
                name="category"
                {...register("category")}
              >
                <option disabled>หมวดหมู่</option>
                <option value={"NIGIRI"}>Nigiri</option>
                <option value={"MAKI"}>Maki</option>
                <option value={"GUNKAN"}>Gunkan</option>
                <option value={"OTHERS"}>Others</option>
              </select>
              <div className="label">
                {errors.category && (
                  <span className="text-red-600 label-text-alt">
                    {errors.category.message}
                  </span>
                )}
              </div>
            </label>

            <div className="items-center justify-center card-actions gap-y-6">
              <button type="submit" className="w-full btn btn-primary">
                {selected ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่"}
              </button>
              {selected && (
                <button
                  className="w-full btn btn-error"
                  onClick={async (e) => {
                    e.preventDefault();
                    const res = await axios.delete(
                      `http://localhost:3001/api/products/delete`,
                      {
                        data: {
                          id: selected,
                        },
                      }
                    );
                    if (res.statusText === "OK") {
                      setSelected(null);
                      queryClient.invalidateQueries({
                        queryKey: ["products"],
                      });
                    }
                  }}
                >
                  ลบเมนู
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
