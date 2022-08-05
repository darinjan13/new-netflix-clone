import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";

import Search from "../Pages/Search.jsx";
import Modal from "../Pages/Modal.jsx";

import ProtectedRoutes from "./ProtectedRoutes";

const Browse = lazy(() => import("../Pages/Browse.jsx"));
const HomePage = lazy(() => import("../Pages/HomePage.jsx"));
const Signin = lazy(() => import("../Pages/Signin.jsx"));
const Signup = lazy(() => import("../Pages/Signup.jsx"));
const TvShows = lazy(() => import("../Pages/TvShows.jsx"));
const Movies = lazy(() => import("../Pages/Movies.jsx"));
const NotFound = lazy(() => import("../Pages/NotFound.jsx"));
const AnimatedRoutes = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { pathname } = location;
    return (
        <AnimatePresence>
            <Routes location={location} key={pathname}>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/signin" element={<Signin />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route
                    path="/browse"
                    element={
                        <ProtectedRoutes>
                            <Suspense fallback={<></>}>
                                <Browse />
                            </Suspense>
                        </ProtectedRoutes>
                    }
                ></Route>
                <Route
                    exact
                    path="/tv"
                    element={
                        <ProtectedRoutes>
                            <Suspense fallback={<></>}>
                                <TvShows />
                            </Suspense>
                        </ProtectedRoutes>
                    }
                />
                <Route
                    exact
                    path="/movies"
                    element={
                        <ProtectedRoutes>
                            <Suspense fallback={<></>}>
                                <Movies />
                            </Suspense>
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
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<></>}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Routes>
            {searchParams.get("id") && (
                <Routes>
                    <Route path={pathname} element={<Modal />} />
                </Routes>
            )}
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
