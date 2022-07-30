import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

export const fetchNewReleases = createAsyncThunk(
    "newReleases/fetchNewReleases",
    async () => {
        const lastWeek = moment().subtract(21, "days").format("YYYY-MM-DD");
        const tommorrow = moment().add(1, "day").format("YYYY-MM-DD");
        let arr = [];
        let url = `${process.env.REACT_APP_API_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=`;
        for (let page = 1; page < 67; page++) {
            const {
                data: { results },
            } = await axios.get(`${url}${page}`);
            results.forEach((result) => {
                if (
                    moment(result.release_date).isBetween(
                        lastWeek,
                        tommorrow
                    ) &&
                    result.backdrop_path != null &&
                    result.poster_path != null &&
                    arr.length < 20
                ) {
                    arr.push(result);
                }
            });
            if (arr.length === 20) {
                //remove duplicate
                arr.reduce((filter, current) => {
                    var duplicate = filter.find(
                        (item) => item.title === current.title
                    );
                    if (!duplicate) {
                        return filter.concat([current]);
                    } else {
                        return filter;
                    }
                }, []);
                arr.sort((a, b) => {
                    return new Date(b.release_date) - new Date(a.release_date);
                });
            }
        }
        console.log(arr);
        return arr;
    }
);
const initialState = {
    loading: null,
    movies: {},
};

const newReleasesSlice = createSlice({
    name: "newReleases",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //New Releases
        builder
            .addCase(fetchNewReleases.pending, (state) => {
                state.loading = "Pending";
            })
            .addCase(fetchNewReleases.fulfilled, (state, { payload }) => {
                state.loading = "Fulfilled";
                state.movies = payload;
            })
            .addCase(fetchNewReleases.rejected, (state) => {
                state.loading = "Rejected";
            });
    },
});

export const newReleasesActions = newReleasesSlice.actions;
export const getNewReleases = (state) => state.newReleases.movies;
export const getLoading = (state) => state.newReleases.loading;

export default newReleasesSlice.reducer;
