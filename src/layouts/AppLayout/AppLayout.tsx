import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Outlet />
    </div>
  );
};
