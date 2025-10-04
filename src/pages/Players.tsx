import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Star,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  Calendar,
  DollarSign
} from 'lucide-react';

interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  nationality: string;
  marketValue: number;
  salary: number;
  contractEnd: string;
  status: 'active' | 'injured' | 'suspended' | 'transfer_listed';
  performance: number;
  goals: number;
  assists: number;
  rating: number;
  image: string;
}

const Players: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'injured' | 'suspended' | 'transfer_listed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const players: Player[] = [
    {
      id: 1,
      name: 'Kylian Mbappé',
      position: 'Delantero',
      age: 25,
      nationality: 'Francia',
      marketValue: 180000000,
      salary: 25000000,
      contractEnd: '2025-06-30',
      status: 'active',
      performance: 95,
      goals: 28,
      assists: 12,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Luka Modrić',
      position: 'Centrocampista',
      age: 38,
      nationality: 'Croacia',
      marketValue: 5000000,
      salary: 12000000,
      contractEnd: '2024-06-30',
      status: 'active',
      performance: 88,
      goals: 3,
      assists: 8,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Vinicius Jr.',
      position: 'Extremo',
      age: 23,
      nationality: 'Brasil',
      marketValue: 120000000,
      salary: 15000000,
      contractEnd: '2027-06-30',
      status: 'active',
      performance: 92,
      goals: 15,
      assists: 18,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Thibaut Courtois',
      position: 'Portero',
      age: 31,
      nationality: 'Bélgica',
      marketValue: 25000000,
      salary: 8000000,
      contractEnd: '2026-06-30',
      status: 'injured',
      performance: 90,
      goals: 0,
      assists: 0,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Eder Militão',
      position: 'Defensor',
      age: 26,
      nationality: 'Brasil',
      marketValue: 60000000,
      salary: 10000000,
      contractEnd: '2028-06-30',
      status: 'suspended',
      performance: 85,
      goals: 2,
      assists: 1,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const filteredPlayers = players.filter(player => {
    const matchesFilter = filter === 'all' || player.status === filter;
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'injured': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'transfer_listed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'injured': return 'Lesionado';
      case 'suspended': return 'Suspendido';
      case 'transfer_listed': return 'En venta';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Jugadores</h1>
          <p className="text-gray-600 mt-1">Administra la plantilla del club</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Jugador</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Jugadores Activos</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">€385M</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Promedio Goles</p>
              <p className="text-2xl font-bold text-gray-900">9.6</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Rating Promedio</p>
              <p className="text-2xl font-bold text-gray-900">4.6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar jugadores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            {['all', 'active', 'injured', 'suspended', 'transfer_listed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'Todos' : 
                 status === 'active' ? 'Activos' :
                 status === 'injured' ? 'Lesionados' :
                 status === 'suspended' ? 'Suspendidos' : 'En venta'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de jugadores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={player.image} 
                  alt={player.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                  <p className="text-sm text-gray-600">{player.position}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                      {getStatusText(player.status)}
                    </span>
                    <span className="text-xs text-gray-500">{player.age} años</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-900">{player.rating}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Valor de mercado</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(player.marketValue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Salario anual</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(player.salary)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Contrato hasta</span>
                <span className="text-sm font-medium text-gray-900">{formatDate(player.contractEnd)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rendimiento</span>
                <span className={`text-sm font-medium ${getPerformanceColor(player.performance)}`}>
                  {player.performance}%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">Goles</p>
                  <p className="text-lg font-semibold text-gray-900">{player.goals}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Asistencias</p>
                  <p className="text-lg font-semibold text-gray-900">{player.assists}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Nacionalidad</p>
                  <p className="text-sm font-medium text-gray-900">{player.nationality}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                <Edit className="h-4 w-4 inline mr-1" />
                Editar
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron jugadores</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}

      {/* Modal para agregar jugador */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar Nuevo Jugador</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Portero</option>
                  <option>Defensor</option>
                  <option>Centrocampista</option>
                  <option>Delantero</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nacionalidad</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;
