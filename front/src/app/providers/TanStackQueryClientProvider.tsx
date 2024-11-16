import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";

interface ITanStackQueryClientProviderProps {
  children: React.ReactNode;
}

export const TanStackQueryClientProvider = ({ children }: ITanStackQueryClientProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
