import { useEffect, useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { addItemToPantry } from '@/app/lib/firebaseConfig';
import DatePickerButton from './datePickerButton';
import { Timestamp } from 'firebase/firestore';
import dayjs from 'dayjs';

const AddItemForm = ({ userId, name, quant, expDate, handleAddedNewItems, 
                      setItemName, setQuantity, setExpiryDate, setItemValuesToDefault, disable = false }) => {
  // const [itemName, setItemName] = useState(name);
  // const [quantity, setQuantity] = useState(quant);
  // const [expiryDate, setExpiryDate] = useState(expdate)
  const [info, setInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && quant && expDate && userId ) {
      const itemMetaData = {
        quantity : quant,
        expiry_date : Timestamp.fromDate(new Date(expDate)),
        added_at : Timestamp.fromDate(new Date())
      }
      const res = await addItemToPantry(userId, name, itemMetaData);
      console.log(res)
      setItemValuesToDefault();
      // setItemName('');
      // setQuantity('');
      // setExpiryDate(dayjs());
      handleAddedNewItems()
    }
  };

  const handleDateUpdate = (e) => {
    setExpiryDate(e);
  }

  useEffect(() => {
    if(quant < 1 && name.length > 0)
      setQuantity(1)
  }, [name, quant, setQuantity])

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setItemName(e.target.value)}
        fullWidth
        margin="normal"
        disabled={disable}
        required
      />
      <TextField
        label="Quantity"
        type='number'
        value={quant}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      < DatePickerButton handleDateUpdate={handleDateUpdate} value={expDate}/>
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop : 2 }}>
        Add Item
      </Button>
    </Box>
  );
};

export default AddItemForm;
