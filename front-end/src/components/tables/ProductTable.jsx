import { NavLink } from "react-router-dom";
import { columns } from "./ProductColumns";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import axios from "axios";

export default function ProductTable() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return axios
        .get("http://localhost:3001/api/products/all")
        .then((res) => res.data);
    },
  });

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-start justify-between">
        <div>
          <NavLink to="/">Dashboard</NavLink>
          {" > "}
          <span className="text-primary">Product List</span>
        </div>
        <NavLink
          to="/products/add"
          className="px-12 py-2 text-white rounded-md bg-primary"
        >
          Add Product
        </NavLink>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
