'use client';

import { useEffect, useState } from 'react';
import { database, ref, onValue } from '@/firebase/firebase';
import { DataSnapshot } from 'firebase/database';
import { Tweet } from 'react-tweet';

interface TweetEntry {
  post_link: string;
  twitter_handle: string;
  timestamp: string;
}

export default function RecentTweets() {
  const [tweets, setTweets] = useState<TweetEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tweetsRef = ref(database, 'leaderboard/current/entries');

    const unsubscribe = onValue(tweetsRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        const tweetData = Object.values(data)
          .filter((entry: any) => entry !== null)
          .map((entry: any) => ({
            ...entry,
            // Ensure we have a valid timestamp, fallback to current time if missing
            timestamp: entry.timestamp || new Date().toISOString()
          }))
          .sort((a: any, b: any) => {
            // Convert string timestamps to Date objects for comparison
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            // Sort in descending order (most recent first)
            return dateB.getTime() - dateA.getTime();
          }) as TweetEntry[];
        
        console.log('Sorted tweets:', tweetData.map(t => ({ 
          handle: t.twitter_handle, 
          time: new Date(t.timestamp).toISOString() 
        })));
        setTweets(tweetData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function getTweetId(url: string): string {
    const matches = url.match(/status\/(\d+)/);
    return matches ? matches[1] : '';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Recent Tweets</h1>
          <p className="text-gray-600 mt-2">Latest community interactions</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-center text-gray-600">Loading tweets...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tweets.map((tweet) => (
              <div 
                key={tweet.post_link} 
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <a 
                    href={tweet.post_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    @{tweet.twitter_handle}
                  </a>
                 
                </div>
                <Tweet id={getTweetId(tweet.post_link)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 