/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FileIcon, PersonIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { MainProfileInfo } from "@widgets/profile/main-profile-info";
import { ProfileTabSwitch } from "@widgets/profile/profile-tab-switch";

import { translateEducationFormat, useUser, useUserDataQuery } from "@entities/user";

import { GraphIcon, SearchIcon } from "@shared/icons";
import { Heading } from "@shared/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@shared/ui/accordion";

import { fileCategories } from "../constants/fileCategories.constant";

const ProfilePage = () => {
  const { user } = useUser();
  const { data, isSuccess } = useUserDataQuery({ tag: user!.tag });
  const [selectedSection, setSelectedSection] = useState<"records" | "career" | "friends">(
    "career"
  );

  const userProfile = data?.data.profileInfo;
  const fullName = data?.data.fullName.split(" ");
  const currentUserJob = data?.data.profileInfo.userExperience.find((job) => job.present);

  return (
    <>
      {isSuccess && userProfile && (
        <div className='flex items-center justify-center flex-col gap-6'>
          <MainProfileInfo
            userName={fullName}
            tag={data.data.tag}
            backgroundImage={data.data.backgroundImage}
            isEdit={false}
            image={data.data.image}
          >
            <div className='w-full max-w-[650px] space-y-2 relative mb-8'>
              {data.data.profileInfo.about && (
                <>
                  <p className='font-medium leading-[150%]'>Обо мне:</p>
                  <p className='opacity-90 leading-[175%]'>{data.data.profileInfo.about}</p>
                </>
              )}
              <div className='flex items-center gap-4'>
                <p className='font-bold text-slate-600 leading-[150%]'>Контактные данные</p>
                <p className='text-slate-600 leading-[171%]'>{data.data.mail}</p>
                <p className='text-slate-600 leading-[171%]'>{data.data.phone}</p>
              </div>
              {currentUserJob ? (
                <div className='flex items-center gap-3'>
                  <PersonIcon />
                  <p className='leading-[175%]'>
                    {currentUserJob.position} в компании{" "}
                    <span className='text-[#0066b3]'>{currentUserJob.name}</span>
                  </p>
                </div>
              ) : (
                <div className='flex items-center gap-3'>
                  <SearchIcon />
                  <p className='leading-[175%] '>В поиске работы</p>
                </div>
              )}
              {data.data.profileInfo.status && (
                <div className='flex items-center gap-3'>
                  <GraphIcon />
                  <p className='leading-[175%]'>{data.data.profileInfo.status}</p>
                </div>
              )}
              {userProfile.userLocation && (
                <div className='flex items-center gap-3'>
                  <PersonIcon />
                  <p className='leading-[175%]'>
                    {userProfile.userLocation.country || "Страна проживания"}
                  </p>
                </div>
              )}
            </div>
          </MainProfileInfo>

          <ProfileTabSwitch
            setSelectedSection={setSelectedSection}
            selectedSection={selectedSection}
          />

          {selectedSection === "career" && (
            <>
              {(userProfile.userExperience.length !== 0 || userProfile.userSkills.length !== 0) && (
                <section className='w-full max-w-[840px] flex flex-col items-center rounded-lg border border-slate-300'>
                  <div className='w-full max-w-[650px] relative my-6'>
                    {userProfile.userSkills.length !== 0 && (
                      <>
                        <Heading variant='h3' tag='h3'>
                          Навыки
                        </Heading>
                        <ul className='flex flex-wrap items-center gap-3 mt-4'>
                          {userProfile.userSkills.map((skill, index) => (
                            <li key={index} className='bg-slate-100 py-2 px-4 rounded-lg'>
                              {skill.name}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {userProfile.userExperience.length !== 0 && (
                      <div className='mt-6'>
                        <Heading variant='h3' tag='h3'>
                          Карьра
                        </Heading>
                        <ul className='mt-4 space-y-3'>
                          {userProfile.userExperience.map((career) => (
                            <li key={career.uid} className='space-y-1'>
                              <Heading variant='h4' tag='h4'>
                                {career.position}
                              </Heading>
                              <p className='text-[#0066b3] leading-[175%]'>{career.name}</p>
                              <p className='text-sm leading-[171%] opacity-50'>{`${career.startDate} - ${career.present ? "По настоящее время" : career.endDate}`}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}
              {(userProfile.userEducation !== null || userProfile.userFiles.length !== 0) && (
                <section className='w-full max-w-[840px] flex flex-col items-center rounded-lg border border-slate-300'>
                  <div className='w-full max-w-[650px] space-y-3 relative my-6'>
                    <Heading variant='h4' tag='h3' className='text-center'>
                      Образование
                    </Heading>
                    {userProfile.userEducation !== null && (
                      <div className='flex items-center justify-center gap-4'>
                        <div className='bg-red-600 flex-shrink-0 size-6 rounded-full' />
                        <p className='leading-[175%]'>{`Учреждение: ${userProfile.userEducation.university}. Специальность: ${userProfile.userEducation.direction}. Год окончания: ${userProfile.userEducation.endDate.slice(0, 4)}. Форма обучения: ${translateEducationFormat(userProfile.userEducation.format)}`}</p>
                      </div>
                    )}
                    {userProfile.userFiles.length !== 0 && (
                      <Accordion className='space-y-5' type='single' collapsible>
                        {fileCategories
                          .filter((cattegory) =>
                            userProfile.userFiles.find(
                              (file) => file.category === cattegory.category
                            )
                          )
                          .map((value) => (
                            <AccordionItem key={value.category} value={value.category}>
                              <AccordionTrigger>{value.translate}</AccordionTrigger>
                              <AccordionContent>
                                <div className='bg-white border space-y-5 border-slate-300 px-6 py-4 rounded-lg'>
                                  {userProfile.userFiles
                                    .filter((file) => file.category === value.category)
                                    .map((file) => (
                                      <a
                                        href={file.file.fileUrl}
                                        className='flex items-center gap-2'
                                        key={file.uid}
                                      >
                                        <FileIcon className='size-6' />
                                        <p className='leading-[150%]'>{file.file.name}</p>
                                      </a>
                                    ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                      </Accordion>
                    )}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      )}
      {/* {isPending && (
        <div className='flex items-center w-full flex-col gap-7'>
          <Skeleton className='size-40 rounded-full' />
          <div className='space-y-1'>
            <Skeleton className='w-52 h-7' />
            <Skeleton className='w-10 h-6' />
            <Skeleton className='w-20 h-6' />
          </div>

          <div className='grid grid-cols-2 gap-10'>
            <Skeleton className='w-[397px] h-[42px]' />
            <Skeleton className='w-[397px] h-[42px]' />
            <Skeleton className='w-[397px] h-[42px]' />
            <Skeleton className='w-[397px] h-[42px]' />
          </div>

          <div className='space-y-5'>
            <Skeleton className='w-[835px] h-[42px]' />
            <Skeleton className='w-[835px] h-[42px]' />
          </div>
        </div>
      )} */}
    </>
  );
};

export default ProfilePage;
