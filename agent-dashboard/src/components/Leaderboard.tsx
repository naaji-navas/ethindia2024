import { LeaderboardEntry } from '@/types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Leaderboard</h2>
        <a 
          href="/history" 
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          View History
        </a>
      </div>
      
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div key={entry.twitter_handle} className="border-b pb-4">
            <div className="flex items-center justify-between">
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
                  <p className="text-sm text-gray-500 font-mono">{entry.wallet_address}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{entry.score} points</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}