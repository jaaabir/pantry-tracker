import { useEffect, useState } from 'react';
import { getItemsFromPantry } from '@/app/lib/firebaseConfig';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {FormatDate} from '@/app/lib/dateConverter';
import { toast } from 'react-toastify';



const ItemList = ({ userId, searchQuery, page, itemsPerPage, addedNewItems, 
                    currentSort, handleEditList, setTotalItems, handleDeleteList }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItemsFromPantry(userId);
      if(fetchedItems?.items)
        setItems([...fetchedItems.items]);
      console.log(`total items fetched : ${fetchedItems.items.length}`)
      setTotalItems(fetchedItems.items.length) 
    };
    fetchItems();
  }, [userId, addedNewItems, setTotalItems]);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = filteredItems.sort((a, b) => {
    switch (currentSort) {
      case 'quantity':
        return a.itemMetaData.quantity - b.itemMetaData.quantity;
      case 'expiry date':
        return a.itemMetaData.expiry_date.toDate() - b.itemMetaData.expiry_date.toDate();
      default:
        return 0; 
    }
  });

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <List>
      {paginatedItems.map((item, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={item.name}
            secondary={`Quantity: ${item.itemMetaData.quantity} | Expiry Date: ${FormatDate(item.itemMetaData.expiry_date)}`}
          />
          <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" sx={{ marginRight: 1 }} onClick={() => handleEditList(item)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteList(item.name)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;
