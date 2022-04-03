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
* [GraphQL](https://graphql.org/)
* [Apollo GraphQL](https://www.apollographql.com/)
### Back-End
* [Node.js](https://nodejs.org/)
### Database
* [MongoDB]() for storing user-generated data.


## Deployment

**Task:** Explain how you have deployed your application. 

## Maintenance

**Task:** Explain how you monitor your deployed app to make sure that everything is working as expected.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1.
2.
3. 

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 
Front-end: Zhaohang Yan
Back-end: Yiming Zheng
Deployement: Jingrun Long

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 
