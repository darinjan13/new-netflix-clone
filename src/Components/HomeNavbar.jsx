import { useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import {
    useNavigate,
    createSearchParams,
    Link,
    useLocation,
} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import Logo from "../Assets/logo.svg";

const HomeNavbar = () => {
    // const [menuOpen, setMenuOpen] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [navbarColor, setNavbarColor] = useState("bg-black");
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavbarColor("transparent")
            } else {
                setNavbarColor("bg-black")
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (splitLocation[1] !== "search") {
            setKeyword("");
        }
    }, [splitLocation]);

    const logout = async () => {
        setButtonLoading(true);
        setButtonDisable(true);

        try {
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeywordInput = (e) => {
        const { value } = e.target;
        setKeyword(value);
        if (value.length > 0) {
            navigate({
                pathname: `/search`,
                search: createSearchParams({
                    q: value,
                }).toString(),
            });
        } else {
            navigate("/browse");
        }
    };

    const renderLinks = () => {
        return (
            <>
                <Link
                    className={`${
                        splitLocation[1] === "browse" ? "bg-red-600" : ""
                    } rounded-md text-white font-semibold hover:bg-red-600 p-1 xl:p-2`}
                    to="/browse"
                >
                    Home
                </Link>
                <Link
                    className={`${
                        splitLocation[1] === "tv" ? "bg-red-600" : ""
                    } rounded-md text-white font-semibold hover:bg-red-600 p-1 xl:p-2`}
                    to="/tv"
                >
                    TV Shows
                </Link>
                <Link
                    className={`${
                        splitLocation[1] === "movie"
                            ? "bg-red-600"
                            : ""
                    } rounded-md text-white font-semibold hover:bg-red-600 p-1 xl:p-2`}
                    to="/movie"
                >
                    Movies
                </Link>
            </>
        );
    };

    return (
        <nav className={`sticky z-50 top-0 ${navbarColor} md:px-10`}>
            <div className="grid grid-cols-2 md:justify-between items-center w-full p-2 xl:p-4">
                <div className="flex flex-row items-center space-x-2 md:space-x-10">
                    <img className="h-3 md:h-5" src={Logo} alt="Netflix" />
                    <Popover className="block lg:hidden text-white">
                        <Popover.Button className="text-white">
                            Browse
                        </Popover.Button>

                        <Popover.Panel className="absolute z-50">
                            <div className="grid">
                                <Link to="/browse">Home</Link>
                                <Link to="/browse">TV Shows</Link>
                                <Link to="/browse">Movies</Link>
                                <Link to="/browse">Home</Link>
                            </div>
                        </Popover.Panel>
                    </Popover>
                    <div className="hidden lg:block">{renderLinks()}</div>
                </div>

                <div className="flex flex-row md:justify-end items-center space-x-2 md:space-x-10">
                    <input
                        value={keyword}
                        onChange={handleKeywordInput}
                        type="search"
                        className="bg-slate-700 border-white border focus:border-white focus:border-2 w-[60%] m-0 px-1 lg:px-3 py-1 lg:py-1.5"
                        placeholder="Search"
                        name="search"
                        required
                    />
                    <button
                        onClick={logout}
                        className=" rounded-md hover:bg-red-600 px-2 lg:px-5 py-1 lg:py-2"
                        disabled={buttonDisable}
                    >
                        {buttonLoading ? (
                            <div className="animate-spin p-2 border-2 border-sky-500 border-r-white rounded-full"></div>
                        ) : (
                            <div className="text-white">Logout</div>
                        )}
                    </button>
                </div>
            </div>
            {/* <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} buttonLoading={buttonLoading} logout={logout} splitLocation={splitLocation} search={search} />
            {menuOpen &&
                <MobileMenu>
                    <form className="flex flex-row" onSubmit={search} method="get">
                        <input type="search" className="text-black rounded-l-lg m-0 focus:outline-none px-3 py-1.5" placeholder="Search" name="search" required />
                        <button className="px-6 py-2.5 text-white font-medium  rounded-r-lg shadow-md bg-red-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0" type="submit">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                            </svg>
                        </button>
                    </form>
                    <Link className={`${splitLocation[1] === "trending" ? "bg-red-600" : ""} rounded-md text-white font-semibold hover:bg-red-600 p-1 xl:p-2`} to="/trending">Trending</Link>
                    <Link className={`${splitLocation[1] === "newrelease" ? "bg-red-600" : ""} rounded-md text-white font-semibold hover:bg-red-600 p-1 xl:p-2`} to="/newrelease">New Release</Link>
                    <Link className={`${splitLocation[1] === "continuewatching" ? "bg-red-600" : ""} rounded-md text-white font-semibold hover:bg-red-600 p-1 xl:p-2`} to="/continuewatching">Continue Watching</Link>
                    <button onClick={logout} className="bg-red-900 rounded-full p-3" disabled={buttonDisable} >
                        {buttonLoading ? <div className="animate-spin w-5 h-5 border-2 border-sky-500 border-r-white rounded-full mx-auto "></div> : <div className='text-white'>Logout</div>}
                    </button>
                </MobileMenu>} */}
        </nav>
    );
};

// const Navbar = ({ menuOpen, setMenuOpen, buttonLoading, logout, buttonDisable, splitLocation, search }) => (
//     <div className="flex justify-between w-full p-2 xl:p-4">
//         <div className="flex items-center">
//             <img className="h-5 lg:h-10" src={Logo} alt="Netflix" />
//         </div>

//         <nav className="hidden items-center md:flex flex-row lg:space-x-2">
//             <form className="flex items-center" onSubmit={search} method="get">
//                 <input type="search" className="text-black rounded-l-lg border-0 m-0 outline-none px-3 py-1.5" placeholder="Search" name="search" required />
//                 <button className="px-4 py-2.5 text-white font-medium  rounded-r-lg shadow-md bg-red-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0" type="submit">
//                     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                         <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
//                     </svg>
//                 </button>
//             </form>
//             <div>
//                 <Link className={`${splitLocation[1] === "trending" ? "bg-red-600" : ""} rounded-md text-white font-semibold hover:bg-red-600 p-1 xl:p-2`} to="/trending">Trending</Link>
//             </div>
//             <div>
//                 <Link className={`${splitLocation[1] === "newrelease" ? "bg-red-600" : ""} rounded-md text-white font-semibold hover:bg-red-600 p-1 xl:p-2`} to="/newrelease">New Release</Link>
//             </div>
//             <div>
//                 <Link className={`${splitLocation[1] === "continuewatching" ? "bg-red-600" : ""} rounded-md text-white font-semibold hover:bg-red-600 p-1 xl:p-2`} to="/continuewatching">Continue Watching</Link>
//             </div>
//             <button onClick={logout} className=" rounded-md hover:bg-red-600 px-5 py-2" disabled={buttonDisable} >
//                 {buttonLoading ? <div className="animate-spin p-2 border-2 border-sky-500 border-r-white rounded-full"></div> : <div className='text-white'>Logout</div>}
//             </button>
//         </nav>
//         <button type="button" aria-label="Toggle mobile menu" onClick={() => setMenuOpen(!menuOpen)} className="border border-white rounded md:hidden focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"><MenuAlt4Svg menuOpen={menuOpen} /></button>
//     </div>
// );

// const MobileMenu = ({ children }) => (
//     <nav className="p-4 flex flex-col space-y-3 md:hidden text-center">
//         {children}
//     </nav>
// );

// const MenuAlt4Svg = ({ menuOpen }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" className={`text-white transition duration-100 ease h-8 w-8 ${menuOpen ? 'transform rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
//         <path fillRule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
//     </svg>
// );

export default HomeNavbar;
