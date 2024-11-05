import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home as HomeIcon, BedDouble, Info, Phone } from 'lucide-react';

const bottomNavItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: BedDouble, label: 'Rooms', path: '/rooms' },
  { icon: Info, label: 'About', path: '/about' },
  { icon: Phone, label: 'Contact', path: '/contact' },
];

const Bottom = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-around py-3">
        {bottomNavItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center ${
                isActive ? 'text-primary-500' : 'text-gray-500'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Bottom;