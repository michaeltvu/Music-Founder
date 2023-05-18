import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from '../admin/firebase.js';
import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs'
import "./User.css";

export function Artist(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();
    const [artists, setArtists] = useState([]);
    const [defaultArtists, setDefaultArtists] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState([35, 35, 35]);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(-1);
    const [sortOption, setSortOption] = useState('oldnew');

    useEffect(() => {
        console.log('effect')
        if (props.token && !user) {
            console.log('user now')
            if (location.pathname.split('/').length > 2) {
                const username = location.pathname.split('/')[2];
                getUser(username)
            }
        }
        if (artists.length) {
            switch (sortOption) {
                case 'oldnew':
                    setArtists(defaultArtists);
                case 'newold':
                    setArtists(defaultArtists.slice().reverse());
                case 'bestworst':
                    // return <p className="sort" onClick={openSortMenu}>Best to Worst <i className="fa-solid fa-chevron-up"></i></p>;
                case 'worstbest':
                    // return <p className="sort" onClick={openSortMenu}>Worst to Best <i className="fa-solid fa-chevron-up"></i></p>;
            }
        }
    }, [props, sortOption]);

    const getPalette = (username, url) => {
        return new Promise(resolve => {
            if (url) {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = () => {
                    let colorThief = new ColorThief();
                    resolve(colorThief.getPalette(img)[2]);
                }
                img.src = url;
            }
            else {
                const colors = [[103, 97, 168], [242, 100, 48], [0, 157, 220], [0, 155, 114], [42, 95, 152], [166, 212, 159], [216, 49, 91], [30, 27, 24]];
                resolve(colors[(username.charCodeAt(0) + username.charCodeAt(username.length-1))%8]);
            }
        })
    }

    async function getArtists(artistids) {
        try {
            const url = `https://api.spotify.com/v1/artists?ids=${artistids}`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${props.token}`
                }
            });
            return response.data
        }
        catch (error) {
            console.log(error);
        }
    }

    async function getUser(username) {
        setLoading(true);
        try {
            const docSnap = await getDoc(doc(db, 'usernames', username));
            const userid = docSnap.data().uid;
            setAdded(props.user.friends.indexOf(userid));
            
            const docSnap2 = await getDoc(doc(db, 'users', userid));
            const user = docSnap2.data();
            
            setBackgroundColor(await getPalette(user.username, user.img));
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
                        artists,
                        score: totalscore
                    });
                    user.artists = artists;
                    user.score = totalscore;
                }
                setArtists(updatedartists);
                setDefaultArtists(updatedartists);
            }
            setUser(user);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            navigate(-1);
        }
    }

    const clickArtist = (index) => {
        navigate(`/artist/${artists[index].id}`);
    }

    const addFriend = () => {

    }

    const openSortMenu = () => {
        const sortmenu = document.querySelector('.sort-menu');
        sortmenu.classList.toggle('open');

        const sort = document.querySelector('.title .sort i');
        sort.classList.toggle('fa-chevron-up');
        sort.classList.toggle('fa-chevron-down');
    }

    const clickSortOption = (option) => {
        openSortMenu();
        setSortOption(option);
    }

    const convertDate = (date) => {
        return (`${date.split('-')[1]}/${date.split('-')[2]}/${date.split('-')[0].substring(2,5)}`);
    }
    
    const renderSortOption = (option) => {
        switch (option) {
            case 'oldnew':
                return <p className="sort" onClick={openSortMenu}>Old to New <i className="fa-solid fa-chevron-up"></i></p>;
            case 'newold':
                return <p className="sort" onClick={openSortMenu}>New to Old <i className="fa-solid fa-chevron-up"></i></p>;
            case 'bestworst':
                return <p className="sort" onClick={openSortMenu}>Best to Worst <i className="fa-solid fa-chevron-up"></i></p>;
            case 'worstbest':
                return <p className="sort" onClick={openSortMenu}>Worst to Best <i className="fa-solid fa-chevron-up"></i></p>;
        }
    }

    if (!loading) {
        return(
            <div className="userpage">
                <div className="userbox"  style={{backgroundImage: `linear-gradient(0deg, rgb(30, 30, 30), 75%, rgb(${backgroundColor}, 0.5)`}}>
                    <div className="userinfo">
                        <span className="score">{Math.abs(user.score)}<i className={user.score < 0 ? "fa-solid fa-snowflake" : "fa-solid fa-fire-flame-curved"}></i></span>
                        {user.img.length ? <img className="image" src={user.img} alt={user.name}/> : <i className="fa-solid fa-user image" style={{color: `rgb(${backgroundColor}, 0.5)`}}></i>}
                        <div className="sub">
                            <span className="name">
                                <p>{user.username}</p>
                                {/* <i className="fa-solid fa-link spotify"></i> */}
                            </span>
                            <p className="friends">{user.friends.length + (user.friends.length === 1 ? ' friend' : ' friends')}</p>
                            {(added !== -1) ? <span className="remove">Remove Friend<i className="fa-solid fa-xmark"></i></span> : <span className="add" onClick={addFriend}>Add Friend <i className="fa-solid fa-plus"></i></span> }
                        </div>
                    </div>
                    {/* <hr style={{border: `3px solid rgb(${backgroundColor}, 0.5)`}}/> */}
                    <div className="usermusic">
                        <div className="collection">
                            <span className="title">
                                <p>Artists</p>
                                {renderSortOption(sortOption)}
                                <div className="sort-menu">
                                    <p>Sort By</p>
                                    <hr/>
                                    <p className={sortOption === 'oldnew' ? "sort-by selected" : "sort-by"} onClick={() => clickSortOption('oldnew')}>Old to New <i className="fa-solid fa-check"></i></p>
                                    <p className={sortOption === 'newold' ? "sort-by selected" : "sort-by"} onClick={() => clickSortOption('newold')}>New to Old <i className="fa-solid fa-check"></i></p>
                                    <p className={sortOption === 'bestworst' ? "sort-by selected" : "sort-by"} onClick={() => clickSortOption('bestworst')}>Best to Worst <i className="fa-solid fa-check"></i></p>
                                    <p className={sortOption === 'worstbest' ? "sort-by selected" : "sort-by"} onClick={() => clickSortOption('worstbest')}>Worst to Best <i className="fa-solid fa-check"></i></p>
                                </div>
                            </span>
                            <div className="artists">
                                {artists.map((artist, index) => (
                                    <div className="artist" key={index} onClick={() => clickArtist(index)}>
                                        {artist.images.length ? <img className="image" src={artist.images[0].url} alt={artist.name}/> : <i className="fa-solid fa-user image"></i>}
                                        <p className="name">{artist.name}</p>
                                        <span className="popularity">{artist.popularity}<i className="fa-solid fa-fire-flame-curved"></i></span>
                                        <div className="added">
                                            <span className="addedpopularity">
                                                <p>Added At {user.artists[index].originalscore}</p>
                                                <i className="fa-solid fa-fire-flame-curved"></i>
                                            </span>
                                            <p className="addeddate">{convertDate(user.artists[index].date)}</p>
                                        </div>
                                        {/* <i className="fa-brands fa-spotify link"></i> */}
                                    </div>
                                ))}
                                <div className="artist invisible"></div>
                                <div className="artist invisible"></div>
                                <div className="artist invisible"></div>
                                <div className="artist invisible"></div>
                                <div className="artist invisible"></div>
                                <div className="artist invisible"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="userpage">
                <div className="spinnerbox"><p className="spinner"></p></div>
            </div>
        )
    }
}

export default Artist;