// import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovieDetails, fetchTvDetails } from "../redux/detailsSlice";

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
            <div className="md:hover:scale-125 md:hover:z-10 transition-all duration-1000 mb-20 mx-2">
                <div onClick={onClickImage}>
                    {/* <button onClick={onClickRemove} className={`${splitLocation[1] === "continuewatching" ? "relative" : "hidden"}`}>X</button> */}
                    <img
                        src={`${process.env.REACT_APP_IMAGE_URL}original${movies.backdrop_path}`}
                        alt=""
                    />
                </div>
            </div>
        </>
    );
};

export default MoviesCard;
