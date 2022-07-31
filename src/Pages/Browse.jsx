// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { motion } from "framer-motion";
// import YouTube, { YouTubeProps } from 'react-youtube'

import { CustomRightArrow, CustomLeftArrow } from "../Components/CustomArrows";
import { fetchPopularMovies, fetchPopularTv } from "../redux/popularsSlice";
import { fetchKDrama, fetchAnime } from "../redux/discoverSlice";
import { fetchNewReleases } from "../redux/newReleasesSlice";
import { addToWatched, useUpdateTitle } from "../Hooks/Hooks.jsx";

import Modal from "../Components/Modal";
import Row from "../Components/Row";

import "./styles/swiper.css";
import "swiper/css";
import "swiper/css/free-mode";

const Browse = () => {
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const [modal, setModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});
    const [kDrama, setKDrama] = useState();
    const [newRelease, setNewRelease] = useState();
    const [popularMovies, setPopularMovies] = useState();
    const [popularTv, setPopularTv] = useState();
    const [anime, setAnime] = useState();

    useUpdateTitle("Browse");

    useEffect(() => {
        if (Object.keys(selectedMovie).length !== 0) {
            addToWatched(currentUser, selectedMovie);
        }
        // eslint-disable-next-line
    }, [selectedMovie]);

    useEffect(() => {
        //Popular Movies
        dispatch(fetchPopularMovies())
            .unwrap()
            .then((originalPromiseResult) => {
                setPopularMovies(originalPromiseResult);
            });
        //New Release
        // dispatch(fetchNewReleases())
        //     .unwrap()
        //     .then((originalPromiseResult) => {
        //         setNewRelease(originalPromiseResult);
        //     });
        //Popular Tv
        dispatch(fetchPopularTv())
            .unwrap()
            .then((originalPromiseResult) => {
                setPopularTv(originalPromiseResult);
            });
        //KDrama
        dispatch(fetchKDrama())
            .unwrap()
            .then((originalPromiseResult) => {
                setKDrama(originalPromiseResult);
            });
        //Anime
        dispatch(fetchAnime())
            .unwrap()
            .then((originalPromiseResult) => {
                setAnime(originalPromiseResult);
            });
    }, [dispatch]);

    const renderSwiperSlides = (results) =>
        results?.slice(0, 20).map((result, index) => {
            return (
                <SwiperSlide key={index}>
                    <Row
                        movies={result}
                        setSelectedMovie={setSelectedMovie}
                        setModal={setModal}
                    />
                </SwiperSlide>
            );
        });
    const responsive = {
        1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
        },
    };
    const mx40 = "mx-[60px]";
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
            className="h-full w-full block overflow-hidden bg-gray-900/80 text-white py-5"
        >
            <>
                {selectedMovie && (
                    <Modal
                        setSelectedMovie={setSelectedMovie}
                        selectedMovie={selectedMovie}
                        modal={modal}
                        setModal={setModal}
                    />
                )}
                <div className="space-y-10">
                    <div>
                        <div className={mx40}>New Release</div>
                        {/* <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(newRelease)}
                            <CustomLeftArrow />
                            <CustomRightArrow />
                        </Swiper> */}
                    </div>
                    <div>
                        <div className={mx40}>Popular K-Drama</div>
                        <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(kDrama)}
                            <CustomLeftArrow />
                            <CustomRightArrow />
                        </Swiper>
                    </div>
                    <div>
                        <div className={mx40}>Popular Movies</div>
                        <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(popularMovies)}
                            <CustomLeftArrow />
                            <CustomRightArrow />
                        </Swiper>
                    </div>
                    <div>
                        <div className={mx40}>Popular TV Shows</div>
                        <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(popularTv)}
                            <CustomLeftArrow />
                            <CustomRightArrow />
                        </Swiper>
                    </div>
                    <div>
                        <div className={mx40}>Anime</div>
                        <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(anime)}
                            <CustomLeftArrow />
                            <CustomRightArrow />
                        </Swiper>
                    </div>
                </div>
            </>
            {/* {loadingTv === "Pending" &&
                loadingMovie === "Pending" &&
                anime !== undefined && (
                    <div className="flex h-screen w-screen items-center justify-center">
                        <div className="animate-spin w-40 h-40 border-8 border-sky-500 border-r-white rounded-full"></div>
                    </div>
                )} */}
            {/* {loadingTv === "Fulfilled" && loadingMovie === "Fulfilled" && (
                
            )} */}
        </motion.div>
    );
};

export default Browse;
