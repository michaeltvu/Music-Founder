import React from "react";
import { signOut } from "firebase/auth";
import { auth } from '../admin/firebase.js';

function Settings() {

    const logOut = () => {
        signOut(auth).then(() => {
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error)
        });
    }

    return(
        <div className="settings">
            <p className="logout" onClick={logOut}>Log Out</p>
        </div>
    )
}

export default Settings