import "./Portfolio.css"
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

function Portfolio() {
    const yourartists = [
        {name: "Yeat", listeners: 12017971, ogstreams: 7.9, daily: 55222, invested: 109, img: "https://i.scdn.co/image/ab6761610000e5eb163e4c3a83061dda3aac5d81", genre: "Vapor rap"},
        {name: "Playboi Carti", listeners: 16171558, ogstreams: 12.9, daily: 7975, invested: 150, img: "https://i.scdn.co/image/ab6761610000e5eb504ff11d788162fbf8078654", genre: "Trap"},
        {name: "NAV", listeners: 10023908, ogstreams: 10.1, daily: -57500, invested: 99, img: "https://i.scdn.co/image/ab6761610000e5ebf276b6e4b25bb6fb7b942ab2", genre: "Melodic rap"},
        {name: "Lucki", listeners: 11478558, ogstreams: 1.1, daily: 34569, invested: 25, img: "https://i.scdn.co/image/ab6761610000e5eb1fa813ff2470c4a9097f1982", genre: "Vapor rap"}
    ];

    function random_rgba(x) {
        var colors = [];
        for(let i = x; i > 0; i--) {
            var o = Math.round, r = Math.random, s = 205;
            colors.push('rgba(' + o(r()*s + 50) + ',' + o(r()*s + 50) + ',' + o(r()*s + 50) + ')');
        }
        return colors;
    }

    function sharePrice(listeners) {
        return (listeners/250000).toFixed(2);
    }

    function dailyPercent(listeners, daily) {
        return Math.abs((daily*100/listeners).toFixed(2));
    }

    function dailyShare(listeners, daily) {
        return (sharePrice(listeners) * Math.abs((daily*100/listeners))).toFixed(2);
    }

    useEffect(() => {

        document.getElementById("pie-chart").remove();
        document.getElementById("chartdiv").innerHTML += '<canvas id="pie-chart"></canvas>';

        new Chart(document.getElementById("pie-chart"), {
            type: 'doughnut',
            data: {
                labels: yourartists.map(artist => artist.name),
                datasets: [{
                    label: "Shares",
                    data: yourartists.map(artist => artist.invested),
                    backgroundColor: random_rgba(yourartists.length),
                    borderColor: 'rgb(20, 20, 20)',
                    color: 'rgb(256, 256, 256)',
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                        color: 'rgb(256, 256, 256)',
                        font: {
                            size: 14,
                            family: 'Gotham Pro'
                        }
                    },
                    position: 'bottom',
                    color: 'rgb(256, 256, 256)'
                  },
                },
                layout: {
                    padding: 10
                }
              }
        });
    });

    return(
        <div className="Portfolio">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.4/css/boxicons.min.css" rel="stylesheet" type="text/css"></link>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" rel="stylesheet" type="text/css"></link>

            <div className="col1">
                <div className="summary">
                    <h1 className="title">Your Portfolio {/*<i className='bx bx-chevron-down'></i> */}</h1>
                    <h2 className="total-value">$71,560</h2>
                    <div className="gain">
                        <label>Daily Gain</label>
                        <label className="gain-lbl">{'+$153 (+0.21%)'}</label>
                    </div>
                    <div className="gain">
                        <label>Total Gain</label>
                        <label className="gain-lbl">{'+$33,532 (+31.21%)'}</label>
                    </div>
                </div>
            </div>
            <div className="col2">
                <div className="chart">
                    <span className="nav"> 
                        <label className="title">Shares</label>
                        <span>
                            <button><i className="fa-solid fa-ellipsis-vertical"></i></button>
                        </span>
                    </span>
                    <div id="chartdiv">
                        <canvas id="pie-chart"></canvas>
                    </div>
                </div>
                <div className="your-artists">
                    <label className="title">Artists</label>
                    {yourartists.map((artist, index) => (
                        <div key={index} className={"your-artist " + index}>
                            <div className="left">
                                <img className={"img"/* + index*/} src={artist.img} alt={artist.name}/>
                                <div className="info">
                                    <label className="name">{artist.name}</label>
                                    <label className="genre">{sharePrice(artist.listeners)}</label>
                                </div>
                            </div>
                            <span className="change">
                                <label className={"currency " + (artist.daily > 0 ? "pos" : "neg")}>{artist.daily > 0 ? '+' + dailyShare(artist.listeners, artist.daily):' -' + dailyShare(artist.listeners, artist.daily)}</label>
                                <label className={"percent " + (artist.daily > 0 ? "pos" : "neg")}>{artist.daily > 0 ? '+' + dailyPercent(artist.listeners, artist.daily) + '%' :' -' + dailyPercent(artist.listeners, artist.daily) + '%'}</label>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Portfolio;