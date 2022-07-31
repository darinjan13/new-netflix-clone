import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchMovieDetails, fetchTvDetails } from "../redux/detailsSlice";

const Row = ({
    movies,
    setSelectedMovie,
    setModal,
    removeContinueWatching,
}) => {
    // const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    // const navigate = useNavigate()
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const onClickImage = () => {
        if (movies.title !== undefined) {
            dispatch(fetchMovieDetails(movies.id))
                .unwrap()
                .then((originalPromiseResult) => {
                    console.log(originalPromiseResult);
                    setSelectedMovie(originalPromiseResult);
                });
            // navigate({
            //     pathname: `/browse`,
            //     search: createSearchParams({
            //         id: 1,
            //     }).toString(),
            // });
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

    const [show, setShow] = useState(false);
    const onMouseEnter = () => {
        setShow(true);
    };
    const onMouseLeave = () => {
        setShow(false);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.5,
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={`${
                    splitLocation[1] === "search" &&
                    "mb-10 md:mb-20 mx-1 md:mx-2 "
                } md:hover:z-40 relative md:hover:shadow-2xl md:hover:scale-150 transition-all duration-1000`}
            >
                <img
                    className="w-full h-full"
                    onClick={onClickImage}
                    src={`${process.env.REACT_APP_IMAGE_URL}original${movies.backdrop_path}`}
                    alt=""
                />
                <span
                    className={`${
                        show === false ? "opacity-0" : "opacity-100"
                    } hidden md:block bg-slate-900/70 absolute inset-x-0 bottom-0 transition-all duration-1000`}
                >
                    <h1 className="text-center inline-block w-auto">
                        {movies.title !== undefined
                            ? movies.title
                            : movies.name}
                    </h1>
                    <h1 className="text-center">
                        {movies.release_date !== undefined
                            ? movies.release_date?.slice(0, 4)
                            : movies.first_air_date?.slice(0, 4)}
                    </h1>
                </span>
            </motion.div>
        </>
    );
};

export default Row;
