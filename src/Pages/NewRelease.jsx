import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWatched } from "../Hooks/Hooks.jsx"

import HomeNavbar from "../Components/HomeNavbar"
import MovieCard from "../Components/MovieCard";
import Modal from "../Components/Modal";
import { fetchNewReleases, getNewReleases, getLoading } from "../redux/newReleasesSlice"
import Footer from "../Components/Footer";

const NewRelease = () => {
    const dispatch = useDispatch();
    const newReleases = useSelector(getNewReleases);
    const loading = useSelector(getLoading);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [selectedMovie, setSelectedMovie] = useState({});
    const [modal, setModal] = useState(false);

    useEffect(() => {
        document.title = "New Release"
    }, [])

    useEffect(() => {
        if (Object.keys(selectedMovie).length !== 0) {
            addToWatched(currentUser, selectedMovie);
        }
        // eslint-disable-next-line
    }, [selectedMovie])
    useEffect(() => {
        dispatch(fetchNewReleases())
        // eslint-disable-next-line
    }, [dispatch]);

    const renderMovies = () => (
        newReleases.map((movie, index) => {
            return <MovieCard movies={movie} key={index} setSelectedMovie={setSelectedMovie} setModal={setModal} />
        })
    )

    return (
        <div className="bg-gray-900/80 text-white">
            <HomeNavbar />
            {loading === "Pending" && (
                <div className="flex h-screen items-center justify-center">
                    <div className="animate-spin w-40 h-40 border-8 border-sky-500 border-r-white rounded-full">
                    </div>
                </div>
            )}
            {loading === "Fulfilled" && (
                <>
                    {selectedMovie && <Modal selectedMovie={selectedMovie} modal={modal} setModal={setModal} />}
                    <div className="box-border p-5">
                        <h1 className="text-4xl">New Release</h1>
                        <div className="flex flex-wrap justify-around">
                            {renderMovies()}
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default NewRelease;