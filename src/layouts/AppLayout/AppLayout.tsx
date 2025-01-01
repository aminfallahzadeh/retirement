// IMPORTS
import { Header } from "@/shared/components/Header";
import { Outlet } from "react-router-dom";
import { Gadget } from "@/shared/components/Gadget";

const AppLayout = () => {
  return (
    <main>
      <Header />
      <div className="body">
        <Outlet />
      </div>

      <Gadget />
    </main>
  );
};

export default AppLayout;
