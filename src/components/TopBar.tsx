import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Badge,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  NotificationsOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material"; // Use outlined icons
import WalletDropdown from "./WalletDropdown";
import { AuthContext } from "../context/authContext";
import { NotificationContext } from "../context/notificationContext";
import { Wallet } from "../types/wallet"; // Import the Wallet type

// interface Wallet {
//   id: string;
//   name: string;
//   balance: number;
// }

interface TopBarProps {
  sidebarWidth: number; // Sidebar width to adjust the TopBar width dynamically
  wallets: Wallet[];
  currentWallet: Wallet | null;
  onWalletSelect: (wallet: Wallet) => void; // Callback for wallet selection
  refreshWallets: () => void; // Callback to refresh wallets
}

const TopBar: React.FC<TopBarProps> = ({
  sidebarWidth,
  wallets,
  currentWallet,
  onWalletSelect,
  refreshWallets,
}) => {
  const authContext = useContext(AuthContext); // Access the userId from AuthContext
  const userId = authContext?.user?.id; // Get the userId from the context
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const notificationContext = React.useContext(NotificationContext);
  const unreadCount = notificationContext?.notifications.length || 0;
  const [notifAnchorEl, setNotifAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    if (authContext?.logout) {
      authContext.logout();
    }
    handleMenuClose();
    navigate("/login");
  };

  const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };
  const handleNotifClose = () => setNotifAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        zIndex: 1201,
        width: `calc(100% - ${sidebarWidth}px)`, // Adjust width dynamically
        ml: `${sidebarWidth}px`, // Ensure it aligns with the sidebar
        bgcolor: "background.default", // Set background color
        color: "white", // Set text and icon color to white
        boxShadow: "none", // Remove default AppBar shadow
        transition: "width 0.3s ease, margin-left 0.3s ease", // Smooth transition for width and margin
        borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          {userId && (
            <WalletDropdown
              wallets={wallets}
              currentWallet={currentWallet}
              onWalletSelect={onWalletSelect}
              refreshWallets={refreshWallets}
            />
          )}
        </Box>

        {/* Right: Notification and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{
              color: "white",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
            }}
            onClick={handleNotifOpen}
          >
            <Badge badgeContent={unreadCount} color="secondary">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notifAnchorEl}
            open={Boolean(notifAnchorEl)}
            onClose={handleNotifClose}
            PaperProps={{
              sx: {
                minWidth: 250, // Reduced from 320
                maxWidth: 320, // Add a maxWidth for safety
                maxHeight: 400,
              },
            }}
          >
            <Box sx={{ px: 2, pt: 1, pb: 1 }}>
              <Box sx={{ fontWeight: "bold", mb: 1 }}>Notifications</Box>
              <List
                dense
                sx={{
                  maxHeight: 260,
                  overflowY: "auto",
                  overflowX: "hidden", // Prevent horizontal scrolling
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
                {notificationContext?.notifications.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No notifications yet." />
                  </ListItem>
                )}
                {notificationContext?.notifications
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((notif) => (
                    <React.Fragment key={notif.id}>
                      <ListItem>
                        {notif.message === "Refreshing wallet data..." ? (
                          <>
                            <CircularProgress size={18} sx={{ mr: 1 }} />
                            <ListItemText
                              primary={notif.message}
                              primaryTypographyProps={{
                                color: "text.secondary",
                              }}
                            />
                          </>
                        ) : (
                          <ListItemText
                            primary={notif.message}
                            secondary={new Date(
                              notif.createdAt
                            ).toLocaleString()}
                            primaryTypographyProps={{
                              color:
                                notif.type === "success"
                                  ? "green"
                                  : notif.type === "error"
                                  ? "red"
                                  : "inherit",
                              sx: {
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                              },
                            }}
                            secondaryTypographyProps={{
                              sx: {
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                              },
                            }}
                          />
                        )}
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
              </List>
              {(notificationContext?.notifications?.length ?? 0) > 0 && (
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => {
                    notificationContext?.clearNotifications();
                    handleNotifClose();
                  }}
                  sx={{ mt: 1 }}
                >
                  Clear All
                </Button>
              )}
            </Box>
          </Menu>
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              color: "white", // Set icon color to white
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)", // Add hover effect
              },
            }}
          >
            <AccountCircleOutlined />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Accounts</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
