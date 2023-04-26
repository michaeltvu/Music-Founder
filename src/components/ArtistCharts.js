import React, { useState, useEffect } from "react";
import './ArtistCharts.css';
import { Chart, CategoryScale } from "chart.js";
import top2500JSON from '../assets/top2500.json'
import Linechart from "./Linechart";

Chart.register(CategoryScale);

function ArtistCharts() {
    const [top100, updateTop100] = useState(top2500JSON.slice(0, 50));
    const [openedArtist, updateOpenedAritist] = useState([null, 0]);
    const [quantity, updateQuantity] = useState(0);
    const [chartData, updateChartData] = useState({
        labels: ['3/10', '3/11', '3/12', '3/13', '3/14', '3/15', '3/16', '3/17', '3/18', '3/19', '3/20', '3/21', '3/22', '3/23', '3/24', '3/25'],
        datasets: [{
            // label: 'The Weeknd',
            data: [120, 100, 101, 102, 110, 111, 110, 102, 104, 105, 111, 109, 101, 110, 122],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
        }]
    });

    useEffect(() => {
        clickArtist(0);
        updateOpenedAritist([document.querySelector('.artist.p0'), 0])
    }, []);

    function sharePrice(listeners) {
        return Math.abs((listeners/10000)).toFixed(2);
    }

    function dailyPercent(listeners, daily) {
        return Math.abs((daily*100/listeners)).toFixed(2);
    }

    const clickArtist = (index) => {
        const artist = document.querySelector('.artist.p' + index);
        if(!artist.classList.contains('open')) {
            if(openedArtist[0] != null) {
                openedArtist[0].classList.remove('open');
                openedArtist[0].style.top = 85*openedArtist[1] + 'px';

                let addartist = document.querySelector('.p' + index + ' .expand .add');
                addartist.classList.remove('open');
            }
    
            // document.querySelector('.artist.p' + (openedArtist[1] + 1)).style.marginTop = '0px';
            // openedArtist = [artist, index];
            updateOpenedAritist([artist, index]);
            changeChartData(index);
            trash();
    
            artist.classList.add('open');
            artist.style.top = '0px';
            // document.querySelector('.artist.p' + (index + 1)).style.marginTop = '80px';
        }
    }

    const changeChartData = (index) => {
        updateChartData({
            labels: ['3/10', '3/11', '3/12', '3/13', '3/14', '3/15', '3/16', '3/17', '3/18', '3/19', '3/20', '3/21', '3/22', '3/23', '3/24', '3/25'],
            datasets: [{
                // label: 'The Weeknd',
                data: [120, 100, 101, 102, 110, 111, 110, 102, 104, 105, 111, 109, 101, 110, 122],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
            }]
        })
    }

    const spinUp = () => {
        updateQuantity(quantity + 1);
    }

    const spinDown = () => {
        if(quantity > 0) {
            updateQuantity(quantity - 1);
        }
    }

    const clickOpenArtist = (index) => {
        let addartist = document.querySelector('.p' + index + ' .expand .add');
        addartist.classList.toggle('open')
        trash();
    }

    const trash = () => {
        updateQuantity(0);
    }

    return(
        <div className="artist-charts">
            <div className="top100">
                <div className="header">
                    <label className="title">Top 50 Artists</label>
                    {/* <nav>
                        <button>1D</button>
                        <button>1W</button>
                        <button>2W</button>
                        <button>1M</button>
                    </nav> */}
                </div>

                <div className="artists">
                    {top100.map((artist, index) => (
                        <div key={index} className={"artist p" + index} onClick={() => clickArtist(index)} style={{top: (index*85 + 'px')}}>
                            <div className="default">
                                <div className="left">
                                    <label className="position">{artist.position}</label>
                                    <img className={"img"/* + index*/} src={artist.img} alt={artist.name}/>
                                    <div className="info">
                                        <label className="name">{artist.name}</label>
                                        <label className="genre">{sharePrice(artist.listeners)}</label>
                                    </div>
                                </div>
                                <span className="change">
                                    <label className={"currency " + (artist.daily > 0 ? "pos" : artist.daily < 0 ? 'neg' : "none")}>{artist.daily > 0 ? '+' + sharePrice(artist.daily): artist.daily < 0 ? ' -' + sharePrice(artist.daily) : '-'}</label>
                                    <label className={"percent " + (artist.daily > 0 ? "pos" : artist.daily < 0 ? 'neg' : "none")}>{artist.daily > 0 ? '+' + dailyPercent(artist.listeners, artist.daily) + '%' : artist.daily < 0 ? ' -' + dailyPercent(artist.listeners, artist.daily) + '%' : '0%'}</label>
                                </span>
                                <i className="bx bx-chevron-right"></i>
                            </div>
                            <div className="expand">
                                {index === openedArtist[1] ? <iframe title={"artist " + index} style={{borderRadius: '15px', width: '400px', height: '160px'}} src={"https://open.spotify.com/embed/artist/" + artist.id + "?utm_source=generator"} frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>: <></>}
                                <div className="stats">
                                    <Linechart className="line-chart" chartData={chartData}/>
                                </div>
                                <div className="add">
                                    <i className='bx bx-plus' onClick={() => clickOpenArtist(index)}></i>
                                    <div className="addartist">
                                        <label>Add Artist</label>
                                        <div className="values">
                                            <span className="totals">
                                                <label>Shares Owned: </label>
                                                <label className="total">{'$' + (quantity*sharePrice(artist.listeners)).toFixed(2)}</label>
                                            </span>
                                            <span className="totals">
                                                <label>Value Owned: </label>
                                                <label className="total">{'$' + (quantity*sharePrice(artist.listeners)).toFixed(2)}</label>
                                            </span>
                                            <span className="totals">
                                                <label>Total Value: </label>
                                                <label className="total">{'$' + (quantity*sharePrice(artist.listeners)).toFixed(2)}</label>
                                            </span>
                                            <div className="quantity">
                                                <label>Quantity: </label>
                                                <span className="input">
                                                    <input type="number" pattern="[0-9]*" placeholder="0" min="0" step="1" value={quantity} onChange={(e) => updateQuantity((v) => (e.target.validity.valid ? e.target.value : v))}></input>
                                                    <div className="spin">
                                                        <i className='bx bxs-chevron-up-circle' onClick={spinUp}></i>
                                                        <i className='bx bxs-chevron-down-circle' onClick={spinDown}></i>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="buttons">
                                            <i className='bx bxs-trash' onClick={trash}></i>
                                            <i className='bx bxs-plus-circle' ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="smallportfolio">
                <div>
                    <label></label>
                </div>
            </div>
        </div>
    );
}

export default ArtistCharts;