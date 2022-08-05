import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { fetchSearch } from "../redux/searchSlice";
import { useUpdateTitle } from "../Hooks/Hooks";

import Row from "../Components/Row";
import { useCallback } from "react";

const Search = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState();
    const [page, setPage] = useState(2);
    const search = searchParams.get("q");

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
    }, [search]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        )
            return;
        setPage(page + 1);
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
            className="bg-gray-900/90 overflow-hidden min-h-screen"
        >
            {results !== null && (
                <div className="box-border py-10 px-[10px] md:px-[60px]">
                    <div className="grid grid-cols-5 items-center text-white">
                        {results?.map((result, index) => {
                            return <Row key={index} movies={result} />;
                        })}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Search;
