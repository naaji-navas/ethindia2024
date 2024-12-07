import { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

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
                <p className="text-sm text-gray-500">{tx.timestamp}</p>
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