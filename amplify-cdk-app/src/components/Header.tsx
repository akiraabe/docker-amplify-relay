import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' color='inherit' component='div'>
          第2回coco駅伝
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
