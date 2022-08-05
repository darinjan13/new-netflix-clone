import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTrending = createAsyncThunk(
    "trending/fetchTrending",
    async ({ media_type, time_window }) => {
        let url = `${process.env.REACT_APP_API_URL}/trending/${media_type}/${time_window}?api_key=${process.env.REACT_APP_API_KEY}`;
        const {
            data: { results },
        } = await axios.get(url);
        return results;
    }
);

const trendingSlice = createSlice({
    name: "trending",
    initialState: null,
    reducers: {},
});

export const trendingActions = trendingSlice.actions;

export default trendingSlice.reducer;
