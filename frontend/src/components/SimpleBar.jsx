import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function SimpleBar() {
  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      return axios
        .get("http://localhost:3001/api/orders/sales")
        .then((res) => res.data);
    },
  });

  if (isLoading) return <p>Loading...</p>;

  // console.log(data)

  return (
    <div className="w-full h-[800px]">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart data={data} layout="vertical">
          <XAxis
            type="number"
            dataKey="total"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            // tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
