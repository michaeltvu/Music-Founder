import React, { useState, useEffect} from "react";
import axios from "axios";
import qs from "qs";
import { Buffer } from "buffer";
import {  signOut } from "firebase/auth";
import {auth} from '../admin/firebase.js';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [topArtist, setTopArtist] = useState();
    const [worstArtist, setWorstArtist] = useState();
    const [scores, setScores] = useState();
    const [token, setToken] = useState();
    const [page, setPage] = useState('home');

    useEffect(() => {
        if (location.pathname.split('/').length > 1) {
            if (location.pathname.split('/')[1] === '') {
                setPage('home')
            }
            else {
                setPage(location.pathname.split('/')[1]);
            }
        }
        if (!token) {
            getAccessToken();
        }
        else {
            let artists = JSON.parse(JSON.stringify(props.user.artists));
            artists.sort((a, b) => (a.score - a.originalscore) - (b.score - b.originalscore))
            setWorst(artists[0].artistid);
            setTop(artists[artists.length-1].artistid);
            setScores([artists[0].score - artists[0].originalscore, artists[artists.length-1].score - artists[artists.length-1].originalscore]);
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
        }
        catch (error) {
            console.log(error);
            return;
        }
    }

    async function setTop(artistid) {
        try {
            const url = `https://api.spotify.com/v1/artists/${artistid}`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTopArtist(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function setWorst(artistid) {
        try {
            const url = `https://api.spotify.com/v1/artists/${artistid}`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setWorstArtist(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
 
    const logOut = () => {
        const bottom = document.querySelector('.sidebar .user .bottom');
        if(!bottom.classList.contains('closed')) {
            signOut(auth).then(() => {
                console.log("Signed out successfully")
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    const clickLink = (type) => {
        setPage(type);
        navigate(`/${type}`);
    }

    const clickArtist = (artistid) => {
        navigate(`/artist/${artistid}`)
    }

    const clickProfile = () => {
        navigate(`/user/${props.user.username}`)
    }

    const getUserColor = (name) => {
        const colors = [[103, 97, 168], [242, 100, 48], [0, 157, 220], [0, 155, 114], [42, 95, 152], [166, 212, 159], [216, 49, 91], [30, 27, 24]];
        return colors[(name.charCodeAt(0) + name.charCodeAt(name.length-1))%8];
    }

    return(
        <div className="sidebar open">
            <div className="logo-details">
                <i className="fa-solid fa-headphones-simple icon"></i>
                <p className="logo-name">overground</p>
            </div>
            <div className="nav-list">
                <div className="artists">
                    <label className="title">WATCHLIST</label>
                    {topArtist ? <div className="artist" onClick={() => clickArtist(topArtist.id)}>
                        <span className="info">
                            {topArtist.images.length ? <img className="image" src={topArtist.images[0].url} alt={topArtist.name}/> : <i className="fa-solid fa-user image"></i>}
                            <div className="text">
                                <p className="name">{topArtist.name}</p>
                                <span className="popularity">{topArtist.popularity}<i className="fa-solid fa-fire-flame-curved"></i></span>
                            </div>
                        </span>
                        <span className="score">{scores[1] < 0 ? scores[1] : '+'+ Math.abs(scores[1])}<i className={scores[1] < 0 ? "fa-solid fa-snowflake" : "fa-solid fa-fire-flame-curved"}></i></span>
                    </div> : null}
                    {worstArtist ? <div className="artist" onClick={() => clickArtist(worstArtist.id)}>
                    <span className="info">
                            {worstArtist.images.length ? <img className="image" src={worstArtist.images[0].url} alt={worstArtist.name}/> : <i className="fa-solid fa-user image"></i>}
                            <div className="text">
                                <p className="name">{worstArtist.name}</p>
                                <span className="popularity">{worstArtist.popularity}<i className="fa-solid fa-fire-flame-curved"></i></span>
                            </div>
                        </span>
                        <span className="score">{scores[0] < 0 ? scores[0] : '+'+ Math.abs(scores[0])}<i className={scores[0] < 0 ? "fa-solid fa-snowflake" : "fa-solid fa-fire-flame-curved"}></i></span>
                    </div> : null}
                </div>
                <div className="menu">
                    <label className="title">MENU</label>
                    <div className="links">
                        <span className={"home link " + (page === 'home' ? "open" : "")} onClick={() => clickLink('home')}><i className="fa-solid fa-house"></i>home</span>
                        <span className={"search link " + (page === 'search' ? "open" : "")} onClick={() => clickLink('search')}><i className="fa-solid fa-magnifying-glass"></i>search</span>
                        {/* <span className={"top link " + (page === 'top' ? "open" : "")} onClick={() => clickLink('top')}><i className="fa-solid fa-chart-column"></i>top</span> */}
                        <span className={"groups link " + (page === 'groups' ? "open" : "")} onClick={() => clickLink('groups')}><i className="fa-solid fa-users"></i>groups</span>
                        <span className={"settings link " + (page === 'settings' ? "open" : "")} onClick={() => clickLink('settings')}><i className="fa-solid fa-gear"></i>settings</span>
                    </div>
                </div>
                <div className="user" onClick={clickProfile}>
                    <span className="profile">
                        {props.user.img ? <img className="image" src={props.user.img} alt={props.user.username}/> : <i className="image fa-solid fa-user" style={{color: `rgb(${getUserColor(props.user.username)}, 0.5)`}}></i>}
                        <p>{props.user.username}</p>
                    </span>
                    <span className="change">
                            <p>{Math.abs(props.user.score)}</p>
                            <i className={props.user.score >= 0 ? "fa-solid fa-fire-flame-curved" : "fa-solid fa-snowflake"}></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;