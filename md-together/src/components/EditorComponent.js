import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
// Use Peer.js to realize Web real time communication
import Peer from 'peerjs';

// Used ImgBB https://imgbb.com/ to host our logo for free
let defaultWelcome = `# Welcome to mdTogether!
![mdTogetherLogo](https://i.ibb.co/cC52gS3/logo.png)

**You can collaborate on your Markdown files with other users!**

- Log In / Sign Up to your account.
- In **User Space**, manage your own markdown files, collaborations, and invitations.
- Invite users by clicking the **Invite** button under **Share** tab in the navbar above.
- You can also **Export** current markdown files into data format you want!
- Change the **Theme** that best fit your mood today!
`

// Peer.js functionality is referred to Getting started with PeerJS example
// https://blog.logrocket.com/getting-started-peerjs/
const peer = new Peer();
let conn;

// using react-md-editor as the markdown editor
// this component is built on the top of example given in react-md-editor documentation
// https://uiwjs.github.io/react-md-editor/
export default function EditorComponent() {
  // The Current State of Markdown File
  const [value, setValue] = React.useState(defaultWelcome);
  // console.log(value);
  // console.log(peer);
  
  // This form is referred to W3Schools React Form example as a template
  // https://www.w3schools.com/react/react_forms.asp
  const [connectId, setConnectId] = useState("");
  const [currId, setCurrId] = useState("");
  const [currConn, setCurrConn] = useState(conn);

  // console.log(currConn);

  peer.on('open', (id) => {
    setCurrId(id);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const conn = peer.connect(connectId);
    conn['caller'] = peer.id;
    setCurrConn(conn);
    console.log("im caller");
    conn.on('data', (data) => {
      setValue(data);
    });
    setConnectId("");
  }

  
  React.useEffect(() => {
    conn = currConn;

    peer.on('connection', (conn) => {
      console.log("im callee");
      conn['caller'] = conn.peer;
      setCurrConn(conn);
      conn.on('data', (data) => {
        setValue(data);
      });
    });
  });


  function handleEditorChange(value) {
    if (currConn) {
      currConn.send(value);
      currConn.on('data', (data) => {
        setValue(data);
      });
    }
    setValue(value);
  }


  return (
    <div>
      {/* <PeerConnectionForm /> */}
      <form onSubmit={handleSubmit}>
        <label>Your Current Peer ID is: {currId}</label>
        <label>Enter the peer id to connect:
          <input id="connectId" type="text" value={connectId} onChange={(e) => setConnectId(e.target.value)}></input>
        </label>
        <input type="submit"></input>
      </form>
      <MDEditor
        value={value}
        onChange={handleEditorChange}
        visiableDragbar={false}
        height={"90vh"}
      />
      {/* <MDEditor.Markdown source={value} /> */}
    </div>
  );
}