# mdTogether

![mdTogether Logo](/logo.png)

## Team Members
- Zhaohang Yan (Martin)
(📮: zhaohang.yan@mail.utoronto.ca)
- Jingrun Long
(📮: jingrun.long@mail.utoronto.ca)
- Yiming Zheng
(📮: yiming.zheng@mail.utoronto.ca)

## Description

Wanna **Edit & Preview** your markdown documents?

Wanna collaborate in **Real-Time** on your markdown documents?

Wanna start with an **Elegant Markdown Template** every time?

Wanna pick **Colorful Themes** for your markdown editor?

Wanna **Show** your amazing markdown documents **To Public & Get Likes**?

Wanna **Export** your markdown documents **To Various Formats**?

Wanna do all of these but there's ***NO*** such editor?

Here we proudly present ***mdTogether***, An Online Collaborative Markdown Editor.

## Key Features (Beta Version)

### Edit & Preview
- Users can edit and preview a markdown file in real-time.
### User Sign-Up & Log-In
- Users can register and log in into their own space.
### User Space
- Users can manage their files in user space.
### User Invites
- Users can invite other users to collaborate on the same markdown file.
### Real-Time Collaboration 
- Users can collaborate on the same markdown file in real-time.

## Additional Features (Final Version)

### Pick Themes
- Users can pick various themes from theme store to customize their editor interface.
### Export to Other Formats
- Users can export their markdown files to other formats (e.g., PDF, HTML, etc.)
### Start with Templates
- Users can start with mdTogether templates for different uses of the documents (e.g., meeting notes, project README.md, etc.)
- Users can change who can read or write their documents. It can be set to invited users, signed-in users, or everyone.
### Publish/Share Markdown Document
- Users can publish/share their documents by URL for others to access.
### Add In-Line Comments
- Users can add comments to specific lines in the document.
### Browse Public Documents
- Users can browse publicly shared documents and view them.
### Comment on Documents
- Users can comment and discuss on documents. Disqus allows us to have comments and discussion section for those markdown files.
### Integrate Other Accounts
- Besides making a new account, users can also sign in with other options like Google, Facebook, GitHub, Twitter, and Dropbox. (exact options may change)

## Technology Stack

### Front-End
* [React.js](https://reactjs.org/)
    * We use React.js as the Front-end UI framework.
    * [Markdown Editor for React.](https://uiwjs.github.io/react-md-editor/)
* [Material UI](https://mui.com/)
    * We use Material UI as the Front-end UI library.
    * [Material UI Theme Builder](https://mui.com/customization/theming/) for creating customized themes.
### APIs
* [GraphQL](https://graphql.org/)
* [Apollo GraphQL](https://www.apollographql.com/)
* [Auth0](https://auth0.com/)
    * [Auth0 React in React SPA](https://auth0.com/docs/quickstart/spa/react/01-login) for user authentication.
### Back-End
* [Node.js](https://nodejs.org/)
### Database
* [Firebase](https://firebase.google.com/) for storing user-generated data.
### Deployment
* [Firebase](https://firebase.google.com/)
### Tools
* [Disqus](https://disqus.com/)


## Top 5 Technical Challenges

### Real-time Collaboration
* How to allow team members to collaborate with each other in real-time, synchronizing changes, and ensuring consistent data.

### User Sign Up and Log In
* Implementing signing up and logging in, tracking user sessions, integrating with other sign-up methods.

### Connecting Front-End and Back-End
* How to use GraphQL and other tools to transfer the data between frontend and backend.

### Managing User Permissions
* Keeping track of what users are able to access, ensuring that only authenticated users can view/edit, inviting other users to view and edit documents, changing visibility of documents.

### In-line Comments
* Can implement with line numbers but may be slow or prone to breaking, or create some kind of logical object for sentences/lines that comments are attached to, or do as character offset from start of document.
