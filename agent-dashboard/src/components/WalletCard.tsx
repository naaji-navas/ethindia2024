'use client';

import { AgentState } from '@/types';
import { useState } from 'react';
import { FundButton } from '@coinbase/onchainkit/fund';
import { Address } from '@coinbase/onchainkit/identity';
import { TokenChip } from '@coinbase/onchainkit/token';
import '@coinbase/onchainkit/styles.css';
import { useWeb3Modal } from '../../../node_modules/@web3modal/wagmi/react'

const usdcToken = {
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`,
  chainId: 8453,
  decimals: 6,
  image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
  name: 'USD Coin',
  symbol: 'USDC',
} as const;

interface WalletCardProps {
  agentState: AgentState;
  onFundWallet: () => void;
}

export default function WalletCard({ agentState, onFundWallet }: WalletCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl text-black font-semibold mb-4">Agent Wallet</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-900">Wallet Address</label>
          <div className="flex items-center space-x-2 mt-1">
            <Address 
              address={agentState.wallet_address as `0x${string}`}
              className="text-sm text-gray-700 font-mono"
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-900">Balance</p>
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-gray-900">{agentState.balance}</p>
              <TokenChip token={usdcToken} />
            </div>
          </div>
          <FundButton
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          />
        </div>
        
        <div>
          <p className="text-sm text-gray-900">Network</p>
          <p className="text-gray-700">{agentState.network}</p>
        </div>
      </div>
    </div>
  );
}