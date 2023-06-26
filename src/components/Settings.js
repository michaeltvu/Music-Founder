import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from '../admin/firebase.js';
import { Routes, useNavigate, Route, useLocation, Navigate } from 'react-router-dom';
import "./Settings.css"

function Settings(props) {
    const [page, setPage] = useState('account');

    const logOut = () => {
        signOut(auth).then(() => {
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error)
        });
    }

    const clickMenu = (title) => {
        setPage(title);
    }

    let main = null
    if (page === 'account') {
        main = 
            <div className="main">
                <p className="title">Account</p>
                <div className="sections">
                    <form className="info">
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="text" id="email" name="email" value="" readOnly/><br/>
                        </div>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="lname" name="lname"/>
                        </div>
                    </form>
                    <div className="accountbuttons">
                        <p className="logout" onClick={logOut}>Log Out</p>
                        <span className="delete">
                            <i className="fa-solid fa-trash"></i>
                            <p>Delete Account</p>
                        </span>
                    </div>
                </div>
            </div>
    }
    else if (page === 'general') {
        main = 
            <div className="main">
                <p className="title">General</p>
            </div>
    }
    else if (page === 'accessibility') {
        main = 
            <div className="main">
                <p className="title">Accessibility</p>
            </div>
    }
    

    return(
        <div className="Settings">
            <div className="menu">
                <p className="title">Settings</p>
                <span className={"option " + ((page === 'account') ? "selected" : "")} onClick={() => clickMenu('account')}>
                    <i className="fa-solid fa-user"></i>
                    <p className="title">Account</p>
                </span>
                <span className={"option " + ((page === 'general') ? "selected" : "")} onClick={() => clickMenu('general')}>
                    <i className="fa-solid fa-gear"></i>
                    <p className="title">General</p>
                </span>
                <span className={"option " + ((page === 'accessibility') ? "selected" : "")} onClick={() => clickMenu('accessibility')}>
                    <i className="fa-solid fa-eye"></i>
                    <p className="title">Accessibility</p>
                </span>
            </div>
            <hr/>
            {main}
        </div>
    )
}

export default Settings