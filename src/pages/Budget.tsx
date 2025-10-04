import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Edit, 
  Trash2,
  PieChart,
  BarChart3,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

interface BudgetItem {
  id: number;
  category: string;
  amount: number;
  spent: number;
  remaining: number;
  status: 'on_track' | 'over_budget' | 'under_budget';
  description: string;
  lastUpdated: string;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const Budget: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');
  const [showAddModal, setShowAddModal] = useState(false);

  const budgetData: BudgetItem[] = [
    {
      id: 1,
      category: 'Fichajes',
      amount: 50000000,
      spent: 35000000,
      remaining: 15000000,
      status: 'on_track',
      description: 'Presupuesto para fichajes de jugadores',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      category: 'Salarios',
      amount: 200000000,
      spent: 180000000,
      remaining: 20000000,
      status: 'on_track',
      description: 'Salarios del equipo técnico y jugadores',
      lastUpdated: '2024-01-15'
    },
    {
      id: 3,
      category: 'Infraestructura',
      amount: 30000000,
      spent: 35000000,
      remaining: -5000000,
      status: 'over_budget',
      description: 'Mantenimiento y mejoras del estadio',
      lastUpdated: '2024-01-15'
    },
    {
      id: 4,
      category: 'Marketing',
      amount: 15000000,
      spent: 8000000,
      remaining: 7000000,
      status: 'under_budget',
      description: 'Campañas publicitarias y promocionales',
      lastUpdated: '2024-01-15'
    },
    {
      id: 5,
      category: 'Operaciones',
      amount: 25000000,
      spent: 12000000,
      remaining: 13000000,
      status: 'on_track',
      description: 'Gastos operativos del club',
      lastUpdated: '2024-01-15'
    }
  ];

  const transactions: Transaction[] = [
    {
      id: 1,
      description: 'Fichaje de Kylian Mbappé',
      amount: 180000000,
      type: 'expense',
      category: 'Fichajes',
      date: '2024-01-10',
      status: 'completed'
    },
    {
      id: 2,
      description: 'Ingresos por patrocinio',
      amount: 50000000,
      type: 'income',
      category: 'Marketing',
      date: '2024-01-08',
      status: 'completed'
    },
    {
      id: 3,
      description: 'Renovación del estadio',
      amount: 15000000,
      type: 'expense',
      category: 'Infraestructura',
      date: '2024-01-05',
      status: 'pending'
    },
    {
      id: 4,
      description: 'Venta de entradas',
      amount: 25000000,
      type: 'income',
      category: 'Operaciones',
      date: '2024-01-03',
      status: 'completed'
    }
  ];

  const monthlyData = [
    { month: 'Ene', ingresos: 45000000, gastos: 38000000 },
    { month: 'Feb', ingresos: 52000000, gastos: 42000000 },
    { month: 'Mar', ingresos: 48000000, gastos: 45000000 },
    { month: 'Abr', ingresos: 55000000, gastos: 40000000 },
    { month: 'May', ingresos: 60000000, gastos: 50000000 },
    { month: 'Jun', ingresos: 58000000, gastos: 48000000 }
  ];

  const pieData = budgetData.map(item => ({
    name: item.category,
    value: item.amount,
    spent: item.spent,
    remaining: item.remaining
  }));

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

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
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'text-green-600 bg-green-100';
      case 'over_budget': return 'text-red-600 bg-red-100';
      case 'under_budget': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_track': return <CheckCircle className="h-4 w-4" />;
      case 'over_budget': return <AlertCircle className="h-4 w-4" />;
      case 'under_budget': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on_track': return 'En línea';
      case 'over_budget': return 'Sobre presupuesto';
      case 'under_budget': return 'Bajo presupuesto';
      default: return status;
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalBudget = budgetData.reduce((sum, item) => sum + item.amount, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const budgetUtilization = (totalSpent / totalBudget) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Presupuesto y Finanzas</h1>
          <p className="text-gray-600 mt-1">Gestiona las finanzas del club</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nueva Transacción</span>
        </button>
      </div>

      {/* Resumen financiero */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Gastado</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Disponible</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRemaining)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Utilización</p>
              <p className="text-2xl font-bold text-gray-900">{budgetUtilization.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de barras - Ingresos vs Gastos */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingresos vs Gastos (Últimos 6 meses)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `€${(value / 1000000).toFixed(0)}M`} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Bar dataKey="ingresos" fill="#10B981" name="Ingresos" />
              <Bar dataKey="gastos" fill="#EF4444" name="Gastos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico circular - Distribución del presupuesto */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución del Presupuesto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detalles del presupuesto por categoría */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Presupuesto por Categoría</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {budgetData.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h4 className="text-lg font-medium text-gray-900">{item.category}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    <span>{getStatusText(item.status)}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Presupuesto asignado</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gastado</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(item.spent)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Restante</p>
                  <p className={`text-lg font-semibold ${item.remaining < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    {formatCurrency(item.remaining)}
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    item.remaining < 0 ? 'bg-red-500' : 
                    (item.spent / item.amount) > 0.8 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((item.spent / item.amount) * 100, 100)}%` }}
                ></div>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Última actualización: {formatDate(item.lastUpdated)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Transacciones recientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transacciones Recientes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{transaction.description}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{transaction.category}</span>
                    <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionStatusColor(transaction.status)}`}>
                      {transaction.status === 'completed' ? 'Completada' :
                       transaction.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar transacción */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nueva Transacción</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="expense">Gasto</option>
                    <option value="income">Ingreso</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Fichajes</option>
                    <option>Salarios</option>
                    <option>Infraestructura</option>
                    <option>Marketing</option>
                    <option>Operaciones</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
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

export default Budget;
