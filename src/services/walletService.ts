import api from "./api";

interface CreateWalletInput {
    userId: string; // User ID for whom the wallet is created
    walletName: string; // Name of the wallet
    network: string; // Network for the wallet (e.g., Ethereum, Binance Smart Chain)
    currency: string; // Currency for the wallet (e.g., ETH, BNB)
}

interface SendFundsInput {
    userId: string; // ID of the user sending funds
    fromAddress: string; // ID of the wallet sending funds
    toAddress: string; // Address to send funds to
    amount: number; // Amount to send
}


// Function to create a wallet
export const createWallet = async (input: CreateWalletInput) => {
    try {
        const response = await api.post("/wallet/create", input );
        return response.data; // Return the response data (e.g., wallet address)
    } catch (error: any) {
        // console.error("Error creating wallet:", error.response?.data);
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
        // console.log("Fetched wallets:", response.data); // Log the fetched wallets

        return response.data; // Return the list of wallets
    } catch (error: any) {
        // console.error("Error fetching wallets:", error.response?.data);
        throw error.response?.data || "Failed to fetch wallets"; // Handle errors
    }
};

export const sendFunds = async (input: SendFundsInput, token: string) => {
    try {
        const response = await api.post("/wallet/send-fund", input, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
        });
        return response.data; // Return the response data (e.g., transaction details)
    } catch (error: any) {
        // console.error("Error sending funds:", error.response?.data);
        throw error.response?.data || "Failed to send funds"; // Handle errors
    }
};


// Add other wallet-related functions here in the future