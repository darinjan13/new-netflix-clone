import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchKDrama = createAsyncThunk(
    "discover/fetchKDrama",
    async () => {
        const {
            data: { results },
        } = await axios.get(
            `${process.env.REACT_APP_API_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=ko&sort_by=popularity.desc&page=1&with_genres=18&include_null_first_air_dates=false`
        );
        return results;
    }
);

export const fetchAnime = createAsyncThunk("discover/fetchAnime", async () => {
    const {
        data: { results },
    } = await axios.get(
        `${process.env.REACT_APP_API_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=ja&sort_by=popularity.desc&page=1&with_genres=16&include_null_first_air_dates=false`
    );
    return results;
});

const discoverSlice = createSlice({
    name: "discover",
    initialState: null,
    reducers: {},
});

export const discoverActions = discoverSlice.actions;

export default discoverSlice.reducer;
