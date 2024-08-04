'use client'

import { Container, Box, Typography, Grid, Paper } from '@mui/material';
import AddItemForm from '@/app/components/addItemsForm';
import NavBar from '@/app/components/navBar';
import { auth } from '@/app/lib/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';

const AddItems = () => {

    const [user] = useAuthState(auth);
    return (
        <Container sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', justifyContent : 'center'}}>
            <Typography><Box>Deprecated</Box></Typography>
            <Link href='/'>
                <Typography>{"Go Back <-"}</Typography>
            </Link>
        </Container> 
        
    )
    return (
        <Container maxWidth="lg">
            <NavBar />
            <Box sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Add New Item</Typography>
                        <AddItemForm userId={user?.uid}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default AddItems