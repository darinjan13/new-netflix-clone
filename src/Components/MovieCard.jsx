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

    const defaultEasing = [0.6, -0.05, 0.01, 0.99];
    return (
        <>
            <motion.div
            key={movies.backdrop_path}
                // variants={posterFadeInVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    delay: 1,
                    duration: 1,
                    ease: defaultEasing
                }}
                className="md:hover:scale-125 md:hover:z-10 transition-all duration-1000 mb-5 md:mb-20 mx-1 md:mx-2"
            >
                <div onClick={onClickImage}>
                    {/* <button onClick={onClickRemove} className={`${splitLocation[1] === "continuewatching" ? "relative" : "hidden"}`}>X</button> */}
                    <img
                        className="w-full h-full"
                        onClick={onClickImage}
                        src={`${process.env.REACT_APP_IMAGE_URL}original${movies.backdrop_path}`}
                        alt=""
                    />
                </div>
            </motion.div>
        </>
    );
};

export default MoviesCard;
