// Simulación de integración con blockchain
// En una implementación real, esto se conectaría con Substrate/Polkadot

export interface BlockchainAccount {
  address: string;
  balance: number;
  votingPower: number;
  isConnected: boolean;
}

export interface Proposal {
  id: number;
  title: string;
  description: string;
  proposer: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  deadline: number;
  category: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  type: 'vote' | 'transfer' | 'proposal' | 'nft_mint';
}

export interface NFT {
  id: string;
  tokenId: number;
  owner: string;
  metadata: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{
      trait_type: string;
      value: string | number;
    }>;
  };
  price?: number;
  isForSale: boolean;
}

class BlockchainService {
  private account: BlockchainAccount | null = null;
  private proposals: Proposal[] = [];
  private transactions: Transaction[] = [];
  private nfts: NFT[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Datos simulados para demostración
    this.account = {
      address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      balance: 1250,
      votingPower: 1250,
      isConnected: true
    };

    this.proposals = [
      {
        id: 1,
        title: 'Fichaje de Kylian Mbappé',
        description: 'Propuesta para fichar al delantero francés por €180M',
        proposer: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        votesFor: 1250,
        votesAgainst: 180,
        status: 'active',
        deadline: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días
        category: 'fichajes'
      },
      {
        id: 2,
        title: 'Renovación del Estadio',
        description: 'Ampliación del estadio con 5,000 asientos adicionales',
        proposer: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        votesFor: 2100,
        votesAgainst: 300,
        status: 'passed',
        deadline: Date.now() - 24 * 60 * 60 * 1000, // 1 día atrás
        category: 'infraestructura'
      }
    ];

    this.transactions = [
      {
        hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        from: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        to: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        amount: 100,
        timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 horas atrás
        status: 'confirmed',
        type: 'transfer'
      },
      {
        hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        from: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        to: '0x0000000000000000000000000000000000000000',
        amount: 0,
        timestamp: Date.now() - 1 * 60 * 60 * 1000, // 1 hora atrás
        status: 'confirmed',
        type: 'vote'
      }
    ];

    this.nfts = [
      {
        id: 'nft-1',
        tokenId: 1,
        owner: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        metadata: {
          name: 'Camiseta Histórica 2022',
          description: 'Camiseta oficial del Real Madrid de la temporada 2021-22',
          image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=300&h=300&fit=crop',
          attributes: [
            { trait_type: 'Rarity', value: 'Legendary' },
            { trait_type: 'Season', value: '2021-22' },
            { trait_type: 'Team', value: 'Real Madrid' }
          ]
        },
        price: 2500,
        isForSale: true
      }
    ];
  }

  // Conectar wallet
  async connectWallet(): Promise<BlockchainAccount> {
    // Simulación de conexión de wallet
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!this.account) {
      throw new Error('No se pudo conectar con la wallet');
    }

    return this.account;
  }

  // Desconectar wallet
  async disconnectWallet(): Promise<void> {
    this.account = null;
  }

  // Obtener cuenta actual
  getCurrentAccount(): BlockchainAccount | null {
    return this.account;
  }

  // Obtener balance
  async getBalance(address: string): Promise<number> {
    if (!this.account || this.account.address !== address) {
      throw new Error('Cuenta no encontrada');
    }
    return this.account.balance;
  }

  // Obtener poder de voto
  async getVotingPower(address: string): Promise<number> {
    if (!this.account || this.account.address !== address) {
      throw new Error('Cuenta no encontrada');
    }
    return this.account.votingPower;
  }

  // Crear propuesta
  async createProposal(
    title: string,
    description: string,
    category: string,
    duration: number = 7 * 24 * 60 * 60 * 1000 // 7 días por defecto
  ): Promise<Proposal> {
    if (!this.account) {
      throw new Error('Debe estar conectado para crear propuestas');
    }

    const proposal: Proposal = {
      id: this.proposals.length + 1,
      title,
      description,
      proposer: this.account.address,
      votesFor: 0,
      votesAgainst: 0,
      status: 'active',
      deadline: Date.now() + duration,
      category
    };

    this.proposals.push(proposal);

    // Simular transacción
    const transaction: Transaction = {
      hash: this.generateTransactionHash(),
      from: this.account.address,
      to: '0x0000000000000000000000000000000000000000',
      amount: 0,
      timestamp: Date.now(),
      status: 'confirmed',
      type: 'proposal'
    };

    this.transactions.push(transaction);

    return proposal;
  }

  // Votar en propuesta
  async voteOnProposal(proposalId: number, vote: 'for' | 'against'): Promise<Transaction> {
    if (!this.account) {
      throw new Error('Debe estar conectado para votar');
    }

    const proposal = this.proposals.find(p => p.id === proposalId);
    if (!proposal) {
      throw new Error('Propuesta no encontrada');
    }

    if (proposal.status !== 'active') {
      throw new Error('La propuesta no está activa');
    }

    if (Date.now() > proposal.deadline) {
      throw new Error('El período de votación ha expirado');
    }

    // Actualizar votos
    if (vote === 'for') {
      proposal.votesFor += this.account.votingPower;
    } else {
      proposal.votesAgainst += this.account.votingPower;
    }

    // Crear transacción
    const transaction: Transaction = {
      hash: this.generateTransactionHash(),
      from: this.account.address,
      to: '0x0000000000000000000000000000000000000000',
      amount: 0,
      timestamp: Date.now(),
      status: 'confirmed',
      type: 'vote'
    };

    this.transactions.push(transaction);

    return transaction;
  }

  // Obtener propuestas
  async getProposals(): Promise<Proposal[]> {
    return [...this.proposals];
  }

  // Obtener propuesta por ID
  async getProposal(id: number): Promise<Proposal | null> {
    return this.proposals.find(p => p.id === id) || null;
  }

  // Ejecutar propuesta (solo para propuestas aprobadas)
  async executeProposal(proposalId: number): Promise<Transaction> {
    if (!this.account) {
      throw new Error('Debe estar conectado para ejecutar propuestas');
    }

    const proposal = this.proposals.find(p => p.id === proposalId);
    if (!proposal) {
      throw new Error('Propuesta no encontrada');
    }

    if (proposal.status !== 'passed') {
      throw new Error('La propuesta debe estar aprobada para ejecutarse');
    }

    proposal.status = 'executed';

    const transaction: Transaction = {
      hash: this.generateTransactionHash(),
      from: this.account.address,
      to: '0x0000000000000000000000000000000000000000',
      amount: 0,
      timestamp: Date.now(),
      status: 'confirmed',
      type: 'proposal'
    };

    this.transactions.push(transaction);

    return transaction;
  }

  // Transferir tokens
  async transferTokens(to: string, amount: number): Promise<Transaction> {
    if (!this.account) {
      throw new Error('Debe estar conectado para transferir tokens');
    }

    if (this.account.balance < amount) {
      throw new Error('Saldo insuficiente');
    }

    this.account.balance -= amount;

    const transaction: Transaction = {
      hash: this.generateTransactionHash(),
      from: this.account.address,
      to,
      amount,
      timestamp: Date.now(),
      status: 'confirmed',
      type: 'transfer'
    };

    this.transactions.push(transaction);

    return transaction;
  }

  // Obtener transacciones
  async getTransactions(address?: string): Promise<Transaction[]> {
    if (address) {
      return this.transactions.filter(t => t.from === address || t.to === address);
    }
    return [...this.transactions];
  }

  // Mintear NFT
  async mintNFT(
    name: string,
    description: string,
    image: string,
    attributes: Array<{ trait_type: string; value: string | number }>,
    price?: number
  ): Promise<NFT> {
    if (!this.account) {
      throw new Error('Debe estar conectado para mintear NFTs');
    }

    const nft: NFT = {
      id: `nft-${Date.now()}`,
      tokenId: this.nfts.length + 1,
      owner: this.account.address,
      metadata: {
        name,
        description,
        image,
        attributes
      },
      price,
      isForSale: !!price
    };

    this.nfts.push(nft);

    const transaction: Transaction = {
      hash: this.generateTransactionHash(),
      from: this.account.address,
      to: '0x0000000000000000000000000000000000000000',
      amount: 0,
      timestamp: Date.now(),
      status: 'confirmed',
      type: 'nft_mint'
    };

    this.transactions.push(transaction);

    return nft;
  }

  // Obtener NFTs
  async getNFTs(owner?: string): Promise<NFT[]> {
    if (owner) {
      return this.nfts.filter(nft => nft.owner === owner);
    }
    return [...this.nfts];
  }

  // Comprar NFT
  async buyNFT(nftId: string, price: number): Promise<Transaction> {
    if (!this.account) {
      throw new Error('Debe estar conectado para comprar NFTs');
    }

    const nft = this.nfts.find(n => n.id === nftId);
    if (!nft) {
      throw new Error('NFT no encontrado');
    }

    if (!nft.isForSale) {
      throw new Error('El NFT no está en venta');
    }

    if (this.account.balance < price) {
      throw new Error('Saldo insuficiente');
    }

    // Transferir NFT
    nft.owner = this.account.address;
    nft.isForSale = false;
    nft.price = undefined;

    // Actualizar balance
    this.account.balance -= price;

    const transaction: Transaction = {
      hash: this.generateTransactionHash(),
      from: this.account.address,
      to: nft.owner,
      amount: price,
      timestamp: Date.now(),
      status: 'confirmed',
      type: 'nft_mint'
    };

    this.transactions.push(transaction);

    return transaction;
  }

  // Generar hash de transacción simulado
  private generateTransactionHash(): string {
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  // Escuchar eventos de blockchain (simulado)
  on(event: string, callback: (data: any) => void): void {
    // En una implementación real, esto se conectaría con WebSocket del nodo
    console.log(`Escuchando evento: ${event}`);
  }

  // Desconectar listeners
  off(event: string, callback: (data: any) => void): void {
    console.log(`Dejando de escuchar evento: ${event}`);
  }
}

// Instancia singleton del servicio
export const blockchainService = new BlockchainService();

// Hook personalizado para usar el servicio de blockchain
export const useBlockchain = () => {
  return {
    connectWallet: () => blockchainService.connectWallet(),
    disconnectWallet: () => blockchainService.disconnectWallet(),
    getCurrentAccount: () => blockchainService.getCurrentAccount(),
    getBalance: (address: string) => blockchainService.getBalance(address),
    getVotingPower: (address: string) => blockchainService.getVotingPower(address),
    createProposal: (title: string, description: string, category: string, duration?: number) => 
      blockchainService.createProposal(title, description, category, duration),
    voteOnProposal: (proposalId: number, vote: 'for' | 'against') => 
      blockchainService.voteOnProposal(proposalId, vote),
    getProposals: () => blockchainService.getProposals(),
    getProposal: (id: number) => blockchainService.getProposal(id),
    executeProposal: (proposalId: number) => blockchainService.executeProposal(proposalId),
    transferTokens: (to: string, amount: number) => blockchainService.transferTokens(to, amount),
    getTransactions: (address?: string) => blockchainService.getTransactions(address),
    mintNFT: (name: string, description: string, image: string, attributes: Array<{ trait_type: string; value: string | number }>, price?: number) => 
      blockchainService.mintNFT(name, description, image, attributes, price),
    getNFTs: (owner?: string) => blockchainService.getNFTs(owner),
    buyNFT: (nftId: string, price: number) => blockchainService.buyNFT(nftId, price),
    on: (event: string, callback: (data: any) => void) => blockchainService.on(event, callback),
    off: (event: string, callback: (data: any) => void) => blockchainService.off(event, callback)
  };
};
