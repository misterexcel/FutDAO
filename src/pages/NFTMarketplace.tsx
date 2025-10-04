import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Eye, 
  Star, 
  Filter, 
  Search,
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  Image as ImageIcon,
  Zap,
  Crown,
  Flame
} from 'lucide-react';

interface NFT {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: 'FDT' | 'ETH' | 'EUR';
  image: string;
  category: 'jerseys' | 'moments' | 'tickets' | 'merchandise' | 'collectibles';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  owner: string;
  likes: number;
  views: number;
  isLiked: boolean;
  isForSale: boolean;
  auctionEnd?: string;
  bids?: number;
  highestBid?: number;
}

const NFTMarketplace: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'jerseys' | 'moments' | 'tickets' | 'merchandise' | 'collectibles'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'rarity' | 'newest' | 'popular'>('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const nfts: NFT[] = [
    {
      id: 1,
      name: 'Camiseta Histórica 2022',
      description: 'Camiseta oficial del Real Madrid de la temporada 2021-22, firmada por el equipo completo',
      price: 2500,
      currency: 'FDT',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=300&h=300&fit=crop',
      category: 'jerseys',
      rarity: 'legendary',
      owner: 'MadridFan2024',
      likes: 1247,
      views: 8934,
      isLiked: true,
      isForSale: true
    },
    {
      id: 2,
      name: 'Gol de Champions 2023',
      description: 'Momento épico del gol de Vinicius Jr. en la final de la Champions League 2023',
      price: 0.8,
      currency: 'ETH',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=300&fit=crop',
      category: 'moments',
      rarity: 'epic',
      owner: 'CryptoCollector',
      likes: 892,
      views: 5672,
      isLiked: false,
      isForSale: true,
      auctionEnd: '2024-01-20T23:59:59Z',
      bids: 15,
      highestBid: 0.9
    },
    {
      id: 3,
      name: 'Entrada VIP Clásico',
      description: 'Entrada VIP para el próximo Clásico contra el FC Barcelona en el Bernabéu',
      price: 500,
      currency: 'EUR',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=300&fit=crop',
      category: 'tickets',
      rarity: 'rare',
      owner: 'VIPMember',
      likes: 2341,
      views: 12045,
      isLiked: true,
      isForSale: true
    },
    {
      id: 4,
      name: 'Trofeo Champions NFT',
      description: 'NFT conmemorativo del 15º título de Champions League del Real Madrid',
      price: 5000,
      currency: 'FDT',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      category: 'collectibles',
      rarity: 'legendary',
      owner: 'TrophyHunter',
      likes: 3456,
      views: 15678,
      isLiked: false,
      isForSale: false
    },
    {
      id: 5,
      name: 'Bufanda Oficial 2024',
      description: 'Bufanda oficial del Real Madrid de la temporada 2023-24, edición limitada',
      price: 150,
      currency: 'EUR',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      category: 'merchandise',
      rarity: 'common',
      owner: 'ScarfCollector',
      likes: 234,
      views: 1234,
      isLiked: false,
      isForSale: true
    },
    {
      id: 6,
      name: 'Asistencia de Modrić',
      description: 'Momento destacado de la asistencia magistral de Luka Modrić en el derbi madrileño',
      price: 0.3,
      currency: 'ETH',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      category: 'moments',
      rarity: 'rare',
      owner: 'ModricFan',
      likes: 567,
      views: 3456,
      isLiked: true,
      isForSale: true
    }
  ];

  const filteredNFTs = nfts.filter(nft => {
    const matchesFilter = filter === 'all' || nft.category === filter;
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rarity':
        const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      case 'popular':
        return b.likes - a.likes;
      case 'newest':
      default:
        return b.id - a.id;
    }
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'common': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="h-4 w-4" />;
      case 'epic': return <Zap className="h-4 w-4" />;
      case 'rare': return <Star className="h-4 w-4" />;
      case 'common': return <Flame className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'FDT') {
      return `${price.toLocaleString()} FDT`;
    } else if (currency === 'ETH') {
      return `${price} ETH`;
    } else {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = (dateString: string) => {
    const now = new Date();
    const end = new Date(dateString);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Finalizada';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NFT Marketplace</h1>
          <p className="text-gray-600 mt-1">Colecciona momentos únicos del club</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Heart className="h-5 w-5" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <ShoppingBag className="h-5 w-5" />
            <span>Mi Colección</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">NFTs Disponibles</p>
              <p className="text-2xl font-bold text-gray-900">{nfts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Volumen 24h</p>
              <p className="text-2xl font-bold text-gray-900">€125K</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Coleccionistas</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Precio Promedio</p>
              <p className="text-2xl font-bold text-gray-900">€1,250</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar NFTs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            {['all', 'jerseys', 'moments', 'tickets', 'merchandise', 'collectibles'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'Todos' : 
                 category === 'jerseys' ? 'Camisetas' :
                 category === 'moments' ? 'Momentos' :
                 category === 'tickets' ? 'Entradas' :
                 category === 'merchandise' ? 'Merchandising' : 'Coleccionables'}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Más recientes</option>
              <option value="price">Precio</option>
              <option value="rarity">Rareza</option>
              <option value="popular">Más populares</option>
            </select>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {viewMode === 'grid' ? '📋' : '⊞'}
            </button>
          </div>
        </div>
      </div>

      {/* Lista de NFTs */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {filteredNFTs.map((nft) => (
          <div key={nft.id} className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden card-hover ${viewMode === 'list' ? 'flex' : ''}`}>
            <div className={`${viewMode === 'list' ? 'w-48 h-48' : 'w-full h-48'} relative`}>
              <img 
                src={nft.image} 
                alt={nft.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRarityColor(nft.rarity)}`}>
                  {getRarityIcon(nft.rarity)}
                  <span className="capitalize">{nft.rarity}</span>
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <button className={`p-2 rounded-full ${nft.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                  <Heart className={`h-4 w-4 ${nft.isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
              {nft.auctionEnd && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{getTimeRemaining(nft.auctionEnd)}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 truncate">{nft.name}</h3>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">{nft.views}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{nft.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-lg font-bold text-gray-900">{formatPrice(nft.price, nft.currency)}</p>
                  {nft.highestBid && (
                    <p className="text-sm text-gray-500">Oferta: {formatPrice(nft.highestBid, nft.currency)}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Por {nft.owner}</p>
                  {nft.bids && (
                    <p className="text-sm text-gray-500">{nft.bids} ofertas</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-gray-500">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{nft.likes}</span>
                </div>
                <div className="flex space-x-2">
                  {nft.isForSale ? (
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                      {nft.auctionEnd ? 'Pujar' : 'Comprar'}
                    </button>
                  ) : (
                    <button className="flex-1 bg-gray-400 text-white px-3 py-2 rounded-lg text-sm cursor-not-allowed">
                      No disponible
                    </button>
                  )}
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm transition-colors">
                    Ver
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNFTs.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron NFTs</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default NFTMarketplace;
