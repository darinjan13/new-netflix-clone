import { useSwiper } from "swiper/react";

export const CustomLeftArrow = () => {
    const swiper = useSwiper();
    return (
        <button
            onClick={() => swiper.slidePrev()}
            className="hidden absolute md:block opacity-25 hover:opacity-90 bg-gray-900/75 inset-y-0 left-0 my-auto h-full w-[60px] z-10"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
        </button>
    );
};

export const CustomRightArrow = () => {
    const swiper = useSwiper();
    return (
        <button
            onClick={() => swiper.slideNext()}
            className="hidden absolute md:block opacity-25 hover:opacity-90 bg-gray-900/75 inset-y-0 right-0 my-auto h-full w-[60px] z-10"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </button>
    );
};
