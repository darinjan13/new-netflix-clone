import { useState, useEffect } from "react";

import { doc, onSnapshot, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

import Modal from "../Components/Modal";
import HomeNavbar from "../Components/HomeNavbar";
import MovieCard from "../Components/MovieCard"
import Footer from "../Components/Footer";

const ContinueWatching = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const [continueWatching, setContinueWatching] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modal, setModal] = useState(true);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        document.title = "Continue Watching"

        const unsubscribe = () => onSnapshot(doc(db, "continueWatching", user.uid), (doc) => {
            const results = doc.data().results
            if (results.length === 0) {
                setLoading(true)
                setEmpty(true)
                setContinueWatching(null)
            } else {
                setContinueWatching(results.reverse())
                setLoading(true)
            }
        });
        return () => {
            unsubscribe()
        }
        // eslint-disable-next-line
    }, [])

    const renderMovies = () => (
        continueWatching.map((movie, index) => {
            return <MovieCard movies={movie} key={index} setSelectedMovie={setSelectedMovie} setModal={setModal} removeContinueWatching={removeContinueWatching} />
        })
    )

    const renderLoading = () => (
        <div className="flex h-screen items-center justify-center">
            <div className="animate-spin w-40 h-40 border-8 border-sky-500 border-r-white rounded-full">
            </div>
        </div>
    )

    const renderEmpty = () => (
        <div className="flex h-screen items-center justify-center uppercase">
            You didn't watch movies or tv series yet, go watch now.
        </div>
    )
    const removeContinueWatching = async (selectedRemove) => {
        const continueWatching1 = doc(db, "continueWatching", currentUser.uid)
        const docSnap = await getDoc(continueWatching1);
        const results = docSnap.data().results
        if ((results).some(({id}) => id === selectedRemove.id)) {
            await updateDoc(continueWatching1, {
                results: arrayRemove(selectedRemove)
            })
        } 
    }
    return (
        <div className="bg-gray-900/80 text-white">
            <HomeNavbar />
            {continueWatching && loading ?
                <>
                    {selectedMovie && <Modal selectedMovie={selectedMovie} modal={modal} setModal={setModal} />}
                    <div className="box-border text-center p-5">
                        <h1 className="text-4xl">Continue Watching</h1>
                        <div className="m-5">
                            <div className="flex flex-wrap justify-evenly">
                                {renderMovies()}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </> : renderLoading()
                    &&
                    empty && loading ?
                    <>
                        {selectedMovie && <Modal selectedMovie={selectedMovie} modal={modal} setModal={setModal} />}
                        <div className="box-border text-center p-5">
                            <h1>Continue Watching</h1>
                                {renderEmpty()}
                        </div>
                        <Footer />
                    </> : renderLoading()}

        </div>
    );
}
export default ContinueWatching;

//{continueWatching && loading ? renderMovies() : renderLoading() && empty && loading ? renderEmpty() : renderLoading()}