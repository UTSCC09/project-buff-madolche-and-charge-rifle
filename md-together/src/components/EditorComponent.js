import React, { useState, useCallback } from "react";
import MDEditor from '@uiw/react-md-editor';
// Use Peer.js to realize Web real time communication
import Peer from 'peerjs';
import ReactSession from 'react-client-session/dist/ReactSession';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import showdown from 'showdown';

// Used ImgBB https://imgbb.com/ to host our logo for free
// ![mdTogetherLogo](https://i.ibb.co/cC52gS3/logo.png)
let defaultWelcome = `# Welcome to mdTogether!
![mdTogetherLogo](https://i.ibb.co/mBMFxTH/navbar-logo.png)

**You can collaborate on your Markdown files with other users!**

- Log In / Sign Up to your account.
- In **User Space**, manage your own markdown files, collaborations, and invitations.
- Invite users by clicking the **Invite** button under **Share** tab in the navbar above.
- You can also **Export** current markdown files into data format you want!
- Change the **Theme** that best fits your mood today! 
- Please note that changing a theme **WILL CAUSE A PAGE REFRESH**! 
- Make sure you saved your changes before changing themes.

**Hope you Enjoy it :)**
`

// let currEmail = ReactSession.get("email");

// Peer.js functionality is referred to Getting started with PeerJS example
// https://blog.logrocket.com/getting-started-peerjs/
// const peer = new Peer();
const peer = new Peer({
  host:'localhost',
  port: 9000,
  path: '/mdtogether'
});
let dataConn;
let mediaConn;

// using react-md-editor as the markdown editor
// this component is built on the top of example given in react-md-editor documentation
// https://uiwjs.github.io/react-md-editor/
export default function EditorComponent() {

  let peerVideo;

  // The Current State of Markdown File
  const [value, setValue] = React.useState("");

  // export to other formats
  // The code is derived from "downloading a string as .txt file in React on stackoverflow"
  // https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
  function downloadMD() {
    const elmt = document.createElement("a");
    const file = new Blob([value], {type: 'text/plain;charset=UTF-8'});
    elmt.href = URL.createObjectURL(file);
    // this is gonna be replaced with actual project name
    elmt.download = "Current Project.md";
    document.body.appendChild(elmt); // required for this to work in FireFox
    elmt.click();
  }

  function downloadHTML() {
    const elmt = document.createElement("a");
    // use showdown to convert markdown to html
    // https://www.npmjs.com/package/showdown
    let convertToHTML = new showdown.Converter();
    let htmlContent = convertToHTML.makeHtml(value);
    const file = new Blob([htmlContent], {type: 'text/html;charset=UTF-8'});
    elmt.href = URL.createObjectURL(file);
    // this is gonna be replaced with actual project name
    elmt.download = "Current Project.html";
    document.body.appendChild(elmt);
    elmt.click();
  }

  function downloadPDF() {
    const previewContent = document.querySelector(".w-md-editor-preview").innerHTML;
    // console.log(previewContent);
    // this method of printing pdf does not create a new window
    // the code is derived from a blog "How to print specific part of a web page in javascript"
    // https://www.etutorialspoint.com/index.php/23-how-to-print-different-section-of-content-using-javascript 
    var hiddenFrame = document.createElement('iframe');
    hiddenFrame.name = "hiddenFrame";
    hiddenFrame.style.position = "absolute";
    hiddenFrame.style.top = "-1000000px";
    document.body.appendChild(hiddenFrame);
    var frameDoc = hiddenFrame.contentWindow ? hiddenFrame.contentWindow : hiddenFrame.contentDocument.document ? hiddenFrame.contentDocument.document : hiddenFrame.contentDocument;
    frameDoc.document.open();
    // this is gonna be replaced with actual project name
    frameDoc.document.write('<html><head><title>Current Project</title>');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(previewContent);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
      window.frames["hiddenFrame"].focus();
      window.frames["hiddenFrame"].print();
      document.body.removeChild(hiddenFrame);
    }, 500);
  }

  
  // This form is referred to W3Schools React Form example as a template
  // https://www.w3schools.com/react/react_forms.asp
  const [dataConnId, setDataConnId] = useState("");
  const [mediaConnId, setMediaConnId] = useState("");
  const [currId, setCurrId] = useState("");
  const [currDataConn, setCurrDataConn] = useState(dataConn);
  const [currMediaConn, setCurrMediaConn] = useState(mediaConn);

  const matchesMediaQuery = useMediaQuery('(min-width:600px)');

  peer.on('open', (id) => {
    setCurrId(id);
  });

  const handleDataSubmit = (e) => {
    e.preventDefault();
    const dc = peer.connect(dataConnId);
    setCurrDataConn(dc);
    // console.log("im caller");
    dc.on('data', (data) => {
      setValue(data);
    });
    setDataConnId("");
  }

  React.useEffect(() => {
    dataConn = currDataConn;

    peer.on('connection', (dc) => {
      // console.log("im callee");
      setCurrDataConn(dc);
      dc.on('data', (data) => {
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
    // peer.connect(mediaConnId);
    // setCurrMediaConn(mediaConn);
    // console.log(mediaConn);
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then((stream) => {
        let call = peer.call(mediaConnId, stream);
        setCurrMediaConn(call);
        peerVideo = document.getElementById("peer_video");
        peerVideo.style.display = 'block';
        peerVideo.setAttribute("width", "200");
        peerVideo.setAttribute("height", "200");
        call.on('stream', showVideo);
      })
      .catch((err) => {
        console.log('Failed to get local stream', err);
      });
    // console.log("im caller");
    setMediaConnId("");
  }
  
  React.useEffect(() => {
    peerVideo = document.getElementById("peer_video");
    mediaConn = currMediaConn;
    peer.on('call', (call) => {
      setCurrMediaConn(call);
      peerVideo.style.display = 'block';
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
  }, []);

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

  if (cookie["__react_session__"] && ReactSession.get("token") !== null && ReactSession.get("token") !== undefined) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  let editorVisible = ReactSession.get("projectId") !== null;

  React.useEffect(() => {
    if (isLoggedIn && editorVisible) {
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
          // console.log(content);
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
  }, [editorVisible, isLoggedIn]);

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
        <div style={{marginTop: "18px"}}>
          <label>You are currently collaborating with: {currDataConn.peer} </label>
          <Button variant="contained" className="save-button" onClick={disconnectData} sx={{textTransform: "capitalize"}} style={{marginLeft: "7px"}}>Disconnect</Button>
          {/* <button onClick={disconnectData}>Disconnect</button> */}
        </div>

      );
    } else {
      return (
        <form>
          <label>Enter the peer id to collaborate on writing:
            &nbsp;
            <input id="dataConnId" type="text" className="input-box change-font" value={dataConnId} onChange={(e) => setDataConnId(e.target.value)}></input>
            &nbsp;
          </label>
          <Button variant="contained" className="save-button" onClick={handleDataSubmit} sx={{textTransform: "capitalize"}}>Connect</Button>
          {/* <input type="submit"></input> */}
        </form>
      );
      
    }
  }

  const disconnectMedia = useCallback(() => {
    currMediaConn.close();
    peerVideo = document.getElementById("peer_video");
    peerVideo.style.display = "none";
    peerVideo.setAttribute("width", "0");
    peerVideo.setAttribute("height", "0");
    setCurrMediaConn(undefined);
  }, [currMediaConn]);

  function MediaForm(props) {
    const isConnected = props.mediaIsConnected;
    if (isConnected) {
      return (
        <div style={{marginTop: "18px"}}>
          <label>You are currently calling with: {currMediaConn.peer} </label>
          <Button variant="contained" className="save-button" onClick={disconnectMedia} style={{marginLeft: "7px"}} sx={{textTransform: "capitalize"}}>hang up</Button>
          {/* <button onClick={disconnectMedia}>Hang up</button> */}
        </div>
      );
    } else {
      return (
        <form>
          <label>Enter the peer id to call:
            &nbsp;
            <input id="mediaConnId" type="text" className="input-box change-font" value={mediaConnId} onChange={(e) => setMediaConnId(e.target.value)}></input>
            &nbsp;
          </label>
          <Button variant="contained" className="save-button" onClick={handleMediaSubmit} sx={{textTransform: "capitalize"}}>Call</Button>
          {/* <input type="submit"></input> */}
        </form>
      );
    }
  }
  
  function PeerForm() {
    return (
      <div className="peer-section">
        <div>
          <label>Your Current Peer ID is: {currId}</label>
          <DataForm dataIsConnected={dataIsConnected} />
          {matchesMediaQuery && <MediaForm mediaIsConnected={mediaIsConnected} />}
        </div>
      </div>
    );
  }

  function PeerSection(props) {
    const isLoggedIn = props.isLoggedIn;
    const editorVisible = props.editorVisible;
    if (isLoggedIn && editorVisible) {
      return <PeerForm />;
    } else if (isLoggedIn && !editorVisible) {
      return (<div className="peer-section-message">Select a document in User Space at the top-right corner to start.</div>);
    } else {
      return (<div className="peer-section-message">Please sign in first.</div>);
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
    // let content;
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
        // content = data.data.saveContent;
        // console.log(content);
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
      <div className="whole-peer-section">
        <PeerSection isLoggedIn={isLoggedIn} editorVisible={editorVisible} />
        {editorVisible && <video id="peer_video" style={{display: "none"}} autoPlay />}
      </div>

      {editorVisible && 
        <div className="save-button-div">
          <Button variant="contained" className="save-button" onClick={handleSave} sx={{textTransform: "capitalize"}}>Save Change</Button>
          {/* <button className="save-button" onClick={handleSave}>Save</button> */}
          <Button variant="contained" className="save-button" onClick={downloadMD} sx={{textTransform: "capitalize"}}>Download Markdown</Button>
          <Button variant="contained" className="save-button" onClick={downloadHTML} sx={{textTransform: "capitalize"}}>Download HTML</Button>
          <Button variant="contained" className="save-button" onClick={downloadPDF} sx={{textTransform: "capitalize"}}>Download PDF</Button>
        </div>
      }
      {editorVisible && <MDEditor
        value={value}
        onChange={handleEditorChange}
        visiableDragbar={false}
        height={"80vh"}
        className='change-font'
      />}
      {!editorVisible && 
        <div id="default_renders">
          <MDEditor.Markdown source={defaultWelcome} />
        </div>
      }
    </div>
  );
}