"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const chartData = [
  { date: "2024-04-01", earn: 222, pay: 150 },
  { date: "2024-04-02", earn: 97, pay: 180 },
  { date: "2024-04-03", earn: 167, pay: 120 },
  { date: "2024-04-04", earn: 242, pay: 260 },
  { date: "2024-04-05", earn: 373, pay: 290 },
  { date: "2024-04-06", earn: 301, pay: 340 },
  { date: "2024-04-07", earn: 245, pay: 180 },
  { date: "2024-04-08", earn: 409, pay: 320 },
  { date: "2024-04-09", earn: 59, pay: 110 },
  { date: "2024-04-10", earn: 261, pay: 190 },
  { date: "2024-04-11", earn: 327, pay: 350 },
  { date: "2024-04-12", earn: 292, pay: 210 },
  { date: "2024-04-13", earn: 342, pay: 380 },
  { date: "2024-04-14", earn: 137, pay: 220 },
  { date: "2024-04-15", earn: 120, pay: 170 },
  { date: "2024-04-16", earn: 138, pay: 190 },
  { date: "2024-04-17", earn: 446, pay: 360 },
  { date: "2024-04-18", earn: 364, pay: 410 },
  { date: "2024-04-19", earn: 243, pay: 180 },
  { date: "2024-04-20", earn: 89, pay: 150 },
  { date: "2024-04-21", earn: 137, pay: 200 },
  { date: "2024-04-22", earn: 224, pay: 170 },
  { date: "2024-04-23", earn: 138, pay: 230 },
  { date: "2024-04-24", earn: 387, pay: 290 },
  { date: "2024-04-25", earn: 215, pay: 250 },
  { date: "2024-04-26", earn: 75, pay: 130 },
  { date: "2024-04-27", earn: 383, pay: 420 },
  { date: "2024-04-28", earn: 122, pay: 180 },
  { date: "2024-04-29", earn: 315, pay: 240 },
  { date: "2024-04-30", earn: 454, pay: 380 },
  { date: "2024-05-01", earn: 165, pay: 220 },
  { date: "2024-05-02", earn: 293, pay: 310 },
  { date: "2024-05-03", earn: 247, pay: 190 },
  { date: "2024-05-04", earn: 385, pay: 420 },
  { date: "2024-05-05", earn: 481, pay: 390 },
  { date: "2024-05-06", earn: 498, pay: 520 },
  { date: "2024-05-07", earn: 388, pay: 300 },
  { date: "2024-05-08", earn: 149, pay: 210 },
  { date: "2024-05-09", earn: 227, pay: 180 },
  { date: "2024-05-10", earn: 293, pay: 330 },
  { date: "2024-05-11", earn: 335, pay: 270 },
  { date: "2024-05-12", earn: 197, pay: 240 },
  { date: "2024-05-13", earn: 197, pay: 160 },
  { date: "2024-05-14", earn: 448, pay: 490 },
  { date: "2024-05-15", earn: 473, pay: 380 },
  { date: "2024-05-16", earn: 338, pay: 400 },
  { date: "2024-05-17", earn: 499, pay: 420 },
  { date: "2024-05-18", earn: 315, pay: 350 },
  { date: "2024-05-19", earn: 235, pay: 180 },
  { date: "2024-05-20", earn: 177, pay: 230 },
  { date: "2024-05-21", earn: 82, pay: 140 },
  { date: "2024-05-22", earn: 81, pay: 120 },
  { date: "2024-05-23", earn: 252, pay: 290 },
  { date: "2024-05-24", earn: 294, pay: 220 },
  { date: "2024-05-25", earn: 201, pay: 250 },
  { date: "2024-05-26", earn: 213, pay: 170 },
  { date: "2024-05-27", earn: 420, pay: 460 },
  { date: "2024-05-28", earn: 233, pay: 190 },
  { date: "2024-05-29", earn: 78, pay: 130 },
  { date: "2024-05-30", earn: 340, pay: 280 },
  { date: "2024-05-31", earn: 178, pay: 230 },
  { date: "2024-06-01", earn: 178, pay: 200 },
  { date: "2024-06-02", earn: 470, pay: 410 },
  { date: "2024-06-03", earn: 103, pay: 160 },
  { date: "2024-06-04", earn: 439, pay: 380 },
  { date: "2024-06-05", earn: 88, pay: 140 },
  { date: "2024-06-06", earn: 294, pay: 250 },
  { date: "2024-06-07", earn: 323, pay: 370 },
  { date: "2024-06-08", earn: 385, pay: 320 },
  { date: "2024-06-09", earn: 438, pay: 480 },
  { date: "2024-06-10", earn: 155, pay: 200 },
  { date: "2024-06-11", earn: 92, pay: 150 },
  { date: "2024-06-12", earn: 492, pay: 420 },
  { date: "2024-06-13", earn: 81, pay: 130 },
  { date: "2024-06-14", earn: 426, pay: 380 },
  { date: "2024-06-15", earn: 307, pay: 350 },
  { date: "2024-06-16", earn: 371, pay: 310 },
  { date: "2024-06-17", earn: 475, pay: 520 },
  { date: "2024-06-18", earn: 107, pay: 170 },
  { date: "2024-06-19", earn: 341, pay: 290 },
  { date: "2024-06-20", earn: 408, pay: 450 },
  { date: "2024-06-21", earn: 169, pay: 210 },
  { date: "2024-06-22", earn: 317, pay: 270 },
  { date: "2024-06-23", earn: 480, pay: 530 },
  { date: "2024-06-24", earn: 132, pay: 180 },
  { date: "2024-06-25", earn: 141, pay: 190 },
  { date: "2024-06-26", earn: 434, pay: 380 },
  { date: "2024-06-27", earn: 448, pay: 490 },
  { date: "2024-06-28", earn: 149, pay: 200 },
  { date: "2024-06-29", earn: 103, pay: 160 },
  { date: "2024-06-30", earn: 446, pay: 400 },
]

const chartConfig = {
  payment: {
    label: "المعلومات المالية",
  },
  earn: {
    label: "العوائد",
    color: "#45DFB1",
  },
  pay: {
    label: "المدفوعات",
    color: "slate-500",
  },
} satisfies ChartConfig

export default function UserEarn() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="mt-5">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-lamagreen">المعلومات المالية</CardTitle>
          <CardDescription>
            اظهار المعلومات المالية حسب التصنيف المختار
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              آخر ثلاث شهور
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              آخر ثلاثين يوم
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              آخر سبع أيام
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillearn" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pay)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pay)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillpay" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-earn)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-earn)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="pay"
              type="natural"
              fill="url(#fillpay)"
              stroke="black"
              stackId="a"
            />
            <Area
              dataKey="earn"
              type="natural"
              fill="url(#fillearn)"
              stroke="#45DFB1"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
