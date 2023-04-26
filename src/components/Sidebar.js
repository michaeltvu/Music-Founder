import React from "react";
//import { NavLink } from "react-router-dom";
import {  signOut } from "firebase/auth";
import {auth} from '../admin/firebase.js';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar(props) {

    const navigate = useNavigate();
 
    const logOut = () => {        
        const bottom = document.querySelector('.sidebar .user .bottom');
        if(!bottom.classList.contains('closed')) {
            signOut(auth).then(() => {
                // navigate("/login");
                console.log("Signed out successfully")
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    const bestartist = {name: "Yeat", listeners: 12017971, ogstreams: 7.9, daily: 55222, invested: 109, img: "https://i.scdn.co/image/ab6761610000e5eb163e4c3a83061dda3aac5d81", genre: "Vapor rap"}
    const worstartist = {name: "Playboi", listeners: 16171558, ogstreams: 12.9, daily: -7975, invested: 150, img: "https://i.scdn.co/image/ab6761610000e5eb504ff11d788162fbf8078654", genre: "Trap"}
    function sharePrice(listeners) {
        return (listeners/250000).toFixed(2);
    }

    function dailyPercent(listeners, daily) {
        return Math.abs((daily*100/listeners).toFixed(2));
    }

    function dailyShare(listeners, daily) {
        return (sharePrice(listeners) * Math.abs((daily*100/listeners))).toFixed(2);
    }

    const expandLink = () => {
        let expandlink = document.getElementsByClassName('expandlink')[0];
        let bx = document.querySelector('.expandlink .openorclose');
        bx.classList.toggle('bx-chevron-down');
        bx.classList.toggle('bx-chevron-up');
        expandlink.classList.toggle('open');
    }

    const clickLink = (type) => {
        let buttons = document.querySelectorAll('.menu .link-button');
        buttons.forEach(element => {
            if (element.classList.contains(type)) {
                element.classList.add('open');
            }
            else {
                element.classList.remove('open');
            }
        });
        if(type === 'top' || type === 'rising' || type === 'search') {
            document.querySelector('.menu .expandlink .link').classList.add('child-open');
        }
        else {
            document.querySelector('.menu .expandlink .link').classList.remove('child-open');
        }
        if(type === 'home') {
            navigate('/');
        }
        else {
            navigate(`/${type}`);
        }
    }

    const clickProfile = () => {
        const bottom = document.querySelector('.sidebar .user .bottom');
        const button = document.querySelector('.sidebar .user .top .expand');
        bottom.classList.toggle('closed');
        button.classList.toggle('fa-chevron-down');
        button.classList.toggle('fa-chevron-up')
    }

    return(
        <div className="sidebar open">
            <div className="logo-details">
                <i className="fa-solid fa-headphones-simple icon"></i>
                <p className="logo-name">overground</p>
            </div>
            <ul className="nav-list">
                <li className="artists">
                    <label className="title">WATCHLIST</label>
                    <div className="artist">
                        <div className="info">
                            <img className="img" src={bestartist.img} alt={bestartist.name}/>
                            <div className="text">
                                <label className="name">{bestartist.name}</label>
                                <label className="share">{sharePrice(bestartist.listeners)}</label>
                            </div>
                        </div>
                        <span className="change">
                            <label className={"currency " + (bestartist.daily > 0 ? "pos" : "neg")}>{bestartist.daily > 0 ? '+' + dailyShare(bestartist.listeners, bestartist.daily):' -' + dailyShare(bestartist.listeners, bestartist.daily)}</label>
                            <label className={"percent " + (bestartist.daily > 0 ? "pos" : "neg")}>{bestartist.daily > 0 ? '+' + dailyPercent(bestartist.listeners, bestartist.daily) + '%' :' -' + dailyPercent(bestartist.listeners, bestartist.daily) + '%'}</label>
                        </span>
                    </div>
                    <div className="artist">
                        <div className="info">
                            <img className="img" src={worstartist.img} alt={worstartist.name}/>
                            <div className="text">
                                <label className="name">{worstartist.name}</label>
                                <label className="share">{sharePrice(worstartist.listeners)}</label>
                            </div>
                        </div>
                        <span className="change">
                            <label className={"currency " + (worstartist.daily > 0 ? "pos" : "neg")}>{worstartist.daily > 0 ? '+' + dailyShare(worstartist.listeners, worstartist.daily):' -' + dailyShare(worstartist.listeners, worstartist.daily)}</label>
                            <label className={"percent " + (worstartist.daily > 0 ? "pos" : "neg")}>{worstartist.daily > 0 ? '+' + dailyPercent(worstartist.listeners, worstartist.daily) + '%' :' -' + dailyPercent(worstartist.listeners, worstartist.daily) + '%'}</label>
                        </span>
                    </div>
                </li>
                <li className="menu">
                    <label className="title">MAIN MENU</label>
                    <ul>
                        <li className="home link-button" onClick={() => clickLink('home')}>
                            <span className="link"><i className="fa-solid fa-house"></i>home</span>
                        </li>
                        <li className="expandlink">
                            <div className="link" onClick={expandLink}>
                                <span><i className="fa-solid fa-compact-disc"></i>artists</span>
                                <i className='openorclose bx bx-chevron-down'></i>
                            </div>
                            <div className="expandedlink">
                                <hr/>
                                <ul>
                                    <li className="top link-button" onClick={() => clickLink('top')}><label>top artists</label></li>
                                    <li className="rising link-button" onClick={() => clickLink('rising')}><label>rising artists</label></li>
                                    <li className="search link-button" onClick={() => clickLink('search')}><label>search</label></li>
                                </ul>
                            </div>
                        </li>
                        <li className="groups link-button" onClick={() => clickLink('groups')}>
                            <span className="link"><i className="fa-solid fa-users"></i>groups</span>
                        </li>
                        <li className="settings link-button" onClick={() => clickLink('settings')}>
                            <span className="link"><i className="fa-solid fa-gear"></i>settings</span>
                        </li>
                    </ul>
                </li>
                <div className="user">
                    <span className="top">
                        <span className="profile">
                            {props.user.img ? <img className="image" src={props.user.img}/> : <i className="image fa-solid fa-user"></i>}
                            <p>{props.user.username}</p>
                        </span>
                        <i className="fa-solid fa-chevron-up expand" onClick={clickProfile}></i>
                    </span>
                    <div className="bottom closed">
                        <hr/>
                        <div className="options">
                            {/* <span className="viewprofile">
                                <p>copy user</p>
                                <i class="fa-solid fa-copy"></i>
                            </span> */}
                            <span className="logout" onClick={logOut}>
                                <p>sign out</p>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    );
}

export default Sidebar;