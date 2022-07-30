import { createContext, useEffect, useContext } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const userAuthContext = createContext();

export const UserAuthContextProvider = ({children}) => {
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            localStorage.setItem('user', JSON.stringify(currentUser));
        });
        
        return unsubscribe;
    },[])
    return (
        <userAuthContext.Provider value={{ signUp, signIn}}>
            {children}
        </userAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    return useContext(userAuthContext);
}