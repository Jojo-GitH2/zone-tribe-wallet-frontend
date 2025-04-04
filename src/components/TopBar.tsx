import React from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Menu, MenuItem } from "@mui/material";
import { Search, Notifications, AccountCircle, LocalGasStation } from "@mui/icons-material";

const TopBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position= "fixed" color = "inherit" sx = {{ zIndex: 1201 }
}>
    <Toolbar>
    <Typography variant="h6" sx = {{ flexGrow: 1 }}>
        Zone Tribe Wallet
        </Typography>
        < InputBase
placeholder = "Search…"
sx = {{
    ml: 2,
        flexGrow: 1,
            backgroundColor: "#f1f1f1",
                borderRadius: 1,
                    px: 2,
          }}
        />
    < IconButton >
    <LocalGasStation />
    </IconButton>
    < IconButton >
    <Notifications />
    </IconButton>
    < IconButton onClick = { handleProfileMenuOpen } >
        <AccountCircle />
        </IconButton>
        < Menu
anchorEl = { anchorEl }
open = { Boolean(anchorEl) }
onClose = { handleMenuClose }
    >
    <MenuItem onClick={ handleMenuClose }> Profile </MenuItem>
        < MenuItem onClick = { handleMenuClose } > Logout </MenuItem>
            </Menu>
            </Toolbar>
            </AppBar>
  );
};

export default TopBar;