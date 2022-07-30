import Carousel from "react-multi-carousel";
import MovieCards from "../Components/MovieCard";
import { CustomRightArrow, CustomLeftArrow } from "../Components/CustomArrows";
const Carousels = ({ movies, setSelectedMovie, setModal }) => {
    // const [pageSize, setPageSize] = useState(10);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
        },
    };
    const paginate = (array, page_size, page_number) => {
        return array.slice(
            (page_number - 1) * page_size,
            page_number * page_size
        );
    };
    const renderMovies = () =>
        paginate(movies, 20, 1).map((movie, index) => {
            return (
                <MovieCards
                    movies={movie}
                    key={index}
                    setSelectedMovie={setSelectedMovie}
                    setModal={setModal}
                />
            );
        });

    return (
        <>
            <Carousel
                responsive={responsive}
                draggable
                infinite
                slidesToSlide={5}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                centerMode
            >
                {renderMovies()}
            </Carousel>
        </>
    );
};

export default Carousels;
