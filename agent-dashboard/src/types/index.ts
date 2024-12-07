export interface Transaction {
    id: string;
    type: 'transfer' | 'sign' | 'reward' | 'faucet';
    timestamp: string;
    status: 'success' | 'pending' | 'failed';
    details: string;
    amount?: string;
    recipient?: string;
  }
  
  export interface LeaderboardEntry {
    twitter_handle: string;
    post_link: string;
    score: number;
    wallet_address: string;
  }
  
  export interface AgentState {
    wallet_address: string;
    balance: string;
    network: string;
    status: 'active' | 'inactive';
  }