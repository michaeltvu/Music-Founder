import React, { useState, useEffect } from "react";
import { getDoc, doc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from '../admin/firebase.js';
import './Friends.css'

export function Friends(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState('friends');
    const [loading, setLoading] = useState('loading');
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        if (state === 'friends') {
            getFriends();
        }
        else {
            getFriendRequests();
        }
    }, [props.user])

    const getFriends = async() => {
        if (props.user.friends.length !== friends.length) {
            setLoading('loading');
            let userfriends = [];
            for (let i = 0; i < props.user.friends.length; i++) {
                try {
                    const docSnap = await getDoc(doc(db, 'users', props.user.friends[i]));
                    if(docSnap.exists()) {
                        userfriends.push(docSnap.data());
                    }
                } catch(error) {
                    console.log(error)
                }
            }
            userfriends.sort((a, b) => a.username.localeCompare(b.username))
            setFriends(userfriends);
        }
        setLoading('finished');
    }

    const getFriendRequests = async() => {
        if (props.user.friendrequestreceived.length !== friendRequests.length) {
            setLoading('loading');
            let requests = [];
            for (let i = 0; i < props.user.friendrequestreceived.length; i++) {
                try {
                    const docSnap = await getDoc(doc(db, 'users', props.user.friendrequestreceived[i]));
                    if(docSnap.exists()) {
                        requests.push(docSnap.data());
                    }
                } catch(error) {
                    console.log(error)
                }
            }
            requests.reverse();
            setFriendRequests(requests);
        }
        setLoading('finished');
    }

    const refresh = () => {
        props.refreshUser(props.user.uid);
    }

    const clickSearch = () => {
        const addFriends = document.querySelector('.Friends .add-friend');
        const addButton = document.querySelector('.Friends .add-friend .add');
        if (addFriends.classList.contains('open') & searchTerm.length > 0) {
            setSearchTerm('');
        }
        else {
            addFriends.classList.toggle('open');
            addButton.classList.toggle('fa-magnifying-glass');
            addButton.classList.toggle('fa-xmark');
        }
    }

    const clickButton = (i) => {
        setState(i);
        refresh();
    }

    const acceptRequest = async (index) => {
        try {
            await updateDoc(doc(db, "users", props.user.uid), {
                friends: arrayUnion(friendRequests[index].uid),
                friendrequestreceived: arrayRemove(friendRequests[index].uid)
            })
            await updateDoc(doc(db, "users", friendRequests[index].uid), {
                friends: arrayUnion(props.user.uid)
            })
            refresh();
        } catch(error) {
            console.log(error);
        }
    }

    const denyRequest = async(index) => {
        try {
            await updateDoc(doc(db, "users", props.user.uid), {
                friendrequestreceived: arrayRemove(friendRequests[index].uid)
            })
            // props.user.friendrequestreceived = props.user.friendrequestreceived.slice(0, index).concat(props.user.friendrequestreceived.slice(index+1));
            refresh();
        } catch(error) {
            console.log(error);
        }
    }

    const addFail = () => {
        const form = document.querySelector('.Friends .add-friend');
        form.classList.remove('good');
        form.classList.remove('bad');
        void form.offsetWidth;
        form.classList.add('bad');
    }

    const addSuccess = () => {
        const form = document.querySelector('.Friends .add-friend');
        form.classList.remove('bad');
        form.classList.remove('good');
        void form.offsetWidth;
        form.classList.add('good');
        setSearchTerm('');
    }

    const search = async (e) => {
        e.preventDefault();
        const friendsusernames = friends.map(friend => friend.username)
        if (searchTerm) {
            try {
                if(friendsusernames.includes(searchTerm) || searchTerm === props.user.username) {
                    addFail();
                }
                else {
                    const docSnap = await getDoc(doc(db, "usernames", searchTerm));
                    if (docSnap.exists()) {
                        await updateDoc(doc(db, "users", docSnap.data().uid), {
                            friendrequestreceived: arrayUnion(props.user.uid)
                        })
                        addSuccess();
                    }
                    else {
                        console.log('user doesnt exist');
                        addFail();
                    }
                }
            }
            catch (error) {
                console.log(error)
                addFail();
            }
        }
    }

    let list, button, title;
    if (state === 'friends') {
        if (loading === 'loading') {
            list = <div className="spinnerbox"><p className="spinner"></p></div>
        }
        else if (props.user.friends.length === 0) {
            list = <p className="empty">no friends yet...</p>
        }
        else {
            list = friends.map((friend, index) => (
                <div className="friend" key={index}>
                    <span className="personal">
                        {friend.img ? <img className="image" src={friend.img} alt="profile"></img> : <i className="fa-solid fa-user image"></i>}
                        <p>{friend.username}</p>
                    </span>
                    <span className="change">
                        <p>{Math.abs(friend.score)}</p>
                        <i className={friend.score >= 0 ? "fa-solid fa-fire-flame-curved" : "fa-solid fa-snowflake"}></i>
                    </span>
                </div>
            ))
        }
        
        title = 
            <span className="title">
                <i className="fa-solid fa-user"></i>
                friends
            </span>

        button = 
            <div className="inbox" onClick={() => clickButton('inbox')}>
                <i className="fa-solid fa-inbox"></i>
                <p>inbox</p>
                {props.user.friendrequestreceived.length > 0 ? <p className="noti"></p> : null}
            </div>
    }
    else if (state === 'inbox') {
        if (loading === 'loading') {
            list = <div className="spinnerbox"><p className="spinner"></p></div>
        }
        else if (props.user.friendrequestreceived.length === 0) {
            list = <p className="empty">no friend requests...</p>
        }
        else {
            list = friendRequests.map((user, index) => (
                <div className="request" key={index}>
                    <span className="personal">
                            <i class="fa-solid fa-envelope"></i>
                            {user.img ? <img className="image" src={user.img} alt="profile"></img> : <i className="fa-solid fa-user image"></i>}
                            <p>{user.username}</p>
                    </span>
                    <span className="accept">
                        <i className="fa-solid fa-user-plus" onClick={() => acceptRequest(index)}></i>
                        <i className="fa-solid fa-user-xmark" onClick={() => denyRequest(index)}></i>
                    </span>
                </div>
            ));
        }

        title = 
            <span className="title">
                <i className="fa-solid fa-inbox"></i>
                inbox
            </span>

        button = 
            <div className="inbox" onClick={() => clickButton('friends')}>
                <i className="fa-solid fa-user"></i>
                <p>friends</p>
            </div>
    }

    return(
        <div className="Friends">
            {title}
            <div className="friends-list">
                {list}
            </div>
            <form className={"add-friend"} onSubmit={search}>
                <i className="fa-solid fa-user-plus"></i>
                <input 
                    type="name" 
                    placeholder="add friend" 
                    autoComplete="given-name" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="add fa-solid fa-magnifying-glass" onClick={clickSearch}></i>
                <input type="submit" style={{display: 'none'}}/>
            </form>
            {button}
        </div>
    )
}

export default Friends;