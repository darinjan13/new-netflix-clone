import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Logo from "../Assets/logo.svg";
import { useUserAuth } from "../context/UserAuthContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useSelector } from "react-redux";

const Signin = () => {
    const navigate = useNavigate();

    const { signUp } = useUserAuth();
    const reduxEmail = useSelector((state) => state.auth.email);

    const [email, setEmail] = useState("");
    // eslint-disable-next-line
    const [reload, setReload] = useState();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSignInButton, setShowSignInButton] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const addDocToFirebase = async () => {
        await setDoc(doc(db, "continueWatching", user.uid), { results: [] });
    };
    useEffect(() => {
        document.title = "Sign up";
    }, []);
    useEffect(() => {
        if (reduxEmail) {
            setEmail(reduxEmail);
        }
        if (user) {
            addDocToFirebase();
            navigate("/browse");
        }
        // eslint-disable-next-line
    }, [user]);
    const register = async (e) => {
        e.preventDefault();
        setButtonLoading(true);
        setButtonDisable(true);
        try {
            await signUp(email, password);
            setReload("Reload");
        } catch (error) {
            switch (error.code) {
                case "auth/weak-password":
                    setErrorMessage(
                        "Password should be at least 6 characters."
                    );
                    setError(true);
                    setButtonLoading(false);
                    setButtonDisable(false);
                    break;
                case "auth/email-already-in-use":
                    setErrorMessage(
                        "The provided email is already in use by an existing user. Each user must have a unique email. "
                    );
                    setError(true);
                    setShowSignInButton(true);
                    setButtonLoading(false);
                    setButtonDisable(false);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className="h-screen bg-bgImage bg-cover">
            <div className="h-full bg-gray-900/60">
                <div className="flex flex-wrap xs:bg-black md:bg-gray-900/50 lg:mb-10">
                    <a href="/">
                        <img
                            className="h-10 xs:h-5 sm:h-10 my-6 mx-16 xs:mx-5 sm:mx-16"
                            src={Logo}
                            alt="Netflix"
                        />
                    </a>
                </div>
                <div className="xs:h-full lg:h-max xs:w-full lg:w-[450px] bg-black xs:p-3 md:p-20 md:mx-auto">
                    <form onSubmit={register} className="flex flex-col">
                        <h1 className="text-white text-4xl font-bold mb-5">
                            Sign Up
                        </h1>
                        <div
                            className={`${
                                error ? "block" : "hidden"
                            } text-white text-sm bg-[#e87c03] rounded-lg py-2 px-3 mb-4`}
                            role="alert"
                        >
                            {errorMessage}
                            {showSignInButton && (
                                <>
                                    {" "}
                                    <a className="underline" href="/">
                                        Sign in
                                    </a>{" "}
                                    instead.
                                </>
                            )}
                        </div>
                        <input
                            defaultValue={reduxEmail}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="text-white rounded-lg bg-[#333] mb-5"
                            type="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className="text-white rounded-lg bg-[#333] border-0 mb-10"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <button
                            className="text-white text-center font-bold bg-red-600 rounded-lg p-4"
                            disabled={buttonDisable}
                        >
                            {buttonLoading ? (
                                <div className="animate-spin mx-auto w-5 h-5 border-2 border-sky-500 border-r-white rounded-full mx-auto "></div>
                            ) : (
                                <div className="text-white">Sign Up</div>
                            )}
                        </button>
                        <h1 className="text-white mt-2">
                            Already have an acount?{" "}
                            <Link className="underline" to="/signin">
                                Log in here.
                            </Link>
                        </h1>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Signin;
