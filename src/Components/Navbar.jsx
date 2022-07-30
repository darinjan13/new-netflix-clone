import Logo from '../assets/logo.svg'
const Navbar = () => {
    return (
        <div className="border border-b-gray-300">
            <nav className="flex flex-wrap flex-row justify-between my-3 mx-16 xs:mx-2 sm:mx-16">
                <a href="/">
                    <img className="xs:h-5 sm:h-10 " src={Logo} alt="Netflix" />
                </a>
                <a href="/signin" className="font-medium text-md">Sign In</a>
            </nav>
        </div>
    );
}

export default Navbar;