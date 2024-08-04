'use client'

import { useState } from 'react';
import { Container, Box, Typography, Button, Grid, Paper, TextField, Pagination, Dialog, DialogTitle, DialogContent, DialogActions  } from '@mui/material';
import ItemList from '@/app/components/itemList';
import NavBar from '@/app/components/navBar';
import { useRouter } from 'next/navigation';
import Layout from '@/app/components/layouts';
import { auth } from '@/app/lib/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNoAuthRedirect } from '../lib/hooks/useAuthHandler';
import AddItemForm from '@/app/components/addItemsForm';
import SortMenu from '@/app/components/sortMenu';
import dayjs from 'dayjs';
import {convertFirestoreTimestampToDayjs} from '@/app/lib/dateConverter';
import { deleteItemFromPantry } from '@/app/lib/firebaseConfig';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const router = useRouter();  
  const [user, loading, error] = useAuthState(auth);
  const { isRedirecting } = useNoAuthRedirect('/');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;
  const [open, setOpen] = useState(false);
  const [addedNewItems, setAddedNewItems] = useState(0);
  const [currentSort, setCurrentSort] = useState('date added (default)');
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [expDate, setExpDate] = useState(dayjs())
  const [disableField, setDisableField] = useState(false);


  const setItemValuesToDefault = () => {
    setName('')
    setQuantity(0)
    setExpDate(dayjs())
  }

  const handleEditList = (item) => {
    setName(item.name)
    setQuantity(item.itemMetaData.quantity);
    setExpDate(convertFirestoreTimestampToDayjs(item.itemMetaData.expiry_date));
    handleDisableField(true);
    handleClickOpen()
  }

  const handleDeleteList = async (itemName) => {
    console.log("going to delte " + itemName)
    const res = await deleteItemFromPantry(user?.uid, itemName)
    setAddedNewItems(addedNewItems + 1);
    console.log(res)
  }

  const handleDisableField = (val) => {
    setDisableField(val)
  }

  const handleAddedNewItems = () => {
    setAddedNewItems(addedNewItems + 1);
  }

  const handleCurrentSort = (sortValue) => {
    setCurrentSort(sortValue);
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleDisableField(false)
    setItemValuesToDefault()
  };

  const handleSetTotalItems = (l) => {
    setTotalItems(l);
  }

  if(isRedirecting || loading)
    return <></>

  return (
    <Layout>
      <ToastContainer />
      <Container maxWidth="lg">
        <NavBar />
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                  sx={{ mb: 2 }}
                >
                  Add Item
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">
                    Pantry Items
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <SortMenu currentSort={currentSort} handleSort={handleCurrentSort}/> 
                  </Box>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Search Items"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Box>
                <ItemList 
                  userId={user.uid} 
                  searchQuery={searchQuery} 
                  page={page} 
                  itemsPerPage={itemsPerPage}
                  addedNewItems={addedNewItems}
                  currentSort={currentSort}
                  handleEditList={handleEditList}
                  setTotalItems={handleSetTotalItems}
                  handleDeleteList={handleDeleteList}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Pagination 
                    count={totalItems < 1 ? 1: Math.ceil(totalItems / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Add Item Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <AddItemForm userId={user?.uid} 
                       name={name} 
                       quant={quantity} 
                       expDate={expDate} 
                       handleAddedNewItems={handleAddedNewItems}
                       setItemName={(value) => setName(value)}
                       setQuantity={(value) => setQuantity(value)}
                       setExpiryDate={(value) => setExpDate(value)}
                       disable={disableField}
                       setItemValuesToDefault={setItemValuesToDefault}
                       />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Dashboard;



{/* <Grid item xs={12}>
                <Paper sx={{ p: 2, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/add-items')}
                  >
                    Add Item
                  </Button>
                </Paper>
              </Grid> */}
