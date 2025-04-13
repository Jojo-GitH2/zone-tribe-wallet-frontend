import api from "./api";

interface CreateWalletInput {
    userId: string; // User ID for whom the wallet is created
    walletName: string; // Name of the wallet
    network: string; // Network for the wallet (e.g., Ethereum, Binance Smart Chain)
    currency: string; // Currency for the wallet (e.g., ETH, BNB)
}


// Function to create a wallet
export const createWallet = async (input: CreateWalletInput) => {
    try {
        const response = await api.post("/wallet/create", input );
        return response.data; // Return the response data (e.g., wallet address)
    } catch (error: any) {
        console.error("Error creating wallet:", error.response?.data);
        throw error.response?.data || "Failed to create wallet"; // Handle errors
    }
};

// Add other wallet-related functions here in the future