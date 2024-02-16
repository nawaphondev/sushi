import { NavLink } from "react-router-dom";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { useQuery } from "@tanstack/react-query";

export default function AdminProductList() {
  const { data: products, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/products/all')
      const data = await response.json()
      return data
    },
  })

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-start justify-between">
        <div>
          <NavLink to="/">Dashboard</NavLink>
          {">"}
          <span className="text-primary">Product List</span>
        </div>
        <NavLink to="/products/add" className="px-12 py-2 text-white rounded-md bg-primary">add</NavLink>
      </div>
      
      <DataTable columns={columns} data={products}/>
    </div>
  )
}
