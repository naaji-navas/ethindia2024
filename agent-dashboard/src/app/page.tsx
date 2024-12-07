"use client";

import { useState, useEffect } from 'react';
import WalletCard from '@/components/WalletCard';
import TransactionList from '@/components/Transaction';
import Leaderboard from '@/components/Leaderboard';
import { AgentState, Transaction, LeaderboardEntry } from '@/types';
import { getWalletBalance, getWalletTransactions } from '@/utils/chain';

const WALLET_ADDRESS = '0x306404AEF545ec8D7591a9cE0c73BB83dbbb0a40';

// Dummy data
const dummyTransactions: Transaction[] = [
  {
    id: '1',
    type: 'reward',
    timestamp: '2024-03-20 14:30:00',
    status: 'success',
    details: 'Distributed daily rewards to top 3 performers',
    amount: '0.003',
  },
  // Add more dummy transactions...
];

const dummyLeaderboard: LeaderboardEntry[] = [
  {
    twitter_handle: 'crypto_enthusiast',
    post_link: 'https://x.com/crypto_enthusiast/status/123456789',
    score: 1250,
    wallet_address: '0x1234...5678',
  },
  // Add more dummy entries...
];

export default function Dashboard() {
  const [agentState, setAgentState] = useState<AgentState>({
    wallet_address: WALLET_ADDRESS,
    balance: '0',
    network: 'Base Sepolia',
    status: 'active',
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingTransactions(true);
        // Fetch balance
        const balance = await getWalletBalance(WALLET_ADDRESS);
        setAgentState(prev => ({
          ...prev,
          balance
        }));

        // Fetch transactions
        const txs = await getWalletTransactions(WALLET_ADDRESS);
        setTransactions(txs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingTransactions(false);
      }
    };

    fetchData();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleFundWallet = () => {
    // Implement funding logic
    console.log('Funding wallet...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Agent Dashboard</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WalletCard 
            agentState={agentState} 
            onFundWallet={handleFundWallet} 
          />
          <Leaderboard entries={dummyLeaderboard} />
        </div>
        
        <div className="mt-6">
          <TransactionList 
            transactions={transactions} 
            isLoading={isLoadingTransactions}
          />
        </div>
      </main>
    </div>
  );
}