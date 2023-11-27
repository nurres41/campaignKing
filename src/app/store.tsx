import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import searchReducer from "../features/search/SearchSlice";
import dateReducer from '../features/date/DateSlice';
import dateModalReducer from '../features/dateModal/DateModalSlice';
import campaignsReducer from "../features/addCampaigns/AddCampaignsSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    date: dateReducer,
    dateModal: dateModalReducer,
    campaigns: campaignsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;