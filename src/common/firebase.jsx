
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const firebaseConfig = {
apiKey: "AIzaSyCPpZXnk7GNuPTgy2YMHazyQBo9SmLP6mg",
authDomain: "muiu-c84e4.firebaseapp.com",
projectId: "muiu-c84e4",
storageBucket: "muiu-c84e4.appspot.com",
messagingSenderId: "1005896931582",
appId: "1:1005896931582:web:c2c403b5ed335c47b6adaf",
measurementId: "G-TKLL39PJWV"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//google auth
const provider  = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth,provider)
    .then((result) => {
        user = result.user;
    }).catch((error) => {
        console.log(error);
    })
    return user;
}