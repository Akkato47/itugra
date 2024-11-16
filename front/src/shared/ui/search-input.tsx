import { SearchIcon } from "@shared/icons";
import { cn } from "@shared/lib/shade-cn";

interface ISearchProfileInput {
  width?: string;
  children: React.ReactNode;
  setSearchValue: (value: string) => void;
  searchValue: string;
  handleOnKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({
  width,
  children,
  searchValue,
  setSearchValue,
  handleOnKeyDown
}: ISearchProfileInput) => (
  <div className=''>
    <div
      className={cn(
        "flex items-center border border-slate-300 px-5",
        searchValue ? "rounded-t-lg" : "rounded-lg"
      )}
    >
      <SearchIcon className='mr-2 size-4 shrink-0 opacity-50' />
      <input
        type='text'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => handleOnKeyDown(e)}
        className={cn(
          "flex h-11 bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
          width ? width : "w-full"
        )}
      />
    </div>
    {children}
  </div>
);
