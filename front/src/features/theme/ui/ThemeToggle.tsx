import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { buttonVariants } from "@shared/constants/shade-cn";
import { cn } from "@shared/lib/shade-cn";

import type { ThemePreference } from "../lib/theme";
import { useThemeStore } from "../model/theme.store";

const options: { value: ThemePreference; label: string; Icon: typeof SunIcon }[] = [
  { value: "system", label: "Система", Icon: DesktopIcon },
  { value: "light", label: "Светлая", Icon: SunIcon },
  { value: "dark", label: "Тёмная", Icon: MoonIcon }
];

export const ThemeToggle = () => {
  const preference = useThemeStore.use.preference();
  const setPreference = useThemeStore.use.setPreference();

  return (
    <div className='px-2 py-1'>
      <p className='mb-1 text-xs font-medium text-muted-foreground'>Тема</p>
      <div className='grid grid-cols-3 gap-1 rounded-md border border-border p-1'>
        {options.map(({ value, label, Icon }) => (
          <button
            key={value}
            type='button'
            onClick={() => setPreference(value)}
            aria-pressed={preference === value}
            className={cn(
              buttonVariants({
                variant: preference === value ? "default" : "ghost",
                size: "sm"
              }),
              "h-auto flex-col gap-1 px-1 py-1.5"
            )}
          >
            <Icon className='size-4' />
            <span className='text-[11px] leading-none'>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
