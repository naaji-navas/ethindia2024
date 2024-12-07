import requests
import json
from datetime import datetime
import time
import pandas as pd

def search_tweets(query, bearer_token):
    """Search for tweets with a specific query."""
    url = "https://api.twitter.com/2/tweets/search/recent"
    headers = {
        "Authorization": f"Bearer {bearer_token}"
    }
    # Get today's date in the required format
    today = datetime.now().strftime("%Y-%m-%dT00:00:00Z")
    params = {
        "query": query,
        "start_time": today,
        "tweet.fields": "created_at,public_metrics,author_id",
        "expansions": "author_id",
        "user.fields": "username"
    }
    
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 429:
        # Too Many Requests
        print("Rate limit exceeded. Waiting before retrying...")
        time.sleep(15 * 60)  # Wait for 15 minutes
        return search_tweets(query, bearer_token)
    elif response.status_code != 200:
        raise Exception(f"Request returned an error: {response.status_code} {response.text}")

    return response.json()

def calculate_score(metrics):
    """Calculate score based on tweet metrics."""
    return (
        metrics.get('retweet_count', 0) * 2 +
        metrics.get('reply_count', 0) * 1 +
        metrics.get('like_count', 0) * 3 +
        metrics.get('quote_count', 0) * 2 +
        metrics.get('bookmark_count', 0) * 1 +
        metrics.get('impression_count', 0) * 0.1
    )

def main():
    # Load your Bearer Token from a secure location
    with open('config.json') as f:
        config = json.load(f)
    bearer_token = config['BEARER_TOKEN']

    try:
        # Search for tweets containing all three terms
        query = "@basedindia #indiaonchain"
        result = search_tweets(query, bearer_token)
        
        # Prepare data for CSV
        tweets_data = []
        users = {user['id']: user['username'] for user in result.get('includes', {}).get('users', [])}
        
        for tweet in result.get('data', []):
            metrics = tweet['public_metrics']
            score = calculate_score(metrics)
            twitter_handle = users.get(tweet['author_id'], 'unknown')
            post_link = f"https://x.com/{twitter_handle}/status/{tweet['id']}"
            wallet_address = "0xACa55b37f61406E16821dDE30993348bac6fC456"
            
            tweets_data.append({
                'twitter_handle': twitter_handle,
                'post_link': post_link,
                'score': score,
                'wallet_address': wallet_address
            })
        
        # Sort tweets by score
        sorted_tweets = sorted(tweets_data, key=lambda x: x['score'], reverse=True)
        
        # Print the results in the terminal
        for tweet in sorted_tweets:
            print(f"Twitter Handle: {tweet['twitter_handle']}")
            print(f"Post Link: {tweet['post_link']}")
            print(f"Score: {tweet['score']}")
            print(f"Wallet Address: {tweet['wallet_address']}")
            print("-" * 50)
        
        # Save to CSV
        df = pd.DataFrame(sorted_tweets)
        df.to_csv('twitter_posts.csv', index=False)
        
        print(f"Total tweets with @basedindia today: {len(sorted_tweets)}")
        print("Results saved to twitter_posts.csv")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()