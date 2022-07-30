import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovieDetails = createAsyncThunk(
    "details/fetchMovieDetails",
    async (movieId) => {
        const
            {data} = await axios.get(
            `${process.env.REACT_APP_API_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,credits`
        );
        return data
    }
);

export const fetchTvDetails = createAsyncThunk(
    "details/fetchTvDetails",
    async (tvId) => {
        const
            {data} = await axios.get(
            `${process.env.REACT_APP_API_URL}/tv/${tvId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,credits`
        );
        return data
    }
);

// const initialState = {
//     movieDetails: {},
//     tvDetails: {},
// };

const detailsSlice = createSlice({
    name: "details",
    initialState: null,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder.addCase(fetchMovieDetails.fulfilled, (state, { payload }) => {
    //         state.movieDetails = payload;
    //     });
    //     builder.addCase(fetchMovieDetails.rejected, ()=> {
    //         console.log("Rejected")
    //     })
    // },
});

export const detailsActions = detailsSlice.actions;

export default detailsSlice.reducer;