import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPopularMovies = createAsyncThunk(
    "populars/fetchPopularMovies",
    async () => {
        let arr = [];
        for (let index = 1; index <= 1; index++) {
            const {
                data: { results },
            } = await axios.get(
                `${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${index}`
            );
            // eslint-disable-next-line
            results.map((result) => {
                return arr.push(result);
            });
        }
        return arr;
    }
);
export const fetchPopularTv = createAsyncThunk(
    "populars/fetchPopularTv",
    async () => {
        let arr = [];
        for (let index = 1; index <= 1; index++) {
            const {
                data: { results },
            } = await axios.get(
                `${process.env.REACT_APP_API_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${index}`
            );
            // eslint-disable-next-line
            results.map((result) => {
                if (result.backdrop_path !== null) {
                    return arr.push(result);
                }
            });
        }
        return arr;
    }
);

const initialState = {
    loadingMovie: null,
    loadingTv: null,
    popularMovies: {},
    popularTv: {},
};

const popularsSlice = createSlice({
    name: "populars",
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     //populars
    //     builder
    //         .addCase(fetchPopularMovies.pending, (state) => {
    //             state.loadingMovie = "Pending";
    //         })
    //         .addCase(fetchPopularMovies.fulfilled, (state, { payload }) => {
    //             state.loadingMovie = "Fulfilled";
    //             state.popularMovies = payload;
    //         })
    //         .addCase(fetchPopularMovies.rejected, (state) => {
    //             state.loadingMovie = "Rejected";
    //         });
    //     //Tv
    //     builder
    //         .addCase(fetchPopularTv.pending, (state) => {
    //             state.loadingTv = "Pending";
    //         })
    //         .addCase(fetchPopularTv.fulfilled, (state, { payload }) => {
    //             state.loadingTv = "Fulfilled";
    //             state.popularTv = payload;
    //         })
    //         .addCase(fetchPopularTv.rejected, (state) => {
    //             state.loadingTv = "Rejected";
    //         });
    // },
});

export const popularsActions = popularsSlice.actions;
// export const getPopularMovies = (state) => state.populars.popularMovies;
// export const getPopularTv = (state) => state.populars.popularTv;
// export const getLoadingMovie = (state) => state.populars.loadingMovie;
// export const getLoadingTv = (state) => state.populars.loadingTv;

export default popularsSlice.reducer;
