import { useState } from 'react';
import { IconButton, Menu, MenuItem, Paper, Typography, Box } from '@mui/material';

const SortMenu = ({ currentSort, handleSort }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const sortItems = ['date added (default)', 'quantity', 'expiry date'];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAas = () => {
    handleSort(sortItems[0]);
    handleClose();
  };

  const handleQs = () => {
    handleSort(sortItems[1]);
    handleClose();
  }

  const handleEs = () => {
    handleSort(sortItems[2]);
    handleClose();
  }

  return (
    <div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>Sort by:</Typography>
            <Paper onClick={handleMenu} sx={{ "&:hover": { cursor: 'pointer' }, padding: '0.5rem' }}>
            {currentSort}
            </Paper>
        </Box>
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleAas}>{sortItems[0]}</MenuItem>
            <MenuItem onClick={handleQs}>{sortItems[1]}</MenuItem>
            <MenuItem onClick={handleEs}>{sortItems[2]}</MenuItem>
        </Menu>
    </div>
  );
};

export default SortMenu;
