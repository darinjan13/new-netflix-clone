import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

export const fetchDiscover = createAsyncThunk(
    "discover/fetchDiscover",
    async ({
        media_type,
        language,
        page,
        genre,
        without_genre,
        network,
        watch_region,
        watch_provider,
    }) => {
        const baseUrl = `${process.env.REACT_APP_API_URL}/discover/${media_type}?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&include_null_first_air_dates=false`;
        let url;
        //Language only
        if (
            language &&
            !page &&
            !genre &&
            !without_genre &&
            !network &&
            !watch_provider &&
            !watch_region
        ) {
            url = `${baseUrl}&with_original_language=${language}&page=1`;
            const {
                data: { results },
            } = await axios.get(url);
            const filteredResult = results.filter((result) => {
                return result.genre_ids.length !== 0;
            });
            console.log(filteredResult);
            return filteredResult;
        }
        //Language and Without Genre
        else if (
            language &&
            !page &&
            !genre &&
            without_genre &&
            !network &&
            !watch_provider &&
            !watch_region
        ) {
            url = `${baseUrl}&with_original_language=${language}&page=1&without_genres=${without_genre}`;
            const {
                data: { results },
            } = await axios.get(url);
            const filteredResult = results.filter((result) => {
                return result.genre_ids.length !== 0 && result.backdrop_path;
            });
            console.log(filteredResult);
            return filteredResult;
        }
        //Language and Genre
        else if (
            language &&
            !page &&
            genre &&
            !without_genre &&
            !network &&
            !watch_provider &&
            !watch_region
        ) {
            url = `${baseUrl}&with_original_language=${language}&page=1&with_genres=${genre}`;
            const {
                data: { results },
            } = await axios.get(url);
            return results;
        }
        //Language, Page and Genre
        else if (
            language &&
            page &&
            genre &&
            !without_genre &&
            !network &&
            !watch_provider &&
            !watch_region
        ) {
            let arr = [];
            for (let index = 1; index <= page; index++) {
                url = `${baseUrl}&with_original_language=${language}&page=${index}&with_genres=${genre}`;
                const {
                    data: { results },
                } = await axios.get(url);
                results.forEach((result) => {
                    arr.push(result);
                });
            }
            return arr;
        }
        //Network and Language
        else if (
            language &&
            !page &&
            !genre &&
            !without_genre &&
            network &&
            !watch_provider &&
            !watch_region
        ) {
            url = `${baseUrl}&with_original_language=${language}&page=1&with_networks=${network}`;
            const {
                data: { results },
            } = await axios.get(url);
            const filteredResult = results.filter((result) => {
                return result.genre_ids.length !== 0;
            });
            return filteredResult;
        }
        //Language, Region and Providers
        else if (
            language &&
            !page &&
            !genre &&
            !without_genre &&
            !network &&
            watch_provider &&
            watch_region
        ) {
            url = `${baseUrl}&with_original_language=${language}&page=1&watch_region=${watch_region}&with_watch_providers=${watch_provider}`;
            const {
                data: { results },
            } = await axios.get(url);
            const filteredResult = results.filter((result) => {
                return result.genre_ids.length !== 0 && result.backdrop_path;
            });
            console.log(filteredResult);
            return filteredResult;
        }
        //For new Release
        else {
            var date = moment().format("YYY-MM-DD");
            url = `${baseUrl}&page=1&first_air_date.gte=${date}`;
            const {
                data: { results },
            } = await axios.get(url);
            return results;
        }
    }
);

const discoverSlice = createSlice({
    name: "discover",
    initialState: null,
    reducers: {},
});

export const discoverActions = discoverSlice.actions;

export default discoverSlice.reducer;
