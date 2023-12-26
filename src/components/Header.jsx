import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar sx={{ position: 'fixed', zIndex: 10 }} color='primary'>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          pomodoro_box
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
