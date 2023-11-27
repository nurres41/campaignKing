import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { modalControl } from '../../features/dateModal/DateModalSlice';
import { setEndDate } from '../../features/date/DateSlice';

export default function Modal() {

  const dispatch = useDispatch();

  const open = useSelector((state: RootState) => state.dateModal.modalControl);

  const handleControlModal = (context: {name: 'OPEN' | 'CLOSE'}) => {
    if(context.name === 'OPEN'){
        dispatch(modalControl(true));
    }else if(context.name === 'CLOSE'){
      dispatch(modalControl(false));
      dispatch(setEndDate(null));
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={()=> handleControlModal({name: 'CLOSE'})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Date Filter Warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            End dates cannot be selected before start dates. We keep your Start Date but you should change your End Date. Because End Date will get a null value after close this modal.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> handleControlModal({name: 'CLOSE'})} autoFocus>
            I got you!
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}