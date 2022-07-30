import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import popularsSlice from "./popularsSlice";
import newReleasesSlice from "./newReleasesSlice";
import discoverSlice from "./discoverSlice";
import detailsSlice from "./detailsSlice";
import searchSlice from "./searchSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        populars: popularsSlice,
        newReleases: newReleasesSlice,
        details: detailsSlice,
        discover: discoverSlice,
        search: searchSlice
    },
});
// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage,
// };

// const reducer = combineReducers({
//     auth: authSlice.reducer,
//     user: userSlice.reducer,
//     trending: trendingSlice.reducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

//         // eslint-disable-next-line
// export default () => {
//     const store = createStore(persistedReducer);
//     const persistor = persistStore(store)
//     return { store, persistor}
// };
