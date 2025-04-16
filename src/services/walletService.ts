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

// Function to fetch wallets for a user
export const fetchUserWallets = async (token: string) => {
    try {
        const response = await api.get(`/wallet/get-wallets`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
        });
        console.log("Fetched wallets:", response.data); // Log the fetched wallets

        return response.data; // Return the list of wallets
    } catch (error: any) {
        console.error("Error fetching wallets:", error.response?.data);
        throw error.response?.data || "Failed to fetch wallets"; // Handle errors
    }
};

// Add other wallet-related functions here in the future