import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

import { useAnswers } from "@pages/NaVzlyot/model/answers";

import { LoaderIcon } from "@shared/icons/LoaderIcon";
import { cn } from "@shared/lib/shade-cn";
import { Button, SearchInput } from "@shared/ui";

import { useGetSkillPoolQuery } from "./api/hooks/useGetSkillPoolQuery";
import { usePostGenerateRoadmapmutation } from "./api/hooks/usePostGenerateRoadmapmutation";
import type { ISkill } from "./api/requests/getSkillPool";

export const SelectSkillsForPage = ({ chosenCategory }: { chosenCategory: number }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([]);

  const writeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const addSkill = (skill: ISkill) => {
    setSelectedSkills((prev) => [...prev, skill]);
    setSearchValue("");
  };

  const deleteSkill = (uid: string) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.uid !== uid));
  };

  const handleOnKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // addSkill(searchValue);
      setSearchValue("");
    }
  };

  const skillsPoolQuery = useGetSkillPoolQuery({});

  const { answers } = useAnswers();

  const roadmapMutation = usePostGenerateRoadmapmutation();

  async function endTest() {
    roadmapMutation.mutateAsync({
      params: {
        testResult: answers,
        interestedIn: selectedSkills,
        chosenCategory
      }
    });
  }

  return (
    <>
      <section className='w-full max-w-[840px] flex flex-col items-center '>
        <div className='w-full my-10 text-center px-6 space-y-10'>
          <ul className='flex flex-wrap items-center gap-3'>
            {selectedSkills.map((skill, index) => (
              <li key={index} className='bg-slate-100 py-2 pl-4 rounded-lg flex items-center'>
                <p>{skill.name}</p>
                <Button onClick={() => deleteSkill(skill.uid)} variant='ghost' size='sm'>
                  <Cross1Icon />
                </Button>
              </li>
            ))}
          </ul>

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
                <p className='font-medium text-left leading-[150%]'>Навыки</p>
                <ul className='flex flex-wrap items-center gap-2'>
                  {skillsPoolQuery.data?.data.map((skill) => (
                    <li key={skill.uid}>
                      <Button onClick={() => addSkill(skill)} variant='secondary'>
                        {skill.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SearchInput>
        </div>
      </section>
      <Button disabled={roadmapMutation.isPending} onClick={endTest}>
        {roadmapMutation.isPending && <LoaderIcon className='mr-2 animate-spin' />}
        Узнать результат!
      </Button>
    </>
  );
};
