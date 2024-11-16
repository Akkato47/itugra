import { Button, Heading } from "@shared/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@shared/ui/dialog";

import { securityItems } from "../constants/items";

const SecurityPage = () => (
  <section className='w-full max-w-[840px] rounded-lg border border-slate-300'>
    <div className='px-6 my-10 text-center space-y-10'>
      <Heading variant='h2' tag='h2'>
        Основные данные для входа
      </Heading>
      <div className='w-full space-y-4 text-center'>
        {securityItems.map((item) => (
          <div key={item.name} className='border border-slate-300 rounded-xl'>
            <div className='px-6 py-4 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                {item.icon}
                <p className='leading-[150%] text-slate-900 font-medium'>{item.name}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Изменить</Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>{item.dialogTitle}</DialogTitle>
                  </DialogHeader>
                  {item.modal}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SecurityPage;
