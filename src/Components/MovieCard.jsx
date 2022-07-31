// import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovieDetails, fetchTvDetails } from "../redux/detailsSlice";
import { motion } from "framer-motion";

const MoviesCard = ({
    movies,
    setSelectedMovie,
    setModal,
    removeContinueWatching,
}) => {
    const dispatch = useDispatch();
    const onClickImage = () => {
        if (movies.title !== undefined) {
            dispatch(fetchMovieDetails(movies.id))
                .unwrap()
                .then((originalPromiseResult) => {
                    console.log(originalPromiseResult);
                    setSelectedMovie(originalPromiseResult);
                });
        } else {
            dispatch(fetchTvDetails(movies.id))
                .unwrap()
                .then((originalPromiseResult) => {
                    console.log(originalPromiseResult);
                    setSelectedMovie(originalPromiseResult);
                });
        }
        setModal(true);
    };

    return (
        <>
            <div className="md:hover:scale-125 md:hover:z-10 transition-all duration-1000 mb-5 md:mb-20 mx-1 md:mx-2">
                <div onClick={onClickImage}>
                    {/* <button onClick={onClickRemove} className={`${splitLocation[1] === "continuewatching" ? "relative" : "hidden"}`}>X</button> */}
                    <motion.img
                    key={movies.backdrop_path}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1,
                        // ease: [0, 0.71, 0.2, 1.01],
                    }}
                    className="w-full h-full"
                    onClick={onClickImage}
                    src={`${process.env.REACT_APP_IMAGE_URL}original${movies.backdrop_path}`}
                    alt=""
                />
                </div>
            </div>
        </>
    );
};

export default MoviesCard;
