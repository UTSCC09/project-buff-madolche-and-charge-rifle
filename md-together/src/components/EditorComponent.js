import React, { useState, useCallback } from "react";
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
- Change the **Theme** that best fits your mood today!
`

// let currEmail = ReactSession.get("email");

// Peer.js functionality is referred to Getting started with PeerJS example
// https://blog.logrocket.com/getting-started-peerjs/
const peer = new Peer();
let dataConn;
let mediaConn;

// using react-md-editor as the markdown editor
// this component is built on the top of example given in react-md-editor documentation
// https://uiwjs.github.io/react-md-editor/
export default function EditorComponent() {

  let peerVideo;

  // The Current State of Markdown File
  const [value, setValue] = React.useState(defaultWelcome);
  //get cookie
  //fetch().then(setValue(content))
  // console.log(value);
  // console.log(peer);
  
  // This form is referred to W3Schools React Form example as a template
  // https://www.w3schools.com/react/react_forms.asp
  const [dataConnId, setDataConnId] = useState("");
  const [mediaConnId, setMediaConnId] = useState("");
  const [currId, setCurrId] = useState("");
  const [currDataConn, setCurrDataConn] = useState(dataConn);
  const [currMediaConn, setCurrMediaConn] = useState(mediaConn);

  // console.log(currConn);

  peer.on('open', (id) => {
    setCurrId(id);
  });

  const handleDataSubmit = (e) => {
    e.preventDefault();
    const dc = peer.connect(dataConnId);
    setCurrDataConn(dc);
    console.log("im caller");
    dc.on('data', (data) => {
      setValue(data);
    });
    setDataConnId("");
  }

  React.useEffect(() => {
    dataConn = currDataConn;

    peer.on('connection', (dc) => {
      console.log("im callee");
      setCurrDataConn(dc);
      dc.on('data', (data) => {
        setValue(data);
      });
    });
    const body = {
      query:`
      query{
        getContent(projectId:"${ReactSession.get("projectId")}",userId:"",type:"${ReactSession.get("type")}")
      }
      `
    }
    let content_err = false;
    let content_backenderr = false;
    let content;
    fetch("http://localhost:3001/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json',
      "Authorization":'asda '+ ReactSession.get('token')
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        // need to change this to actual error messages
        content_err = true;
        if(res.status === 400){
          content_backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(content_err){
        if(content_backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)      }
      }else{
        content = data.data.getContent;
        setValue(content);
        console.log(content);
        // console.log(data);
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });
  },[]);

  // codes derived from peer.js video/audio call example
  // https://blog.logrocket.com/getting-started-peerjs/
  function showVideo(stream) {
    peerVideo.srcObject = stream;
  }

  const handleMediaSubmit = (e) => {
    e.preventDefault();
    // peer.connect(mediaConnId);
    // setCurrMediaConn(mediaConn);
    // console.log(mediaConn);
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then((stream) => {
        let call = peer.call(mediaConnId, stream);
        setCurrMediaConn(call);
        peerVideo = document.getElementById("peer_video");
        peerVideo.setAttribute("width", "200");
        peerVideo.setAttribute("height", "200");
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
    mediaConn = currMediaConn;
    peer.on('call', (call) => {
      setCurrMediaConn(call);
      peerVideo.setAttribute("width", "200");
      peerVideo.setAttribute("height", "200");
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

  let dataIsConnected = currDataConn ? true : false;
  let mediaIsConnected = currMediaConn ? true : false;

  const disconnectData = useCallback(() => {
    currDataConn.close();
    setCurrDataConn(undefined);
  }, [currDataConn]);

  function DataForm(props) {
    const isConnected = props.dataIsConnected;
    if (isConnected) {
      return (
        <div>
          <label>You are currently collaborating with: {currDataConn.peer} </label>
          <button onClick={disconnectData}>Disconnect</button>
        </div>

      );
    } else {
      return (
        <form onSubmit={handleDataSubmit}>
          <label>Enter the peer id to collaborate on writing:
            &nbsp;
            <input id="dataConnId" type="text" value={dataConnId} onChange={(e) => setDataConnId(e.target.value)}></input>
            &nbsp;
          </label>
          <input type="submit"></input>
        </form>
      );
      
    }
  }

  const disconnectMedia = useCallback(() => {
    currMediaConn.close();
    peerVideo = document.getElementById("peer_video");
    peerVideo.setAttribute("width", "0");
    peerVideo.setAttribute("height", "0");
    setCurrMediaConn(undefined);
  }, [currMediaConn]);

  function MediaForm(props) {
    const isConnected = props.mediaIsConnected;
    if (isConnected) {
      return (
        <div>
          <label>You are currently calling with: {currMediaConn.peer} </label>
          <button onClick={disconnectMedia}>Hang up</button>
        </div>
      );
    } else {
      return (
        <form onSubmit={handleMediaSubmit}>
          <label>Enter the peer id to call:
              &nbsp;
              <input id="mediaConnId" type="text" value={mediaConnId} onChange={(e) => setMediaConnId(e.target.value)}></input>
              &nbsp;
            </label>
          <input type="submit"></input>
        </form>
      );
    }
  }
  
  function PeerForm() {
    return (
      <div>
        <label>Your Current Peer ID is: {currId}</label>
        <DataForm dataIsConnected={dataIsConnected} />
        <MediaForm mediaIsConnected={mediaIsConnected} />
      </div>
    );
  }

  function PeerSection(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <PeerForm />;
    } else {
      return (<div>Please sign in first.</div>);
    }
  }

  function handleSave(e) {
    e.preventDefault();
    // Save button call
    const body = {
      query:`
      mutation{
        saveContent(userId:"",projectId:"${ReactSession.get("projectId")}",content:"""${value}""",type:"${ReactSession.get("type")}")
      }
      `
    }
    let content_err = false;
    let content_backenderr = false;
    let content;
    fetch("http://localhost:3001/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json',
      "Authorization":'asda '+ ReactSession.get('token')
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        // need to change this to actual error messages
        content_err = true;
        if(res.status === 400){
          content_backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(content_err){
        if(content_backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)      }
      }else{
        content = data.data.saveContent;
        console.log(content);
        // console.log(data);
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });
  }

  return (
    <div>
      <PeerSection isLoggedIn={isLoggedIn} />
      <video id="peer_video" width={0} height={0} autoPlay />
      <div>
        <button onClick={handleSave}>Save</button>
      </div>
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