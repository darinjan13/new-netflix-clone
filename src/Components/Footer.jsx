import MovieApiLogo from "../Assets/movieapilogo.svg"

const Footer = () => {
    return (
        <div className="z-0 bg-black flex justify-center items-center p-5">
            <a className="xs:h-full xs:w-full md:h-[10%] md:w-[10%]" href="https://developers.themoviedb.org/3/getting-started/introduction" target="_blank" rel="noreferrer">
                <img className="" src={MovieApiLogo} alt="" />
            </a>

            <h1 className="mx-10 text-white">This app uses THE MOVIE DATABASE API for primary data source.</h1>
        </div>
    );
}

export default Footer;