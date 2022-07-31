import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { fetchSearch } from "../redux/searchSlice";
import { useUpdateTitle } from "../Hooks/Hooks";

import Modal from "../Components/Modal";
import MoviesCard from "../Components/MovieCard";

const Search = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [modal, setModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});
    const [results, setResults] = useState();
    const [page, setPage] = useState(2);

    useUpdateTitle("Search");

    useEffect(() => {
        dispatch(fetchSearch({ keyword: searchParams.get("q"), page: page }))
            .unwrap()
            .then((originalPromiseResult) => {
                setResults(originalPromiseResult);
            });
    }, [searchParams, dispatch, page]);

    useEffect(() => {
        setPage(2);
    }, [searchParams]);

    return (
        <motion.div
            // variants={staggerHalf}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
            className="bg-gray-900/90 overflow-hidden min-h-screen"
        >
            {selectedMovie && (
                <Modal
                    setSelectedMovie={setSelectedMovie}
                    selectedMovie={selectedMovie}
                    modal={modal}
                    setModal={setModal}
                />
            )}
            <button onClick={() => setPage(page + 1)}>Load More</button>
            {results !== null && (
                <div className="box-border py-10 px-[10px] md:px-[60px]">
                    <motion.div
                        // key={searchParams}
                        // initial={{opacity: 0}}
                        // animate={{opacity: 1}}
                        // exit={{opacity: 0}}
                        // transition={{duration: 1}}
                        className="grid grid-cols-5 items-center text-white"
                    >
                        {results?.map((result, id) => {
                            return (
                                <MoviesCard
                                    key={id}
                                    movies={result}
                                    setSelectedMovie={setSelectedMovie}
                                    setModal={setModal}
                                />
                            );
                        })}
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Search;
