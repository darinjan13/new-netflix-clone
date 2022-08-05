import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { motion } from "framer-motion";
import { CustomRightArrow, CustomLeftArrow } from "../Components/CustomArrows";
import { fetchDiscover } from "../redux/discoverSlice";

import Row from "../Components/Row";

import "./styles/swiper.css";
import "swiper/css";
import "swiper/css/free-mode";
import { fetchTrending } from "../redux/trendingSlice";

const TvShows = () => {
    const dispatch = useDispatch();
    const [trending, setTrending] = useState();
    const [netflix, setNetflix] = useState();
    const [chinese, setChinese] = useState();
    const [philippines, setPhilippines] = useState();
    const [anime, setAnime] = useState();
    const media_type = "tv";

    useEffect(() => {
        //Trending
        dispatch(
            fetchTrending({
                media_type: media_type,
                time_window: "week",
            })
        )
            .unwrap()
            .then((originalPromiseResult) => {
                setTrending(originalPromiseResult);
            });
        //Netflix
        dispatch(
            fetchDiscover({
                media_type: media_type,
                language: "en",
                network: 213,
            })
        )
            .unwrap()
            .then((originalPromiseResult) => {
                setNetflix(originalPromiseResult);
            });
        //chinese Language
        dispatch(
            fetchDiscover({
                media_type: media_type,
                language: "zh",
            })
        )
            .unwrap()
            .then((originalPromiseResult) => {
                setChinese(originalPromiseResult);
            });
        //chinese Language
        dispatch(
            fetchDiscover({
                media_type: media_type,
                language: "tl",
                watch_region: "PH",
                watch_provider: 8,
            })
        )
            .unwrap()
            .then((originalPromiseResult) => {
                setPhilippines(originalPromiseResult);
            });
        //Anime
        dispatch(
            fetchDiscover({
                media_type: media_type,
                language: "ja",
                genre: 16,
            })
        )
            .unwrap()
            .then((originalPromiseResult) => {
                setAnime(originalPromiseResult);
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
    const mx40 = "ml-[10px] md:ml-[60px]";
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-full block bg-gray-900/80 overflow-hidden text-white pt-10 pb-20"
        >
            <>
                <div className="space-y-10">
                    <div className="w-full h-[150px]">
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
                    <div className="w-full h-[150px]">
                        <div className={mx40}>Only on Netflix</div>
                        <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(netflix)}
                            <CustomLeftArrow />
                            <CustomRightArrow />
                        </Swiper>
                    </div>
                    <div className="w-full h-[150px]">
                        <div className={mx40}>Chinese Tv Shows</div>
                        <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(chinese)}
                            <CustomLeftArrow />
                            <CustomRightArrow />
                        </Swiper>
                    </div>
                    <div className="w-full h-[150px]">
                        <div className={mx40}>Filipino Tv Shows</div>
                        <Swiper
                            freeMode
                            speed={1000}
                            slidesPerView={4}
                            spaceBetween={5}
                            loop
                            breakpoints={responsive}
                            module={[FreeMode]}
                        >
                            {renderSwiperSlides(philippines)}
                            <CustomLeftArrow />
                            <CustomRightArrow />
                        </Swiper>
                    </div>
                    <div className="w-full h-[150px]">
                        <div className={mx40}>Anime Series</div>
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
        </motion.div>
    );
};

export default TvShows;
