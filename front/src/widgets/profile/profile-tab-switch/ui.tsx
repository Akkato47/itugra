import { ArticleIcon, DiplomatIcon, FriendsIcon } from "@shared/icons";
import { cn } from "@shared/lib/shade-cn";
import { Button } from "@shared/ui";

interface IProfileTabSwitchProps {
  setSelectedSection: React.Dispatch<React.SetStateAction<"records" | "career" | "friends">>;
  selectedSection: "records" | "career" | "friends";
}

export const ProfileTabSwitch = ({
  selectedSection,
  setSelectedSection
}: IProfileTabSwitchProps) => (
  <nav className='w-full max-w-[840px] flex items-center rounded-lg border border-slate-300 py-5 pl-10'>
    <Button
      onClick={() => setSelectedSection("records")}
      variant='link'
      className={cn("space-x-2", selectedSection !== "records" && "opacity-50")}
    >
      <ArticleIcon width={20} height={18} />
      <p className='leading-[150%]'>Записи</p>
    </Button>
    <Button
      onClick={() => setSelectedSection("career")}
      variant='link'
      className={cn("space-x-2", selectedSection !== "career" && "opacity-50")}
    >
      <DiplomatIcon />
      <p className='leading-[150%]'>Карьера и навыки</p>
    </Button>
    <div className={cn("flex items-center", selectedSection !== "friends" && "opacity-50")}>
      <Button onClick={() => setSelectedSection("friends")} variant='link' className='space-x-2'>
        <FriendsIcon />
        <p className='leading-[150%]'>Друзья</p>
      </Button>
      <p className='leading-[150%]'>60 чел.</p>
    </div>
  </nav>
);
