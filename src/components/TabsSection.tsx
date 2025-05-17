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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import RefreshIconOutlined from "@mui/icons-material/Refresh";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Wallet } from "../types/wallet";
import {
  fetchWalletTransactions,
  Transaction,
} from "../services/transactionService";
import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";

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
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  const handleExport = (format: "csv" | "pdf") => {
    if (format === "csv") {
      const header = "ID,Date,Amount,Type,Status\n";
      const rows = filteredTransactions
        .map(
          (t) =>
            `${t.transactionId},${t.dateTime},${t.amount},${t.transactionType},${t.status ?? ""}`
        )
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
      applyPlugin(jsPDF);
      const doc = new jsPDF();
      console.log("PDF generation started");
      doc.setFontSize(12);
      doc.text("Transaction History", 14, 16);
      console.log("PDF title added");
      (doc as any).autoTable({
        startY: 22,
        head: [["ID", "Date", "Amount", "Type", "Status"]],
        body: filteredTransactions.map((t) => [
          t.transactionId,
          t.dateTime,
          t.amount,
          t.transactionType,
          t.status ?? "",
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [22, 160, 133] },
      });
      doc.save("transactions.pdf");
    }
    handleExportClose();
  };

  const handleRefresh = async () => {
    if (!currentWallet) return;
    const token =
      localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (!token) return;
    const data = await fetchWalletTransactions(currentWallet.address, token);
    setTransactions(data);
    setFilteredTransactions(data);
  };

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line
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
                {/* Search, Refresh, and Export Row */}
                <Box
                  sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}
                >
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                      },
                    }}
                    label="Search by date, amount, or ID"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "20px",
                    }}
                  >
                    Search
                  </Button>
                  <IconButton
                    aria-label="Export"
                    onClick={handleExportClick}
                    sx={{
                      color: "white",
                      bgcolor: "transparent",
                      borderRadius: "20px",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    <FileDownloadOutlinedIcon />
                  </IconButton>
                  <Menu
                    anchorEl={exportAnchorEl}
                    open={Boolean(exportAnchorEl)}
                    onClose={handleExportClose}
                  >
                    <MenuItem onClick={() => handleExport("csv")}>CSV</MenuItem>
                    <MenuItem onClick={() => handleExport("pdf")}>PDF</MenuItem>
                  </Menu>
                  <IconButton
                    aria-label="Refresh"
                    onClick={handleRefresh}
                    sx={{
                      color: "white",
                      bgcolor: "transparent",
                      borderRadius: "20px",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    <RefreshIconOutlined />
                  </IconButton>
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
