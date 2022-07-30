import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../Assets/logo.svg'
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/authSlice'
import Footer from '../Components/Footer';


const HomePage = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user'));
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        document.title = "Home"
    }, [])
    useEffect(() => {
        if (user) {
            navigate("/browse");
        } else {
            setLoading(true)
        }
        // eslint-disable-next-line
    }, [user])
    const renderLoading = () => (
        <div className="flex h-screen items-center justify-center">
            <div className="animate-spin w-40 h-40 border-8 border-sky-500 border-r-white rounded-full">
            </div>
        </div>
    )
    function toSignin() {
        navigate("/signin");
    }

    function onSubmit(e) {
        e.preventDefault();
        dispatch(authActions.setEmail(email));
        setButtonLoading(true);
        navigate("/signup");
    }
    return (
        <>
            {user === null && loading ?
                <>
                    <div className="bg-bgImage bg-cover bg-center">
                        <div className="bg-gradient-to-b from-[#000000]/95 via-[#000000]/30 to-[#000000]/95">
                            <nav className="flex flex-wrap flex-row justify-between">
                                <img className="h-10 xs:h-5 sm:h-10 my-6 mx-16 xs:mx-5 sm:mx-16" src={Logo} alt="Netflix" />
                                <button onClick={toSignin} className="bg-[#e50914] rounded-md text-white px-3 sm:h-10 my-6 mx-16 xs:mx-5 sm:mx-16">Sign In</button>
                            </nav>
                            <div className="grid justify-items-center content-center">
                                <div className="text-center lg:w-[60%] pt-32 xs:pt-10 sm:pt-32 px-40 xs:px-14 sm:px-40">
                                    <h1 className="text-white text-5xl font-bold my-[1rem] xs:text-3xl sm:text-5xl">Unlimited movies, TV<br></br> shows, and more.</h1>
                                    <h2 className="text-white text-2xl xs:text-lg sm:text-2xl mx-auto">Watch anywhere. Cancel anytime.</h2>
                                </div>

                                <div className="text-center mt-8 xs:my-3 sm:mt-8 xs:px-10 sm:px-0">
                                    <h3 className="text-white text-1xl xs:text-lg sm:text-1xl px-auto">Ready to watch? Enter your email to create or restart your membership.</h3>
                                </div>

                                <form onSubmit={onSubmit} className="flex flex-row flex-wrap justify-center items-center w-full mb-36">
                                    <input required type="email" onChange={(e) => { setEmail(e.target.value) }} className="from-input py-4 w-2/5 xs:w-full sm:w-2/5 xs:mx-5 sm:mx-0" placeholder="Email Address" />
                                    <button className="bg-[#e50914] text-white px-4 xs:py-2 sm:py-4 xs:my-5 sm:my-0 xs:mx-auto sm:mx-0">
                                        {buttonLoading ? <div className="animate-spin mx-auto w-5 h-5 border-2 border-sky-500 border-r-white rounded-full mx-auto "></div> : <div className='text-white'>Get Started &gt;</div>}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </> : renderLoading()}
        </>
    );
}
export default HomePage;