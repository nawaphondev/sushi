import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { interpolateRainbow } from "d3-scale-chromatic";
import { color } from "d3-color";

function generateHexColor(index) {
  const colorScale = interpolateRainbow;
  const c = colorScale(index / 100);
  return color(c).formatHex();
}

export default function SimplePie() {
  const [data, setData] = useState([]);
  const { data: sales, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      return axios
        .get("http://localhost:3001/api/orders/sales")
        .then((res) => res.data);
    },
  });

  useEffect(() => {
    if (isLoading) return;
    setData(
      sales.map((sale) => ({ name: sale.name, total: parseInt(sale.total) }))
    );
  }, [isLoading]);

  if (isLoading) return <p>Loading...</p>;

  // console.log(sales);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={1200} height={1200}>
        <Pie
          dataKey="total"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={160}
          innerRadius={80}
          fill="#8884d8"
          label={({ name, total }) => `${name}: ${total}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={generateHexColor(index)} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
