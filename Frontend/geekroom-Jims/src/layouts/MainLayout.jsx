import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './MainLayout.css';

export const MainLayout = () => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
