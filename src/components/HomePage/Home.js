import React, {useState, useEffect} from "react";
// import ArtistCharts from "../ArtistCharts";
import Search from "../Search";
import Sidebar from "../Sidebar";
import Groups from "../Groups";
import Friends from "../Friends";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from '../../admin/firebase.js';
import { Routes, useNavigate, Route } from 'react-router-dom';

import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [currentState, setCurrentState] = useState('search');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                getUser(user.uid);
            } else {
                // User is signed out
                navigate("/login")
                console.log("user is logged out")
            }
          });
    }, [])

    const getUser = async (userid) => {
        try {
            const docSnap = await getDoc(doc(db, 'users', userid));
            if(docSnap.exists()) {
                setUser(docSnap.data());
            } else {
                console.log("Document does not exist")
            }
        
        } catch(error) {
            console.log(error)
        }
    }

    if(user) {
        return(
            <div className="Home">
                <Sidebar user={user}/>
                <div className="center">
                    <div className="main-page">
                        {/* {mainpage} */}
                        <Routes>
                            <Route path="/groups" element={<div className="social"><Groups user={user}/> <Friends user={user} refreshUser={getUser}/></div>}/>
                            <Route path="/search" element={<Search user={user} refreshUser={getUser}/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="Home">
                <div className="spinnerbox"><p className="spinner"></p></div>
            </div>
        );
    }
}

export default Home;