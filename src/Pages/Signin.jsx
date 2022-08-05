import Logo from "../Assets/logo.svg";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Signin = () => {
    const navigate = useNavigate();
    const { signIn } = useUserAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        document.title = "Sign in";
    }, []);
    useEffect(() => {
        if (user) {
            navigate("/browse");
        }
        // eslint-disable-next-line
    }, [user]);

    const login = async (e) => {
        e.preventDefault();
        setButtonLoading(true);
        setButtonDisable(true);
        try {
            await signIn(email, password);
            window.location.href = "/browse"
        } catch (error) {
            setError(true);
            setButtonLoading(false);
            setButtonDisable(false);
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
                    <form onSubmit={login} className="flex flex-col">
                        <h1 className="text-white text-4xl font-bold mb-5">
                            Sign In
                        </h1>
                        <div
                            className={`${
                                error ? "block" : "hidden"
                            } text-white text-sm bg-[#e87c03] rounded-lg py-2 px-3 mb-4`}
                            role="alert"
                        >
                            Sorry, we can't find an account with this email
                            address. Please try again or{" "}
                            <a className="underline" href="/signup">
                                create a new account
                            </a>
                            .
                        </div>
                        <input
                            className="text-white rounded-lg bg-[#333] mb-5"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            className="text-white rounded-lg bg-[#333] border-0 mb-10"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <button
                            type="submit"
                            className="text-white text-center font-bold bg-red-600 rounded-lg p-4"
                            disabled={buttonDisable}
                        >
                            {buttonLoading ? (
                                <div className="animate-spin mx-auto w-5 h-5 border-2 border-sky-500 border-r-white rounded-full mx-auto "></div>
                            ) : (
                                <div className="text-white">Sign In</div>
                            )}
                        </button>
                        <h1 className="text-white mt-2">
                            No account?{" "}
                            <Link className="underline" to="/signup">
                                Register now.
                            </Link>
                        </h1>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Signin;
