import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import popularsSlice from "./popularsSlice";
import discoverSlice from "./discoverSlice";
import detailsSlice from "./detailsSlice";
import searchSlice from "./searchSlice";
import trendingSlice from "./trendingSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        trending: trendingSlice,
        populars: popularsSlice,
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
