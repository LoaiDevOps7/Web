"use client";
import { Filler } from "chart.js";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import Image from "next/image";
const data = [
  { name: "Group A", value: 92, fill: "#45DFB1" },
  { name: "Group B", value: 8, fill: " #0AD1C8" },
];

const Performance = () => {
  return (
    <div className="bg-white p-4 rounded-md h-80 relative shadow  ">
      <h1 className="text-xl font-semibold text-lamagreen text-center">
        الأداء
      </h1>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold  ">92</h1>
        <p className="text-xs text-gray-300 ">of 100 max LTs</p>
      </div>
      <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">
        1st semester - 2nd semester
      </h2>
    </div>
  );
};
export default Performance;
