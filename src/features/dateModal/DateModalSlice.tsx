import { createSlice } from "@reduxjs/toolkit"

interface DateModalState {
    modalControl: boolean;
}

const initialState: DateModalState = {
    modalControl: false,
}

const dateModalSlice = createSlice({
    name: "dateModal",
    initialState,
    reducers:{
        modalControl: (state,action) => {
            state.modalControl = action.payload
        }
    },
});

export default dateModalSlice.reducer;
export const { modalControl } = dateModalSlice.actions;