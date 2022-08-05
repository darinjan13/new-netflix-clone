import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaChevronDown } from "react-icons/fa";
import { VscAdd } from "react-icons/vsc";
import { useGenreConversion } from "../genreConfig";

const Row = ({ movies }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const convertedGenres = useGenreConversion(movies.genre_ids);

    const displayDetails = () => {
        if (movies.title !== undefined) {
            searchParams.set("type", "movies");
            searchParams.set("id", movies.id);
            setSearchParams(searchParams);
        } else {
            searchParams.set("type", "series");
            searchParams.set("id", movies.id);
            setSearchParams(searchParams);
        }
    };

    const [show, setShow] = useState(false);
    const onMouseEnter = () => {
        setShow(true);
    };
    const onMouseLeave = () => {
        setShow(false);
    };
    const defaultEasing = [0.6, -0.05, 0.01, 0.99];
    return (
        <>
            <motion.div
                key={movies.backdrop_path}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                transition={{ duration: 0.5, ease: defaultEasing }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={`${
                    splitLocation[1] === "search" &&
                    "mb-10 lg:mb-20 mx-1 lg:mx-2 "
                } lg:hover:-translate-y-10 lg:hover:z-40 lg:hover:relative lg:hover:shadow-2xl lg:hover:scale-125 transition-all duration-1000`}
            >
                <img
                    onClick={displayDetails}
                    className="lg:hidden block w-full h-full"
                    src={`${process.env.REACT_APP_IMAGE_URL}original${movies.poster_path}`}
                    alt=""
                />
                <img
                    className="hidden lg:block w-full h-full"
                    src={`${process.env.REACT_APP_IMAGE_URL}original${movies.backdrop_path}`}
                    alt=""
                />
                <span
                    className={`${
                        show === false ? "hidden" : "hidden lg:block"
                    } absolute cursor-default z-0 inset-x-0 -bottom-14 bg-gray-800 mx-auto py-2 px-6`}
                >
                    <div className="space-x-2">
                        <button className="rounded-full border p-1.5">
                            <FaPlay />
                        </button>
                        <button className="rounded-full border p-1.5">
                            <VscAdd />
                        </button>
                        <button
                            onClick={displayDetails}
                            className="rounded-full border p-1.5"
                        >
                            <FaChevronDown />
                        </button>
                    </div>
                    <div>
                        {convertedGenres?.map((genre, id) => (
                            <span
                                key={id}
                                className="after:px-[2px] after:content-['●'] last:after:hidden text-[9px]"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </span>
            </motion.div>
        </>
    );
};

export default Row;
