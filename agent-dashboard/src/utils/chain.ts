import { ethers } from 'ethers';

export async function getWalletBalance(address: string): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider('https://sepolia.base.org');
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
}