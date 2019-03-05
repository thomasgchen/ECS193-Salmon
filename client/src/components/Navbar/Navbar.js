import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { SALMON_COLOR } from '../../config/constants';

const NavBar = () => {
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: SALMON_COLOR }}>
        <Toolbar>
          <Typography variant="title" color="inherit" style={{ flex: 1 }}>
            Salmon
          </Typography>
          <Button raised color="accent">
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Dashboard
            </Link>
          </Button>
          <Button raised color="accent">
            <Link to="/entry" style={{ textDecoration: 'none', color: 'white' }}>
              Data Entry
            </Link>
          </Button>
          <Button raised color="accent">
            <Link to="/explorer" style={{ textDecoration: 'none', color: 'white' }}>
              Data Explorer
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
