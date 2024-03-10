import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import BannerImage from "../BannerImage";

const MainLayout = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="relative">
        <BannerImage />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
