import React from "react";
import './MyArtistsTab.css'

function MyArtistsTab() {

    const yourartists = [
        {name: "Yeat", streams: 8.1, oldstreams: 5.5, img: "https://i.scdn.co/image/ab6761610000e5eb163e4c3a83061dda3aac5d81"},
        {name: "Playboi Carti", streams: 15.3, oldstreams: 22.1, img: "https://i.scdn.co/image/ab6761610000e5eb504ff11d788162fbf8078654"},
        {name: "NAV", streams: 9.4, oldstreams: 9.8, img: "https://i.scdn.co/image/ab6761610000e5ebf276b6e4b25bb6fb7b942ab2"},
        {name: "Lucki", streams: 1.6, oldstreams: 1.2, img: "https://i.scdn.co/image/ab6761610000e5eb1fa813ff2470c4a9097f1982"},
        {name: "NAV", streams: 9.4, oldstreams: 9.8, img: "https://i.scdn.co/image/ab6761610000e5ebf276b6e4b25bb6fb7b942ab2"}
    ];

    // const hoverArtistTab = () => {
    //     // let scrollbar = document.get
    // }

    const hoverArtist = (index) => {
        let background = document.getElementsByClassName('artist ' + index)[0];
        let image = document.getElementsByClassName('image ' + index)[0];
        let img = document.getElementsByClassName('img ' + index)[0];
        background.classList.toggle('hover');
        image.classList.toggle('hover');
        img.classList.toggle('hover');
    }

    return(
        <div className="my-artists-tab">
            {/* <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'></link> */}
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" rel="stylesheet" type="text/css"></link>
            <div className="header">
                <i className="fas fa-users"></i>
                <p className="title">Your Artists</p>
            </div>
            <div className="artists">
                {yourartists.map((artist, index) => (
                    <div key={index} className={"artist " + index} onMouseEnter={() => {hoverArtist(index);}} onMouseLeave={() => {hoverArtist(index);}}>
                        <div className={"image " + index}>
                            <img className={"img " + index} src={artist.img} alt={artist.name}/>
                        </div>
                        <div className="streams">
                            <i className={"fas " + 
                                (artist.streams/artist.oldstreams>1.15 ? "fa-angles-up": 
                                artist.streams/artist.oldstreams>1.05 ? "fa-angle-up":
                                artist.streams/artist.oldstreams<0.85 ? "fa-angles-down":
                                artist.streams/artist.oldstreams<0.95 ? "fa-angle-down" : "fa-minus")}>
                            </i>
                            <p className="text">{artist.streams + "M streams"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyArtistsTab;