import { UserProvider } from "@entities/user";

interface IContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: IContextProviderProps) => (
  <UserProvider>{children}</UserProvider>
);
