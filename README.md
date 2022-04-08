# mdTogether
## Project URL

https://mdtogether.live/

## Project Video URL 

https://youtu.be/tf-oYREFfNg

## Project Description

***mdTogether*** is an Online Collaborative Markdown Editor that provides features like **Editing & Previewing** Markdown documents, collaborating with others **Synchronously or Asynchronously** on the same Markdown document, having a **Video Call** during collaboration, picking **Five Colorful Themes** for the editor, and **Exporting** Markdown documents to various formats (i.e., .pdf, .md, .html).

## Development

### Frontend
We chose [React.js](https://reactjs.org/) as our frontend framework. The main reason we chose it is that we can separate the web app into components. In each component, we can develop and debug easily and cleanly. JavaScript is the programming language we used for the front-end. To be more specific, we used JSX, a syntax extension to JavaScript, during React.js development.

There are several libraries being used during the development:
* [Markdown Editor for React](https://uiwjs.github.io/react-md-editor/) is the markdown editor in our app, it provides the edit & preview feature.
* [Material UI](https://mui.com/) is the front-end UI library. We built components on top of styled components provided by MUI (e.g., log-in/sign-up form, modals, navigation bar, etc. They are well-cited in the code comments).
* [Styled Components](https://styled-components.com/) is for changing the style of components based on the selected theme.
* [Showdown](http://showdownjs.com/) is for converting Markdown documents to HTML format.

### APIs
* [Peer JS](https://github.com/peers/peerjs#readme) is the WebRTC peer-to-peer communication API we used for the video calling & real-time collaborating features.
* [GraphQL](https://graphql.org/) This is a very safe API because the frontend can only call to the backend with several defined methods, if the method is not defined in the backend schema, the frontend won't be able to get data from the database. This makes the website more safer. We built some authorization methods to verify users in the middleware folder in the backend server; these will protect data from being given to unauthorized users in the many requests required. Most handlers are written in GraphQL/resolver to provide corresponding responses to the frontend.

### Backend
We used Express to build the backend because we can separate the authorization and handler into different parts which makes testing much easier. We followed the tutorial [Build a Complete App with GraphQL, Node.js, MongoDB and React.js](https://www.youtube.com/playlist?list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_) to build our backend, and most of the time spent on the backend was to build a safe and useful api which will be talked in the API part. We have a field called status in the MongoDB database to store if the user is logged in or not. This protects users' info/work from being stolen by a JWT leak.

There are several libraries/api/package being used during development:
* [Mongoose](https://www.npmjs.com/package/mongoose), we use this package in npm to connect our backend and MongoDB database
* [bcryptjs](https://www.npmjs.com/package/bcryptjs), we use this package for generating hashed passwords
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), we use this package for setting/getting cookies
* [validator](https://www.npmjs.com/package/validator), we use this for verify user input
### Database
* [MongoDB Atlas](https://www.mongodb.com/atlas) for storing user-generated data. We can set an IP whitelist for our database so that anywhere outside this list cannot connect to our backend. A cloud database was chosen due to concerns about limitations of a local database on the machine used for deployment.


## Deployment

**Task:** Explain how you have deployed your application. 

## Maintenance

**Task:** Explain how you monitor your deployed app to make sure that everything is working as expected.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. Coding GraphQL. This is my first time to write GraphQL so I spent a lot of time on learning it, I needed to write a safe and correct schema for the whole backend as well as resolvers for each method in the schema. Also I needed to write a coresponding MongoDB operation inside each resolver which takes a lot of time on implementing the security part.

2. Peer.js is challenging since I have not dealt with WebRTC before. I needed to read the documentation of methods and parameters carefully so that it can work as expected. The night before our Beta version demo, the peerjs server was down according to their [GitHub issue thread](https://github.com/peers/peerjs/issues/939). We had to set up our own peer server locally for the beta version demo. For final version, we deployed the peer server using ExpressPeerServer. It is new to all of us but I am glad we got it working.

3. 

## Contributions

- Front-end: Zhaohang Yan
- Back-end: Yiming Zheng
- Deployement: Jingrun Long

Each teammate contributed equally.

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 
- We did not add a link to the logo in the navigation bar because we do not want user lose changes because they accidentally clicked the logo.
- After recording our demo video, We added a copy button besides the Peer ID section so that the user can copy the id by one click because we think it is user-friendly.
