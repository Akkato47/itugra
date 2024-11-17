import { Link } from "react-router-dom";

import { LandingCarousel } from "@widgets/landing-carousel";

import { ToAuthLink } from "@features/sign-in";

import { useUser } from "@entities/user";

import { paths } from "@shared/constants/react-router";
import { buttonVariants } from "@shared/constants/shade-cn";
import { LogoIcon } from "@shared/icons";
import { Button, CustomImage, Heading } from "@shared/ui";

import InstandCube from "/images/InstandCube.webp";
import example1 from "/images/example1.png";
import example2 from "/images/example2.png";
import iPhoneGigaChat from "/images/iPhoneGigaChat.png";
import iPhoneSupport from "/images/iPhoneSupport.png";
import iPhoneTest from "/images/iPhoneTest.png";

const LandingPage = () => {
  const { user } = useUser();
  return (
    <>
      <header className='border-b border-b-slate-300'>
        <nav className='mx-32 flex items-center justify-between'>
          <Link to='/'>
            <LogoIcon />
          </Link>
          <ToAuthLink user={user} />
        </nav>
      </header>

      <main className='container space-y-14'>
        <section className='flex h-[calc(100vh-77px)] items-center justify-between'>
          <div className='max-w-[590px] space-y-6 text-zinc-900'>
            <Heading tag='h1'>Развиваем IT предпринимательство в Югре вместе</Heading>
            <p className='text-xl leading-[140%]'>
              Поможем вам воплотить идеи в успешные ИТ-стартапы в Югре.
            </p>
            <p className='text-xl pt-4 leading-[140%]'>
              Поддержка, ресурсы и инструменты для стартапов любого уровня. Присоединяйтесь и
              начните свой путь к успеху сегодня!
            </p>
            <Link
              to={paths.SIGNUP}
              className={buttonVariants({
                variant: "default",
                size: "lg"
              })}
            >
              Перейти к регистрации
            </Link>
          </div>
          <CustomImage src={InstandCube} alt='InstandCube' className='w-[420px]' />
        </section>

        <section className='text-center space-y-4'>
          <Heading className='text-zinc-900' tag='h2' variant='h2'>
            Место Роста - это удобно
          </Heading>
          <Heading className='text-zinc-900' tag='h4' variant='h4'>
            You gon run it for these hunnids, girl, or nah?
            <br />
            Show me, is you really bout your money, girl, or nah?
            <br /> Don play with a boss, girl, take it off (Nah, nah, nah, nah, nah)
            <br />
            Took her for a real one, you gon get it all (Ooh, yeah, ooh, yeah, oh, yeah)
          </Heading>
          <div className='mt-8 flex items-center justify-center gap-6'>
            <div className='text-white bg-gray-900 w-[500px] rounded-2xl'>
              <div className='flex flex-col items-center justify-center gap-4 relative px-[72px] py-6'>
                <Heading tag='h3' variant='h2' className='text-slate-50'>
                  Льготы
                </Heading>
                <p className='text-xl leading-[140%]'>
                  Узнайте о скидках и преимуществах для IT-специалистов
                </p>
                <div className='absolute top-1/3 w-[500px] h-[200px] blur-[235px] bg-[#4971FF]' />
                <CustomImage src={example1} className='z-10' alt='Льготы' />
                <Button variant='ghost'>Узнать подробнее</Button>
              </div>
            </div>
            <div className='text-white bg-gray-900 w-[500px] rounded-2xl'>
              <div className='flex flex-col items-center justify-center gap-4 relative px-[72px] py-6'>
                <Heading tag='h3' variant='h2' className='text-slate-50'>
                  Мероприятия
                </Heading>
                <p className='text-xl leading-[140%]'>
                  Поучавствуйте в различных мероприятиях и хакатонах.
                </p>
                <div className='absolute top-1/3 w-[500px] h-[100px] blur-[235px] bg-[#AF49FF]' />
                <CustomImage src={example2} className='z-10' alt='Льготы' />
                <Button variant='ghost'>Узнать подробнее</Button>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-gray-900 rounded-[80px]'>
          <div className='py-14 px-[73px] flex flex-col items-center justify-center gap-20'>
            <div className='space-y-4 text-center'>
              <Heading variant='h2' tag='h2' className='text-white'>
                Наши преимущества
              </Heading>
              <Heading tag='h4' variant='h4' className='text-white'>
                Получи возможность получить уникальное развитие в сфере IT с помощью платформы
                «Место роста»
              </Heading>
            </div>
            <div className='flex gap-5 relative'>
              <div className='space-y-5'>
                <Heading tag='h3' variant='h3' className='text-slate-50'>
                  Уникальный тест
                </Heading>
                <p className='text-xl leading-[140%] text-slate-50'>
                  Тест поможет вам выбрать свою специализацию в сфере IT и стать разработчиком или
                  дизайнером.
                </p>
                <Button variant='outline'>Перейти к тесту</Button>
              </div>
              <div className='absolute right-[8%] top-[15%] w-[400px] h-[300px] rounded-full blur-[150px] bg-[#AF49FF]' />
              <CustomImage src={iPhoneTest} alt='phone' className='z-10' />
            </div>
            <div className='flex gap-5 relative'>
              <CustomImage src={iPhoneSupport} alt='phone' className='z-10' />
              <div className='absolute left-[8%] top-[15%] w-[400px] h-[300px] rounded-full blur-[150px] bg-[#0013FF]' />
              <div className='space-y-5 text-right'>
                <Heading tag='h3' variant='h3' className='text-slate-50'>
                  Меры поддержки
                </Heading>
                <p className='text-xl leading-[140%] text-slate-50'>
                  Для IT специалистов существует программа государственной поддержки, включающая в
                  себя льготные ипотеки, отсрочку от срочной службы и другие.
                </p>
                <Button variant='outline'>Перейти к тесту</Button>
              </div>
            </div>
            <div className='flex gap-5'>
              <div className='space-y-5'>
                <Heading tag='h3' variant='h3' className='text-slate-50'>
                  GigaChat AI
                </Heading>
                <p className='text-xl leading-[140%] text-slate-50'>
                  Для IT специалистов существует программа государственной поддержки, включающая в
                  себя льготные ипотеки, отсрочку от срочной службы и другие.
                </p>
                <Button variant='outline'>Попробовать</Button>
              </div>
              <CustomImage src={iPhoneGigaChat} alt='phone' />
            </div>
          </div>
        </section>

        <LandingCarousel />
      </main>

      <footer className='mt-32 flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-[#00498A] to-[#000303] py-16'>
        <Link className='text-center text-4xl font-bold text-white' to='/'>
          <Heading tag='h2' variant='h2'>
            Место Роста
          </Heading>
        </Link>

        <div className='container flex items-center justify-between'>
          <ul className='flex list-none flex-col gap-3 text-white'>
            <li>О компании:</li>
            <li>Ассоциация «НП «ПИТ «Бизнес партнеры»</li>
            <li className='hover:underline'>
              <p>Правовая информация</p>
            </li>
            <li className='hover:underline'>
              <p>Реквизиты</p>
            </li>
          </ul>

          <div className='flex flex-col items-end gap-3 text-white'>
            <p>+74999384002</p>
            <p>info_online@winbd.ru</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
