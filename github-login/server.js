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
async function createOrUpdateWorkflow(user, access_token, repository, filePath, scriptFilePath) {
    octokit = new Octokit({
        auth: access_token,
        request: {
            fetch,
        }
    });

    try {
        // Checking for file
        const { data: existingFile } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: user,
            repo: repository,
            path: filePath,
        })
        console.log("File exists", existingFile.sha);
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
                authorization: access_token,
            },
            content: 'bmFtZTogQXJkcml2ZSBXb3JrZmxvdwpvbjogW3B1c2hdCmVudjoKICAjIFNldHRpbmcgYW4gZW52aXJvbm1lbnQgdmFyaWFibGUgd2l0aCB0aGUgdmFsdWUgb2YgYSBjb25maWd1cmF0aW9uIHZhcmlhYmxlCiAgZW52X3ZhcjogJHt7IHZhcnMuRU5WX0NPTlRFWFRfVkFSIH19CmpvYnM6CiAgYnVpbGQ6CiAgICBydW5zLW9uOiB1YnVudHUtbGF0ZXN0CiAgICBzdGVwczoKICAgICAgLSB1c2VzOiBhY3Rpb25zL2NoZWNrb3V0QHYzCiAgICAgIC0gdXNlczogYWN0aW9ucy9zZXR1cC1ub2RlQHYzCiAgICAgICAgd2l0aDoKICAgICAgICAgIG5vZGUtdmVyc2lvbjogJzE4JwogICAgICAtIG5hbWU6IEluc3RhbGwgRGVwZW5kZW5jaWVzCiAgICAgICAgcnVuOiB8CiAgICAgICAgIG5wbSBpbnN0YWxsIC1nIGFyZHJpdmUtY2xpCiAgICAgIC0gbmFtZTogQnVpbGQgdGhlIHN0YXRpYyB3ZWJzaXRlCiAgICAgICAgcnVuOiB8CiAgICAgICAgIG5wbSBpbnN0YWxsCiAgICAgICAgIG5wbSBydW4gYnVpbGQKICAgICAgICAgbHMKICAgICAgLSBuYW1lOiBVcGxvYWQgdG8gQXJkcml2ZQogICAgICAgIHJ1bjogfAogICAgICAgICBlY2hvICJVcGxvYWRpbmcgdG8gQXJkcml2ZS4uLi4hIgogICAgICAgICBlY2hvICJyZXBvc2l0b3J5IHZhcmlhYmxlICAke3sgdmFycy5SRVBPU0lUT1JZX1ZBUiB9fSIKICAgICAgICAjICBhcmRyaXZlIC0taGVscAogICAgICAtIG5hbWU6IENyZWF0aW5nIGEgTWFuaWZlc3QKICAgICAgICBydW46IHwKICAgICAgICAgIGVjaG8gIkNyZWF0aW5nIGEgbWFuaWZlc3QuLi4uISIKICAgICAgICAgIGVjaG8gIk1hbmlmZXN0IGNyZWF0ZWQgU3VjY2Vzc2Z1bGx5ISIK',
            sha: existingFile.sha,
        }).then((err) => {
            console.log(err);
        })

        console.log(`File is updated successfully!`);

    }
    //if file doesn't exist
    catch (error) {
        console.log(`File not found! Created a new file.`);
        try {
            const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: user,
                repo: repository,
                path: filePath,
                message: 'Added workflow by arsync',
                committer: {
                    name: 'Team Last Minute',
                    email: 'lastmin@gmail.com'
                },
                content: 'bmFtZTogQXJkcml2ZSBXb3JrZmxvdwpvbjogW3B1c2hdCmVudjoKICAjIFNldHRpbmcgYW4gZW52aXJvbm1lbnQgdmFyaWFibGUgd2l0aCB0aGUgdmFsdWUgb2YgYSBjb25maWd1cmF0aW9uIHZhcmlhYmxlCiAgZW52X3ZhcjogJHt7IHZhcnMuRU5WX0NPTlRFWFRfVkFSIH19CmpvYnM6CiAgYnVpbGQ6CiAgICBydW5zLW9uOiB1YnVudHUtbGF0ZXN0CiAgICBzdGVwczoKICAgICAgLSB1c2VzOiBhY3Rpb25zL2NoZWNrb3V0QHYzCiAgICAgIC0gdXNlczogYWN0aW9ucy9zZXR1cC1ub2RlQHYzCiAgICAgICAgd2l0aDoKICAgICAgICAgIG5vZGUtdmVyc2lvbjogJzE4JwogICAgICAtIG5hbWU6IEluc3RhbGwgRGVwZW5kZW5jaWVzCiAgICAgICAgcnVuOiB8CiAgICAgICAgIG5wbSBpbnN0YWxsIC1nIGFyZHJpdmUtY2xpCiAgICAgIC0gbmFtZTogQnVpbGQgdGhlIHN0YXRpYyB3ZWJzaXRlCiAgICAgICAgcnVuOiB8CiAgICAgICAgIG5wbSBpbnN0YWxsCiAgICAgICAgIG5wbSBydW4gYnVpbGQKICAgICAgICAgbHMKICAgICAgLSBuYW1lOiBVcGxvYWQgdG8gQXJkcml2ZQogICAgICAgIHJ1bjogfAogICAgICAgICBlY2hvICJVcGxvYWRpbmcgdG8gQXJkcml2ZS4uLi4hIgogICAgICAgICBlY2hvICJyZXBvc2l0b3J5IHZhcmlhYmxlICAke3sgdmFycy5SRVBPU0lUT1JZX1ZBUiB9fSIKICAgICAgICAjICBhcmRyaXZlIC0taGVscAogICAgICAtIG5hbWU6IENyZWF0aW5nIGEgTWFuaWZlc3QKICAgICAgICBydW46IHwKICAgICAgICAgIGVjaG8gIkNyZWF0aW5nIGEgbWFuaWZlc3QuLi4uISIKICAgICAgICAgIGVjaG8gIk1hbmlmZXN0IGNyZWF0ZWQgU3VjY2Vzc2Z1bGx5ISIK'
                , headers: {
                    authorization: access_token,
                }
            })
        } catch (err) {
            console.log("my name is khan but you can call me error :)", err);
        }
    }
    try {
        // Checking for file
        const { data: existingFile } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: user,
            repo: repository,
            path: scriptFilePath,
        })
        console.log("script exists", existingFile.sha);
        const response_script = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: user,
            repo: repository,
            path: scriptFilePath,
            message: 'Added workflow by arsync',
            committer: {
                name: 'Team Last Minute',
                email: 'lastmin@gmail.com'
            },
            content: "aW1wb3J0IHN1YnByb2Nlc3MNCmltcG9ydCBqc29uDQppbXBvcnQgYXJncGFyc2UNCmRlZiBidWlsZF9mb2xkZXIocm9vdCk6DQogICAgY29tbWFuZD1mJ2FyZHJpdmUgdXBsb2FkLWZpbGUgLWwgInthcmdzLmJ1aWxkfSIgLXcge2FyZ3Mud2FsbGV0fSAtLXBhcmVudC1mb2xkZXItaWQge3Jvb3R9Jw0KICAgIHJlc3VsdCA9IHN1YnByb2Nlc3MucnVuKGNvbW1hbmQsIHNoZWxsPVRydWUsIGNhcHR1cmVfb3V0cHV0PVRydWUsIHRleHQ9VHJ1ZSkNCg0KZGVmIGJ1aWxkX21hbmlmZXN0KHJvb3QpOg0KICAgIGNvbW1hbmQ9ZidhcmRyaXZlIGNyZWF0ZS1tYW5pZmVzdCAtZiB7cm9vdH0gLXcge2FyZ3Mud2FsbGV0fScNCiAgICByZXN1bHQgPSBzdWJwcm9jZXNzLnJ1bihjb21tYW5kLCBzaGVsbD1UcnVlLCBjYXB0dXJlX291dHB1dD1UcnVlLCB0ZXh0PVRydWUpDQogICAgZGF0YT1qc29uLmxvYWRzKHJlc3VsdC5zdGRvdXQpDQogICAgcmV0dXJuIGRhdGFbImxpbmtzIl1bMF0NCmRlZiBnZXRfcm9vdF9mb2xkZXJfaWQoKToNCiAgICBjbGlfb3V0cHV0PWdldF9kcml2ZV9saXN0KCkNCiAgICB0cnk6DQogICAgICAgIHBhcnNlZF9kYXRhID0ganNvbi5sb2FkcyhjbGlfb3V0cHV0KQ0KICAgICAgICBmb3IgaSBpbiBwYXJzZWRfZGF0YToNCiAgICAgICAgICAgIGlmIGlbJ3BhdGgnXSA9PSAiL3Rlc3QiOg0KICAgICAgICAgICAgICAgIHJldHVybiBpWydmb2xkZXJJZCddDQogICAgZXhjZXB0IGpzb24uSlNPTkRlY29kZUVycm9yIGFzIGU6DQogICAgICAgIHByaW50KCJFcnJvciBwYXJzaW5nIEpTT046IiwgZSkNCg0KZGVmIGdldF9idWlsZF9maWxlKCk6DQogICAgY2xpX291dHB1dD1nZXRfZHJpdmVfbGlzdCgpDQogICAgdHJ5Og0KICAgICAgICBwYXJzZWRfZGF0YSA9IGpzb24ubG9hZHMoY2xpX291dHB1dCkNCiAgICAgICAgZm9yIGkgaW4gcGFyc2VkX2RhdGE6DQogICAgICAgICAgICBpZiBpWyduYW1lJ10gPT0gImJ1aWxkIjoNCiAgICAgICAgICAgICAgICByZXR1cm4gaVsnZm9sZGVySWQnXQ0KICAgIGV4Y2VwdCBqc29uLkpTT05EZWNvZGVFcnJvciBhcyBlOg0KICAgICAgICBwcmludCgiRXJyb3IgcGFyc2luZyBKU09OOiIsIGUpDQpkZWYgZ2V0X2RyaXZlX2xpc3QoKToNCiAgICBjb21tYW5kID0gZidhcmRyaXZlIGxpc3QtZHJpdmUgLXcge2FyZ3Mud2FsbGV0fSAtZCB7YXJncy5kcml2ZX0nDQogICAgcmVzdWx0ID0gc3VicHJvY2Vzcy5ydW4oY29tbWFuZCwgc2hlbGw9VHJ1ZSwgY2FwdHVyZV9vdXRwdXQ9VHJ1ZSwgdGV4dD1UcnVlKQ0KICAgIHJldHVybiByZXN1bHQuc3Rkb3V0DQoNCmlmIF9fbmFtZV9fID09ICJfX21haW5fXyI6DQogICAgcGFyc2VyID0gYXJncGFyc2UuQXJndW1lbnRQYXJzZXIoZGVzY3JpcHRpb249J0ZpbmQgYW5kIGRpc3BsYXkgb2JqZWN0IHdpdGggYSBzcGVjaWZpZWQgbmFtZSBmcm9tIGFyd2VhdmUgbGlzdC1kcml2ZSBvdXRwdXQuJykNCiAgICBwYXJzZXIuYWRkX2FyZ3VtZW50KCctdycsICctLXdhbGxldCcsIHR5cGU9c3RyLCByZXF1aXJlZD1UcnVlLCBoZWxwPSdXYWxsZXQgYWRkcmVzcycpDQogICAgcGFyc2VyLmFkZF9hcmd1bWVudCgnLWQnLCAnLS1kcml2ZScsIHR5cGU9c3RyLCByZXF1aXJlZD1UcnVlLCBoZWxwPSdkcml2ZSBhZGRyZXNzJykNCiAgICAjIHBhcnNlci5hZGRfYXJndW1lbnQoJy1jJywgJy0tY29tbWl0JywgdHlwZT1zdHIsIHJlcXVpcmVkPVRydWUsIGhlbHA9J2NvbW1pdCBudW1iZXInKQ0KICAgIHBhcnNlci5hZGRfYXJndW1lbnQoJy1iJywgJy0tYnVpbGQnLCB0eXBlPXN0ciwgcmVxdWlyZWQ9VHJ1ZSwgaGVscD0nYnVpbGQgZmlsZSByb290JykNCiAgICBhcmdzID0gcGFyc2VyLnBhcnNlX2FyZ3MoKQ0KICAgICMgdXNlciBjcmVhdGVzIHdhbGxldCBhbmQgYSBkcml2ZSB3aXRoIG5hbWUgYXJzeW5jDQogICAgIyBnZXRfZHJpdmVfbGlzdCgpDQoNCiAgICAjIGdldHRpbmcgdGhlIGZvbGRlciBpZCBvZiByb290DQogICAgcm9vdF9mb2xkZXJfaWQ9Z2V0X3Jvb3RfZm9sZGVyX2lkKCkNCg0KICAgICMgdXBsb2FkaW5nIGJ1aWxkIGZpbGUgd2l0aCBuYW1lIGJ1aWxkXzxjb21taXQgbnVtYmVyPg0KICAgIGJ1aWxkX2ZvbGRlcihyb290X2ZvbGRlcl9pZCkNCg0KICAgICMgZ2V0dGluZyB0aGUgdXBsb2FkZWQgYnVpbGQgZm9sZGVyIGRldGFpbHMNCiAgICBjdXJyZW50X2J1aWxkX2ZvbGRlcl9pZD1nZXRfYnVpbGRfZmlsZSgpDQoNCiAgICAjIGNyZWF0aW5nIGEgbWFuaWZlc3QgYW5kIHJldHVybmluZyB0aGUgbGluaw0KICAgIHByaW50KGJ1aWxkX21hbmlmZXN0KGN1cnJlbnRfYnVpbGRfZm9sZGVyX2lkKSkNCg0KICAgIA0KDQoNCg0KICAgIA=="
            , headers: {
                authorization: access_token,
            },
            sha: existingFile.sha
        }).then((err) => {
            console.log(err);
        })
        console.log("Script updated successfully!");

    }
    //if file doesn't exist
    catch (error) {
        console.log(`File not found! Created a new file.`);
        try {
            const response_script = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: user,
                repo: repository,
                path: scriptFilePath,
                message: 'Added workflow by arsync',
                committer: {
                    name: 'Team Last Minute',
                    email: 'lastmin@gmail.com'
                },
                content: "aW1wb3J0IHN1YnByb2Nlc3MNCmltcG9ydCBqc29uDQppbXBvcnQgYXJncGFyc2UNCmRlZiBidWlsZF9mb2xkZXIocm9vdCk6DQogICAgY29tbWFuZD1mJ2FyZHJpdmUgdXBsb2FkLWZpbGUgLWwgInthcmdzLmJ1aWxkfSIgLXcge2FyZ3Mud2FsbGV0fSAtLXBhcmVudC1mb2xkZXItaWQge3Jvb3R9Jw0KICAgIHJlc3VsdCA9IHN1YnByb2Nlc3MucnVuKGNvbW1hbmQsIHNoZWxsPVRydWUsIGNhcHR1cmVfb3V0cHV0PVRydWUsIHRleHQ9VHJ1ZSkNCg0KZGVmIGJ1aWxkX21hbmlmZXN0KHJvb3QpOg0KICAgIGNvbW1hbmQ9ZidhcmRyaXZlIGNyZWF0ZS1tYW5pZmVzdCAtZiB7cm9vdH0gLXcge2FyZ3Mud2FsbGV0fScNCiAgICByZXN1bHQgPSBzdWJwcm9jZXNzLnJ1bihjb21tYW5kLCBzaGVsbD1UcnVlLCBjYXB0dXJlX291dHB1dD1UcnVlLCB0ZXh0PVRydWUpDQogICAgZGF0YT1qc29uLmxvYWRzKHJlc3VsdC5zdGRvdXQpDQogICAgcmV0dXJuIGRhdGFbImxpbmtzIl1bMF0NCmRlZiBnZXRfcm9vdF9mb2xkZXJfaWQoKToNCiAgICBjbGlfb3V0cHV0PWdldF9kcml2ZV9saXN0KCkNCiAgICB0cnk6DQogICAgICAgIHBhcnNlZF9kYXRhID0ganNvbi5sb2FkcyhjbGlfb3V0cHV0KQ0KICAgICAgICBmb3IgaSBpbiBwYXJzZWRfZGF0YToNCiAgICAgICAgICAgIGlmIGlbJ3BhdGgnXSA9PSAiL3Rlc3QiOg0KICAgICAgICAgICAgICAgIHJldHVybiBpWydmb2xkZXJJZCddDQogICAgZXhjZXB0IGpzb24uSlNPTkRlY29kZUVycm9yIGFzIGU6DQogICAgICAgIHByaW50KCJFcnJvciBwYXJzaW5nIEpTT046IiwgZSkNCg0KZGVmIGdldF9idWlsZF9maWxlKCk6DQogICAgY2xpX291dHB1dD1nZXRfZHJpdmVfbGlzdCgpDQogICAgdHJ5Og0KICAgICAgICBwYXJzZWRfZGF0YSA9IGpzb24ubG9hZHMoY2xpX291dHB1dCkNCiAgICAgICAgZm9yIGkgaW4gcGFyc2VkX2RhdGE6DQogICAgICAgICAgICBpZiBpWyduYW1lJ10gPT0gImJ1aWxkIjoNCiAgICAgICAgICAgICAgICByZXR1cm4gaVsnZm9sZGVySWQnXQ0KICAgIGV4Y2VwdCBqc29uLkpTT05EZWNvZGVFcnJvciBhcyBlOg0KICAgICAgICBwcmludCgiRXJyb3IgcGFyc2luZyBKU09OOiIsIGUpDQpkZWYgZ2V0X2RyaXZlX2xpc3QoKToNCiAgICBjb21tYW5kID0gZidhcmRyaXZlIGxpc3QtZHJpdmUgLXcge2FyZ3Mud2FsbGV0fSAtZCB7YXJncy5kcml2ZX0nDQogICAgcmVzdWx0ID0gc3VicHJvY2Vzcy5ydW4oY29tbWFuZCwgc2hlbGw9VHJ1ZSwgY2FwdHVyZV9vdXRwdXQ9VHJ1ZSwgdGV4dD1UcnVlKQ0KICAgIHJldHVybiByZXN1bHQuc3Rkb3V0DQoNCmlmIF9fbmFtZV9fID09ICJfX21haW5fXyI6DQogICAgcGFyc2VyID0gYXJncGFyc2UuQXJndW1lbnRQYXJzZXIoZGVzY3JpcHRpb249J0ZpbmQgYW5kIGRpc3BsYXkgb2JqZWN0IHdpdGggYSBzcGVjaWZpZWQgbmFtZSBmcm9tIGFyd2VhdmUgbGlzdC1kcml2ZSBvdXRwdXQuJykNCiAgICBwYXJzZXIuYWRkX2FyZ3VtZW50KCctdycsICctLXdhbGxldCcsIHR5cGU9c3RyLCByZXF1aXJlZD1UcnVlLCBoZWxwPSdXYWxsZXQgYWRkcmVzcycpDQogICAgcGFyc2VyLmFkZF9hcmd1bWVudCgnLWQnLCAnLS1kcml2ZScsIHR5cGU9c3RyLCByZXF1aXJlZD1UcnVlLCBoZWxwPSdkcml2ZSBhZGRyZXNzJykNCiAgICAjIHBhcnNlci5hZGRfYXJndW1lbnQoJy1jJywgJy0tY29tbWl0JywgdHlwZT1zdHIsIHJlcXVpcmVkPVRydWUsIGhlbHA9J2NvbW1pdCBudW1iZXInKQ0KICAgIHBhcnNlci5hZGRfYXJndW1lbnQoJy1iJywgJy0tYnVpbGQnLCB0eXBlPXN0ciwgcmVxdWlyZWQ9VHJ1ZSwgaGVscD0nYnVpbGQgZmlsZSByb290JykNCiAgICBhcmdzID0gcGFyc2VyLnBhcnNlX2FyZ3MoKQ0KICAgICMgdXNlciBjcmVhdGVzIHdhbGxldCBhbmQgYSBkcml2ZSB3aXRoIG5hbWUgYXJzeW5jDQogICAgIyBnZXRfZHJpdmVfbGlzdCgpDQoNCiAgICAjIGdldHRpbmcgdGhlIGZvbGRlciBpZCBvZiByb290DQogICAgcm9vdF9mb2xkZXJfaWQ9Z2V0X3Jvb3RfZm9sZGVyX2lkKCkNCg0KICAgICMgdXBsb2FkaW5nIGJ1aWxkIGZpbGUgd2l0aCBuYW1lIGJ1aWxkXzxjb21taXQgbnVtYmVyPg0KICAgIGJ1aWxkX2ZvbGRlcihyb290X2ZvbGRlcl9pZCkNCg0KICAgICMgZ2V0dGluZyB0aGUgdXBsb2FkZWQgYnVpbGQgZm9sZGVyIGRldGFpbHMNCiAgICBjdXJyZW50X2J1aWxkX2ZvbGRlcl9pZD1nZXRfYnVpbGRfZmlsZSgpDQoNCiAgICAjIGNyZWF0aW5nIGEgbWFuaWZlc3QgYW5kIHJldHVybmluZyB0aGUgbGluaw0KICAgIHByaW50KGJ1aWxkX21hbmlmZXN0KGN1cnJlbnRfYnVpbGRfZm9sZGVyX2lkKSkNCg0KICAgIA0KDQoNCg0KICAgIA=="
                , headers: {
                    authorization: access_token,
                }
            }).then((err) => {
                console.log(err);
            })
            console.log("script created successfully!");
        } catch (err) {
            console.log("my name is khan but you can call me error :)", err);
        }
    }


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
    const user = req.get("username");
    const access_token = req.get("access_token");
    const repository = req.get("repository");
    filePath = '.github/workflows/blank.yaml';
    scriptFilePath = 'arsync_script.py';
    createOrUpdateWorkflow(user, access_token, repository, filePath, scriptFilePath);
    // addRepoTopic(user, repository);

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

