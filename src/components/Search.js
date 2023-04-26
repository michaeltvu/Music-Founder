import React, {useState, useEffect} from "react";
import './Search.css'
import axios from "axios";
import qs from "qs";
import { Buffer } from "buffer";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../admin/firebase.js';

export function Search(props) {
    const [artists, updateArtists] = useState([]);
    const [searchTerm, updateSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        let recent = JSON.parse(localStorage.getItem(props.user.uid + ': recentsearches'));
        if (recent !== null) {
            setRecentSearches(recent);
        }
    }, [])

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
            return res.data.access_token;
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
    
    async function getArtists(event) {
        event.preventDefault();
        setLoading(true);
        updateArtists([]);
        try {
            const token = await getAccessToken();
            console.log(token)
            const url = `https://api.spotify.com/v1/search?query=${searchTerm}&type=artist&offset=0&limit=18`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLoading(false);
            updateArtists(response.data.artists.items);
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
        localStorage.setItem(props.user.uid + ': recentsearches', JSON.stringify(recents));
        setRecentSearches(recents);
        console.log('check');
    }

    const clickRecentSearch = (index) => {
        setRecents(index);
    }

    const removeRecentSearch = (e, index) => {
        e.stopPropagation();
        let newrecents = recentSearches.filter((_, i) => i !== index);
        setRecentSearches(newrecents);
        localStorage.setItem(props.user.uid + ': recentsearches', JSON.stringify(newrecents));
    }

    const clickArtist = (index) => {
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

    const addArtist = async (artistid, index) => {
        const artists = props.user.artists.map(artist => artist.artistid);
        if (artists.includes(artistid)) {
            console.log('already exists');
        }
        else {
            let yourDate = new Date();
            const offset = yourDate.getTimezoneOffset()
            yourDate = new Date(yourDate.getTime() - (offset*60*1000));
            const date =  yourDate.toISOString().split('T')[0];
            try {
                await updateDoc(doc(db, "users", props.user.uid), {
                    artists: arrayUnion({
                        artistid,
                        date
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
                        {artist.images[0] ? <img className="image" src={artist.images[0] ? artist.images[0].url : ""} alt={artist.name}></img> : <i className="fa-solid fa-user image"></i>}
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
                        {artist.images[0] ? <img className="image" src={artist.images[0] ? artist.images[0].url : ""} alt={artist.name}></img> : <i className="fa-solid fa-user image"></i>}
                        <i className={(props.user.artists.map(artist => artist.artistid).includes(artist.id)) ? 'add added fa-solid fa-check' : 'add fa-solid fa-plus'} onClick={() => addArtist(artist.id, index)}></i>
                    </div>
                    <p>{artist.name}</p>
                    <span><i className="fa-solid fa-fire-flame-curved"></i> {artist.popularity}</span>
                </div>
            ))
        }
    }

    return(
        <div className="searchartist">
            <form onSubmit={getArtists}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="name" value={searchTerm} onChange={(e) => updateSearchTerm(e.target.value)} placeholder="Search"/>
                <i className="fa-solid fa-xmark" onClick={clickX}></i>
            </form>
            <div className="results">
                {(artists.length === 0 && !loading) ? <p className="recenttitle">Recent Searches</p> :null}
                {result}
            </div>
        </div>
    )
}

export default Search;