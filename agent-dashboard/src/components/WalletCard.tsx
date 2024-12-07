'use client';

import { AgentState } from '@/types';
import { useState } from 'react';

interface WalletCardProps {
  agentState: AgentState;
  onFundWallet: () => void;
}

export default function WalletCard({ agentState, onFundWallet }: WalletCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(agentState.wallet_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl text-black font-semibold mb-4">Agent Wallet</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-900">Wallet Address</label>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-sm text-gray-700 font-mono">{agentState.wallet_address}</p>
            <button 
              onClick={copyToClipboard}
              className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
              title="Copy wallet address"
            >
              {copied ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <CopyIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-900">Balance</p>
            <p className="font-semibold text-gray-700">{agentState.balance} USDC</p>
          </div>
          {/* <button
            onClick={onFundWallet}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Fund Wallet
          </button> */}
        </div>
        
        <div>
          <p className="text-sm text-gray-900">Network</p>
          <p className="text-gray-700">{agentState.network}</p>
        </div>
      </div>
    </div>
  );
}

function CopyIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  );
}

function CheckIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}