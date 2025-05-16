import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Wallet } from "../types/wallet";
import {
  fetchWalletTransactions,
  Transaction,
} from "../services/transactionService";

interface TabsSectionProps {
  currentWallet: Wallet | null;
}

const TabsSection: React.FC<TabsSectionProps> = ({ currentWallet }) => {
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!currentWallet) {
        setTransactions([]);
        setFilteredTransactions([]);
        return;
      }
      try {
        const token =
          localStorage.getItem("token") || localStorage.getItem("accessToken");
        if (!token) throw new Error("No token found");
        const data = await fetchWalletTransactions(
          currentWallet.address,
          token
        );
        console.log("Fetched transactions:", data);
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        setTransactions([]);
        setFilteredTransactions([]);
      }
    };
    fetchTransactions();
  }, [currentWallet]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    const q = searchQuery.toLowerCase();
    setFilteredTransactions(
      transactions.filter(
        (t) =>
          t.transactionId.toLowerCase().includes(q) ||
          t.dateTime.toLowerCase().includes(q) ||
          t.amount.toString().includes(q)
      )
    );
  };

  const handleExport = (format: "csv" | "pdf") => {
    if (format === "csv") {
      const header = "ID,Date,Amount,Type,Status\n";
      const rows = filteredTransactions
        .map((t) => `${t.transactionId},${t.dateTime},${t.amount},${t.transactionType},${t.status ?? ""}`)
        .join("\n");
      const csv = header + rows;
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.csv";
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      window.print(); // For real PDF export, use a library like jsPDF
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Tokens" />
        <Tab label="Transactions" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {value === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
              color: "text.secondary",
            }}
          >
            <Typography variant="h6" color="textSecondary">
              {currentWallet
                ? "Tokens Content"
                : "Tokens will appear here once you create a wallet."}
            </Typography>
          </Box>
        )}
        {value === 1 && (
          <Box>
            {currentWallet ? (
              <>
                {/* Search Bar */}
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    label="Search by date, amount, or ID"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{ textTransform: "capitalize" }}
                  >
                    Search
                  </Button>
                </Box>

                {/* Transaction Table */}
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.transactionId}>
                          <TableCell>{transaction.transactionId}</TableCell>
                          <TableCell>{transaction.dateTime}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.transactionType}</TableCell>
                          <TableCell>{transaction.status ?? ""}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Export Buttons */}
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleExport("csv")}
                    sx={{ textTransform: "capitalize" }}
                  >
                    Export as CSV
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleExport("pdf")}
                    sx={{ textTransform: "capitalize" }}
                  >
                    Export as PDF
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  Transactions will appear here once you create a wallet.
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TabsSection;
