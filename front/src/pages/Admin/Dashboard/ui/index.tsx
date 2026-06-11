import { Heading, Skeleton } from "@shared/ui";

import { useAdminStatsQuery } from "../api/useAdminStatsQuery";

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className='rounded-xl border border-slate-200 px-6 py-5 shadow-sm'>
    <p className='text-sm opacity-60'>{label}</p>
    <Heading variant='h2' className='text-[#0066B3]'>
      {value}
    </Heading>
  </div>
);

const AdminDashboardPage = () => {
  const { data, isPending } = useAdminStatsQuery({});

  if (isPending) {
    return (
      <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className='h-24 w-full' key={index} />
        ))}
      </div>
    );
  }

  const stats = data?.data;

  return (
    <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
      <StatCard label='Пользователи' value={stats?.users ?? 0} />
      <StatCard label='Мероприятия' value={stats?.events ?? 0} />
      <StatCard label='Команды' value={stats?.teams ?? 0} />
      <StatCard label='Заявки на модерации' value={stats?.pendingRequests ?? 0} />
      <StatCard label='Регистрации' value={stats?.registrations ?? 0} />
    </div>
  );
};

export default AdminDashboardPage;
