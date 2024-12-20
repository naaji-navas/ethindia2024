'use client';

import { useEffect, useState } from 'react';
  
import { database, ref, onValue } from '../../firebase/firebase';
import { DataSnapshot } from 'firebase/database';
import dynamic from 'next/dynamic';

interface HistoryEntry {
  entries: Array<{
    post_link: string;
    rank: number;
    score: number;
    twitter_handle: string;
    wallet_address: string;
  } | null>;
  metadata: {
    last_updated: string;
    timestamp: string;
    total_participants: number;
  };
}

// Dynamically import the page content with SSR disabled
const HistoryContent = dynamic(() => Promise.resolve(function HistoryContent({ 
  history, 
  loading 
}: { 
  history: any, 
  loading: boolean 
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard History</h1>
          <p className="text-gray-600 mt-2">Past winners and their scores</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-center text-gray-600">Loading history...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(history)
              .sort(([_, dataA], [__, dataB]) => {
                const dateA = new Date((dataA as HistoryEntry).metadata.timestamp);
                const dateB = new Date((dataB as HistoryEntry).metadata.timestamp);
                return dateB.getTime() - dateA.getTime();
              })
              .map(([timestamp, data]) => {
                const typedData = data as HistoryEntry;
                return (
                  <div key={timestamp} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="border-b pb-4 mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {new Date(typedData.metadata.timestamp).toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Total Participants: {typedData.metadata.total_participants}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {typedData.entries
                        .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
                        .slice(0, 3)
                        .map((entry, index) => (
                          <div key={entry.post_link} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-lg">{index + 1}</span>
                              <div>
                                <a 
                                  href={entry.post_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  @{entry.twitter_handle}
                                </a>
                                <p className="text-sm text-gray-500 font-mono">
                                  {entry.wallet_address.slice(0, 6)}...{entry.wallet_address.slice(-4)}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-black">
                              {Math.round(entry.score)} points
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}), { ssr: false });

export default function HistoryPage() {
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const historyRef = ref(database, 'leaderboard_history');
    
    const unsubscribe = onValue(historyRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        const validHistory = Object.entries(data)
          .filter(([_, value]: [string, any]) => {
            return value.entries && Array.isArray(value.entries) && value.metadata;
          })
          .reduce((acc, [key, value]: [string, any]) => ({
            ...acc,
            [key]: {
              entries: (value.entries as any[]).filter(entry => entry !== null),
              metadata: value.metadata
            }
          }), {});

        setHistory(validHistory);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <HistoryContent history={history} loading={loading} />;
} 