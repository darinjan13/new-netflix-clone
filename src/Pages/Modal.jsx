import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { VscChromeClose } from "react-icons/vsc";

import { fetchMovieDetails, fetchTvDetails } from "../redux/detailsSlice";
const Modal = () => {
    let [isOpen, setIsOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [details, setDetails] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        if (searchParams.get("id")) {
            if (searchParams.get("type") !== "series") {
                dispatch(fetchMovieDetails(searchParams.get("id")))
                    .unwrap()
                    .then((originalPromiseResult) => {
                        setDetails(originalPromiseResult);
                    });
            } else {
                dispatch(fetchTvDetails(searchParams.get("id")))
                    .unwrap()
                    .then((originalPromiseResult) => {
                        setDetails(originalPromiseResult);
                        console.log(originalPromiseResult);
                    });
            }
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [dispatch, searchParams]);

    const deleteParam = () => {
        if (searchParams) {
            searchParams.delete("id");
            searchParams.delete("type");
            setSearchParams(searchParams);
        }
    };
    const reducedDate = (date) => {
        return date?.slice(0, 4);
    };

    const closeModal = () => {
        deleteParam();
    };
    return (
        <>
            <Transition show={isOpen} as={Fragment}>
                <Dialog
                    onClose={closeModal}
                    className="relative z-50 rounded-lg"
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/70" />
                    </Transition.Child>
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center rounded-lg">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-500"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-500"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="mx-auto md:mt-10 h-full md:w-[90%] lg:w-[70%] bg-white">
                                    <div className="relative h-full w-full flex flex-col">
                                        <button
                                            className="bg-black/80 rounded-full p-2 absolute right-3 top-3 text-white"
                                            onClick={closeModal}
                                        >
                                            <VscChromeClose className="h-5 w-5" />
                                        </button>
                                        <img
                                            className="md:h-1/2"
                                            src={`${process.env.REACT_APP_IMAGE_URL}original${details?.backdrop_path}`}
                                            alt=""
                                        />
                                        <div className="w-full bg-neutral-800 text-white pb-10 mx-auto md:-mt-10">
                                            <h1 className="block font-bold text-xl text-center mb-5 md:mb-10">
                                                {details?.title !== null &&
                                                    details?.title}
                                                {details?.name !== null &&
                                                    details?.name}
                                            </h1>
                                            <div className="md:grid grid-flow-row-dense text-start grid-cols-3 gap-5 mx-5 space-y-5 md:space-y-0">
                                                <h1 className="col-span-2 pl-3 text-sm md:text-lg md:pl-10">
                                                    {details?.overview}
                                                </h1>
                                                <div>
                                                    <div className="flex flex-row flex-wrap">
                                                        <span>
                                                            Release Date:&nbsp;
                                                        </span>
                                                        <h1 className="font-bold">
                                                            {details?.release_date
                                                                ? reducedDate(
                                                                      details?.release_date
                                                                  )
                                                                : reducedDate(
                                                                      details?.first_air_date
                                                                  )}
                                                        </h1>
                                                    </div>
                                                    <div className="flex flex-row flex-wrap">
                                                        <span>Cast:&nbsp;</span>
                                                        {details?.credits?.cast
                                                            ?.slice(0, 5)
                                                            .map((result) => {
                                                                return (
                                                                    <h1
                                                                        key={
                                                                            result.id
                                                                        }
                                                                        className="font-bold lg:hover:underline after:pr-1 after:content-[','] last:after:hidden"
                                                                    >
                                                                        {
                                                                            result.original_name
                                                                        }
                                                                    </h1>
                                                                );
                                                            })}
                                                    </div>
                                                    <div className="text-center flex flex-row flex-wrap">
                                                        <span>
                                                            Genre:&nbsp;
                                                        </span>
                                                        {details?.genres?.map(
                                                            (result) => {
                                                                return (
                                                                    <h1
                                                                        key={
                                                                            result.id
                                                                        }
                                                                        className="font-bold lg:hover:underline after:pr-1 after:content-[','] last:after:hidden"
                                                                    >
                                                                        {
                                                                            result.name
                                                                        }
                                                                    </h1>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Modal;
