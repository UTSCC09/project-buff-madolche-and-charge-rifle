# mdTogether
## Project URL

https://mdtogether.live/

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

## Project Description

***mdTogether*** is an Online Collaborative Markdown Editor that provides features like **Editing & Previewing** Markdown documents, collaborating with others **Synchronously or Asynchronously** on the same Markdown document, having a **Video Call** during collaboration, picking **Five Colorful Themes** for the editor, **Exporting** Markdown documents to various formats (i.e., .pdf, .md, .html).

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

### Front-End
We chose [React.js](https://reactjs.org/) as our front-end framework. The main reason we chose it is that we can separate the web app into components. In each component, we can develop and debug easily and cleanly. JavaScript is the programming language we used for front-end. To be more specific, we used JSX, a syntax extension to JavaScript, during React.js development.

There are several libraries being used during the development:
* [Markdown Editor for React](https://uiwjs.github.io/react-md-editor/) is the markdown editor in our app, it provides the edit & preview feature.
* [Material UI](https://mui.com/) is the front-end UI library. We built components on top of styled components provided by MUI (e.g., log-in/sign-up form, modals, navigation bar, etc. They are well-cited in the code comments).
* [Styled Components](https://styled-components.com/) is for changing the style of components based on the selected theme.
* [Showdown](http://showdownjs.com/) is for converting Markdown documents to HTML format.

### APIs
* [Peer JS](https://github.com/peers/peerjs#readme) is the WebRTC peer-to-peer communication API we used for the video calling & real-time collaborating features.
* [GraphQL](https://graphql.org/) This is a very safe API because the fonrtend can only call to the backend with several defined methods, if the mehtod is not defined in the backend schema, the frontend won't be able to get data from database. This makes thw website much safer. I built some authorization methods to verify user in the middleware folder in the backend server, this will protect data not being given to unauth users in the most fetches. Most handlers are written in graphql/resolver to provide corresponding responses to the frontend.
* [Apollo GraphQL](https://www.apollographql.com/)
### Back-End
* We use express to build backend because we can write authorization and handler into different parts, it makes testing much easier. I followed the [Build a Complete App with GraphQL, Node.js, MongoDB and React.js](https://www.youtube.com/playlist?list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_) to build our backend, the most time we spending on backend is how to build a safe and useful api, which will be talked in the API part. We have a field called status in mongoose database to store the user is logging-in or not. This protect users' info/working being stolen by jwt leak.
* There are several libraries/api/package being used during the development:
* [mongoose](https://www.npmjs.com/package/mongoose), we use this package in npm to connect our backend and mongoose database
* [bcryptjs](https://www.npmjs.com/package/bcryptjs), we use this package for generate hashed password
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), we use this package for setting/getting cookies
* [validator](https://www.npmjs.com/package/validator), we use this for verify user's input
### Database
* [MongoDB]() for storing user-generated data. We can set IP whitelist for our database so anywhere outside this list cannot connect to our backend.


## Deployment

**Task:** Explain how you have deployed your application. 

## Maintenance

**Task:** Explain how you monitor your deployed app to make sure that everything is working as expected.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1.Writting graphql. This is my first time to write graphql so I spent a lot of time on learning it, I need to write a safe and correct schema for the whole backend and  resolvers for each method in schema. Also I need write a coresponding mongodb operation inside each resolver which takes a lot of time on implementing the security part.

2.
3. 

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 
Front-end: Zhaohang Yan
Back-end: Yiming Zheng
Deployement: Jingrun Long

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 
