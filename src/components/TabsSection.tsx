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

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: string; // e.g., "credit" or "debit"
}

const TabsSection: React.FC = () => {
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
    // Filter transactions based on the search query
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
        {value === 0 && <Typography>Tokens Content</Typography>}
        {value === 1 && (
          <Box>
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
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TabsSection;
