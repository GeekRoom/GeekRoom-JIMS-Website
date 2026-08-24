import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import InteractiveBackground from "../shared/InteractiveBackground";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between relative text-[#f8fafc] bg-transparent">
      {/* Single shared background canvas — rendered ONCE for ALL pages */}
      <InteractiveBackground />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
