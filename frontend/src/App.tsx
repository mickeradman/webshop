import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import About from "./views/About/About";
import { GlobalStyle } from "./styles/styles";
import MainLayout from "./layouts/MainLayout";
import News from "./views/News/News";
import Products from "./views/Products/Products";
import theme from "./theme/theme";
import AdminDashboard from "./admin/views/AdminDashboard/AdminDashboard";

const App: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(
    localStorage.getItem("theme") === "light" || null ? true : false
  );

  function switchTheme() {
    localStorage.setItem("theme", isLightMode ? "dark" : "light");
    setIsLightMode(!isLightMode);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout isLightMode={isLightMode} switchTheme={switchTheme} />
      ),
      children: [
        {
          index: true,
          path: "nyheter",
          element: <News />,
        },
        {
          path: "produkter",
          element: <Products />,
        },
        {
          path: "om-oss",
          element: <About />,
        },
      ],
    },
    {
      path: "admin",
      element: (
        <AdminDashboard isLightMode={isLightMode} switchTheme={switchTheme} />
      ),
    },
    {
      path: "*",
      element: <div>404 Not Found</div>,
    },
  ]);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme[isLightMode ? "light" : "dark"]}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
