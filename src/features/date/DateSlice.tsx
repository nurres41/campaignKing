import { createSlice } from '@reduxjs/toolkit'
import { Dayjs } from 'dayjs';

interface DateState{
    startDate: Dayjs | null,
    endDate: Dayjs | null,
}

const initialState: DateState ={
    startDate: null,
    endDate: null,
}

const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        setStartDate: (state, action) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload
        },
    },
});

export default dateSlice.reducer;
export const { setStartDate, setEndDate } = dateSlice.actions;