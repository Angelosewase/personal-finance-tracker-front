"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart showing personal finance data"

const chartData = [
  { date: "2024-04-01", income: 4200, expenses: 3150 },
  { date: "2024-04-02", income: 4200, expenses: 3280 },
  { date: "2024-04-03", income: 4200, expenses: 3120 },
  { date: "2024-04-04", income: 4300, expenses: 3260 },
  { date: "2024-04-05", income: 4250, expenses: 3290 },
  { date: "2024-04-06", income: 4250, expenses: 3340 },
  { date: "2024-04-07", income: 4250, expenses: 3180 },
  { date: "2024-04-08", income: 4250, expenses: 3320 },
  { date: "2024-04-09", income: 4250, expenses: 3110 },
  { date: "2024-04-10", income: 4250, expenses: 3190 },
  { date: "2024-04-11", income: 4250, expenses: 3350 },
  { date: "2024-04-12", income: 4250, expenses: 3210 },
  { date: "2024-04-13", income: 4250, expenses: 3380 },
  { date: "2024-04-14", income: 4250, expenses: 3220 },
  { date: "2024-04-15", income: 4500, expenses: 3170 },
  { date: "2024-04-16", income: 4500, expenses: 3190 },
  { date: "2024-04-17", income: 4500, expenses: 3360 },
  { date: "2024-04-18", income: 4500, expenses: 3410 },
  { date: "2024-04-19", income: 4500, expenses: 3180 },
  { date: "2024-04-20", income: 4500, expenses: 3150 },
  { date: "2024-04-21", income: 4500, expenses: 3200 },
  { date: "2024-04-22", income: 4500, expenses: 3170 },
  { date: "2024-04-23", income: 4500, expenses: 3230 },
  { date: "2024-04-24", income: 4500, expenses: 3290 },
  { date: "2024-04-25", income: 4500, expenses: 3250 },
  { date: "2024-04-26", income: 4500, expenses: 3130 },
  { date: "2024-04-27", income: 4500, expenses: 3420 },
  { date: "2024-04-28", income: 4500, expenses: 3180 },
  { date: "2024-04-29", income: 4500, expenses: 3240 },
  { date: "2024-04-30", income: 4500, expenses: 3380 },
  { date: "2024-05-01", income: 4600, expenses: 3220 },
  { date: "2024-05-02", income: 4600, expenses: 3310 },
  { date: "2024-05-03", income: 4600, expenses: 3190 },
  { date: "2024-05-04", income: 4600, expenses: 3420 },
  { date: "2024-05-05", income: 4600, expenses: 3390 },
  { date: "2024-05-06", income: 4600, expenses: 3520 },
  { date: "2024-05-07", income: 4600, expenses: 3300 },
  { date: "2024-05-08", income: 4600, expenses: 3210 },
  { date: "2024-05-09", income: 4600, expenses: 3180 },
  { date: "2024-05-10", income: 4600, expenses: 3330 },
  { date: "2024-05-11", income: 4600, expenses: 3270 },
  { date: "2024-05-12", income: 4600, expenses: 3240 },
  { date: "2024-05-13", income: 4600, expenses: 3160 },
  { date: "2024-05-14", income: 4600, expenses: 3490 },
  { date: "2024-05-15", income: 4700, expenses: 3380 },
  { date: "2024-05-16", income: 4700, expenses: 3400 },
  { date: "2024-05-17", income: 4700, expenses: 3420 },
  { date: "2024-05-18", income: 4700, expenses: 3350 },
  { date: "2024-05-19", income: 4700, expenses: 3180 },
  { date: "2024-05-20", income: 4700, expenses: 3230 },
  { date: "2024-05-21", income: 4700, expenses: 3140 },
  { date: "2024-05-22", income: 4700, expenses: 3120 },
  { date: "2024-05-23", income: 4700, expenses: 3290 },
  { date: "2024-05-24", income: 4700, expenses: 3220 },
  { date: "2024-05-25", income: 4700, expenses: 3250 },
  { date: "2024-05-26", income: 4700, expenses: 3170 },
  { date: "2024-05-27", income: 4700, expenses: 3460 },
  { date: "2024-05-28", income: 4700, expenses: 3190 },
  { date: "2024-05-29", income: 4700, expenses: 3130 },
  { date: "2024-05-30", income: 4700, expenses: 3280 },
  { date: "2024-05-31", income: 4700, expenses: 3230 },
  { date: "2024-06-01", income: 4800, expenses: 3200 },
  { date: "2024-06-02", income: 4800, expenses: 3410 },
  { date: "2024-06-03", income: 4800, expenses: 3160 },
  { date: "2024-06-04", income: 4800, expenses: 3380 },
  { date: "2024-06-05", income: 4800, expenses: 3140 },
  { date: "2024-06-06", income: 4800, expenses: 3250 },
  { date: "2024-06-07", income: 4800, expenses: 3370 },
  { date: "2024-06-08", income: 4800, expenses: 3320 },
  { date: "2024-06-09", income: 4800, expenses: 3480 },
  { date: "2024-06-10", income: 4800, expenses: 3200 },
  { date: "2024-06-11", income: 4800, expenses: 3150 },
  { date: "2024-06-12", income: 4800, expenses: 3420 },
  { date: "2024-06-13", income: 4800, expenses: 3130 },
  { date: "2024-06-14", income: 4800, expenses: 3380 },
  { date: "2024-06-15", income: 4800, expenses: 3350 },
  { date: "2024-06-16", income: 4800, expenses: 3310 },
  { date: "2024-06-17", income: 4800, expenses: 3520 },
  { date: "2024-06-18", income: 4800, expenses: 3170 },
  { date: "2024-06-19", income: 4800, expenses: 3290 },
  { date: "2024-06-20", income: 4800, expenses: 3450 },
  { date: "2024-06-21", income: 4800, expenses: 3210 },
  { date: "2024-06-22", income: 4800, expenses: 3270 },
  { date: "2024-06-23", income: 4800, expenses: 3530 },
  { date: "2024-06-24", income: 4800, expenses: 3180 },
  { date: "2024-06-25", income: 4800, expenses: 3190 },
  { date: "2024-06-26", income: 4800, expenses: 3380 },
  { date: "2024-06-27", income: 4800, expenses: 3490 },
  { date: "2024-06-28", income: 4800, expenses: 3200 },
  { date: "2024-06-29", income: 4800, expenses: 3160 },
  { date: "2024-06-30", income: 4800, expenses: 3400 },
]

const chartConfig = {
  finances: {
    label: "Finances",
  },
  income: {
    label: "Income",
    color: "var(--primary)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

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
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Income vs. Expenses</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Financial overview for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-income)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expenses)"
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
              defaultIndex={isMobile ? -1 : 10}
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
              dataKey="income"
              type="natural"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
            />
            <Area
              dataKey="expenses"
              type="natural"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillExpenses)"
              stroke="var(--color-expenses)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
