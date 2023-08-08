<h1 align="center" style="border-bottom: none">
    <b>
        <a href="https://arsync.vercel.app/">arsync🚀</a><br>
    </b>
    ⭐️  CI/CD pipeline for arweave  ⭐️ <br>
</h1>

No more deployment headaches! ARSync's streamlined CI/CD pipeline makes updating your ARDrive hosted websites a walk in the park.
![home](https://raw.githubusercontent.com/jashwanth0712/arweave-hackathon/main/images/home.png)
## About arsync
Welcome to arsync, your ultimate solution for effortless Continuous Integration and Continuous Deployment **(CI/CD) of ardrive hosted websites**🤯. We understand the challenges that developers face when it comes to maintaining seamless updates and deployments for their ardrive-hosted projects 🫂. With ARSync, we've revolutionized the process🤩, making it easier than ever to keep your websites up-to-date and running smoothly.😉

## How to Build

### Hosting site

Before you try to run the code, you have to set the environment variables in your github-login and hosting-website

```bash
VITE_GITHUB_CLIENT_ID='YOUR_CLIENT_ID'
VITE_GITHUB_CLIENT_SECRET='YOUR_CLIENT_SECRET'
VITE_GITHUB_REDIRECT_URI='http://localhost:5173/'
```

To run the code in your localhost, you first have to run the server in your localhost.

To run the server in your localhost run

```bash
  cd github-login
  node server.js
```

To run the frontend run

```bash
   cd ..
   cd hosting-website
   npm run dev
```

Congrats, The Application is running in your localhost.

To access the appliction go to 

```bash
  localhost:5173
```

## How to use

### GitHub Login

Authenticate using your GitHub account where your project is located.

![home](https://github.com/malviyaHimanshu/arweave-hackathon/blob/main/images/Github_login.jpg)

### AddNew
You now have visibility into the projects you've deployed, along with an "Add New" button located in the upper-right corner.

To initiate the deployment process for a desired project, simply click on the "Add New" button and make your selection.

![home](https://github.com/malviyaHimanshu/arweave-hackathon/blob/main/images/Add_new.PNG)

### Import
You now have the ability to view all of your GitHub repositories within the platform.

Next, proceed to import the specific repository that you intend to deploy.

![home](https://github.com/malviyaHimanshu/arweave-hackathon/blob/main/images/Import.PNG)
![home](https://github.com/malviyaHimanshu/arweave-hackathon/blob/main/images/Deploy.PNG)

### ardrive login

Connect with your ardrive Account to complete your website deployment.

### License

Fill the form that appears and click create

### Links

Congrats 🥳🥳, You have successfully deployed your website with the help of ARSync.

You now got the link for your website.


## HOW IT WORKS?

The highlevel working of arsync application  is described in the below flowchart.

![](https://raw.githubusercontent.com/malviyaHimanshu/arweave-hackathon/main/images/chart.jpeg))

Initially the Codebase of the static website will be built in collaboration by various developers using GitHub. When this codebase  is ready to deploy into the arweave decentralized network, user logs in to the arsync web application using the github account.

When the user logins, they will be redirected to a dashboard where they can see their current arsync deployments. The dashboard will search the user repositories tagged with the topic "arsync" which will be added to the repositories that are deployed using arsync previously. If the user is a new user, the dashboard will be empty. If the user has deployed websites previously they will see cards of deployed website, which can be clicked on to view the arweave domain they are deployed to.

If a user clicks on the "Add New" button on the dashboard, arsync fetches all the repositories that the user has access to using the GitHub REST API and displays them on the add new page. When the user clicks on the import button, they will be redirected a form page where they can enter the details like build command, etc. The form data and the wallet file the user uploads will be set as repository environment variables, to protect the sensitive information like wallet and the drive IDs, which will be used during the build and deploy stages of the website in github actions.

Once the appropriate form data are submitted and the deploy button is clicked, arsync backend receives the data, analyses the response, determines the type of workflow that should be added and finally adds the workflow to the github user's account. This workflow will automate the process of installing the dependencies, building the website, uploading the files to ardrive and finally create a manifest which will assign the manifest a domain. This domain will be reflected back in the arsync webapp's dashboard and also the description of the github repository.


