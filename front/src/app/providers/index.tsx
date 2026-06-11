import "@shared/index.css";
import { Toaster } from "@shared/ui/toast";

import { ContextProvider } from "./ConextProvider";
import { BrowserRouter } from "./RouterProvider";
import { TanStackQueryClientProvider } from "./TanStackQueryClientProvider";

export const Providers = () => (
  <TanStackQueryClientProvider>
    <ContextProvider>
      <BrowserRouter />
      <Toaster />
    </ContextProvider>
  </TanStackQueryClientProvider>
);
