import React from "react";
import { signOut } from "firebase/auth";
import { auth } from '../admin/firebase.js';
import "./Settings.css"

function Settings() {

    const logOut = () => {
        signOut(auth).then(() => {
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error)
        });
    }

    return(
        <div className="Settings">
            <div className="menu">
                <p className="title">Settings</p>
                <span>
                    <p className="title">General</p>
                </span>
                <span>
                    <p className="title">Account</p>
                </span>
                <span>
                    <p className="title">Accessibility</p>
                </span>
            </div>
            <p className="logout" onClick={logOut}>Log Out</p>
        </div>
    )
}

export default Settings