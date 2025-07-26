"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with a grid and circle fill"

interface RadarData {
  category: string;
  score: number;
}

interface ChartRadarGridCircleFillProps {
  data?: RadarData[];
  title?: string;
  description?: string;
}

const chartConfig = {
  score: {
    label: "Score",
    color: "#ec4899", // brand pink color
  },
} satisfies ChartConfig

export function ChartRadarGridCircleFill({ 
  data, 
  title = "Radar Scores", 
  description = "Your current wellness metrics" 
}: ChartRadarGridCircleFillProps) {
  // Default data if none provided
  const defaultData = [
    { category: "Stress", score: 75 },
    { category: "Sleep", score: 60 },
    { category: "Mood", score: 80 },
    { category: "Energy", score: 65 },
    { category: "Focus", score: 70 },
    { category: "Social", score: 85 },
  ];

  const chartData = data || defaultData;

  return (
    <Card className="w-full">
      <CardHeader className="items-center pb-6">
        <CardTitle className="text-2xl text-brand-wine">{title}</CardTitle>
        <CardDescription className="text-center text-brand-wine">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px] w-full"
        >
          <RadarChart 
            data={chartData} 
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            width={400}
            height={400}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid
              stroke="#ec4899"
              strokeOpacity={0.3}
              gridType="circle"
            />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ fontSize: 12, fill: '#722F37' }}
              className="text-sm font-medium"
            />
            <PolarRadiusAxis 
              domain={[0, 5]}
              tick={false}
              tickCount={6}
              axisLine={false}
            />
            <Radar
              dataKey="score"
              fill="#ec4899"
              fillOpacity={0.2}
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="text-brand-wine flex items-center gap-2 leading-none">
          Wellness metrics overview
        </div>
      </CardFooter>
    </Card>
  )
}
