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

async function addRepoVariables(user, repository, access_token) {
    try {
        await octokit.request('POST /repos/{owner}/{repo}/actions/variables', {
            owner: user,
            repo: repository,
            name: "G_TOKEN",
            value: access_token,
            headers: {
                authorization: access_token,
            }
        })
    } catch {
        await octokit.request('PATCH /repos/{owner}/{repo}/actions/variables/{name}', {
            owner: user,
            repo: repository,
            name: "G_TOKEN",
            value: access_token,
            headers: {
                authorization: access_token,
            }
        })
    }
    console.log("Added G_TOKEN");
    try {
        await octokit.request('POST /repos/{owner}/{repo}/actions/variables', {
            owner: user,
            repo: repository,
            name: "BUILD_EXPORT_NAME",
            value: "build",
            headers: {
                authorization: access_token,
            }
        })
    } catch {
        await octokit.request('PATCH /repos/{owner}/{repo}/actions/variables/{name}', {
            owner: user,
            repo: repository,
            name: "BUILD_EXPORT_NAME",
            value: "build",
            headers: {
                authorization: access_token,
            }
        })
    }
    console.log("Added BUILD_EXPORT_NAME");
    try {
        await octokit.request('POST /repos/{owner}/{repo}/actions/variables', {
            owner: user,
            repo: repository,
            name: "DRIVE_ID",
            value: "913e4aea-3197-4021-bcc3-c5e6af09b776",
            headers: {
                authorization: access_token,
            }
        })
    } catch {
        await octokit.request('PATCH /repos/{owner}/{repo}/actions/variables/{name}', {
            owner: user,
            repo: repository,
            name: "DRIVE_ID",
            value: "913e4aea-3197-4021-bcc3-c5e6af09b776",
            headers: {
                authorization: access_token,
            }
        })
    }
    console.log("Added DRIVE_ID");
    try {
        await octokit.request('POST /repos/{owner}/{repo}/actions/variables', {
            owner: user,
            repo: repository,
            name: "WALLET_JSON",
            value: "ewogICJrdHkiOiAiUlNBIiwKICAiZSI6ICJBUUFCIiwKICAibiI6ICJzVXc2b08xbWZySkZpdUJzc0Ixb2xRUUVNODlRRW0wdzg1YmtDVzhFSExWVFBwSEJqcmlwOXFqZ05la3Z6TnJDVG1aQjZBWEFYS2prbi0zNGhsT3p5c3VieFdOR1EtZVlKd09sWHp3N1g1QTFGX1o1NThzQWk0WndMNVYyRndfOXN2Mmk2MEpsVl9yRmRXcmgtakNhZHZXSmI5NDBLZjF5dUwwZzBTVEtKeTl1dVNiZ09Ia0oyLVR1bGtBOEtyQ2ppMkprTFRCQWVmYUNxc2dNNlRfUmQ3OGJXTFlDQWNDTTNvYnFnLVpMRzRzTWhWSWJyUjBBYjJkaEtqOVVXbUNHc2c1b2RQNnpNWEg0ZmdEZExRVEJDLThJdk9FM3JDUlBmM0d6Nmg5TFJHaUszemJBMGhpc0hNSTE0UUY4VzBpQTBsa2NtVThPNWY4SmkweDRpUWZWdm1uby12UzRzaDVVUXdZZFQ2NDJRY0VFbE5sQTk0TEZlOGd1NWt3TjZLeWNlQkNvS3dvXzFIX2U4YzZOU2o0QlNxbjZGUE44Wm15dW1vci1VUXZseEZtbklsMXFnNm42RVRSdkJMV19xel9zNUpRSDdhR1RwVGFETnZvZHU4dWhIOW5vaXhCcy10VnI1SDVXTkR6NnlVX1BhWmNHRDZNanVJZzZrVDhBU1dyZmlOMFdSY1VBM2ItWDNLZ3Jac2VFMGI4Y09kUnZjaTVFMmJNVGJCOTc0R2syd2tMMk9JR2FIcUVHWGp6NlkwY0hCMm4zTVFob3V2aVA2dExuYXdObXBoaUNjaVR4bmZZRnFvRXZ0S1JMVnZvaGs4OWtpREdiMDIxRXlacTktaElnY1NRdTdyR3dfSWhVSFlYbjhHa1NYRWN6dWduTmJyUXd4cGd2ODZMR1NFcyIsCiAgImQiOiAiUzFuWGJQLVlXTzVSS2ZXNW01dlVEOGoyTkVLLWlDWko4S3pIVzg4SDAxLW84bVdsLW84M0JQSy0zNHFzV3diNkg3SExfdDA2NU9hT3lfMnFhd1IxM0JGdXNaUkFqNm1FLThmTDU4N0VlUmZqeUx4akVRVXd4UnVzNER4SVJRTHgwcm1ESFROSnVQdUdJaUg3eW9ZUGo5Rkl5UGVKLWZLU2FEdFJFREh2akhuWE4tOXl5ZTFfS0NxQ3otNmE0NVhRMl9ORUdnUncwcVRXNGRoRnpIZm9BVm1DT05DWng3N2EzOVE5SlRPaDVpSFJmM1BtLVVyakhYVzFVT3c3WUhHM3JVTDhXQVRMaVk4amlnRzVfbUVQM28tSGlpYTVyM3A3SXZIakFmU3MyM1VHMkZqXzJBck9VeWFqR1c2MU9HSjNCVzhEX1pBaEI5UzliS3RpYXZLZWZ5bDBpMmZvM2J2RjZEVlZMQXdPSlJkVGlORTJzVXFoV25YSTgzaS1LSHBPMGY2MFBwRm82TlBzV2hnSmtidE9SVUM3dlR4R0VtVmdicmtUekFwSExWUnVkUk1JQ0xqakJWSXFtUVpHQThrMnBJc1VGZ0ROZ0NnUVJhU1IxcUs2c1lQWFpiUWlqbkhTN2xvODVpcEo5MFdhX0hUMXFsZ2FCOWVRNkZaVGxfakphN29SRmpCOHhnbF9DTHg2bmJTRjVuRlo4LXRqb3ZUZkFVNk1IUjR6TTEtT2tGbGw5NmhDY29yOU9WXy0xQTRlMmdRRDJNYTVhWlAzWmNIazhidVllUWR0VFE0enRQNWdid25PQ1JHUm15enFzOEk5aHZwVFJ4X1FXeHB3enZGMVJJUEpYZzNULWhuN3oyeGZpcklMSHp5OTFSR3lTbmEwTDVfSUhneTRXVkUiLAogICJwIjogIjdoUzdWLXRQWkhmQXBwQ2NkYUJ2ZzdyQk40U1I2NERDVm1pQjNXcWM1WXFxdFY5TldWeVVvTUc2Tm10MEhyYjZQQl9zMG5OV1I2U3ZnNUFlYkRLdmhBTTdwT01qdkRKRXI2cWF1OWItdzJMRFlwRTR5Y2lNUVJTek1xSDZsRFZPTVNhY3RVcmpCaFZzVXR1VnFtcDlkVHkwVjZienZleHBrZGFMbzFhTnRJZE92LVRjTmYtNTZkRS1TMzluTjB4QUFDOFBISEhfNU8wYnBkM08wUHRsRThmM2tPOTQ5d0JqOE85NEV0UVVQV3ZRVXJBbmoxbW1MVEhIVWtaS0ZTTHJuMk9hc0JtSVd1aVk5RGNzejg5aENGUkQ1UTdaZHc4SUUwM0d0VHJTLWVfYnFuT3hJZ1BaNGtyMHFXQ0txNXd3VkNNaHZ5RkhSYTFiTENSQktLTlRNdyIsCiAgInEiOiAidnFSWWYzUGJ1dlZhWHc4Wm5mclVpR2tvYWJQRldfclliU2hCeENDM1Eyd3FtSGU0UWoyZm5ldUFsaVFMWGhNaWdxSWpJUU9pVl9NclRwVlFaS1VJSXRIb1JRWHJrZkg3ODhUZkxGbHVCWWQxRUkzQnlQal9qdmwxb0ZvNVFfdDlfeTZ2T2Y4d1pJUG1RbWlTMVdfZGF0ZjBDRk1vWVFrRnhLYVZ0cHlyZ1Q1MXFLUnJHUEhxS0lxSXY3MVhHU1VDemFmNVJIUGhRVnNrTndRVDFSTV8xU3Zob0tsVVNjc0RpRmNNdUNhQ3JzN2xRNEdoMnpNcHFmZXJaa2ZfSmY5Z3FKU1E3YXd2bEVmWEZYVklYbmt0bkR2Z0FVT09QNm1ZVzdta25iR2NPVHJad1hweDBmR2xneEI5aVphdzJDNk5UWTlTMjNBM29yczA1cE1qa09ZMmlRIiwKICAiZHAiOiAicEJUWHROVXd4MDRkRU82VFZpSDNHUE5wM0loYVJOTmRuRTIwU3RRQ1E5U1lxQjJCWW5nQzJ2UUpFUjVuVGdfUFVBYTBvYW5wcWNDZlVlM09lY1ZJMzVPVzFLSFNiQTY4OWRCX2lidTNveEw3RTRDQWdkamNpTEhxZXBmVjZiVF9LYkt4eC1SUHFFNjFkRGx2NFo0NHpzYkNoN0pCUkFDZUZXdW1tekM0d3RXSi1ZaVNHQWtocVRxVFUxYl8zTVdKU2xja2NfZEJaQlhodXlPdU9LczUwek02dE1IR1BYMGdZOW0yaUV0dms1RXRadi1PbENZMTktblp0Q05MUlZ2bXhkZlFzVk0zZldmV21tRTRXaFJUakhqLXZldkpCbHZ1dGRjaGZwLUc3Y2hZUFJZMDJ2dUtlNElyTWx5ZDFYMzBkTmd0bHRzcGtxVFNOQTdjZFZSeXJ3IiwKICAiZHEiOiAibWlmR3JfajltdVlfRjFMY2doU0x1MnBkRld3YWtNXzhKZmhCaGRoMm1IeGt6VGt4czg2a3ZVdnJoSHpNX0ZzNHNxMXNfb3N6d1M2T3ZGS2MyV1ZoZU5hSG5SaTJiaU5nZXJPZFN2MWRxX2Jtd0dZQVp3U0JraGxCOWxJLXNDd3lyQ0FSN1RIZTdjaUNidnlranhhUDBvLWhjd0hiU3V2QzBFdHNFR2dMZnMwRTAwTnducEV2cVd5c08yOWRlS1dtNkttRk5NY0hSSlB3YXRSUFBTTDlvT0NFNkNkRVV3OW9ZZDBTR2U1NkNlU2ZHc0UtSWtQeTBzX0V0MFpNbVdzeHU5LTJlWm1jTjZrSDBRQXZic1ZLRG1XVU16RnZXeWRHWGhWMWVWWmZYeC1wYVh3YmdZcUhMYjR0NVE0SEhpZzJkcHNJZ3d6dzBCUFZLUVdkNHRObEVRIiwKICAicWkiOiAiZG0yeVM1ZWxFN3FJM0FVZ1hhanMzSy1JR25IbU5XYmJaSGpkcll6djRqX0p0NHlMZHZEeWFfMUdOVFZxN0N5ZHNVbnNwRTJYeWRzTnNINi1JQWxyQWNYdWZ5RUozRmJobTJlMGp1MDBJV3JoMmRBMmhXandYZTR6UFhwaVR1X0pabWpKSTRRa0R2WENDNGNtUHJXa3ZDS3ljeEtuMUM3VHNEd3VmSDQwbngwdE85cVN5czYyMV9NeUNIZE5Dak5DUlFuNmJxNUpkZTBjaEJic0c5WWFheDFQeDBzZXhvVGpSLVNILVo1RHZaU0xmb2dxSHNyRDY2YWZvaXdEdG9XVE5adGRteko1eFUtYnlmeEsyRGhIVDhsdHVYUjdtcDE3MVpMSUNyZ1gzMjlhVzVyV1JlNU9zMkZyYkpfWmV5bFVPUFZxRndjVTVlU1NzMmdqOHlxcVF3Igp9",
            headers: {
                authorization: access_token,
            }
        })
    } catch {
        await octokit.request('PATCH /repos/{owner}/{repo}/actions/variables/{name}', {
            owner: user,
            repo: repository,
            name: "WALLET_JSON",
            value: "ewogICJrdHkiOiAiUlNBIiwKICAiZSI6ICJBUUFCIiwKICAibiI6ICJzVXc2b08xbWZySkZpdUJzc0Ixb2xRUUVNODlRRW0wdzg1YmtDVzhFSExWVFBwSEJqcmlwOXFqZ05la3Z6TnJDVG1aQjZBWEFYS2prbi0zNGhsT3p5c3VieFdOR1EtZVlKd09sWHp3N1g1QTFGX1o1NThzQWk0WndMNVYyRndfOXN2Mmk2MEpsVl9yRmRXcmgtakNhZHZXSmI5NDBLZjF5dUwwZzBTVEtKeTl1dVNiZ09Ia0oyLVR1bGtBOEtyQ2ppMkprTFRCQWVmYUNxc2dNNlRfUmQ3OGJXTFlDQWNDTTNvYnFnLVpMRzRzTWhWSWJyUjBBYjJkaEtqOVVXbUNHc2c1b2RQNnpNWEg0ZmdEZExRVEJDLThJdk9FM3JDUlBmM0d6Nmg5TFJHaUszemJBMGhpc0hNSTE0UUY4VzBpQTBsa2NtVThPNWY4SmkweDRpUWZWdm1uby12UzRzaDVVUXdZZFQ2NDJRY0VFbE5sQTk0TEZlOGd1NWt3TjZLeWNlQkNvS3dvXzFIX2U4YzZOU2o0QlNxbjZGUE44Wm15dW1vci1VUXZseEZtbklsMXFnNm42RVRSdkJMV19xel9zNUpRSDdhR1RwVGFETnZvZHU4dWhIOW5vaXhCcy10VnI1SDVXTkR6NnlVX1BhWmNHRDZNanVJZzZrVDhBU1dyZmlOMFdSY1VBM2ItWDNLZ3Jac2VFMGI4Y09kUnZjaTVFMmJNVGJCOTc0R2syd2tMMk9JR2FIcUVHWGp6NlkwY0hCMm4zTVFob3V2aVA2dExuYXdObXBoaUNjaVR4bmZZRnFvRXZ0S1JMVnZvaGs4OWtpREdiMDIxRXlacTktaElnY1NRdTdyR3dfSWhVSFlYbjhHa1NYRWN6dWduTmJyUXd4cGd2ODZMR1NFcyIsCiAgImQiOiAiUzFuWGJQLVlXTzVSS2ZXNW01dlVEOGoyTkVLLWlDWko4S3pIVzg4SDAxLW84bVdsLW84M0JQSy0zNHFzV3diNkg3SExfdDA2NU9hT3lfMnFhd1IxM0JGdXNaUkFqNm1FLThmTDU4N0VlUmZqeUx4akVRVXd4UnVzNER4SVJRTHgwcm1ESFROSnVQdUdJaUg3eW9ZUGo5Rkl5UGVKLWZLU2FEdFJFREh2akhuWE4tOXl5ZTFfS0NxQ3otNmE0NVhRMl9ORUdnUncwcVRXNGRoRnpIZm9BVm1DT05DWng3N2EzOVE5SlRPaDVpSFJmM1BtLVVyakhYVzFVT3c3WUhHM3JVTDhXQVRMaVk4amlnRzVfbUVQM28tSGlpYTVyM3A3SXZIakFmU3MyM1VHMkZqXzJBck9VeWFqR1c2MU9HSjNCVzhEX1pBaEI5UzliS3RpYXZLZWZ5bDBpMmZvM2J2RjZEVlZMQXdPSlJkVGlORTJzVXFoV25YSTgzaS1LSHBPMGY2MFBwRm82TlBzV2hnSmtidE9SVUM3dlR4R0VtVmdicmtUekFwSExWUnVkUk1JQ0xqakJWSXFtUVpHQThrMnBJc1VGZ0ROZ0NnUVJhU1IxcUs2c1lQWFpiUWlqbkhTN2xvODVpcEo5MFdhX0hUMXFsZ2FCOWVRNkZaVGxfakphN29SRmpCOHhnbF9DTHg2bmJTRjVuRlo4LXRqb3ZUZkFVNk1IUjR6TTEtT2tGbGw5NmhDY29yOU9WXy0xQTRlMmdRRDJNYTVhWlAzWmNIazhidVllUWR0VFE0enRQNWdid25PQ1JHUm15enFzOEk5aHZwVFJ4X1FXeHB3enZGMVJJUEpYZzNULWhuN3oyeGZpcklMSHp5OTFSR3lTbmEwTDVfSUhneTRXVkUiLAogICJwIjogIjdoUzdWLXRQWkhmQXBwQ2NkYUJ2ZzdyQk40U1I2NERDVm1pQjNXcWM1WXFxdFY5TldWeVVvTUc2Tm10MEhyYjZQQl9zMG5OV1I2U3ZnNUFlYkRLdmhBTTdwT01qdkRKRXI2cWF1OWItdzJMRFlwRTR5Y2lNUVJTek1xSDZsRFZPTVNhY3RVcmpCaFZzVXR1VnFtcDlkVHkwVjZienZleHBrZGFMbzFhTnRJZE92LVRjTmYtNTZkRS1TMzluTjB4QUFDOFBISEhfNU8wYnBkM08wUHRsRThmM2tPOTQ5d0JqOE85NEV0UVVQV3ZRVXJBbmoxbW1MVEhIVWtaS0ZTTHJuMk9hc0JtSVd1aVk5RGNzejg5aENGUkQ1UTdaZHc4SUUwM0d0VHJTLWVfYnFuT3hJZ1BaNGtyMHFXQ0txNXd3VkNNaHZ5RkhSYTFiTENSQktLTlRNdyIsCiAgInEiOiAidnFSWWYzUGJ1dlZhWHc4Wm5mclVpR2tvYWJQRldfclliU2hCeENDM1Eyd3FtSGU0UWoyZm5ldUFsaVFMWGhNaWdxSWpJUU9pVl9NclRwVlFaS1VJSXRIb1JRWHJrZkg3ODhUZkxGbHVCWWQxRUkzQnlQal9qdmwxb0ZvNVFfdDlfeTZ2T2Y4d1pJUG1RbWlTMVdfZGF0ZjBDRk1vWVFrRnhLYVZ0cHlyZ1Q1MXFLUnJHUEhxS0lxSXY3MVhHU1VDemFmNVJIUGhRVnNrTndRVDFSTV8xU3Zob0tsVVNjc0RpRmNNdUNhQ3JzN2xRNEdoMnpNcHFmZXJaa2ZfSmY5Z3FKU1E3YXd2bEVmWEZYVklYbmt0bkR2Z0FVT09QNm1ZVzdta25iR2NPVHJad1hweDBmR2xneEI5aVphdzJDNk5UWTlTMjNBM29yczA1cE1qa09ZMmlRIiwKICAiZHAiOiAicEJUWHROVXd4MDRkRU82VFZpSDNHUE5wM0loYVJOTmRuRTIwU3RRQ1E5U1lxQjJCWW5nQzJ2UUpFUjVuVGdfUFVBYTBvYW5wcWNDZlVlM09lY1ZJMzVPVzFLSFNiQTY4OWRCX2lidTNveEw3RTRDQWdkamNpTEhxZXBmVjZiVF9LYkt4eC1SUHFFNjFkRGx2NFo0NHpzYkNoN0pCUkFDZUZXdW1tekM0d3RXSi1ZaVNHQWtocVRxVFUxYl8zTVdKU2xja2NfZEJaQlhodXlPdU9LczUwek02dE1IR1BYMGdZOW0yaUV0dms1RXRadi1PbENZMTktblp0Q05MUlZ2bXhkZlFzVk0zZldmV21tRTRXaFJUakhqLXZldkpCbHZ1dGRjaGZwLUc3Y2hZUFJZMDJ2dUtlNElyTWx5ZDFYMzBkTmd0bHRzcGtxVFNOQTdjZFZSeXJ3IiwKICAiZHEiOiAibWlmR3JfajltdVlfRjFMY2doU0x1MnBkRld3YWtNXzhKZmhCaGRoMm1IeGt6VGt4czg2a3ZVdnJoSHpNX0ZzNHNxMXNfb3N6d1M2T3ZGS2MyV1ZoZU5hSG5SaTJiaU5nZXJPZFN2MWRxX2Jtd0dZQVp3U0JraGxCOWxJLXNDd3lyQ0FSN1RIZTdjaUNidnlranhhUDBvLWhjd0hiU3V2QzBFdHNFR2dMZnMwRTAwTnducEV2cVd5c08yOWRlS1dtNkttRk5NY0hSSlB3YXRSUFBTTDlvT0NFNkNkRVV3OW9ZZDBTR2U1NkNlU2ZHc0UtSWtQeTBzX0V0MFpNbVdzeHU5LTJlWm1jTjZrSDBRQXZic1ZLRG1XVU16RnZXeWRHWGhWMWVWWmZYeC1wYVh3YmdZcUhMYjR0NVE0SEhpZzJkcHNJZ3d6dzBCUFZLUVdkNHRObEVRIiwKICAicWkiOiAiZG0yeVM1ZWxFN3FJM0FVZ1hhanMzSy1JR25IbU5XYmJaSGpkcll6djRqX0p0NHlMZHZEeWFfMUdOVFZxN0N5ZHNVbnNwRTJYeWRzTnNINi1JQWxyQWNYdWZ5RUozRmJobTJlMGp1MDBJV3JoMmRBMmhXandYZTR6UFhwaVR1X0pabWpKSTRRa0R2WENDNGNtUHJXa3ZDS3ljeEtuMUM3VHNEd3VmSDQwbngwdE85cVN5czYyMV9NeUNIZE5Dak5DUlFuNmJxNUpkZTBjaEJic0c5WWFheDFQeDBzZXhvVGpSLVNILVo1RHZaU0xmb2dxSHNyRDY2YWZvaXdEdG9XVE5adGRteko1eFUtYnlmeEsyRGhIVDhsdHVYUjdtcDE3MVpMSUNyZ1gzMjlhVzVyV1JlNU9zMkZyYkpfWmV5bFVPUFZxRndjVTVlU1NzMmdqOHlxcVF3Igp9",
            headers: {
                authorization: access_token,
            }
        })
    }
    console.log("Added WALLET_JSON");
}

async function getLinkToArdrive(user, repository, access_token) {
    const repoData = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: user,
        repo: repository,
        headers: {
            authorization: access_token,
        }
    })
    console.log("This is the description : ", repoData["data"]["description"]);
    return repoData["data"]["description"];
}

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
                    "url": await getLinkToArdrive(user, result["data"][i]["name"], access_token),
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
            content: 'bmFtZTogQXJkcml2ZSBXb3JrZmxvdwpvbjogW3B1c2hdCmVudjoKICAjIFNldHRpbmcgYW4gZW52aXJvbm1lbnQgdmFyaWFibGUgd2l0aCB0aGUgdmFsdWUgb2YgYSBjb25maWd1cmF0aW9uIHZhcmlhYmxlCiAgZW52X3ZhcjogJHt7IHZhcnMuRU5WX0NPTlRFWFRfVkFSIH19CiAgCmpvYnM6CiAgYnVpbGQ6CiAgICBydW5zLW9uOiB1YnVudHUtbGF0ZXN0CiAgICBzdGVwczoKICAgICAgLSB1c2VzOiBhY3Rpb25zL2NoZWNrb3V0QHYzCiAgICAgIC0gbmFtZTogU2V0IHVwIE5vZGUKICAgICAgICB1c2VzOiBhY3Rpb25zL3NldHVwLW5vZGVAdjMKICAgICAgICB3aXRoOgogICAgICAgICAgbm9kZS12ZXJzaW9uOiAnMTgnCiAgICAgICAgICAKICAgICAgLSBuYW1lOiBTZXQgdXAgUHl0aG9uCiAgICAgICAgdXNlczogYWN0aW9ucy9zZXR1cC1weXRob25AdjIKICAgICAgICB3aXRoOgogICAgICAgICAgcHl0aG9uLXZlcnNpb246ICczLjEwJwoKICAgICAgIyAtIG5hbWU6IEluc3RhbGwgRGVwZW5kZW5jaWVzCiAgICAgICMgICBydW46IHwKICAgICAgIyAgICBucG0gaW5zdGFsbCAtZyBhcmRyaXZlLWNsaSAtLXNpbGVudAogICAgICAjICAgIGVjaG8gIlN1Y2Nlc3NmdWxseSBJbnN0YWxsZWQgYXJkcml2ZS1jbGkiCgogICAgICAjIC0gbmFtZTogQnVpbGQgdGhlIHdlYnNpdGUKICAgICAgIyAgIHJ1bjogfAogICAgICAjICAgIG5wbSBpbnN0YWxsIC0tc2lsZW50CiAgICAgICMgcHl0aG9uIGFyc3luY19zY3JpcHQucHkgLXcgd2FsbGV0Lmpzb24gLWQgJHt7IHZhcnMuRFJJVkVfSUR9fSAtYiAke3sgdmFycy5CVUlMRF9FWFBPUlRfTkFNRX19ID4+IGxvZy50eHQKICAgICAgIyAgICBucG0gcnVuIGJ1aWxkIC0tc2lsZW50CgogICAgICAtIG5hbWU6IFVwbG9hZGluZyB0byBhcmRyaXZlCiAgICAgICAgcnVuOiB8CiAgICAgICAgICBlY2hvICR7eyB2YXJzLldBTExFVF9KU09OfX0gfCBiYXNlNjQgLWQgPiB3YWxsZXQuanNvbgogICAgICAgICAgZWNobyAibGlua3RvLndlYnNpdGUiID4+IGxvZy50eHQKICAgICAgICAgIGdoIGF1dGggbG9naW4gLS13aXRoLXRva2VuIDw8PCAke3sgdmFycy5HX1RPS0VOIH19CiAgICAgICAgICBnaCByZXBvIGVkaXQgJHt7IGdpdGh1Yi5yZXBvc2l0b3J5IH19IC0tZGVzY3JpcHRpb24gIiQoY2F0IGxvZy50eHQpIgogICAgICAgICAgZWNobyAiUGxlYXNlIG5hdmlnYXRlIHRvIHRoZSBsaW5rIGZyb20gZGVzY3JpcHRpb24gdG8gYWNjZXNzIHlvdSBkZWNlbnRyYWxpemVkIHdlYnNpdGUhIg==',
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
                content: 'bmFtZTogQXJkcml2ZSBXb3JrZmxvdwpvbjogW3B1c2hdCmVudjoKICAjIFNldHRpbmcgYW4gZW52aXJvbm1lbnQgdmFyaWFibGUgd2l0aCB0aGUgdmFsdWUgb2YgYSBjb25maWd1cmF0aW9uIHZhcmlhYmxlCiAgZW52X3ZhcjogJHt7IHZhcnMuRU5WX0NPTlRFWFRfVkFSIH19CiAgCmpvYnM6CiAgYnVpbGQ6CiAgICBydW5zLW9uOiB1YnVudHUtbGF0ZXN0CiAgICBzdGVwczoKICAgICAgLSB1c2VzOiBhY3Rpb25zL2NoZWNrb3V0QHYzCiAgICAgIC0gbmFtZTogU2V0IHVwIE5vZGUKICAgICAgICB1c2VzOiBhY3Rpb25zL3NldHVwLW5vZGVAdjMKICAgICAgICB3aXRoOgogICAgICAgICAgbm9kZS12ZXJzaW9uOiAnMTgnCiAgICAgICAgICAKICAgICAgLSBuYW1lOiBTZXQgdXAgUHl0aG9uCiAgICAgICAgdXNlczogYWN0aW9ucy9zZXR1cC1weXRob25AdjIKICAgICAgICB3aXRoOgogICAgICAgICAgcHl0aG9uLXZlcnNpb246ICczLjEwJwoKICAgICAgIyAtIG5hbWU6IEluc3RhbGwgRGVwZW5kZW5jaWVzCiAgICAgICMgICBydW46IHwKICAgICAgIyAgICBucG0gaW5zdGFsbCAtZyBhcmRyaXZlLWNsaSAtLXNpbGVudAogICAgICAjICAgIGVjaG8gIlN1Y2Nlc3NmdWxseSBJbnN0YWxsZWQgYXJkcml2ZS1jbGkiCgogICAgICAjIC0gbmFtZTogQnVpbGQgdGhlIHdlYnNpdGUKICAgICAgIyAgIHJ1bjogfAogICAgICAjICAgIG5wbSBpbnN0YWxsIC0tc2lsZW50CiAgICAgICMgcHl0aG9uIGFyc3luY19zY3JpcHQucHkgLXcgd2FsbGV0Lmpzb24gLWQgJHt7IHZhcnMuRFJJVkVfSUR9fSAtYiAke3sgdmFycy5CVUlMRF9FWFBPUlRfTkFNRX19ID4+IGxvZy50eHQKICAgICAgIyAgICBucG0gcnVuIGJ1aWxkIC0tc2lsZW50CgogICAgICAtIG5hbWU6IFVwbG9hZGluZyB0byBhcmRyaXZlCiAgICAgICAgcnVuOiB8CiAgICAgICAgICBlY2hvICR7eyB2YXJzLldBTExFVF9KU09OfX0gfCBiYXNlNjQgLWQgPiB3YWxsZXQuanNvbgogICAgICAgICAgZWNobyAibGlua3RvLndlYnNpdGUiID4+IGxvZy50eHQKICAgICAgICAgIGdoIGF1dGggbG9naW4gLS13aXRoLXRva2VuIDw8PCAke3sgdmFycy5HX1RPS0VOIH19CiAgICAgICAgICBnaCByZXBvIGVkaXQgJHt7IGdpdGh1Yi5yZXBvc2l0b3J5IH19IC0tZGVzY3JpcHRpb24gIiQoY2F0IGxvZy50eHQpIgogICAgICAgICAgZWNobyAiUGxlYXNlIG5hdmlnYXRlIHRvIHRoZSBsaW5rIGZyb20gZGVzY3JpcHRpb24gdG8gYWNjZXNzIHlvdSBkZWNlbnRyYWxpemVkIHdlYnNpdGUhIg=='
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
            message: '[skip ci] Updated upload script by arsync',
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
                message: '[skip ci] Created upload script by arsync',
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
    console.log("Before adding rep vars!");
    addRepoVariables(user, repository, access_token);
    console.log("After adding rep vars!");
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

// app.get('/desc', async (req, res) => {
//     const user = req.get("username");
//     const repository = req.get("repository");
//     const access_token = req.get("access_token");
//     const link = await getLinkToArdrive(user, repository, access_token);
//     res.send(link);
// });


app.listen(3000, function () {
    console.log('Github login app listening on port 3000!');
});

