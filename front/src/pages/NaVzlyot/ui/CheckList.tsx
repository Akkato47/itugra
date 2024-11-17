import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart
} from "recharts";

import { buttonVariants } from "@shared/constants/shade-cn";
import { cn } from "@shared/lib/shade-cn";
import { Checkbox, Heading } from "@shared/ui";
import { Card } from "@shared/ui/card";
import type { ChartConfig } from "@shared/ui/chart";
import { ChartContainer } from "@shared/ui/chart";

import { useGetUsersRecQuery, usePatchToggleTaskMutation } from "../api/hooks";
import type { ITask } from "../api/req";

const chartConfig = {
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig;

const fakeChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
];

const fakeChartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb"
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa"
  }
} satisfies ChartConfig;

const numToCategory = (num: number) => {
  if (num === 1) return "Backend";
  if (num === 2) return "Frontend";
  if (num === 3) return "UI/UX";
  if (num === 4) return "System Analyst";
};

const numToColor = (num: number) => {
  if (num === 1) return "bg-[#4C1D95]";
  if (num === 2) return "bg-[#1D4C95]";
  if (num === 3) return "bg-[#22C55E]";
  if (num === 4) return "bg-[#475569]";
};

const toPercent = (list: ITask[]) => {
  const doneTasks = list.filter((task) => task.done);
  const percent = Number((doneTasks.length / list.length).toFixed()) * 100;
  return percent;
};

export const CheckList = ({ list }: { list: ITask[] }) => {
  const taskMutation = usePatchToggleTaskMutation();
  const recQuery = useGetUsersRecQuery({});

  return (
    <section className='space-y-5 w-full'>
      <Heading tag='h1' className='col-span-3 '>
        Твой чек-лист успеха
      </Heading>
      <div className='xl:flex-row flex flex-col gap-6  '>
        <Card className='w-full'>
          <ul>
            {list
              .sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }

                return 0;
              })
              .map((task) => (
                <li key={task.uid} className='flex items-center space-x-2 px-6 py-5'>
                  <Checkbox
                    checked={task.done}
                    id={task.name}
                    onCheckedChange={() => {
                      taskMutation.mutateAsync({
                        params: {
                          uid: task.uid
                        }
                      });
                    }}
                  />
                  <label
                    htmlFor={task.uid}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {task.name}
                  </label>
                </li>
              ))}
          </ul>
        </Card>
        <div className='flex flex-col gap-6 w-full'>
          <Card className='px-6 py-5 text-center '>
            <p>Ваш прогресс</p>

            <ChartContainer
              config={chartConfig}
              className='mx-auto aspect-square max-h-[250px] w-full'
            >
              <RadialBarChart
                data={[
                  {
                    browser: "safari",
                    value: toPercent(list),
                    fill: "#22C55E"
                  }
                ]}
                startAngle={0}
                endAngle={250}
                innerRadius={80}
                outerRadius={110}
              >
                <PolarGrid
                  gridType='circle'
                  radialLines={false}
                  stroke='none'
                  className='first:fill-muted last:fill-background'
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey='value' background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor='middle'
                            dominantBaseline='middle'
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className='fill-foreground text-4xl font-bold'
                            >
                              {toPercent(list)} %
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </Card>

          <Card className='px-6 py-5 text-center '>
            <p>Активность</p>
            <ChartContainer config={fakeChartConfig} className='min-h-[200px] w-full'>
              <BarChart accessibilityLayer data={fakeChartData}>
                <CartesianGrid vertical={false} />
                <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
                <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
              </BarChart>
            </ChartContainer>
          </Card>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
        {recQuery.data?.data.map((event) => (
          <Card
            className='p-6 text-center min-h-[300px] justify-between flex flex-col'
            key={event.uid}
          >
            <div
              className={cn(
                "px-2 py-1 bg-slate-300 rounded-md text-white flex items-start w-fit",
                numToColor(event.categoryId[0])
              )}
            >
              {numToCategory(event.categoryId[0])}
            </div>
            <h4 className='font-bold'>{event.name}</h4>
            <p className='text-slate-600 text-left'>{event.description}</p>
            <p className='text-xs text-left'>Регистрация до 21.12.2024</p>
            <Link className={buttonVariants()} to={`/profile/event/${event.uid}`}>
              Подробнее
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};
