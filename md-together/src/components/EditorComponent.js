import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
// Use Peer.js to realize Web real time communication
import Peer from 'peerjs';
import ReactSession from 'react-client-session/dist/ReactSession';

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

// let currEmail = ReactSession.get("email");

// Peer.js functionality is referred to Getting started with PeerJS example
// https://blog.logrocket.com/getting-started-peerjs/
const peer = new Peer();
let dataConn;

// codes derived from peer.js video/audio call example
// https://blog.logrocket.com/getting-started-peerjs/
let mediaConn;

// using react-md-editor as the markdown editor
// this component is built on the top of example given in react-md-editor documentation
// https://uiwjs.github.io/react-md-editor/
export default function EditorComponent() {

  let peerVideo;

  // The Current State of Markdown File
  const [value, setValue] = React.useState(defaultWelcome);
  // console.log(value);
  // console.log(peer);
  
  // This form is referred to W3Schools React Form example as a template
  // https://www.w3schools.com/react/react_forms.asp
  const [dataConnId, setDataConnId] = useState("");
  const [mediaConnId, setMediaConnId] = useState("");
  const [currId, setCurrId] = useState("");
  const [currDataConn, setCurrDataConn] = useState(dataConn);
  // const [currMediaConn, setCurrMediaConn] = useState(mediaConn);

  // console.log(currConn);
  // I write get/save content in the backend, please provide corresponding button in the frontend

  peer.on('open', (id) => {
    setCurrId(id);
  });

  const handleDataSubmit = (e) => {
    e.preventDefault();
    const dataConn = peer.connect(dataConnId);
    setCurrDataConn(dataConn);
    console.log("im caller");
    dataConn.on('data', (data) => {
      setValue(data);
    });
    setDataConnId("");
  }

  React.useEffect(() => {
    dataConn = currDataConn;

    peer.on('connection', (dataConn) => {
      console.log("im callee");
      setCurrDataConn(dataConn);
      dataConn.on('data', (data) => {
        setValue(data);
      });
    });
  });

  // codes derived from peer.js video/audio call example
  // https://blog.logrocket.com/getting-started-peerjs/
  function showVideo(stream) {
    peerVideo.srcObject = stream;
  }

  const handleMediaSubmit = (e) => {
    e.preventDefault();
    let mediaConn = peer.connect(mediaConnId);
    // setCurrMediaConn(mediaConn);
    // console.log(mediaConn);
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then((stream) => {
        let call = peer.call(mediaConnId, stream);
        call.on('stream', showVideo);
      })
      .catch((err) => {
        console.log('Failed to get local stream', err);
      });
    console.log("im caller");
    setMediaConnId("");
  }
  
  React.useEffect(() => {
    peerVideo = document.getElementById("peer_video");
    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((stream) => {
          call.answer(stream); // Answer the call with an A/V stream.
          call.on('stream', showVideo);
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });
    });
  });

  function handleEditorChange(value) {
    if (currDataConn) {
      currDataConn.send(value);
      currDataConn.on('data', (data) => {
        setValue(data);
      });
    }
    setValue(value);
  }

  let isLoggedIn = false;

  // example derived from w3schools example
  // https://www.w3schools.blog/get-cookie-by-name-javascript-js
  let cookie = {};
  document.cookie.split(";").forEach(function(elmt) {
    let [key, value] = elmt.split("=");
    cookie[key.trim()] = value;
  });

  if (cookie["__react_session__"] && ReactSession.get("userId") !== null && ReactSession.get("userId") !== undefined) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  function DataPeerForm() {
    return (
      <div>
        <label>Your Current Peer ID is: {currId}</label>
        <form onSubmit={handleDataSubmit}>
          <label>Enter the peer id to collaborate on writing:
            &nbsp;
            <input id="dataConnId" type="text" value={dataConnId} onChange={(e) => setDataConnId(e.target.value)}></input>
            &nbsp;
          </label>
          <input type="submit"></input>
        </form>
        <form onSubmit={handleMediaSubmit}>
          <label>Enter the peer id to call:
              &nbsp;
              <input id="mediaConnId" type="text" value={mediaConnId} onChange={(e) => setMediaConnId(e.target.value)}></input>
              &nbsp;
            </label>
          <input type="submit"></input>
        </form>
      </div>
    );
  }

  function PeerSection(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <DataPeerForm />;
    } else {
      return (<div>Please sign in first.</div>);
    }
  }

  return (
    <div>
      <PeerSection isLoggedIn={isLoggedIn} />
      <video id="peer_video" width={200} height={200} autoPlay />

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