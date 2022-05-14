import {db, auth} from "../firebase.js";
import Login from "../pages/login";
import Loading from '../components/Loading';
import {useEffect} from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import { doc, setDoc, serverTimestamp, getFirestore } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		if(user) {
			const userRef = doc(db, "users", user.uid);
			const userData = {
				email: user.email,
				photoURL: user.photoURL,
				lastSeen: serverTimestamp()
			};
			setDoc(userRef, {userData}, {merge: true})
				.then(() => {
					console.log("A New User Logged In!");
			})
				.catch((error) => {
					console.error('Error writing document: ', error);
			})
		}
	}, [user]);

	if (loading) return <Loading />
	if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
