<h1 align="center">  ๐ Northcoders Portfolio ๐ฝ๏ธ </h1> <br>

<br />

<p align="center">
  <a href="newsstand">
    <img alt="newsstand" title="newsstand" src="https://0x0.st/obtD.png" width="450">
  </a>
</p>

<br />

<p align="center">
Hello! ๐ Welcome to our app - Northcoders Portfolio.
</p>

<br />

## ๐ญ Description

Northcoders Portfolio is an app to help Northcoders graduates upload short video demonstrations of their projects to a centralised space that recruiters and employers can efficiently access and browse.

Typically, graduates are limited in visibility due to the size of their network or limited reach due to a change in sector. Additionally, recruiters and employers have limited time and resources, which further adds to the issue of visibility. We built this app with these challenges in mind, to alleviate frictions or barriers to visibility: allowing graduates to showcase their work, as well as reducing the workload on the employer side in finding newly-qualified graduates.

## ๐ค What Does It Do?

Users can:

- โ๐ป Sign up as a new user
- ๐ Log in as an existing user
- ๐ Create and update their user bio (including external links to work: e.g. GitHub)
- ๐ผ ๐ท๏ธ Upload new videos from their device's gallery (adding tags, title and video description)
- ๐บ View all videos in a Tik-Tok style feed
- ๐ ๐ท๏ธ Filter videos by video tags
- ๐  View a dedicated user video feed in their profile
- ๐ Vote on videos
- โ ๐๏ธ Add and delete their comments on videos
- ๐ Access other user's profiles
- ๐๏ธ Delete their own videos

## ๐งช Technology

- The app is built using React Native โ๏ธ

- We've used Cloudinary as our cloud storage provider, which are brought down and rendered using the Expo-AV video player

- Calls to the API are performed using Axios

- User authentication is achieved by storing hashed passwords on the backend and using bcrypt to compare and verify the hashed passwords

## ๐ฅ๏ธ Running the App Locally

๐ง Before beginning setup, please check you have _at least_ these versions of the following:

- `node` - v. 16.13.1

After doing so, perform each step, in order:

### ๐ป โก๏ธ ๐ป Cloning the repository

```
git clone https://github.com/davidptclark/nc-portfolio-fe.git
```
### ๐๏ธ Install required packages

Simply run `npm install` to install the necessary dependencies required.

### ๐ฅ๏ธ ๐ฒ Building and running the site

To build and run the site on your local machine, run `npm start`. After doing so, you'll need to use either the Expo Go app on your mobile device or an iOS/Android emulator on your local machine to run the app.

