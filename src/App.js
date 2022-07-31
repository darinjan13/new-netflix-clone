import React from "react";
import { UserAuthContextProvider } from "./context/UserAuthContext.js";

import HomeNavbar from "./Components/HomeNavbar.jsx";
import Footer from "./Components/Footer.jsx";
import AnimatedRoutes from "./Components/AnimatedRoutes.jsx";

function App() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    return (
        <div>
            {currentUser && (
                <>
                    <HomeNavbar />
                </>
            )}
            <UserAuthContextProvider>
                <AnimatedRoutes />
            </UserAuthContextProvider>
            {currentUser && (
                <>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default App;
