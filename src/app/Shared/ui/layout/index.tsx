import { AppHeader } from "app/components/header/header";
import "./index.module.css";
import "../../../styles/index.module.css";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="layout">
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
