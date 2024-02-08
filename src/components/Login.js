import React, { useState, useEffect} from "react";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from '../admin/firebase.js';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
    const [state, updateState] = useState('login');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });
    }, [])

    function clickSignUp() {
        let loginbox = document.querySelector('.Login .login-box');
        let accounttxt = document.querySelector('.Login .login-box .account-txt');

        if (loginbox.classList.contains('sign')) {
            // email.placeholder = 'email or username';
            accounttxt.innerHTML = "need an account?";
            updateState('login');
        }
        else {
            // email.placeholder = 'email';
            accounttxt.innerHTML = "have an account?";
            updateState('signup')
        }
        setEmail('');
        setPassword('');
        setUserName('');
        loginbox.classList.toggle('sign');
        setErrorMsg('')
    }

    const loading = () => {
        const button = document.querySelector('.login-box .login-btn');
        const spinner = document.querySelector('.login-box .spinner');
        button.classList.toggle('loading');
        spinner.classList.toggle('loading');
    }

    const signUp = async (e) => {
        e.preventDefault()
        loading();
        if(!username) {
            setErrorMsg('You need to provide a username.');
            loading();
        }
        else if(!email) {
            setErrorMsg('You need to provide a email.');
            loading();
        }
        else if(!password) {
            setErrorMsg('You need to provide a password.');
            loading();
        }
        else if(password.length < 8) {
            setErrorMsg('Password must be at least 8 characters long.');
            loading();
        }
        else if(!/^[A-Za-z0-9 -]*$/.test(username)) {
            setErrorMsg('Username can only contain letters or numbers.');
            loading();
        }
        else if(username.length > 16) {
            setErrorMsg('Username can only be 16 characters long.');
            loading();
        }
        else {
            try {
                const docSnap = await getDoc(doc(db, "usernames", username));
                if(docSnap.exists()) {
                    setErrorMsg('This username is already taken.');
                    loading();
                }
                else {
                    const res = await createUserWithEmailAndPassword(auth, email, password)
                    const user = res.user;
                    // user.sendEmailVerification();
                    let yourDate = new Date();
                    const date =  yourDate.toISOString().split('T')[0];
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        username,
                        img: '',
                        friends: [],
                        artists: [],
                        friendrequestreceived: [],
                        score: 0
                    });
                    await setDoc(doc(db, "usernames", username), {
                        uid: user.uid
                    })
                    // auth.signOut();
                    // navigate("/")
                }
            }
            catch (error) {
                const errorCode = error.code;
                if(errorCode === 'auth/email-already-in-use') {
                    setErrorMsg('This email already has an account. Log in or try another email.');
                }
                else if(errorCode === 'auth/invalid-email') {
                    setErrorMsg('The email you provided is invalid.');
                }
                else {
                    setErrorMsg('There was an error. Please try again.');
                }
                loading();
            }
        }
    }

    const logIn = async (e) => {
        e.preventDefault();
        loading();
        if(!email) {
            setErrorMsg('You need to provide a email.');
            loading();
        }
        else if(!password) {
            setErrorMsg('You need to provide a password.');
            loading();
        }
        else {
            try {
                const res = await signInWithEmailAndPassword(auth, email, password)
                const user = res.user;
                navigate("/");
            }
            catch(error) {
                const errorCode = error.code;
                if(errorCode === 'auth/invalid-email') {
                    setErrorMsg('The email you provided is invalid.');
                }
                else if(errorCode === 'auth/wrong-password') {
                    setErrorMsg('Incorrect password. We can help you recover your password.');
                }
                else if(errorCode === 'auth/user-not-found') {
                    setErrorMsg('We can\'t find an account with this email address. Make sure your email is correct.');
                }
                else {
                    setErrorMsg('There was an error. Please try again.');
                }
                loading();
            }
        }
       
    }

    return(
        <div className="Login">
            <div className="login-box">
                <div className="title">
                    <span>
                        <i className="fa-solid fa-headphones-simple"></i>
                        <p className="logo-name">overground</p>
                    </span>
                </div>
                <form onSubmit={state === 'signup' ? signUp : logIn}>
                    <input 
                        type="name" 
                        className="login-info username" 
                        placeholder="username" 
                        autoComplete="given-name" 
                        value={username}
                        onChange={(e) => {setUserName(e.target.value); setErrorMsg('')}}
                    />
                    <input 
                        className="login-info email" 
                        placeholder="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value); setErrorMsg('')}}
                    />
                    <input 
                        type="password" 
                        className="login-info" 
                        placeholder="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value); setErrorMsg('')}}
                    />
                    <input type="submit" style={{display: 'none'}}/>
                </form>
                {(errorMsg.length > 0) ? <p className="error-message">{errorMsg}</p> : null}
                <button className="login-btn" onClick={state === 'signup' ? signUp : logIn}>
                    <label className="login-btn-lbl">log in</label>
                    <label className="signup-btn-lbl">sign up</label>
                </button>
                <div className="spinner"></div>
                <span className="or">
                    <hr/>
                    <label>or</label>
                    <hr/>
                </span>
                <div className="login-other">
                    <i className="login-other-btn bx bxl-google"></i>
                    <i className="login-other-btn bx bxl-meta"></i>
                    <i className="login-other-btn bx bxl-apple"></i>
                </div>
                <div className="signup">
                    <label className="account-txt">need an account?</label>
                    <button onClick={clickSignUp}>
                        <label className="signup-txt sign-lbl">sign up</label>
                        <label className="signup-txt log-lbl">log in</label>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login