import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import Browse from "../Pages/Browse.jsx";
import HomePage from "../Pages/HomePage.jsx";
import Signin from "../Pages/Signin.jsx";
import Signup from "../Pages/Signup.jsx";
import NewRelease from "../Pages/NewRelease.jsx";
import ContinueWatching from "../Pages/ContinueWatching.jsx";
import Search from "../Pages/Search.jsx";
import NotFound from "../Pages/NotFound.jsx";

import ProtectedRoutes from "./ProtectedRoutes";
const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/signin" element={<Signin />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route
                    exact
                    path="/browse"
                    element={
                        <ProtectedRoutes>
                            <Browse />
                        </ProtectedRoutes>
                    }
                ></Route>
                <Route
                    exact
                    path="/newrelease"
                    element={
                        <ProtectedRoutes>
                            <NewRelease />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    exact
                    path="/continuewatching"
                    element={
                        <ProtectedRoutes>
                            <ContinueWatching />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    exact
                    path="/search"
                    element={
                        <ProtectedRoutes>
                            <Search />
                        </ProtectedRoutes>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
