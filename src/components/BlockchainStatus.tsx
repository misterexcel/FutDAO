import React, { useState, useEffect } from 'react';
import { Wallet, Wifi, WifiOff, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useBlockchain } from '../utils/blockchain';

const BlockchainStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { connectWallet, disconnectWallet, getCurrentAccount } = useBlockchain();

  useEffect(() => {
    const currentAccount = getCurrentAccount();
    if (currentAccount) {
      setAccount(currentAccount);
      setIsConnected(true);
    }
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const newAccount = await connectWallet();
      setAccount(newAccount);
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al conectar');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setAccount(null);
      setIsConnected(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al desconectar');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <Wallet className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Estado de la Blockchain</h3>
            <div className="flex items-center space-x-2 mt-1">
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Conectado</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">Desconectado</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isConnected ? (
            <>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {account ? formatAddress(account.address) : 'N/A'}
                </p>
                <p className="text-xs text-gray-500">
                  {account ? `${account.balance} FDT` : '0 FDT'}
                </p>
              </div>
              <button
                onClick={handleDisconnect}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                Desconectar
              </button>
            </>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              {isConnecting ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Wallet className="h-4 w-4" />
              )}
              <span>{isConnecting ? 'Conectando...' : 'Conectar Wallet'}</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {isConnected && account && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">Poder de Voto</p>
              <p className="text-lg font-semibold text-gray-900">{account.votingPower} FDT</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Balance</p>
              <p className="text-lg font-semibold text-gray-900">{account.balance} FDT</p>
            </div>
          </div>
        </div>
      )}

      {/* Información de la red */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Red: Substrate Testnet</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Activa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainStatus;
