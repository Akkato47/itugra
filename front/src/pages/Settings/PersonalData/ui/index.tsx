/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { EditPorfile } from "@widgets/edit-profile";

import { useUser, useUserDataQuery } from "@entities/user";

const SettingsPage = () => {
  const { user } = useUser();
  const { data, isSuccess } = useUserDataQuery({ tag: user!.tag });

  return (
    <>
      {isSuccess && (
        <div className='flex justify-center flex-col gap-6'>
          <section className='w-full max-w-[840px]'>
            <div className='flex flex-col items-center rounded-lg border border-slate-300'>
              <EditPorfile userProfile={data.data} />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SettingsPage;
