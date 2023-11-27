import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchText, deleteLastChar } from '../../features/search/SearchSlice';
import { RootState } from '../../app/store';

export default function Search() {
    
  const [name, setName] = React.useState('');
  const dispatch = useDispatch();

  const searchText = useSelector((state: RootState) => state.search.text);

  const controlSearchWidth = name.length > 0 ? 250 : 175;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    dispatch(setSearchText(event.target.value));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && name.length === 0) {
      dispatch(deleteLastChar());
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '100%',
      }}
    >
      <TextField
        id="outlined-controlled"
        label="Search"
        value={searchText}
        placeholder='Search Name'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ width: controlSearchWidth, transition: 'all .3s ease' }}
      />
    </Box>
  );
}
