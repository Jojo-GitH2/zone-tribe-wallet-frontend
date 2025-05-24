import api from "./api";

export interface Transaction {
  transactionId: string;
  dateTime: string;
  amount: number;
  transactionType: string; // "credit" | "debit"
  status?: string;
  // Add other fields as needed
}

export interface PaginatedTransactions {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  items: Transaction[];
}

// Fetch transactions for a wallet
export const fetchWalletTransactions = async (
  walletAddress: string,
  token: string,
  page: number = 1,
  pageSize: number = 30
): Promise<PaginatedTransactions> => {
  try {
    const response = await api.get(
      `/Wallet/transactions/${walletAddress}?pageNumber=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Fetched transactions:", response.data);
    return response.data;
  } catch (error: any) {
    // console.error("Error fetching transactions:", error.response?.data);
    throw error.response?.data || "Failed to fetch transactions";
  }
};

// Fetch all transactions for a wallet
export const fetchAllWalletTransactions = async (
  walletAddress: string,
  token: string
): Promise<Transaction[]> => {
  const response = await api.get(`/Wallet/transactions/${walletAddress}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("Fetched all transactions:", response.data);
  return response.data; // Adjust based on backend response
};

export const searchWalletTransactions = async (
  walletAddress: string,
  token: string,
  page: number,
  pageSize: number,
  searchTerm: string
): Promise<PaginatedTransactions> => {
  const response = await api.get(
    `/Wallet/transactions/${walletAddress}`,
    {
      params: {
        pageNumber: page,
        pageSize: pageSize,
        searchTerm: searchTerm,
      },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Add other transaction-related functions here in the future