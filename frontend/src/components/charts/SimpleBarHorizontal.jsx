import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "iPhone SE",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "iPhone 11",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "iPhone 12",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "iPhone 13",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "iPhone 14",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "iPhone 14 Pro",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "iPhone 14 Pro Max",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "iPhone 15",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "iPhone 15 Pro",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "iPhone 15 Pro Max",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function SimpleBarHorizontal() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical">
        <XAxis
          dataKey="total"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          type="number"
          tickFormatter={(value) => `฿${value}`}
        />
        <YAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          type="category"
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          label="Total"
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
