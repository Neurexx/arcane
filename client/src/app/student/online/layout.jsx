// Layout.js
import Sidebar from '@/components/ui/sidebar';
import { useNavigation } from 'next/navigation';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white min-h-screen">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;
