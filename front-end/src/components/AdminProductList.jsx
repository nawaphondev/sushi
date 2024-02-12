import { NavLink } from "react-router-dom";

export default function AdminProductList() {
  return (
    <div>
      <div className="flex flex-row items-start justify-between">
        <div>
          <NavLink to="/">Dashboard</NavLink>
          {">"}
          <span className="text-primary">Product List</span>
        </div>
        <NavLink to="/products/add" className="px-12 py-2 text-white rounded-md bg-primary">add</NavLink>
      </div>
      
      AdminProductsList
    </div>
  )
}
