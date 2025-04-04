import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const TabsSection: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Tokens" />
        {/* <Tab label="NFTs" /> */}
        {/* <Tab label="DeFi" /> */}
        <Tab label="Transactions" />
        {/* <Tab label="Spending Cap" /> */}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {value === 0 && <Typography>Tokens Content</Typography>}
        {/* {value === 1 && <Typography>NFTs Content</Typography>} */}
        {/* {value === 2 && <Typography>DeFi Content</Typography>} */}
        {value === 1  && <Typography>Transactions Content</Typography>}
        {/* {value === 4 && <Typography>Spending Cap Content</Typography>} */}
      </Box>
    </Box>
  );
};

export default TabsSection;
