import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

import { cn } from "@shared/lib/shade-cn";
import { Button, Heading, SearchInput } from "@shared/ui";

import { useSkills } from "../model/useSkills";

const SkillsSettingsPage = () => {
  const [searchValue, setSearchValue] = useState("");

  const { addSkill, deleteSkill, data } = useSkills();

  const writeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const handleOnKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addSkill(searchValue, () => setSearchValue(""));
  };

  return (
    <section className='w-full max-w-[840px] flex flex-col items-center rounded-lg border border-slate-300'>
      <div className='w-full my-10 text-center px-6 space-y-10'>
        <Heading variant='h2' tag='h2'>
          Навыки
        </Heading>
        {data && (
          <>
            {data.data.userSkills.length !== 0 ? (
              <ul className='flex flex-wrap items-center gap-3'>
                {data.data.userSkills.map((skill, index) => (
                  <li key={index} className='bg-slate-100 py-2 pl-4 rounded-lg flex items-center'>
                    <p>{skill.name}</p>
                    <Button onClick={() => deleteSkill(skill.uid)} variant='ghost' size='sm'>
                      <Cross1Icon />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='font-semibold'>Нет навыков</p>
            )}
          </>
        )}
        <SearchInput
          handleOnKeyDown={handleOnKeyDown}
          searchValue={searchValue}
          setSearchValue={writeSearchValue}
        >
          <div
            className={cn(
              "w-full border border-slate-300 rounded-b-md overflow-y-scroll transition-all duration-700 ease-in-out",
              searchValue ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className='p-6 pt-3 space-y-4'>
              <p className='font-medium text-left leading-[150%]'>Рекомендуемые навыки</p>
              <ul className='flex flex-wrap items-center gap-2'>
                <li>
                  <Button onClick={() => addSkill("backend")} variant='secondary'>
                    backend
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </SearchInput>
      </div>
    </section>
  );
};

export default SkillsSettingsPage;
