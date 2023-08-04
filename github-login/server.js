var express = require('express');
var cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');

const CLIENT_ID = process.env.VITE_GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_GITHUB_CLIENT_SECRET;

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
    const code = req.query.code;
    console.log('code', code);
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + code;
    await fetch('https://github.com/login/oauth/access_token' + params, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});

app.get('/getUser', async function (req, res) {
    
});

app.listen(3000, function () {
    console.log('Github login app listening on port 3000!');
});

