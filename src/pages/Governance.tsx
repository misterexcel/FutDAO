import React, { useState } from 'react';
import { 
  Plus, 
  Vote, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Users,
  Calendar,
  Filter,
  Search
} from 'lucide-react';

interface Proposal {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  deadline: string;
  proposer: string;
  category: 'fichajes' | 'infraestructura' | 'presupuesto' | 'otros';
  createdAt: string;
}

const Governance: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'passed' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const proposals: Proposal[] = [
    {
      id: 1,
      title: 'Fichaje de Kylian Mbappé',
      description: 'Propuesta para fichar al delantero francés por €180M con contrato de 5 años. Incluye salario de €25M anuales y cláusula de rescisión de €200M.',
      status: 'active',
      votesFor: 1250,
      votesAgainst: 180,
      totalVotes: 1430,
      deadline: '2024-01-15',
      proposer: 'Directiva Técnica',
      category: 'fichajes',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      title: 'Renovación del Estadio Santiago Bernabéu',
      description: 'Ampliación del estadio con 5,000 asientos adicionales y mejora de las instalaciones tecnológicas. Presupuesto estimado: €150M.',
      status: 'passed',
      votesFor: 2100,
      votesAgainst: 300,
      totalVotes: 2400,
      deadline: '2023-12-20',
      proposer: 'Comité de Infraestructura',
      category: 'infraestructura',
      createdAt: '2023-12-01'
    },
    {
      id: 3,
      title: 'Nuevo Patrocinador Principal',
      description: 'Acuerdo de patrocinio con empresa tecnológica por 3 años. Ingresos estimados: €50M anuales.',
      status: 'rejected',
      votesFor: 800,
      votesAgainst: 1200,
      totalVotes: 2000,
      deadline: '2023-11-30',
      proposer: 'Departamento Comercial',
      category: 'presupuesto',
      createdAt: '2023-11-15'
    },
    {
      id: 4,
      title: 'Implementación de Tecnología Blockchain',
      description: 'Desarrollo de plataforma blockchain para gestión de entradas y merchandising. Inversión inicial: €2M.',
      status: 'active',
      votesFor: 950,
      votesAgainst: 450,
      totalVotes: 1400,
      deadline: '2024-01-20',
      proposer: 'Equipo de Innovación',
      category: 'otros',
      createdAt: '2023-12-15'
    }
  ];

  const filteredProposals = proposals.filter(proposal => {
    const matchesFilter = filter === 'all' || proposal.status === filter;
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'passed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Votando';
      case 'passed': return 'Aprobada';
      case 'rejected': return 'Rechazada';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fichajes': return 'bg-purple-100 text-purple-800';
      case 'infraestructura': return 'bg-blue-100 text-blue-800';
      case 'presupuesto': return 'bg-green-100 text-green-800';
      case 'otros': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateVotePercentage = (votesFor: number, totalVotes: number) => {
    return totalVotes > 0 ? Math.round((votesFor / totalVotes) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gobernanza</h1>
          <p className="text-gray-600 mt-1">Participa en las decisiones del club</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Nueva Propuesta</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Vote className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Propuestas Activas</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Aprobadas</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Participantes</p>
              <p className="text-2xl font-bold text-gray-900">2,430</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Participación</p>
              <p className="text-2xl font-bold text-gray-900">78%</p>
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
                placeholder="Buscar propuestas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            {['all', 'active', 'passed', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'Todas' : 
                 status === 'active' ? 'Activas' :
                 status === 'passed' ? 'Aprobadas' : 'Rechazadas'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de propuestas */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                    {getStatusText(proposal.status)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(proposal.category)}`}>
                    {proposal.category.charAt(0).toUpperCase() + proposal.category.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{proposal.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Por: {proposal.proposer}</span>
                  <span>•</span>
                  <span>Creada: {formatDate(proposal.createdAt)}</span>
                  <span>•</span>
                  <span>Vence: {formatDate(proposal.deadline)}</span>
                </div>
              </div>
            </div>

            {/* Barra de votación */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Resultados de la votación</span>
                <span className="text-sm text-gray-500">{proposal.totalVotes} votos</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateVotePercentage(proposal.votesFor, proposal.totalVotes)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">{proposal.votesFor} a favor</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-gray-700">{proposal.votesAgainst} en contra</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {calculateVotePercentage(proposal.votesFor, proposal.totalVotes)}% a favor
                </span>
              </div>
            </div>

            {/* Acciones */}
            {proposal.status === 'active' && (
              <div className="flex items-center space-x-3">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <CheckCircle className="h-4 w-4" />
                  <span>Votar a Favor</span>
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <XCircle className="h-4 w-4" />
                  <span>Votar en Contra</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Detalles
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <div className="text-center py-12">
          <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron propuestas</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Governance;
