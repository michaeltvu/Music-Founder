import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from 'qs';
import { Buffer } from "buffer";
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../admin/firebase.js';
import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs'
import "./Artist.css";

export function Artist(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState();
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [relatedartists, setRelatedArtists] = useState([]);
    const [artist, setArtist] = useState();
    const [backgroundColor, setBackgroundColor] = useState([35, 35, 35]);
    const [loadingArtist, setLoadingArtist] = useState(true);
    const [loadingTracks, setLoadingTracks] = useState(true);
    const [loadingAlbums, setLoadingAlbums] = useState(true);
    const [loadingRelated, setLoadingRelated] = useState(true);
    const [added, setAdded] = useState(-1);

    useEffect(() => {
        // if (!props.artist) {
        //     navigate('/');
        // }
        // if (artist) {
        //     props.updateArtist(artist.id);
        // }
        if (!token) {
            getAccessToken();
        }
        else {
            if (location.pathname.split('/').length === 3) {
                const artistid = location.pathname.split('/')[2]
                setAdded(props.user.artists.map((artist, index) => artist.artistid).indexOf(artistid));
                getArtist(artistid);
                getTopTracks(artistid);
                getAlbums(artistid);
                getRelatedArtists(artistid);
            }
        }
    }, [props, token]);

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

    const getPalette = (url) => {
        return new Promise(resolve => {
               const img = new Image();
               img.crossOrigin = 'Anonymous';
               img.onload = () => {
                   let colorThief = new ColorThief();
                   resolve(colorThief.getPalette(img));
               }
               img.src = url;
           })
    }

    async function getArtist(artistid) {
        setLoadingArtist(true);
        try {
            const url = `https://api.spotify.com/v1/artists/${artistid}`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setArtist(response.data);
            if (response.data.images.length > 0) {
                setBackgroundColor((await getPalette(response.data.images[0].url))[0])
            }
            setLoadingArtist(false);
        }
        catch (error) {
            console.log(error);
            setLoadingArtist(false);
        }
    }

    async function getTopTracks(artistid) {
        setLoadingTracks(true);
        try {
            const url = `https://api.spotify.com/v1/artists/${artistid}/top-tracks?market=US`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTracks(response.data.tracks);
            setLoadingTracks(false);
        }
        catch (error) {
            console.log(error);
            setLoadingTracks(false);
        }
    }

    async function getAlbums(artistid) {
        setLoadingAlbums(true);
        try {
            const url = `https://api.spotify.com/v1/artists/${artistid}/albums`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // .filter(album => album.album_group === "album");
            let albumnames = [];
            let albums = [];
            for (let i = 0; i < response.data.items.length; i++) {
                if (!albumnames.includes(response.data.items[i].name)) {
                    albumnames.push(response.data.items[i].name);
                    albums.push(response.data.items[i]);
                }
            }
            setAlbums(albums);
            setLoadingAlbums(false);
        }
        catch (error) {
            console.log(error);
            setLoadingAlbums(false);
        }
    }

    async function getRelatedArtists(artistid) {
        setLoadingRelated(true);
        try {
            const url = `https://api.spotify.com/v1/artists/${artistid}/related-artists`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRelatedArtists(response.data.artists);
            setLoadingRelated(false);
        }
        catch (error) {
            console.log(error);
            setLoadingRelated(false);
        }
    }

    const clickTrack = (index) => {
        window.open(tracks[index].external_urls.spotify, '_blank').focus();
    }

    const clickAlbum = (index) => {
        window.open(albums[index].external_urls.spotify, '_blank').focus();
    }

    const clickLink = () => {
        window.open(artist.external_urls.spotify, '_blank').focus();
    }

    const clickRelatedArtist = (index) => {
        navigate(`/artist/${relatedartists[index].id}`);
    }

    const addArtist = async () => {
        let date = new Date();
        const offset = date.getTimezoneOffset()
        date = new Date(date.getTime() - (offset*60*1000));
        date = new Date(date.getTime())
        date =  date.toISOString().split('T')[0];
        try {
            await updateDoc(doc(db, "users", props.user.uid), {
                artists: arrayUnion({
                    artistid: artist.id,
                    date,
                    originalscore: artist.popularity,
                    score: artist.popularity
                })
            })
            props.refreshUser(props.user.uid);
        } catch(error) {
            console.log(error);
        }
    }

    const removeArtist = async () => {
        const artistpage = document.querySelector('.artistpage');
        artistpage.classList.add('confirmation');
        // try {
        //     await updateDoc(doc(db, "users", props.user.uid), {
        //         artists: arrayRemove(props.user.artists[added])
        //     })
        //     setAdded(-1);
        //     props.refreshUser(props.user.uid);
        // } catch(error) {
        //     console.log(error);
        // }
    }

    const cancelRemove = () => {
        const artistpage = document.querySelector('.artistpage');
        artistpage.classList.remove('confirmation');
    }

    const convertDate = (date) => {
        return (`${date.split('-')[1]}/${date.split('-')[2]}/${date.split('-')[0].substring(2,5)}`);
    }

    if (!loadingArtist && !loadingTracks && !loadingAlbums && !loadingRelated) {
        return(
            <div className="artistpage" style={{backgroundImage: `linear-gradient(0deg, rgb(30, 30, 30), 75%, rgb(${backgroundColor}, 0.5)`}}>
                <div className="artistbox">
                    <div className="artistinfo">
                        <div className="popularity">
                            <span className="currentpopularity">{artist.popularity}<i className="fa-solid fa-fire-flame-curved"></i></span>
                            {(added !== -1) ? 
                            <div className="added">
                                <span className="addedpopularity">Added At {props.user.artists[added].originalscore}<i className="fa-solid fa-fire-flame-curved"></i></span>
                                <p>{convertDate(props.user.artists[added].date)}</p>
                            </div> : null}
                        </div>
                        {artist.images.length ? <img className="image" src={artist.images[0].url} alt={artist.name}/> : <i className="fa-solid fa-user image"></i>}
                        <div className="sub">
                            <p className="name">{artist.name}</p>
                            <p className="followers"><i className="fa-brands fa-spotify"></i> {artist.followers.total.toLocaleString() + ' followers'}</p>
                            <div className="otherbuttons">
                                {(added !== -1) ? <span className="remove" onClick={removeArtist}>Remove Artist<i className="fa-solid fa-xmark"></i></span> : <span className="add" onClick={addArtist}>Add Artist <i className="fa-solid fa-plus"></i></span> }
                                <i className="fa-solid fa-link spotify" onClick={clickLink}></i>
                            </div>
                        </div>
                    </div>
                    <div className="artistmusic">
                        <div className="collection">
                            <p className="title">Top Tracks</p>
                            <div className="toptracks">
                                {tracks.slice(0, 5).map((track, index) => (
                                    <div className="track" key={index} onClick={() => clickTrack(index)}>
                                        <div className="info">
                                            <img className="image" src={track.album.images[0].url} alt={track.name}/>
                                            <p className="name">{track.name}</p>
                                            <p className="album name">{track.album.name}</p>
                                        </div>
                                        <span className="popularity">{track.popularity}<i className="fa-solid fa-fire-flame-curved"></i></span>
                                        <i className="fa-brands fa-spotify link"></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className="collection">
                            <p className="title">Albums</p>
                            <div className="albums">
                                {albums.slice(0, 4).map((album, index) => (
                                    <div className="album" key={index} onClick={() => clickAlbum(index)}>
                                        <img className="image" src={album.images[0].url} alt={album.name}/>
                                        <p>{album.name}</p>
                                        <i className="fa-brands fa-spotify link"></i>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                        <div className="collection">
                            <p className="title">Related Artists</p>
                            <div className="relatedartists">
                                {relatedartists.slice(0, 8).map((relatedartist, index) => (
                                    <div className="relatedartist" key={index} onClick={() => clickRelatedArtist(index)}>
                                        {relatedartist.images.length ? <img className="image" src={relatedartist.images[0].url} alt={relatedartist.name}/> : <i className="fa-solid fa-user image"></i>}
                                        <p>{relatedartist.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {(added !== -1) ? 
                    <div className="popup" style={{backgroundImage: `linear-gradient(180deg, rgb(${backgroundColor}, 0.5), rgb(35, 35, 35) 35%`}}>
                        {/* <p>REMOVE</p> */}
                        <div className="info">
                            <div>
                                {artist.images.length ? <img className="image" src={artist.images[0].url} alt={artist.name}/> : <i className="fa-solid fa-user image"></i>}
                                <p className="name">{artist.name}</p>
                            </div>
                            {/* <div className="added">
                                <span className="currentpopularity">{artist.popularity} <i className="fa-solid fa-fire-flame-curved"></i></span>
                                <span className="addedpopularity">Added At {props.user.artists[added].originalscore}<i className="fa-solid fa-fire-flame-curved"></i></span>
                                <p className="date">{convertDate(props.user.artists[added].date)}</p>
                            </div> */}
                        </div>
                        <p className="disclaimer">*Clicking confirm will remove this artist and adding this artist again will reset the add score and date.</p>
                        <div className="buttons">
                            <p className="cancel" onClick={cancelRemove}>Cancel</p>
                            <p className="confirm">Remove</p>
                        </div>
                    </div>: null}
            </div>
        )
    }
    else {
        return(
            <div className="artistpage">
                <div className="spinnerbox"><p className="spinner"></p></div>
            </div>
        )
    }
}

export default Artist;