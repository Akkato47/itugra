import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { applyInitialTheme } from "@features/theme";

import { Providers } from "./providers";

applyInitialTheme();

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <StrictMode>
    <Providers />
  </StrictMode>
);
