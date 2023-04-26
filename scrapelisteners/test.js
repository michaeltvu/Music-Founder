const { link } = require('fs');
const puppeteer = require('puppeteer');

async function scrapeArtist(artistname) {
    var startTime = performance.now()
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://open.spotify.com/search/' + artistname + '/artists');

    const topchoice = await page.waitForSelector('#searchPage > div > div > div > div.iKwGKEfAfW7Rkx2_Ba4E > div:nth-child(1)');
    await topchoice.click();
    
    const listenersHTML = await page.waitForSelector('#main > div > div.Root__top-container.Root__top-container--right-sidebar-visible > div.Root__main-view > div.main-view-container > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.contentSpacing.NXiYChVp4Oydfxd7rT5r.RMDSGDMFrx8eXHpFphqG > div.RP2rRchy4i8TIp1CTmb7 > span.Ydwa1P5GkCggtLlSvphs');
    const listenersTxt = await listenersHTML.getProperty('textContent');
    const listenersRawText = await listenersTxt.jsonValue();

    const nameHTML = await page.waitForSelector('#main > div > div.Root__top-container.Root__top-container--right-sidebar-visible > div.Root__main-view > div.main-view-container > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.contentSpacing.NXiYChVp4Oydfxd7rT5r.RMDSGDMFrx8eXHpFphqG > div.RP2rRchy4i8TIp1CTmb7 > span.rEN7ncpaUeSGL9z0NGQR > h1');
    const nameTxt = await nameHTML.getProperty('textContent');
    const nameRawText = await nameTxt.jsonValue();

    // const imgHTML = await page.waitForSelector('#main > div > div.Root__top-container.Root__top-container--right-sidebar-visible > div.Root__main-view > div.main-view-container > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.contentSpacing.NXiYChVp4Oydfxd7rT5r.RMDSGDMFrx8eXHpFphqG > div._gLjHpwOxHFwo5nLM8hb > div > img');
    // const imgSrc = await imgHTML.getProperty('src');
    // const imgSrcText = await imgSrc.jsonValue();
    const imgSrcText = await scrapeArtistImage(artistname)

    let top5 = [];
    top5.push(await (await (await page.waitForSelector("#main > div > div.Root__top-container.Root__top-container--right-sidebar-visible > div.Root__main-view > div.main-view-container > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.BL__GuO2JsHMR6RgNfwY > div.contentSpacing > div:nth-child(1) > div > div.q9GR66ZTM4HH42Z_qroQ.yTBLU_z7yk9Xp_oN48Q2 > div > div > div:nth-child(2) > div:nth-child(1) > div > div.gvLrgQXBFVW6m9MscfFA > div > a")).getProperty('href')).jsonValue());
    top5.push(await (await (await page.waitForSelector("#main > div > div.Root__top-container.Root__top-container--right-sidebar-visible > div.Root__main-view > div.main-view-container > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.BL__GuO2JsHMR6RgNfwY > div.contentSpacing > div:nth-child(1) > div > div.q9GR66ZTM4HH42Z_qroQ.yTBLU_z7yk9Xp_oN48Q2 > div > div > div:nth-child(2) > div:nth-child(2) > div > div.gvLrgQXBFVW6m9MscfFA > div > a")).getProperty('href')).jsonValue());
    top5.push(await (await (await page.waitForSelector("#main > div > div.Root__top-container.Root__top-container--right-sidebar-visible > div.Root__main-view > div.main-view-container > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.BL__GuO2JsHMR6RgNfwY > div.contentSpacing > div:nth-child(1) > div > div.q9GR66ZTM4HH42Z_qroQ.yTBLU_z7yk9Xp_oN48Q2 > div > div > div:nth-child(2) > div:nth-child(3) > div > div.gvLrgQXBFVW6m9MscfFA > div > a")).getProperty('href')).jsonValue());
    top5.push(await (await (await page.waitForSelector("#main > div > div.Root__top-container.Root__top-container--right-sidebar-visible > div.Root__main-view > div.main-view-container > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.BL__GuO2JsHMR6RgNfwY > div.contentSpacing > div:nth-child(1) > div > div.q9GR66ZTM4HH42Z_qroQ.yTBLU_z7yk9Xp_oN48Q2 > div > div > div:nth-child(2) > div:nth-child(4) > div > div.gvLrgQXBFVW6m9MscfFA > div > a")).getProperty('href')).jsonValue());
    top5.push(await (await (await page.waitForSelector("#main > div > div.Root__top-container.Root__top-container--right-sidebar-visible > div.Root__main-view > div.main-view-container > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.BL__GuO2JsHMR6RgNfwY > div.contentSpacing > div:nth-child(1) > div > div.q9GR66ZTM4HH42Z_qroQ.yTBLU_z7yk9Xp_oN48Q2 > div > div > div:nth-child(2) > div:nth-child(5) > div > div.gvLrgQXBFVW6m9MscfFA > div > a")).getProperty('href')).jsonValue());

    top5 = top5.map(element => {
        return element.slice(31);
    })

    // console.log('id: ' + page.url().slice(32));
    // console.log('name: ' + nameRawText);
    // console.log('listeners: ' + listenersRawText);
    // console.log('top5: ' + top5);
    browser.close();
    var endTime = performance.now()
    // console.log(`Call to scrapeArtist took ${endTime - startTime} milliseconds`)
    const results = {
        'id': page.url().slice(32),
        'name': nameRawText,
        'listeners': listenersRawText,
        'top5': top5,
        'img': imgSrcText
    }
    // console.log(results)
    return results
}

async function scrapeArtistImage(artistname) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://open.spotify.com/search/' + artistname + '/artists');

    const imageHTML = await page.waitForSelector('#searchPage > div > div > div > div.iKwGKEfAfW7Rkx2_Ba4E > div:nth-child(1) > div > div.xBV4XgMq0gC5lQICFWY_ > div.g4PZpjkqEh5g7xDpCr2K.yYflTYbufy7rATGQiZfq > div > img');
    const imgSrc = await imageHTML.getProperty('src');
    const imgSrcText = await imgSrc.jsonValue();

    // console.log('image src: ' + imgSrcText);
    browser.close();
    return imgSrcText;
}

async function scrapeArtistTop5Songs(artistname) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://kworb.net/spotify/listeners.html');
    // await page.waitForSelector('body > div.container > div:nth-child(4) > table > tbody > tr > td');

    const listenersHTML = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('table.sortable tbody tr td'));
        let links = elements.map(element => {
            return element.textContent
        })
        return links;
    });
    document.querySelector("#main > div > div.Root__top-container.Root__top-container--right-sidebar-visible > div.Root__main-view > div.main-view-container > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.BL__GuO2JsHMR6RgNfwY > div.contentSpacing > div:nth-child(1) > div > div.q9GR66ZTM4HH42Z_qroQ.yTBLU_z7yk9Xp_oN48Q2 > div > div > div:nth-child(2) > div:nth-child(1) > div > div.gvLrgQXBFVW6m9MscfFA > div > a")
    document.querySelector("#main > div > div.Root__top-container.Root__top-container--right-sidebar-visible > div.Root__main-view > div.main-view-container > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.BL__GuO2JsHMR6RgNfwY > div.contentSpacing > div:nth-child(1) > div > div.q9GR66ZTM4HH42Z_qroQ.yTBLU_z7yk9Xp_oN48Q2 > div > div > div:nth-child(2) > div:nth-child(2) > div > div.gvLrgQXBFVW6m9MscfFA > div > a")
    t_yrXoUO3qGsJS4Y6iXX
}

async function scrapeTop2500() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://kworb.net/spotify/listeners.html');
    // await page.waitForSelector('body > div.container > div:nth-child(4) > table > tbody > tr > td');

    const listenersHTML = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('table.sortable tbody tr td'));
        let links = elements.map(element => {
            return element.textContent
        })
        return links;
    });

    let artists = [];

    for(let i = 0; i < 200; i += 4) {
        const details = await scrapeArtist(listenersHTML[i+1])
        const artist = {
            'id': details.id,
            'position': parseFloat(listenersHTML[i].replace(/,/g, '')),
            'name': listenersHTML[i+1],
            'listeners': parseFloat(listenersHTML[i+2].replace(/,/g, '')),
            'daily': parseFloat(listenersHTML[i+3].replace(/,/g, '')),
            'img': details.img,
            'top5': details.top5
        }
        console.log(artist.name)
        artists.push(artist)
    }
    browser.close();

    require('fs').writeFile('./top2500.json', JSON.stringify(artists), (err) => {
        if (err) {
            console.error('Crap happens');
        }
    });

    // return artists.slice(0, 100);

}

const top = require('./top2500.json')

function fix() {
    // import top from './top2500.json'
    let newtop = []
    for(let i = 0; i < top.length; i++) {
        newtop.push({
            'position': top[i].position,
            'name': top[i].name,
            'listeners': top[i].listeners*1000,
            'daily': top[i].daily,
            'img': top[i].img
        })
    }
    require('fs').writeFile('./newtop2500.json', JSON.stringify(newtop), (err) => {
        if (err) {
            console.error('Crap happens');
        }
    });
}

// fix();
scrapeTop2500();
// scrapeArtist(process.argv[2])
