import { PieChart, Pie } from "recharts";

const innerdata = [
  { name: "C1", value: 100 },
  { name: "C2", value: 20 },
  { name: "C3", value: 300 },
  { name: "C4", value: 90 },
];

const outerdata = [
  { name: "P1", value: 10 },
  { name: "P2", value: 100 },
  { name: "P3", value: 20 },
  { name: "P4", value: 30 },
  { name: "P5", value: 90 },
];

export default function UbPieChart() {
  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie data={innerdata} dataKey="value" outerRadius={50} fill="teal" />
        <Pie
          data={outerdata}
          dataKey="value"
          innerRadius={80}
          outerRadius={90}
          fill="blue"
        />
      </PieChart>
    </div>
  );
}
