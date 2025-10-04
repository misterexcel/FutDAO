import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Vote, 
  Users, 
  DollarSign, 
  ShoppingBag, 
  User, 
  X,
  Trophy,
  TrendingUp,
  Shield
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard', description: 'Vista general' },
    { path: '/governance', icon: Vote, label: 'Gobernanza', description: 'Propuestas y votaciones' },
    { path: '/players', icon: Users, label: 'Jugadores', description: 'Gestión de plantilla' },
    { path: '/budget', icon: DollarSign, label: 'Presupuesto', description: 'Finanzas del club' },
    { path: '/nft-marketplace', icon: ShoppingBag, label: 'NFT Marketplace', description: 'Tokens y coleccionables' },
    { path: '/profile', icon: User, label: 'Perfil', description: 'Configuración personal' },
  ];

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-md border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-blue-600" />
            <h2 className="ml-2 text-xl font-bold gradient-text">FutDAO</h2>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center p-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <div className="ml-3">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Stats del usuario */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Poder de Voto</span>
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">1,250 FDT</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+5.2% esta semana</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
