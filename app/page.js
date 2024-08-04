'use client'
// import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, AppBar, Toolbar } from '@mui/material';
import Layout from '@/app/components/layouts';
import Image from 'next/image';
import { useEffect, useState } from 'react';


const Home = () => {
  const router = useRouter();
  const [bio, setBio] = useState('');

  const handleButtonClick = () => {
    router.push('/sign-in');
  };

  

  return (
    <Layout>
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Pantry Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 8 }}>
          <Image src="/pantry2.jpg" alt="Pantry Image" width={500} height={300} priority={false}/>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h2" gutterBottom>
            Welcome to Pantry Tracker
          </Typography>
          <Typography variant="h5" gutterBottom>
            Keep track of all your pantry items easily and efficiently.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleButtonClick}
              sx={{
                textTransform: 'none',
                padding: '0.75rem 2rem',
                fontSize: '1.2rem',
              }}
            >
              {"Let's Track"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
