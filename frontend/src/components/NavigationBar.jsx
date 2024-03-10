import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;

function NavigationBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BTC Script
      </Typography>
      <Divider />
      <List>
            <ListItem key='Home' disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} href='/'>
                    <ListItemText primary='Home' />
                </ListItemButton>
            </ListItem>
            <ListItem key='Create' disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} href='/create'>
                    <ListItemText primary='Create' />
                </ListItemButton>
            </ListItem>
            <ListItem key='Test' disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} href='/test'>
                    <ListItemText primary='Test' />
                </ListItemButton>
            </ListItem>
            <ListItem key='About' disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} href='/about'>
                    <ListItemText primary='About' />
                </ListItemButton>
            </ListItem>
      </List>
    </Box>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            BTC Script
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button key='Home' sx={{ color: '#fff' }} href='/'>
                    Home
                </Button>
                <Button key='Create' sx={{ color: '#fff' }} href='/create'>
                    Create
                </Button>
                <Button key='Test' sx={{ color: '#fff' }} href='/test'>
                    Test
                </Button>
                <Button key='about' sx={{ color: '#fff' }} href='/about'>
                    About
                </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default NavigationBar;
