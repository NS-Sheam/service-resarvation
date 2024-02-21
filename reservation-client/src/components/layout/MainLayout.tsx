import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const MainLayout = () => {
  return (
    <div className="container bg-white max-w-7xl mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
