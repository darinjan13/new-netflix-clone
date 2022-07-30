import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearch = createAsyncThunk(
    "search/fetchSearch",
    async ({ keyword, page }) => {
        let arr = [];
        for (let index = 1; index <= page; index++) {
            const {
                data: { results },
            } = await axios.get(
                `${process.env.REACT_APP_API_URL}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${keyword}&page=${index}&include_adult=false`
            );
            results.forEach((result) => {
                if (
                    result.media_type !== "person" &&
                    result.backdrop_path !== null &&
                    result.poster_path !== null
                ) {
                    arr.push(result);
                }
            });
        }
        console.log(arr);
        return arr;
    }
);

const initialState = {
    results: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //populars
        builder.addCase(fetchSearch.fulfilled, (state, { payload }) => {
            state.results = payload;
        });
    },
});

export const searchAction = searchSlice.actions;
export const getResults = (state) => state.search.results;

export default searchSlice.reducer;
