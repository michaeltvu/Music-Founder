import React, { useEffect, useState } from "react";
import "./Main.css"

function Main() {

    const getGroups = async () => {

    }
    
    return(
        <div className="main">
            <div className="groups">
                <p className="title">Groups</p>
            </div>
            <div className="friends">
                <p className="title">Friends</p>
            </div>
            <div className="artists">
                <p className="title">Recommended Artists</p>
            </div>
        </div>
    )
}

export default Main