import React, { useState } from 'react';
import { Button, Drawer } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Dayjs } from 'dayjs';
import styles from './DateFilter.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { setEndDate, setStartDate } from '../../features/date/DateSlice';
import Modal from '../modal/Modal';
import { modalControl } from '../../features/dateModal/DateModalSlice';

type Anchor = 'right';


const DateFilter: React.FC = () => {

  const [state, setState] = useState({
    right: false,
  });

  const dispatch = useDispatch();

  const startDate = useSelector((state: RootState) => state.date.startDate);
  const endDate = useSelector((state: RootState) => state.date.endDate);
  const modalDateWarning = useSelector((state: RootState) => state.dateModal.modalControl);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    
  ) => {
    setState({ ...state, [anchor]: open });
  };

  const handleDateChange = (value: Dayjs | null, context: { name: 'START' | 'END' }) => {
    if (value) {
      console.log(typeof(value))
      if (context.name === 'START') {
        dispatch(setStartDate(value)); 
      } else if (context.name === 'END') {
        if (value.isBefore(startDate)) {
          dispatch(modalControl(true));
          return;
        }else{
          dispatch(setEndDate(value)); 
        }
      }
    }
  };

  return (
    <>
      <Button onClick={toggleDrawer('right', true)}>Open Date Filter</Button>
      <Drawer anchor="right" open={state['right']} onClose={toggleDrawer('right', false)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['MobileDatePicker']}>
            <div className={styles.filterWrapper}>
              <DemoItem label="Filter Result">
                <div className={styles.filter}>
                  <div className={styles.filterItem}>
                    <MobileDatePicker
                      key="startDate"
                      value={startDate}
                      onChange={(value) => handleDateChange(value, { name: 'START' })}
                    />
                  </div>
                  <div className={styles.filterSecondItem}>
                    <MobileDatePicker
                      key="endDate" 
                      value={endDate}
                      onChange={(value) => handleDateChange(value, { name: 'END' })}
                    />
                  </div>
                </div>
              </DemoItem>
            </div>
          </DemoContainer>
        </LocalizationProvider>
        {
          modalDateWarning && <Modal />
        }
      </Drawer>
    </>
  );
};

export default DateFilter;
