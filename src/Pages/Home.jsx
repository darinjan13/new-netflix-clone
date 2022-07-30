

// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Browse from "./Browse"
import Footer from "../Components/Footer";

const Home = () => {
    // const dispatch = useDispatch();
    // const popularMovies = useSelector(getPopularMovies);
    // const pageNumber = useRef(1);
    // const loading = useSelector(getLoading)
    // const currentUser = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        document.title = "Home"
    }, [])

    return (
        <>
            <div className="bg-gray-900/80 text-white">
                <div className="">
                        <Browse />
                </div>
                <Footer />
            </div>
        </>
        // <div className="bg-gray-900/80 text-white">
        //     <HomeNavbar />
        //     {loading === "Pending" && (
        //         <div className="flex h-screen items-center justify-center">
        //             <div className="animate-spin w-40 h-40 border-8 border-sky-500 border-r-white rounded-full">
        //             </div>
        //         </div>
        //     )}

        //     {loading === "Fulfilled" && (
        //         <>
        //             {selectedMovie && <Modal selectedMovie={selectedMovie} modal={modal} setModal={setModal} />}
        //             <div className="box-border py-5">
        //                 <h1 className="text-4xl">Trending Now</h1>
        //                 <div className="flex flex-wrap">
        //                     <div className="flex flex-row w-full p-3">
        //                         <button onClick={() => { console.log(pageNumber.current) }} >MOVIES</button>
        //                     </div>
        //                 </div>
        //                 <div className="">
        //                     <Populars/>
        //                 </div>
        //             </div>
        //             <Footer />
        //         </>
        //     )}
        // </div >
    );
}

export default Home;