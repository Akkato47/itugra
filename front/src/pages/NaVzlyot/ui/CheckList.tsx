import { useState } from "react";

import { Button, Checkbox, Heading } from "@shared/ui";
import { Card } from "@shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog";

import { useDeleteRoadmapMutation, usePatchToggleTaskMutation } from "../api/hooks";
import type { ITask } from "../api/req";

const resourceTypeLabels: Record<string, string> = {
  course: "Курс",
  article: "Статья",
  video: "Видео",
  doc: "Документация"
};

export const CheckList = ({ list }: { list: ITask[] }) => {
  const taskMutation = usePatchToggleTaskMutation();
  const deleteRoadmapMutation = useDeleteRoadmapMutation();
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const sortedList = [...list].sort((a, b) => a.order - b.order);

  return (
    <section>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <Heading tag='h1' className='col-span-3 '>
          Твой чек-лист успеха
        </Heading>
        <Button
          variant='outline'
          disabled={deleteRoadmapMutation.isPending}
          onClick={() => deleteRoadmapMutation.mutate()}
        >
          Пройти тест заново
        </Button>
      </div>
      <div className='lg:flex-row flex flex-col gap-6 mt-5 '>
        <Card className='flex-1'>
          <ul>
            {sortedList.map((task) => (
              <li
                key={task.uid}
                className='flex items-center gap-3 px-6 py-5 border-b border-b-slate-100 last:border-b-0'
              >
                <Checkbox
                  checked={task.done}
                  id={task.uid}
                  onClick={(event) => event.stopPropagation()}
                  onCheckedChange={() => {
                    taskMutation.mutateAsync({
                      params: {
                        uid: task.uid
                      }
                    });
                  }}
                />
                <button
                  type='button'
                  onClick={() => setSelectedTask(task)}
                  className='flex-1 text-left text-sm font-medium leading-none hover:text-primary transition-colors'
                >
                  {task.name}
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <div className='flex flex-col gap-6'>
          <Card className='px-6 py-5 text-center '>
            <p>Ваш прогресс</p>
            <div>
              {list.length
                ? Math.round((list.filter((task) => task.done).length / list.length) * 100)
                : 0}{" "}
              %
            </div>
          </Card>
          <Card className='px-6 py-5 text-center '>
            <p>Активность</p>
            <div>?</div>
          </Card>
        </div>
      </div>

      <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <DialogContent className='max-h-[85vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>{selectedTask?.name}</DialogTitle>
          </DialogHeader>
          <p className='whitespace-pre-line text-sm text-muted-foreground'>
            {selectedTask?.description?.trim() ||
              "Описание появится после повторной генерации чек-листа."}
          </p>
          {selectedTask?.resources && selectedTask.resources.length > 0 && (
            <div className='mt-2 flex flex-col gap-2'>
              <p className='text-sm font-semibold'>Материалы</p>
              <ul className='flex flex-col gap-2'>
                {selectedTask.resources.map((resource) => (
                  <li key={resource.url}>
                    <a
                      href={resource.url}
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center gap-2 text-sm text-primary hover:underline'
                    >
                      <span className='shrink-0 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground'>
                        {resourceTypeLabels[resource.type] ?? resource.type}
                      </span>
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
