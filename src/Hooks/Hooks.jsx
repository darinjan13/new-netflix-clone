import { db } from "../firebase/firebase.config";
import {
    doc,
    getDoc,
    updateDoc,
    arrayRemove,
    arrayUnion,
} from "firebase/firestore";
import { useEffect } from "react";

const currentUser = JSON.parse(localStorage.getItem("user"));
export const addToWatched = async (selectedMovie) => {
    const continueWatching = doc(db, "continueWatching", currentUser.uid);
    const docSnap = await getDoc(continueWatching);
    if (docSnap.exists()) {
        if (docSnap.data().results.some(({ id }) => id === selectedMovie.id)) {
            await updateDoc(continueWatching, {
                results: arrayRemove(selectedMovie),
            });
        }
    }
    await updateDoc(continueWatching, {
        results: arrayUnion(selectedMovie),
    });
};

export const useUpdateTitle = (titleName) => {
    useEffect(() => {
        document.title = titleName;
    }, [titleName]);
};
