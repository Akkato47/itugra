import { Checkbox, Heading } from "@shared/ui";
import { Card } from "@shared/ui/card";

import { usePatchToggleTaskMutation } from "../api/hooks";
import type { ITask } from "../api/req";

export const CheckList = ({ list }: { list: ITask[] }) => {
  const taskMutation = usePatchToggleTaskMutation();

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
              {Number((list.filter((task) => task.done).length / list.length).toFixed(2)) * 100} %
            </div>
          </Card>
          <Card className='px-6 py-5 text-center '>
            <p>Активность</p>
            <div>?</div>
          </Card>
        </div>
      </div>
    </section>
  );
};
