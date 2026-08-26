import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Users, Trophy, LogOut } from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Events", path: "/admin/events", icon: <Calendar size={20} /> },
    { name: "Team Heads", path: "/admin/team-heads", icon: <Users size={20} /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            GeekRoom Admin
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
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

        <div className="p-4 border-t border-gray-700">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 p-4 sticky top-0 z-10">
          <h1 className="text-xl font-semibold capitalize text-gray-200">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h1>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
