import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ selectedMovie, modal, setModal }) => {
    let details = selectedMovie;
    const closeModal = () => {
        details = null;
        setModal(false);
    };

    return (
        <>
            <Transition show={modal} as={Fragment}>
                <Dialog onClose={closeModal} className="relative z-50">
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
                        <div className="flex min-h-full items-center justify-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-500"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-500"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="mx-auto mt-10 h-full w-[70%] rounded bg-white">
                                    <div className="relative h-full w-full flex flex-col">
                                        <button
                                            className="absolute right-0 top-0 text-white"
                                            onClick={closeModal}
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                        <img
                                            className="md:h-1/2"
                                            src={`${process.env.REACT_APP_IMAGE_URL}original${details?.backdrop_path}`}
                                            alt=""
                                        />
                                        <div className="w-full bg-zinc-900 text-white pb-10 mx-auto md:-mt-20">
                                            <h1 className="block font-bold text-xl text-center mb-5 md:mb-10">
                                                {details?.title !== null &&
                                                    details?.title}
                                                {details?.name !==
                                                    null &&
                                                    details?.name}
                                            </h1>
                                            <div className="md:grid grid-flow-row-dense text-start grid-cols-3 gap-5 mx-5 space-y-5 md:space-y-0">
                                                <h1 className="col-span-2 pl-3 text-sm md:text-lg md:pl-10">
                                                    {details?.overview}
                                                </h1>
                                                <div>
                                                    <div className="flex flex-row flex-wrap">
                                                        <h1>Cast:&nbsp;</h1>
                                                        {details?.credits?.cast
                                                            ?.slice(0, 5)
                                                            .map((id) => {
                                                                return (
                                                                    <>
                                                                        <h1 className="lg:hover:underline">
                                                                            {
                                                                                id.original_name
                                                                            }
                                                                        </h1>
                                                                        &nbsp;
                                                                    </>
                                                                );
                                                            })}
                                                    </div>
                                                    <div className="text-center flex flex-row flex-wrap">
                                                        <h1 className="m-1">
                                                            Genre:&nbsp;
                                                        </h1>
                                                        {details?.genres?.map(
                                                            (id) => {
                                                                return (
                                                                    <>
                                                                        <h1 className="rounded-full border p-1">
                                                                            {
                                                                                id.name
                                                                            }
                                                                        </h1>
                                                                        &nbsp;
                                                                    </>
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
