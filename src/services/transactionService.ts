import api from "./api";

export interface Transaction {
  transactionId: string;
  dateTime: string;
  amount: number;
  transactionType: string; // "credit" | "debit"
  status?: string;
  // Add other fields as needed
}

// Fetch transactions for a wallet
export const fetchWalletTransactions = async (walletAddress: string, token: string): Promise<Transaction[]> => {
  try {
    const response = await api.get(`/Wallet/transactions/${walletAddress}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching transactions:", error.response?.data);
    throw error.response?.data || "Failed to fetch transactions";
  }
};

// Add other transaction-related functions here in the future