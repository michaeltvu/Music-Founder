var client_id = 'ef30825fefca4fc2930a17f01a5800a1';
var client_secret = '048730d76cda4d09844001110e55bad6';
var axios = require('axios');
var qs = require('qs');

async function getAccessToken() {
    try {
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

async function getArtist(search, limit) {
    try {
        const token = await getAccessToken();
        console.log(token)
        const url = `https://api.spotify.com/v1/search?query=${search}&type=artist&offset=0&limit=${limit}`
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data.artists.items[0])
    }
    catch (error) {
        console.log(error);
    }
}

getArtist(process.argv[2], 5)
