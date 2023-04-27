import React, {useState} from "react";
import './Groups.css'

export function Groups(props) {
    const group = {
        name: 'the shiesties',
        img: 'https://m.media-amazon.com/images/I/51lEcOTymgL._UXNaN_FMjpg_QL85_.jpg',
        members: [],
        id: '',
    }
    const groups = [group]

    return(
        <div className="Groups">
            <span className="title">
                <i className="fa-solid fa-users"></i>
                groups
            </span>
            <div className="list-groups">
                {/* <label className="empty">no groups yet...</label> */}
                {groups.map((group, index) => (
                    <div className="group" key={index}>
                        {group.img ? <img className="image" src={group.img}/> : <i className="fa-solid fa-users image"></i>}
                        <p className="name">{group.name}</p>
                        <span className="score">
                            {/* {props.user.img ? <img className="image" src={props.user.img}/> : <i className="image fa-solid fa-user"></i>}
                            {props.user.img ? <img className="image" src={props.user.img}/> : <i className="image fa-solid fa-user"></i>}
                            {props.user.img ? <img className="image" src={props.user.img}/> : <i className="image fa-solid fa-user"></i>} */}
                            {/* <p>10</p>
                            <i className={10 >= 0 ? "fa-solid fa-fire-flame-curved" : "fa-solid fa-snowflake"}></i> */}
                        </span>
                    </div>
                ))}
            </div>
            <hr/>
            <div className="new-group">
                {/* <p>join or create a group</p> */}
                {/* <span className="create-group">
                    <p>create</p>
                    <i className="fa-solid fa-pencil"></i>
                </span>
                <span className="join-group">
                    <p>join</p>
                    <i className="fa-solid fa-plus"></i>
                </span> */}
            </div>
            <div className="popupbackground">
                <div className="popup">
                    <i className="fa-solid fa-xmark close"></i>
                </div>
            </div>
        </div>
    )
}

export default Groups;