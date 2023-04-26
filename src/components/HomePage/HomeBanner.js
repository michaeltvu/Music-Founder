import React from "react";
import './HomeBanner.css'

function HomeBanner() {

    const hoverBanner = () => {
        let banner = document.getElementsByClassName('banner-items')[0];
        let right = document.getElementsByClassName('bxs-right-arrow')[0];
        let left = document.getElementsByClassName('bxs-left-arrow')[0];

        right.classList.toggle('show');
        left.classList.toggle('show');
    }

    return(
        <div className="banner section" onMouseEnter={hoverBanner} onMouseLeave={hoverBanner}>
            <h3 className="title">News</h3>
            <i className="bx bxs-left-arrow"></i>
            <i className="bx bxs-right-arrow"></i>
            <div className="banner-items">
                <img src="https://imagez.tmz.com/image/a1/4by3/2022/07/30/a14b425e96d64028953e23a29a32db5f_md.jpg" alt="news1"/>
                <img src="https://i.ytimg.com/vi/Z_fV5d_eEoU/maxresdefault.jpg" alt="news1"/>
                <img src="https://s1.dmcdn.net/v/OMZ5A1RQMKzwOf-f_/x1080" alt="news1"/>
                <img src="https://images.genius.com/95178aab70046ac98f79a047c53003a3.1280x720x1.jpg" alt="news1"/>
            </div>
        </div>
    );
}

export default HomeBanner;