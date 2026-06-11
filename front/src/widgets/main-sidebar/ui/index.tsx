import { MainLayoutNavbar } from "@features/main-layout-navbar";

// import { SearchInput } from "@shared/ui";

export const MainSidebar = () => (
  <aside className='flex flex-col gap-4 min-w-[264px] border border-slate-300 py-5 px-7 rounded-lg h-fit flex-grow-0'>
    <div className='space-y-8 w-[240px]'>
      {/* <SearchInput /> */}
      <MainLayoutNavbar />
    </div>
  </aside>
);
