'use client'

import { signInWithGoogle, addUser } from '@/app/lib/firebaseConfig';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useAuthRedirect } from '@/app/lib/hooks/useAuthHandler';


const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function SignIn() {

    const router = useRouter();
    const { isRedirecting } = useAuthRedirect('/dashboard');
    
        
        

    const handleSignInWithGoogle = async (e) => {
        console.log('handling the signin');
        try{
            const response = await signInWithGoogle();
            if (response.success) {
                
                sessionStorage.setItem(process.env.NEXT_PUBLIC_SESSION_AUTH_EMAIL, response.response.user.email);
                console.log('saved the user email')
                addUser(response.response.user.uid)
                router.push('/dashboard');
                return;
            }
        } catch (err) {
            console.log(err)
        }
        

    }       
    
    if(isRedirecting)
        return <></>;

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
                padding: '2rem',
                borderRadius: '8px',
                backgroundColor: 'gray',
            }}
            >
            <Typography component="h1" variant="h5" sx={{ marginBottom: '1rem' }}>
                Sign in to Pantry Tracker
            </Typography>
            <Box sx={{ mt: 1 }}>
                <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={handleSignInWithGoogle}
                sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#4285F4',
                    '&:hover': {
                    backgroundColor: '#357ae8',
                    },
                    textTransform: 'none',
                    padding: '0.75rem',
                    fontSize: '1rem',
                }}
                >
                Sign in with Google
                </Button>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}
