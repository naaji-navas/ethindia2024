"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AgentState, Transaction } from '@/types';
import { getWalletBalance, getWalletTransactions } from '@/utils/chain';
import { WalletDefault } from '@coinbase/onchainkit/wallet';

// Dynamically import components with loading fallbacks
const WalletCard = dynamic(() => import('@/components/WalletCard'), { 
  ssr: false,
  loading: () => <div className="bg-white rounded-lg shadow-md p-6 animate-pulse h-64" />
});

const TransactionList = dynamic(() => import('@/components/Transaction'), { 
  ssr: false,
  loading: () => <div className="bg-white rounded-lg shadow-md p-6 animate-pulse h-48" />
});

const Leaderboard = dynamic(() => import('@/components/Leaderboard'), { 
  ssr: false,
  loading: () => <div className="bg-white rounded-lg shadow-md p-6 animate-pulse h-64" />
});

const WALLET_ADDRESS = '0x306404AEF545ec8D7591a9cE0c73BB83dbbb0a40';

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
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl text-black font-bold">Agent Dashboard</h1>
          <WalletDefault />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WalletCard 
            agentState={agentState} 
            onFundWallet={handleFundWallet} 
          />
          <Leaderboard />
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