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
  Tooltip,
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
import WalletLogo from "../assets/WalletLogo.jpg";

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
            `${t.transactionId},"${new Date(t.dateTime).toLocaleString()} (${
              t.dateTime
            })",${t.amount},${t.transactionType},${t.status ?? ""}`
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
      doc.addImage(WalletLogo, "JPEG", 14, 2, 10, 10);
      doc.setFontSize(8);
      doc.text("Exported on " + new Date().toLocaleString(), 200, 5, {
        align: "right",
      });

      doc.setFontSize(12);
      doc.text("Transaction History", 14, 20);
      (doc as any).autoTable({
        startY: 22,
        head: [["ID", "Date", "Amount", "Type", "Status"]],
        body: filteredTransactions.map((t) => [
          t.transactionId,
          new Date(t.dateTime).toLocaleString(),
          t.amount,
          t.transactionType,
          t.status ?? "",
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: "#2c003e" },
      });
      doc.save("transactions.pdf");
    }
    handleExportClose();
  };

  const handleRefresh = async () => {
    if (!currentWallet) return;
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    const data = await fetchWalletTransactions(currentWallet.address, token);
    setTransactions(data);
    setFilteredTransactions(data);
  };

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line
  }, [currentWallet]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
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
      {/* Sticky header: Tabs and search/export/refresh row */}
      <Box
        sx={{
          position: "sticky",
          top: 20, // Adjust if your TopBar is a different height
          zIndex: 10,
          bgcolor: "background.default",
          pb: 2,
          // borderTop: "0.5px solid rgba(255, 255, 255, 0.2)", // Add a faint right border
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tokens" />
          <Tab label="Transactions" />
        </Tabs>
        {value === 1 && (
          <Box sx={{ mt: 2 }}>
            {currentWallet && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 2,
                  alignItems: "center",
                  bgcolor: "background.default",
                }}
              >
                {/* Search, Refresh, and Export Row */}
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      backgroundColor: "background.paper",
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
            )}
          </Box>
        )}
      </Box>

      {/* Scrollable transaction table */}
      {value === 1 && currentWallet && (
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "60vh",
            overflowY: "auto",
            mt: 0,
            // Hide scrollbar by default, show on hover
            "&::-webkit-scrollbar": {
              width: 0,
              transition: "width 0.7s",
            },
            "&:hover::-webkit-scrollbar": {
              width: "2px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Table stickyHeader>
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
                  <TableCell>
                    <Tooltip title={transaction.dateTime}>
                      <span>
                        {new Date(transaction.dateTime).toLocaleString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.transactionType}</TableCell>
                  <TableCell>{transaction.status ?? ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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
      {value === 1 && !currentWallet && (
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
  );
};

export default TabsSection;
