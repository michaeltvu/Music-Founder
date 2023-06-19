import React, {useState, useEffect} from "react";
import './Search.css'
import axios from "axios";
import qs from 'qs';
import { Buffer } from "buffer";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../admin/firebase.js';
import { useNavigate, useLocation } from 'react-router-dom';

export function Search(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState();
    const [artists, updateArtists] = useState([]);
    const [searchTerm, updateSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        if (!token) {
            getAccessToken();
        }
        else {
            let recent = JSON.parse(localStorage.getItem(props.user.uid + ': recentsearches'));
            if (recent) {
                setRecentSearches(recent);
            }
            if (location.pathname.split('/').length > 2) {
                const search = location.pathname.split('/')[2];
                if (search.length > 0) {
                    updateSearchTerm(decodeURI(search));
                    getArtists(null, search);
                }
                else {
                    navigate('/search');
                }
            }
            else {
                clickX();
            }
        }
    }, [props.user.uid, location.pathname, token])
    
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
    
    async function getArtists(event, search) {
        if (event) {
            event.preventDefault();
        }
        props.refreshUser(props.user.uid);
        setLoading(true);
        try {
            console.log(token)
            const url = `https://api.spotify.com/v1/search?query=${search}&type=artist&offset=0&limit=21`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLoading(false);
            if (response.data.artists.items.length === 0) {
                console.log('No Results');
            }
            updateArtists(response.data.artists.items);
            if (event) {
                navigate(`/search/${search}`);
            }
        }
        catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const clickX = () => {
        document.querySelector('.searchartist form input').focus();
        updateArtists([]);
        updateSearchTerm('');
        if (location.pathname.split('/').length > 2) {
            navigate(`/search`);
        }
    }

    function setRecents(index) {
        let recents = JSON.parse(localStorage.getItem(props.user.uid + ': recentsearches'));
        if (recents === null) {
            recents = [];
        }
        recents = recents.filter(function (recent) {
            return recent.id !== recentSearches[index].id;
        });
        recents.unshift(recentSearches[index]);
        // props.setArtist(recents[0].id);
        localStorage.setItem(props.user.uid + ': recentsearches', JSON.stringify(recents));
        navigate(`/artist/${recents[0].id}`);
        // setRecentSearches(recents);
    }

    const clickRecentSearch = (index) => {
        // setRecents(index);
        let recents = JSON.parse(localStorage.getItem(props.user.uid + ': recentsearches'));
        navigate(`/artist/${recents[index].id}`);
    }

    const removeRecentSearch = (e, index) => {
        e.stopPropagation();
        let newrecents = recentSearches.filter((_, i) => i !== index);
        setRecentSearches(newrecents);
        localStorage.setItem(props.user.uid + ': recentsearches', JSON.stringify(newrecents));
    }

    const clearRecent = () => {
        setRecentSearches([]);
        localStorage.setItem(props.user.uid + ': recentsearches', null);
    }

    const clickArtist = (index) => {
        // props.setArtist(artists[index].id);
        let recents = JSON.parse(localStorage.getItem(props.user.uid + ': recentsearches'));
        if (recents === null) {
            recents = [];
        }
        recents = recents.filter(function (recent) {
            return recent.id !== artists[index].id;
        });
        recents.unshift(artists[index]);
        localStorage.setItem(props.user.uid + ': recentsearches', JSON.stringify(recents));
        setRecentSearches(recents);
        navigate(`/artist/${artists[index].id}`);
    } 

    const hoverResult = (index) => {
        const result = document.querySelector('.result.p' + index + ' .add');
        result.classList.toggle('hover');
    }

    const rerenderArtist = (index) => {
        const add = document.querySelector('.result.p' + index + ' .add');
        add.classList.toggle('added');
        add.classList.toggle('fa-check');
        add.classList.toggle('fa-plus');
    }

    const addArtist = async (event, artistid, index) => {
        event.stopPropagation();
        const artistsid = props.user.artists.map(artist => artist.artistid);
        if (artistsid.includes(artistid)) {
            console.log('already exists');
        }
        else {
            let date = new Date();
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000));
            date = new Date(date.getTime())
            date =  date.toISOString().split('T')[0];
            try {
                await updateDoc(doc(db, "users", props.user.uid), {
                    artists: arrayUnion({
                        artistid,
                        date,
                        originalscore: artists[index].popularity,
                        score: artists[index].popularity
                    })
                })
                props.refreshUser(props.user.uid);
                rerenderArtist(index)
            } catch(error) {
                console.log(error);
            }
        }
    }

    let result;
    if (loading) {
        result = <div className="spinnerbox"><p className='spinner'></p></div>
    }
    else {
        if (artists.length === 0) {
            result = recentSearches.map((artist, index) => (
                <div key={index} className={"result p" + index} onClick={() => clickRecentSearch(index)}>
                    <div>
                        <img className="image" src={artist.images[0] ? artist.images[0].url : "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"} alt={artist.name}></img>
                    </div>
                    <p>{artist.name}</p>
                    <i className="fa-solid fa-xmark close" onClick={event => removeRecentSearch(event, index)}></i>
                </div>
            ));
        }
        else {
            result = artists.map((artist, index) => (
                <div key={index} className={"result p" + index} onMouseEnter={() => hoverResult(index)} onMouseLeave={() => hoverResult(index)} onClick={() => clickArtist(index)}>
                    <div>
                        <img className="image" src={artist.images[0] ? artist.images[0].url : "https://static.vecteezy.com/system/resources/previews/005/129/906/original/profile-icon-black-solid-style-free-vector.jpg"} alt={artist.name}></img>
                        <i className={(props.user.artists.map(artist => artist.artistid).includes(artist.id)) ? 'add added fa-solid fa-check' : 'add fa-solid fa-plus'} onClick={event => addArtist(event, artist.id, index)}></i>
                    </div>
                    <p>{artist.name}</p>
                    <span><i className="fa-solid fa-fire-flame-curved"></i> {artist.popularity}</span>
                </div>
            ))
        }
    }

    return(
        <div className="searchartist">
            <form onSubmit={event => getArtists(event, searchTerm)}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="name" value={searchTerm} onChange={(e) => updateSearchTerm(e.target.value)} placeholder="Search" autoComplete="off"/>
                <i className="fa-solid fa-xmark" onClick={clickX}></i>
            </form>
            <div className={(artists.length === 0 & !loading) ? "results recent" : "results"}>
                <div className={(artists.length === 0 & !loading) ? "title recent" : "title"}>
                    <p className="recenttitle">Recent Searches</p>
                    <p className="clearrecent" onClick={clearRecent}>clear all</p>
                </div>
                {result}
                <div className="result invisible"></div>
                <div className="result invisible"></div>
                <div className="result invisible"></div>
                <div className="result invisible"></div>
                <div className="result invisible"></div>
                <div className="result invisible"></div>
            </div>
        </div>
    )
}

export default Search;