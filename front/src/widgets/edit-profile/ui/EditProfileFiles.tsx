import { FileIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import { EditFileForm } from "@features/edit-profile";

import { postUpload } from "@shared/api";
import { buttonVariants } from "@shared/constants/shade-cn";
import { cn } from "@shared/lib/shade-cn";
import { toast } from "@shared/model/use-toast";
import { Button, Heading, Label } from "@shared/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@shared/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@shared/ui/dialog";

import { useCreateProfileFileMutation } from "../api/hooks/useCreateProfileFileMutation";
import { useDeleteFileMutation } from "../api/hooks/useDeleteFileMutation";
import { fileCategories } from "../constants/fileCategories.constant";

interface IEditProfileFilesProps {
  files: {
    category: "DIP" | "PORTFOLIO" | "RESUME";
    file: TFile;
    uid: string;
  }[];
}

export const EditProfileFiles = ({ files }: IEditProfileFilesProps) => {
  const formDataFiles = new FormData();
  const { mutate } = useCreateProfileFileMutation();
  const deleteFileMutatiom = useDeleteFileMutation();

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>, fileCategory: string) => {
    const fileData = e.target.files && e.target.files[0];
    if (fileData && fileData.size > 5 * 1048576) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Размер файла превышен!",
        description: `Выберите файл меньше 5МБ.`
      });
      formDataFiles.delete("file");
      return;
    }
    if (fileData) formDataFiles.append("file", fileData);
    await postUpload({ formData: formDataFiles })
      .then((res) => {
        mutate({
          params: {
            category: fileCategory,
            file: {
              fileUrl: res.data.url,
              name: res.data.name,
              uid: res.data.uid
            }
          }
        });
      })
      .catch((err: any) =>
        toast({
          className: "bg-red-800 text-white hover:bg-red-700",
          title: "Не удалось загрузить файл",
          description: `В ходе отправки запроса произошла ошибка: ${err.response.data.message}`
        })
      )
      .finally(() => {
        formDataFiles.delete("file");
      });
  };

  const deleteFile = (uid: string) => {
    deleteFileMutatiom.mutate({
      uid: uid
    });
  };

  return (
    <Accordion className='space-y-5' type='single' collapsible>
      {fileCategories.map((value) => (
        <AccordionItem key={value.category} value={value.category}>
          <AccordionTrigger>{value.translate}</AccordionTrigger>
          <AccordionContent className='space-y-5'>
            <Label
              htmlFor='file-input-edu'
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "border border-dashed border-slate-400 opacity-70 w-full py-7"
              )}
            >
              <input
                id='file-input-edu'
                accept='.pdf'
                type='file'
                className='hidden'
                onChange={(e) => uploadFile(e, value.category)}
              />
              <Heading variant='h4' tag='h4'>
                {" "}
                + Добавить документ
              </Heading>
            </Label>
            {files.filter((file) => file.category === value.category).length !== 0 && (
              <div className='bg-white border space-y-5 border-slate-300 px-6 py-4 rounded-lg'>
                {files
                  .filter((file) => file.category === value.category)
                  .map((file) => (
                    <div key={file.uid} className='grid grid-cols-[1fr_70px] gap-4'>
                      <div className='flex items-center gap-2'>
                        <FileIcon className='size-6' />
                        <a href={file.file.fileUrl} className='leading-[150%]'>
                          {file.file.name}
                        </a>
                      </div>
                      <div className='flex items-center'>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant='ghost' size='icon'>
                              <Pencil1Icon className='size-5' />
                            </Button>
                          </DialogTrigger>
                          <DialogContent aria-describedby={undefined}>
                            <DialogHeader>
                              <DialogTitle>Редактирование файла</DialogTitle>
                            </DialogHeader>
                            <EditFileForm name={file.file.name} uid={file.uid} />
                          </DialogContent>
                        </Dialog>
                        <Button variant='ghost' size='icon' onClick={() => deleteFile(file.uid)}>
                          <TrashIcon className='size-5' />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
