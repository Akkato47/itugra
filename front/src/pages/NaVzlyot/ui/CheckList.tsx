import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Checkbox, Heading, Skeleton } from "@shared/ui";
import { Card } from "@shared/ui/card";
import type { ChartConfig } from "@shared/ui/chart";
import { ChartContainer } from "@shared/ui/chart";

import { useGetUsersRecQuery, usePatchToggleTaskMutation } from "../api/hooks";
import type { ITask } from "../api/req";

const chartConfig = {
  visitors: {
    label: "Visitors"
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig;

export const CheckList = ({ list }: { list: ITask[] }) => {
  const taskMutation = usePatchToggleTaskMutation();
  const { data, isPending } = useGetUsersRecQuery({});

  return (
    <section>
      <Heading tag='h1' className='col-span-3 '>
        Твой чек-лист успеха
      </Heading>
      <div className='lg:flex-row flex flex-col gap-6 mt-5 '>
        <Card>
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
        <div className='flex flex-col gap-6'>
          <Card className='px-6 py-5 text-center '>
            <p>Ваш прогресс</p>
            <div>
              <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
                <RadialBarChart
                  data={[
                    {
                      browser: "safari",
                      visitors:
                        Number((list.filter((task) => task.done).length / list.length).toFixed(2)) *
                        100,
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
                  <RadialBar dataKey='visitors' background cornerRadius={10} />
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
                                {Number(
                                  (list.filter((task) => task.done).length / list.length).toFixed(2)
                                ) * 100}{" "}
                                %
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            </div>
          </Card>
          <Card className='px-6 py-5 text-center '>
            <p>Активность</p>
            <div>?</div>
          </Card>
        </div>
      </div>
      {data && (
        <div className='flex items-center justify-center mt-10'>
          {data.data &&
            data.data.map((rec) => (
              <Card className='p-6 text-center' key={rec}>
                <p>Ваш прогресс</p>
                <div>
                  {Number((list.filter((task) => task.done).length / list.length).toFixed(2)) * 100}{" "}
                  %
                </div>
              </Card>
            ))}
        </div>
      )}
      {isPending && (
        <div className='grid grid-cols-[1fr_1fr_1fr]'>
          {[...Array.from({ length: 3 })].map((_, index) => (
            <Skeleton className='size-48' key={index} />
          ))}
        </div>
      )}
    </section>
  );
};
