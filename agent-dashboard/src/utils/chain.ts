import { ethers } from 'ethers';
import { Transaction } from '@/types';

const BASESCAN_API_KEY = process.env.NEXT_PUBLIC_BASESCAN_API_KEY || '';
const BASESCAN_API = 'https://api-sepolia.basescan.org/api';

// List of known token addresses on Base Sepolia
const TOKEN_ADDRESSES = {
  USDC: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  // Add more tokens here as needed
};

// Helper function to format USDC amount with proper precision
function formatUSDCAmount(value: string): string {
  try {
    // Convert to BigInt first to handle large numbers
    const valueBigInt = BigInt(value);
    // Convert to string and pad with zeros to ensure at least 6 digits
    const valueStr = valueBigInt.toString().padStart(7, '0');
    // Insert decimal point 6 places from the right
    const decimalIndex = valueStr.length - 6;
    const result = valueStr.slice(0, decimalIndex) + '.' + valueStr.slice(decimalIndex);
    // Remove leading zeros and unnecessary trailing zeros
    return result.replace(/^0+(\d)/, '$1').replace(/\.?0+$/, '') || '0';
  } catch (error) {
    console.error('Error formatting USDC amount:', error);
    return '0';
  }
}

export async function getWalletBalance(address: string): Promise<string> {
  try {
    const response = await fetch(
      `${BASESCAN_API}?module=account&action=tokenbalance&contractaddress=${TOKEN_ADDRESSES.USDC}&address=${address}&tag=latest&apikey=${BASESCAN_API_KEY}`
    );
    const data = await response.json();
    return data.status === '1' && data.result ? formatUSDCAmount(data.result) : '0';
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
}

export async function getWalletTransactions(address: string): Promise<Transaction[]> {
  try {
    console.log('Fetching token transfers for address:', address);
    const url = `${BASESCAN_API}?module=account&action=tokentx&address=${address}&page=1&offset=100&sort=desc&apikey=${BASESCAN_API_KEY}`;
    console.log('API URL:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('API Response Status:', data.status);
    console.log('API Response Message:', data.message);
    
    if (data.status === '0') {
      console.log('No transactions found or error:', data.message);
      return [];
    }
    
    if (!Array.isArray(data.result)) {
      console.log('Result is not an array:', data.result);
      return [];
    }
    
    console.log('Number of transactions found:', data.result.length);
    if (data.result.length > 0) {
      console.log('First transaction:', data.result[0]);
      console.log('Token contracts found:', new Set(data.result.map((tx: any) => tx.contractAddress)));
    }
    
    if (data.status === '1' && Array.isArray(data.result)) {
      // Filter for USDC transactions and map them
      const usdcTransactions = data.result
        .filter((tx: any) => tx.contractAddress.toLowerCase() === TOKEN_ADDRESSES.USDC.toLowerCase())
        .slice(0, 10)
        .map((tx: any) => {
          try {
            const valueInUSDC = formatUSDCAmount(tx.value);
            const isIncoming = tx.to?.toLowerCase() === address.toLowerCase();
            const shortAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
            
            return {
              id: tx.hash,
              type: isIncoming ? 'transfer' : 'reward',
              timestamp: new Date(parseInt(tx.timeStamp || '0') * 1000).toISOString(),
              status: 'success',
              details: `${isIncoming ? 'Received' : 'Sent'} ${valueInUSDC} USDC ${isIncoming ? 'from' : 'to'} ${shortAddress(isIncoming ? tx.from : tx.to)}`,
              amount: valueInUSDC,
              recipient: tx.to
            };
          } catch (err) {
            console.error('Error processing transaction:', err);
            console.log('Problematic transaction:', tx);
            return null;
          }
        }).filter(Boolean) as Transaction[];

      if (usdcTransactions.length === 0) {
        console.log('No USDC transactions found among token transfers');
      }
      
      return usdcTransactions;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}