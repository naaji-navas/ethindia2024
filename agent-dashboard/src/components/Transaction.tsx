import { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const BASE_SEPOLIA_EXPLORER = 'https://sepolia.basescan.org/tx/';

export default function TransactionList({ transactions, isLoading }: TransactionListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    <div className="mt-2 h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="mt-2 h-4 w-48 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : transactions.length > 0 ? (
          transactions.map((tx) => (
            <div key={tx.id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    tx.status === 'success' ? 'bg-green-100 text-green-800' : 
                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {tx.status}
                  </span>
                  <p className="mt-2 text-sm font-medium">{tx.type}</p>
                  <p className="text-sm text-gray-600">{tx.details}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <p className="text-sm text-gray-500">{tx.timestamp}</p>
                  {tx.transaction_hash && (
                    <a 
                      href={`${BASE_SEPOLIA_EXPLORER}${tx.transaction_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                      title="View on Base Sepolia Explorer"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-4 h-4"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" 
                        />
                      </svg>
                      <span className="text-sm">View on Explorer</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No transactions found</p>
        )}
      </div>
    </div>
  );
}