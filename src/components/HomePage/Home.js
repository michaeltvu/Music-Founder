import React, {useState, useEffect} from "react";
// import ArtistCharts from "../ArtistCharts";
import Search from "../Search";
import Sidebar from "../Sidebar";
import Groups from "../Groups";
import Friends from "../Friends";
import Artist from "../Artist";
import User from "../User";
import Settings from "../Settings";
import Main from "../Main";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, updateDoc} from "firebase/firestore";
import { auth, db } from '../../admin/firebase.js';
import { Routes, useNavigate, Route, useLocation, Navigate } from 'react-router-dom';
import axios from "axios";
import qs from "qs";
import { Buffer } from "buffer";

import './Home.css';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    // const [artist, setArtist] = useState();

    useEffect(() => {
        // if (artist) {
        //     navigate(`/artist/${artist}`);
        // }
        if (!token) {
            getAccessToken();
        }
        else {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(user.displayName)
                    getUser(user.uid);
                    // updateArtists(user.uid);
                } else {
                    navigate("/login")
                    console.log("user is logged out")
                }
            });
        }
    }, [token])

    async function getAccessToken() {
        try {
            const client_id = 'ef30825fefca4fc2930a17f01a5800a1';
            const client_secret = '048730d76cda4d09844001110e55bad6';
            const data = qs.stringify({'grant_type':'client_credentials'});
            const url = 'https://accounts.spotify.com/api/token';
            let res = await axios.post(url, data, {
                headers: {
                    'Authorization': `Basic ${(new Buffer.from(client_id + ':' + client_secret).toString('base64'))}`,
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
            })
            setToken(res.data.access_token);
            return res.data.access_token
        }
        catch (error) {
            console.log(error);
            return;
        }
    }

    async function getArtists(artistids) {
        try {
            const url = `https://api.spotify.com/v1/artists?ids=${artistids}`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data
        }
        catch (error) {
            console.log(error);
        }
    }

    const updateArtists = async (userid) => {
        try {
            const docSnap = await getDoc(doc(db, 'users', userid));
            if (docSnap.exists()) {
                const date =  new Date().toISOString().split('T')[0];
                let user = docSnap.data();
                if (user.updatedate !== date) {
                    let artistids = '';
                    for (let i = 0; i < user.artists.length; i++) {
                        const artist = user.artists[i];
                        artistids += (artist.artistid + ((i === user.artists.length-1) ? '' : '%2C'))
                    }
                    let totalscore = 0;
                    let artists = [];
                    const updatedartists = (await getArtists(artistids)).artists;
                    if (updatedartists.length === user.artists.length) {
                        for (let i = 0; i < updatedartists.length; i++) {
                            const artist = user.artists[i];
                            totalscore += (updatedartists[i].popularity - artist.originalscore);
                            artist.score = updatedartists[i].popularity;
                            artists.push(artist);
                        }
                        await updateDoc(doc(db, "users", userid), {
                            updatedate: date,
                            artists,
                            score: totalscore
                        });
                        user.artists = artists;
                        user.updatedate = date;
                        user.score = totalscore;
                    }
                }
            } else {
                console.log("Document does not exist")
            }
        } catch(error) {
            console.log(error)
        }
    }

    const getUser = async (userid) => {
        try {
            const docSnap = await getDoc(doc(db, 'users', userid));
            if(docSnap.exists()) {
                const date =  new Date().toISOString().split('T')[0];
                let user = docSnap.data();
                if (user.artists.length > 0) {
                    let artistids = '';
                    for (let i = 0; i < user.artists.length; i++) {
                        const artist = user.artists[i];
                        artistids += (artist.artistid + ((i === user.artists.length-1) ? '' : '%2C'))
                    }
                    let totalscore = 0;
                    let artists = [];
                    const updatedartists = (await getArtists(artistids)).artists;
                    if (updatedartists.length === user.artists.length) {
                        for (let i = 0; i < updatedartists.length; i++) {
                            if (updatedartists[i]) {
                                const artist = user.artists[i];
                                totalscore += (updatedartists[i].popularity - artist.originalscore);
                                artist.score = updatedartists[i].popularity;
                                artists.push(artist);
                            }
                        }
                        await updateDoc(doc(db, "users", userid), {
                            updatedate: date,
                            artists,
                            score: totalscore
                        });
                        user.artists = artists;
                        user.updatedate = date;
                        user.score = totalscore;
                    }
                }
                if (user.updatedate !== date) {
                }
                setUser(user);
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
                            <Route path="/" element={<Navigate replace to="/home"/>} />
                            <Route path="/home" element={<Main/>}/>
                            <Route path="/groups" element={<div className="social"><Groups user={user}/> <Friends user={user} refreshUser={getUser}/></div>}/>
                            <Route path="/search/*" element={<Search user={user} refreshUser={getUser}/>}/>
                            <Route path="/artist/*" element={<Artist user={user} refreshUser={getUser}/>}/>
                            <Route path="/user/*" element={<User user={user} refreshUser={getUser}/>}/>
                            <Route path="/settings" element={<Settings user={user}/>}/>
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