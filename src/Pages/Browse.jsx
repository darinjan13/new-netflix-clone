// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { motion } from "framer-motion";
// import YouTube, { YouTubeProps } from 'react-youtube'

import { CustomRightArrow, CustomLeftArrow } from "../Components/CustomArrows";
import { fetchPopularMovies, fetchPopularTv } from "../redux/popularsSlice";
import { fetchDiscover } from "../redux/discoverSlice";
import { fetchTrending } from "../redux/trendingSlice";
import { useUpdateTitle } from "../Hooks/Hooks.jsx";

import Row from "../Components/Row";

import "./styles/swiper.css";
import "swiper/css";
import "swiper/css/free-mode";

const Browse = () => {
    const dispatch = useDispatch();
    const [trending, setTrending] = useState();
    const [kDrama, setKDrama] = useState();
    const [popularMovies, setPopularMovies] = useState();
    const [popularTv, setPopularTv] = useState();
    const [anime, setAnime] = useState();
    const [horror, setHorror] = useState();
    const [tagalog, setTagalog] = useState();

    useUpdateTitle("Home");

    // useEffect(() => {
    //     if (Object.keys(selectedMovie).length !== 0) {
    //         addToWatched(currentUser, selectedMovie);
    //     }
    //     // eslint-disable-next-line
    // }, [selectedMovie]);

    useEffect(() => {
        //Trending
        dispatch(fetchTrending({ media_type: "all", time_window: "week" }))
            .unwrap()
            .then((originalPromiseResult) => {
                setTrending(originalPromiseResult);
            });
        //Popular Movies
        dispatch(fetchPopularMovies())
            .unwrap()
            .then((originalPromiseResult) => {
                setPopularMovies(originalPromiseResult);
            });
        // Popular Tv
        dispatch(fetchPopularTv())
            .unwrap()
            .then((originalPromiseResult) => {
                setPopularTv(originalPromiseResult);
            });
        //KDrama
        dispatch(
            fetchDiscover({
                media_type: "tv",
                language: "ko",
                genre: 18,
            })
        )
            .unwrap()
            .then((originalPromiseResult) => {
                setKDrama(originalPromiseResult);
            });
        //Anime
        dispatch(
            fetchDiscover({
                media_type: "tv",
                language: "ja",
                genre: 16,
            })
        )
            .unwrap()
            .then((originalPromiseResult) => {
                setAnime(originalPromiseResult);
            });
        //Horror
        dispatch(
            fetchDiscover({
                media_type: "movie",
                language: "en",
                genre: 27,
            })
        )
            .unwrap()
            .then((originalPromiseResult) => {
                setHorror(originalPromiseResult);
            });
        dispatch(
            fetchDiscover({
                media_type: "movie",
                language: "tl",
                network: 213,
            })
        )
            .unwrap()
            .then((originalPromiseResult) => {
                setTagalog(originalPromiseResult);
            });
    }, [dispatch]);

    const renderSwiperSlides = (results) =>
        results &&
        results.slice(0, 20).map((result) => {
            return (
                <SwiperSlide key={result.id}>
                    <Row movies={result} />
                </SwiperSlide>
            );
        });
    const responsive = {
        1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
        },
    };

    const mx40 = "ml-[10px] lg:ml-[60px]";
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen max-h-w-full block bg-gray-900/80 overflow-hidden text-white pt-10 pb-20"
        >
            <>
                <div className="space-y-10">
                    <div className="w-full lg:h-[150px]">
                        <div className={mx40}>Trending Now</div>
                        <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(trending)}
                            <CustomLeftArrow />
                            <CustomRightArrow />
                        </Swiper>
                    </div>
                    <div className="w-full lg:h-[150px]">
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
                    <div className="w-full lg:h-[150px]">
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
                    <div className="w-full lg:h-[150px]">
                        <div className={mx40}>Filipino Movies</div>
                        <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(tagalog)}
                            <CustomLeftArrow />
                            <CustomRightArrow />
                        </Swiper>
                    </div>
                    <div className="w-full lg:h-[150px]">
                        <div className={mx40}>K-Drama</div>
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
                    <div className="w-full lg:h-[150px]">
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
                    <div className="w-full lg:h-[150px]">
                        <div className={mx40}>Horror Movies</div>
                        <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(horror)}
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
