import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Campaign } from '../../models/Campaing';

interface CampaignsState {
    campaigns: Campaign[];
}

const initialState: CampaignsState ={
    campaigns: [],
}

const addCampaignsSlice = createSlice({
    name: "addCampaign",
    initialState,
    reducers: {
        addCampaign: (state, action: PayloadAction<Campaign>) => {
            state.campaigns.push(action.payload);
          },
    },
});

export default addCampaignsSlice.reducer;
export const { addCampaign } = addCampaignsSlice.actions;