import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Users, LogOut, Menu, X } from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Events", path: "/admin/events", icon: <Calendar size={20} /> },
    { name: "Team Heads", path: "/admin/team-heads", icon: <Users size={20} /> },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') return 'Dashboard';
    if (path.includes('/events')) return 'Events';
    if (path.includes('/team-heads')) return 'Team Heads';
    return 'Dashboard';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0d14] text-gray-100 font-sans">
      
      {/* Mobile Header (Visible only on small screens) */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-50">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          GeekRoom Admin
        </h2>
        <button onClick={toggleMobileMenu} className="text-gray-300 p-2 focus:outline-none">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'flex' : 'hidden'} 
        md:flex w-full md:w-64 bg-gray-800 border-r border-gray-700 flex-col 
        md:h-screen shrink-0 sticky top-[73px] md:top-0 z-40
      `}>
        <div className="hidden md:block p-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            GeekRoom Admin
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 md:mt-0 py-4 md:py-0">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              window.location.href = '/admin/login';
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut size={20} />
            <span className="font-medium">Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden min-h-[calc(100vh-73px)] md:min-h-screen relative">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
