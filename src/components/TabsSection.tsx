import React, { useState } from "react";
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
import { Wallet } from "../types/wallet"; // Import the Wallet type

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: string; // e.g., "credit" or "debit"
}


interface TabsSectionProps {
  currentWallet: Wallet | null; // Prop to receive the current wallet
}

const TabsSection: React.FC<TabsSectionProps> = ({ currentWallet }) => {
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", date: "2025-04-01", amount: 100, type: "credit" },
    { id: "2", date: "2025-04-02", amount: -50, type: "debit" },
    { id: "3", date: "2025-04-03", amount: 200, type: "credit" },
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    const filteredTransactions = transactions.filter(
      (transaction) =>
        transaction.id.includes(searchQuery) ||
        transaction.date.includes(searchQuery) ||
        transaction.amount.toString().includes(searchQuery)
    );
    setTransactions(filteredTransactions);
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log(`Exporting transactions as ${format}`);
    // Implement export logic here
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
              height: "200px", // Adjust height as needed
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.05)", // Light background for contrast
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
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
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
                  height: "200px", // Adjust height as needed
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.05)", // Light background for contrast
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
