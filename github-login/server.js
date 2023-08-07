var express = require('express');
const nodemailer = require('nodemailer');
const { Octokit } = require("@octokit/rest");
var cors = require('cors');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var bodyParser = require('body-parser');

require('dotenv').config();

const CLIENT_ID = process.env.VITE_GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_GITHUB_CLIENT_SECRET;

var app = express();

app.use(cors());
app.use(bodyParser.json());

// console.log(">>", process);
// // var accessToken = undefined;
// console.log(accessToken);
var octokit = undefined;
// var username = undefined;

async function addRepoTopic(user, repository) {
    await octokit.request('PUT /repos/{owner}/{repo}/topics', {
        owner: user,
        repo: repository,
        names: [
            'arsync'
        ],
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

async function getRepositories(user, access_token, filter = "all") {
    octokit = new Octokit({
        auth: access_token,
        request: {
            fetch,
        }
    });

    const result = await octokit.request('GET /users/{username}/repos', {
        username: user,
        headers: {
            authorization: access_token,
        }
    })
    console.log("this is result : ", result);
    var repo = [];
    for (let i = 0; i < result["data"].length; i++) {
        if (filter == "all") {
            var repoJSON = {
                "name": result["data"][i]["name"],
                // "commit_msg": await getLatestCommit(user, result["data"][i]["name"]),
                "updated_at": result["data"][i]["updated_at"],
            }
            // console.log(tags);
            repo.push(repoJSON);
        }
        else if (filter == "arsync") {
            if (result["data"][i]["topics"][0] == "arsync") {
                var repoJSON = {
                    "name": result["data"][i]["name"],
                    "commit_msg": await getLatestCommit(user, result["data"][i]["name"], access_token),
                    "updated_at": result["data"][i]["updated_at"],
                }
                // console.log(tags);
                repo.push(repoJSON);
                // console.log(result["data"][i]["name"]);
            };
        }
        // console.log(result["data"][i]["name"]);
    };
    console.log("This is very important please print please : ", repo)
    return repo;
}

async function getLatestCommit(user, repository, access_token) {
    const commitList = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: user,
        repo: repository,
        headers: {
            authorization: access_token,
        }
    })
    return commitList["data"][0]["commit"]["message"];
}
async function createOrUpdateWorkflow(user, repository, filePath) {
    try {
        // Checking for file
        const { data: existingFile } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: user,
            repo: repository,
            path: filePath,
        })

        //updating file if exists
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: user,
            repo: repository,
            path: filePath,
            message: 'updated workflow',
            committer: {
                name: 'Team Last Minute',
                email: 'lastmin@gmail.com'
            },
            headers: {
                authorization: accessToken,
            },
            content: 'bmFtZTogQXJkcml2ZSBXb3JrZmxvdwpvbjogW3B1c2hdCmVudjoKICAjIFNldHRpbmcgYW4gZW52aXJvbm1lbnQgdmFyaWFibGUgd2l0aCB0aGUgdmFsdWUgb2YgYSBjb25maWd1cmF0aW9uIHZhcmlhYmxlCiAgZW52X3ZhcjogJHt7IHZhcnMuRU5WX0NPTlRFWFRfVkFSIH19CmpvYnM6CiAgYnVpbGQ6CiAgICBydW5zLW9uOiB1YnVudHUtbGF0ZXN0CiAgICBzdGVwczoKICAgICAgLSB1c2VzOiBhY3Rpb25zL2NoZWNrb3V0QHYzCiAgICAgIC0gdXNlczogYWN0aW9ucy9zZXR1cC1ub2RlQHYzCiAgICAgICAgd2l0aDoKICAgICAgICAgIG5vZGUtdmVyc2lvbjogJzE4JwogICAgICAtIG5hbWU6IEluc3RhbGwgRGVwZW5kZW5jaWVzCiAgICAgICAgcnVuOiB8CiAgICAgICAgIGVjaG8gIkluc3RhbGxpbmcgRGVwZW5kZW5jaWVzLi4uLiEiCiAgICAgIC0gbmFtZTogQnVpbGQgdGhlIHN0YXRpYyB3ZWJzaXRlCiAgICAgICAgcnVuOiB8CiAgICAgICAgIGNkIHN0YXRpYy13ZWJzaXRlCiAgICAgICAgIGxzCiAgICAgIC0gbmFtZTogVXBsb2FkIHRvIEFyZHJpdmUKICAgICAgICBydW46IHwKICAgICAgICAgZWNobyAiVXBsb2FkaW5nIHRvIEFyZHJpdmUuLi4uISIKICAgICAgICAgZWNobyAicmVwb3NpdG9yeSB2YXJpYWJsZSAgJHt7IHZhcnMuUkVQT1NJVE9SWV9WQVIgfX0iCiAgICAgICAgIyAgYXJkcml2ZSAtLWhlbHAKICAgICAgLSBuYW1lOiBDcmVhdGluZyBhIE1hbmlmZXN0CiAgICAgICAgcnVuOiB8CiAgICAgICAgICBlY2hvICJDcmVhdGluZyBhIG1hbmlmZXN0Li4uLiEiCiAgICAgICAgICBlY2hvICJNYW5pZmVzdCBjcmVhdGVkIFN1Y2Nlc3NmdWxseSEi',
            sha: existingFile.sha,
        })
        console.log(`File is updated successfully!`);
    }
    //if file doesn't exist
    catch (error) {
        console.log(`File not found! Created a new file.`);
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: user,
            repo: repository,
            path: filePath,
            message: 'Added workflow by arsync',
            committer: {
                name: 'Team Last Minute',
                email: 'lastmin@gmail.com'
            },
            content: 'bmFtZTogQXJkcml2ZSBXb3JrZmxvdwpvbjogW3B1c2hdCmVudjoKICAjIFNldHRpbmcgYW4gZW52aXJvbm1lbnQgdmFyaWFibGUgd2l0aCB0aGUgdmFsdWUgb2YgYSBjb25maWd1cmF0aW9uIHZhcmlhYmxlCiAgZW52X3ZhcjogJHt7IHZhcnMuRU5WX0NPTlRFWFRfVkFSIH19CmpvYnM6CiAgYnVpbGQ6CiAgICBydW5zLW9uOiB1YnVudHUtbGF0ZXN0CiAgICBzdGVwczoKICAgICAgLSB1c2VzOiBhY3Rpb25zL2NoZWNrb3V0QHYzCiAgICAgIC0gdXNlczogYWN0aW9ucy9zZXR1cC1ub2RlQHYzCiAgICAgICAgd2l0aDoKICAgICAgICAgIG5vZGUtdmVyc2lvbjogJzE4JwogICAgICAtIG5hbWU6IEluc3RhbGwgRGVwZW5kZW5jaWVzCiAgICAgICAgcnVuOiB8CiAgICAgICAgIGVjaG8gIkluc3RhbGxpbmcgRGVwZW5kZW5jaWVzLi4uLiEiCiAgICAgIC0gbmFtZTogQnVpbGQgdGhlIHN0YXRpYyB3ZWJzaXRlCiAgICAgICAgcnVuOiB8CiAgICAgICAgIGNkIHN0YXRpYy13ZWJzaXRlCiAgICAgICAgIGxzCiAgICAgIC0gbmFtZTogVXBsb2FkIHRvIEFyZHJpdmUKICAgICAgICBydW46IHwKICAgICAgICAgZWNobyAiVXBsb2FkaW5nIHRvIEFyZHJpdmUuLi4uISIKICAgICAgICAgZWNobyAicmVwb3NpdG9yeSB2YXJpYWJsZSAgJHt7IHZhcnMuUkVQT1NJVE9SWV9WQVIgfX0iCiAgICAgICAgIyAgYXJkcml2ZSAtLWhlbHAKICAgICAgLSBuYW1lOiBDcmVhdGluZyBhIE1hbmlmZXN0CiAgICAgICAgcnVuOiB8CiAgICAgICAgICBlY2hvICJDcmVhdGluZyBhIG1hbmlmZXN0Li4uLiEiCiAgICAgICAgICBlY2hvICJNYW5pZmVzdCBjcmVhdGVkIFN1Y2Nlc3NmdWxseSEi'
            , headers: {
                authorization: accessToken,
            }
        })
    }
    // addTags(user, repository);
    addRepoTopic(user, repository);

}

function send_mail() {
    const { to, subject, text } = {
        "to": "alteek05@gmail.com",
        "subject": "Project arsync",
        "text": "Please click on this link to login with ardrive!"
    };

    // Replace these credentials with your actual email credentials
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sasankmadati@gmail.com',
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'sasankmadati@gmail.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            // res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            // res.send('Email sent successfully');
        }
    });
}





app.get('/', (req, res) => {
    res.send("This page currently does nothing :) Navigate to /addWorkflow to add a workflow. Navigate to /repos to view user repos");
});

app.get('/getAccessToken', async function (req, res) {
    const code = req.query.code;
    console.log('code', code, CLIENT_ID, CLIENT_SECRET);
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
        // accessToken = data.access_token;
        // octokit = new Octokit({
        //     auth: accessToken,
        // });
        // const userdata = getUserData();
        // username = userdata.login;
        res.json(data);
    });
});

app.get('/getUserData', async function (req, res) {
    req.get('Authorization');
    await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Authorization": req.get('Authorization'),
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});


app.get('/addWorkflow', (req, res) => {
    user = username;
    repository = 'arweave-hackathon';
    filePath = '.github/workflows/blank.yaml';
    createOrUpdateWorkflow(user, repository, filePath);
    addRepoTopic(user, repository);

    res.send("Workflow Successfully added");
});

app.get('/all_repos', async (req, res) => {
    const user = req.get("username");
    const access_token = req.get("access_token");
    // repository = 'arweave-hackathon';
    // const result = await getRepositories(user);
    result = await getRepositories(user, access_token);
    res.send(result);
});

app.get('/arsync_repos', async (req, res) => {
    const user = req.get("username");
    const access_token = req.get("access_token");
    // const result = await getRepositories(user);
    result = await getRepositories(user, access_token, "arsync");
    res.send(result);
});

app.post('/email', (req, res) => {
    send_mail();
    res.send("Email sent successfully");
});

app.listen(3000, function () {
    console.log('Github login app listening on port 3000!');
});

