import { AgentState } from '@/types';

interface WalletCardProps {
  agentState: AgentState;
  onFundWallet: () => void;
}

export default function WalletCard({ agentState, onFundWallet }: WalletCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Agent Wallet</h2>
        <span className={`px-2 py-1 rounded-full text-sm ${
          agentState.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {agentState.status}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Wallet Address</p>
          <p className="font-mono text-sm">{agentState.wallet_address}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <p className="font-semibold">{agentState.balance} USDC</p>
          </div>
          <button
            onClick={onFundWallet}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Fund Wallet
          </button>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Network</p>
          <p>{agentState.network}</p>
        </div>
      </div>
    </div>
  );
}