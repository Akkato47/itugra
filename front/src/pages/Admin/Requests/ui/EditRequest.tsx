import { useParams } from "react-router-dom";

import { RequestWidget } from "@widgets/request";

import { Button } from "@shared/ui";

const EditRequestPage = () => {
  const { requestUid } = useParams();

  return (
    <div className='w-full space-y-10'>
      <RequestWidget />
      <div className='flex items-center justify-end gap-4'>
        <Button variant='default'>Подтвердить</Button>
        <Button variant='destructive'>Отклонить</Button>
      </div>
    </div>
  );
};

export default EditRequestPage;
