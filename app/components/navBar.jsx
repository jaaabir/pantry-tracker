import { Typography, AppBar, Toolbar } from '@mui/material';
import UserIconMenu from '@/app/components/userIconMenu';
import Link  from 'next/link';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
              <Link href='dashboard' sx={{ color: 'white', textDecoration: 'none' }}>
                Pantry Tracker Dashboard
              </Link>
            </Typography>
          
          <UserIconMenu />
        </Toolbar>
    </AppBar>
  )
}

export default NavBar