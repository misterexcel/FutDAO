import React from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Vote, 
  Trophy,
  Calendar,
  Target,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import BlockchainStatus from '../components/BlockchainStatus';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Poder de Voto Total', value: '1,250 FDT', icon: Vote, change: '+5.2%', changeType: 'positive' },
    { name: 'Propuestas Activas', value: '12', icon: Target, change: '+2', changeType: 'positive' },
    { name: 'Jugadores en Plantilla', value: '28', icon: Users, change: '+1', changeType: 'positive' },
    { name: 'Presupuesto Disponible', value: '€2.5M', icon: DollarSign, change: '-€100K', changeType: 'negative' },
  ];

  const chartData = [
    { name: 'Ene', value: 1200 },
    { name: 'Feb', value: 1100 },
    { name: 'Mar', value: 1300 },
    { name: 'Abr', value: 1250 },
    { name: 'May', value: 1400 },
    { name: 'Jun', value: 1350 },
  ];

  const pieData = [
    { name: 'Fichajes', value: 40, color: '#3B82F6' },
    { name: 'Infraestructura', value: 30, color: '#8B5CF6' },
    { name: 'Marketing', value: 20, color: '#10B981' },
    { name: 'Operaciones', value: 10, color: '#F59E0B' },
  ];

  const recentProposals = [
    { id: 1, title: 'Fichaje de delantero estrella', status: 'Votando', votes: '85%', deadline: '2 días' },
    { id: 2, title: 'Renovación del estadio', status: 'Aprobada', votes: '92%', deadline: 'Completada' },
    { id: 3, title: 'Nuevo patrocinador principal', status: 'En revisión', votes: '78%', deadline: '5 días' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Bienvenido al sistema de gestión del club</p>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <span className="text-lg font-semibold text-gray-700">Real Madrid DAO</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs mes anterior</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de tendencias */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolución del Poder de Voto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución del presupuesto */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución del Presupuesto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Propuestas recientes */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Propuestas Recientes</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Ver todas
          </button>
        </div>
        <div className="space-y-4">
          {recentProposals.map((proposal) => (
            <div key={proposal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{proposal.title}</h4>
                <div className="flex items-center mt-1 space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    proposal.status === 'Votando' ? 'bg-blue-100 text-blue-800' :
                    proposal.status === 'Aprobada' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {proposal.status}
                  </span>
                  <span className="text-sm text-gray-600">{proposal.votes} a favor</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Tiempo restante</div>
                <div className="font-medium text-gray-900">{proposal.deadline}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividad reciente */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Nueva propuesta creada: "Fichaje de delantero estrella"</p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Vote className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Votaste a favor de "Renovación del estadio"</p>
                <p className="text-xs text-gray-500">Hace 1 día</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <DollarSign className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Presupuesto actualizado: +€500K disponibles</p>
                <p className="text-xs text-gray-500">Hace 3 días</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estado de la blockchain */}
        <div>
          <BlockchainStatus />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
