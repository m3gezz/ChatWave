import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import MainContext from "./contexts/MainContext";
import { ThemeProvider } from "./components/custom/theme/ThemeProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <MainContext>
        <RouterProvider router={router} />
      </MainContext>
    </ThemeProvider>
  </StrictMode>
);
