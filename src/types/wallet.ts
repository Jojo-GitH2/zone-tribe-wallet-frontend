export interface Wallet {
    id: string; // Unique identifier for the wallet
    walletName: string; // Name of the wallet
    address: string; // Wallet address
    balance: number; // Wallet balance
    currency: string; // Currency of the wallet (e.g., SepoliaETH)
    network: string; // Network of the wallet (e.g., Sepolia)
}