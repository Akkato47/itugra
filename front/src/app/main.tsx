import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Providers } from "./providers";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <StrictMode>
    <Providers />
  </StrictMode>
);
