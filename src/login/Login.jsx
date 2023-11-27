import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase.init";
import { useState } from "react";



const Login = () => {
    const [user, setUser] = useState('');
    const auth = getAuth(app);
    console.log(app);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSingIn = () => {
        // console.log("Google mama is coming")
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setUser(loggedUser);

            })
            .catch(error => {
                console.error(error)
            })
    }

    const handleGithubSignIn = () =>{
        signInWithPopup(auth,githubProvider)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        })
        .catch(error =>{
            console.error(error);
        })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            {/* user ? logout  : sign in */}
            {user ? <button onClick={handleSignOut} >Sign Out</button> :
                <>
                    <button onClick={handleGoogleSingIn} >Google Login</button>
                    <button onClick={handleGithubSignIn}>Github Login</button>
                </>
            }
            {user && <div>
                <h2>User : {user.displayName}</h2>
                <h2>User : {user.email}</h2>
                <img src={user.photoURL} alt="" />
            </div>
            }
        </div>
    );
};

export default Login;