// This component is built taking Selected ListItem as an example in MUI documentation
// https://mui.com/components/lists/#selected-listitem
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// icons imported from MUI Material icons
// https://mui.com/components/material-icons/
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import RsvpIcon from '@mui/icons-material/Rsvp';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ReactSession from 'react-client-session/dist/ReactSession';
import Button from '@mui/material/Button';

// render owned and shared projects
function ProjectList(props) {

  if (props.projects !== null) {
    let i = 0;
    return (
      <div>
        {
          props.projects.map((project) => (
            <ListItemButton
              key={++i}
              selected={props.selectedIndex === project._id}
              onClick={(event) => props.handleListItemClick(event, project._id,project.name, props.type)}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary={project.name} />
              <IconButton onClick={(event) =>props.handleProjectDelete(event,project._id,props.type)}>
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          ))
        }
      </div>
    );
  } else {
    return <div></div>;
  }
}

// render invitations
function InvitationList(props) {

  function handleAccInv(e, projectId) {
    // accept the invitation
    e.preventDefault();
    const body = {
      query:`
      mutation{
        acceptInv(userId:"", projectId:"${projectId}"){
          _id
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    let proId;
    fetch("https://api.mdtogether.live/graphql", {
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
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)      }
      }else{
        proId = data.data.acceptInv;
        console.log(proId);
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });
    window.location.reload();
  }

  function handleDelInv(e, projectId) {
    // decline the invitation
    e.preventDefault();
    const body = {
      query:`
      mutation{
        rejectInv(userId:"", projectId:"${projectId}"){
          _id
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    let proId;
    fetch("https://api.mdtogether.live/graphql", {
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
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)      }
      }else{
        proId = data.data.rejectInv;
        console.log(proId);
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });
    window.location.reload();
  }

  if (props.invitations !== null) {
    return (
      <div>
        {
          props.invitations.map((invitation) => (
            <ListItemButton>
              <ListItemIcon>
                <RsvpIcon />
              </ListItemIcon>
              <ListItemText primary={invitation.name} />
              <IconButton sx={{ mr: 3 }}>
                <CheckIcon onClick={(event) => handleAccInv(event,invitation._id)} />
              </IconButton>
              <IconButton>
                <ClearIcon onClick={(event) => handleDelInv(event, invitation._id)} />
              </IconButton>
            </ListItemButton>
          ))
        }
      </div>
    );
  } else {
    return <div></div>;
  }
}

function SelectedListItem() {
  //in restrict mode the following fetch will be sent twice, so I comment restrict mode in index.js
  //or we can write a handle and put the following fetch inside handle
  //I also write create/accpet/reject invitation and create/delete/ownerdelete project in the backend, 
  //please provide the corresponding button(I can see the button right now but there is no js function) in frontend
  const [ownProjects, setOwnProjects] = React.useState(null);
  const [sharedProjects, setSharedProjects] = React.useState(null);
  const [invitations, setInvitations] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(ReactSession.get("projectId"));

  React.useEffect(() => {
    // fetch own projects
    const ownedbody = {
      query:`
      query{
        owned(userId:""){
          _id
          name
        }
      }
      `
    }
    let own_err = false;
    let own_backenderr = false;
    let own_projects;
    fetch("https://api.mdtogether.live/graphql", {
    method: 'POST',
    body: JSON.stringify(ownedbody),
    headers:{
      "Content-Type": 'application/json',
      "Authorization":'asda '+ ReactSession.get('token')
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        // need to change this to actual error messages
        own_err = true;
        if(res.status === 400){
          own_backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(own_err){
        if(own_backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)      }
      }else{
        own_projects = data.data.owned;
        setOwnProjects(own_projects);
        // console.log(data);
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(own_err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(own_err)
    });

    // fetch shared projects
    const sharedbody = {
      query:`
      query{
        shared(userId:""){
          _id
          name
        }
      }
      `
    }
    let share_err = false;
    let share_backenderr = false;
    let share_projects;
    
    fetch("https://api.mdtogether.live/graphql", {
    method: 'POST',
    body: JSON.stringify(sharedbody),
    headers:{
      "Content-Type": 'application/json',
      "Authorization":'asda '+ ReactSession.get('token')
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        // need to change this to actual error messages
        share_err = true;
        if(res.status === 400){
          share_backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(share_err){
        if(share_backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)      }
      }else{
        share_projects = data.data.shared;
        setSharedProjects(share_projects);
        // console.log(data);
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(share_err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(share_err)
    });


    // fetch invitations
    const invitationbody = {
      query:`
      query{
        invited(userId:""){
          _id
          name
        }
      }
      `
    }
    let inv_err = false;
    let inv_backenderr = false;
    let fetched_inv;
    
    fetch("https://api.mdtogether.live/graphql", {
    method: 'POST',
    body: JSON.stringify(invitationbody),
    headers:{
      "Content-Type": 'application/json',
      "Authorization":'asda '+ ReactSession.get('token')
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        // need to change this to actual error messages
        inv_err = true;
        if(res.status === 400){
          inv_backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(inv_err){
        if(inv_backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)      }
      }else{
        fetched_inv = data.data.invited;
        setInvitations(fetched_inv);
        // console.log(fetched_inv);
        // console.log(data);
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(inv_err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(inv_err)
    });
  }, []);

  const handleListItemClick = (event, projectId, projectName, type) => {
    event.preventDefault();
    setSelectedIndex(projectId);
    ReactSession.set("projectId",projectId);
    ReactSession.set("projectName",projectName);
    ReactSession.set("type",type);
    window.location.reload();
  };

  function handleOwnedProjectDelete(e, projectId) {
    // onclick function for project deletion
    e.preventDefault();
    // prevent parent onclick
    e.stopPropagation();
    if (selectedIndex === projectId) {
      ReactSession.set("projectId", null);
    }
    const body = {
      query:`
      mutation{
        ownerDelPro(userId:"",projectId:"${projectId}"){
          _id
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    let proId;
    fetch("https://api.mdtogether.live/graphql", {
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
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)
        }
      }else{
        proId = data.data.ownerDelPro;
        console.log(proId);
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });
    window.location.reload();
  }

  function handleSharedProjectDelete(e, projectId) {
    // onclick function for project deletion
    e.preventDefault();
    // prevent parent onclick
    e.stopPropagation();
    if (selectedIndex === projectId) {
      ReactSession.set("projectId", null);
    }
    const body = {
      query:`
      mutation{
        deleteProject(userId:"",projectId:"${projectId}"){
          _id
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    let proId;
    fetch("https://api.mdtogether.live/graphql", {
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
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)      }
      }else{
        proId = data.data.deleteProject;
        console.log(proId);
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });
    window.location.reload();
  }

  // from Transition modal example in MUI documentation
  // https://mui.com/components/modal/#transitions
  const SubModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #888',
    boxShadow: 24,
    p: 4,
    width: {xs: "58vw", md: "60vw"},
    borderRadius: 3,
    paddingX: { xs: 2, md: 4 },
    paddingY: { xs: 4, md: 7 }
  }; 

  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);

  function handleCreateSubmit(e) {
    // create form submit
    e.preventDefault();
    // eslint-disable-next-line no-console
    let name= document.getElementById("create_doc_name").value;
    const body = {
      query:`
      mutation{
        createProject(ProjectInput:{owner:"", name:"${name}"}){
          _id
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    let proId;
    fetch("https://api.mdtogether.live/graphql", {
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
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)      }
      }else{
        proId = data.data.createProject._id;
        ReactSession.set("projectId",proId);
        ReactSession.set("type","owned");
        window.location.reload();
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });

  }

  // from Transition modal example in MUI documentation
  // https://mui.com/components/modal/#transitions
  function CreateProjectModal() {
    return (
      <div>
        <Button onClick={handleCreateModalOpen} variant="contained" sx={{textTransform: "capitalize"}} className="save-button">Create new doc</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={createModalOpen}
          onClose={handleCreateModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={createModalOpen}>
            <Box sx={SubModalStyle}>
              <form>
                <label>Document Name:
                  &nbsp;
                  <input id="create_doc_name" type="text" className='input-box change-font'></input>
                  &nbsp;
                </label>
                <Button variant="contained" className="save-button" onClick={handleCreateSubmit} sx={{textTransform: "capitalize"}}>Create</Button>
                {/* <input type="submit" value="Create"></input> */}
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

  const [inviteModalOpen, setInviteModalOpen] = React.useState(false);
  const handleInviteModalOpen = () => setInviteModalOpen(true);
  const handleInviteModalClose = () => setInviteModalOpen(false);

  function handleInviteSubmit(e) {
    // invite form submit
    e.preventDefault();
    let email= document.getElementById("invitee_email").value;
    const body = {
      query:`
      mutation{
        createInv(owner:"",email:"${email}", projectId:"${ReactSession.get("projectId")}"){
          _id
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    let proId;
    fetch("https://api.mdtogether.live/graphql", {
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
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log(data.errors[0].message)
        }else{
          console.log(data.errors[0].message)      }
      }else{
        proId = data.data.createInv;
        console.log(proId);
        //projects has format[{_id:"",name:""}]
      }
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });
    handleInviteModalClose();
  }

  // from Transition modal example in MUI documentation
  // https://mui.com/components/modal/#transitions
  function CreateInvModal() {
    return (
      <div>
        <Button onClick={handleInviteModalOpen} variant="contained" sx={{textTransform: "capitalize"}} className="save-button">Invite User</Button>
        {/* <button onClick={handleInviteModalOpen}>
          <div sx={{ color: "#000000DE", textTransform: "capitalize" }}>Invite User</div>
        </button> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={inviteModalOpen}
          onClose={handleInviteModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={inviteModalOpen}>
            <Box sx={SubModalStyle}>
              <form>
                <label>Invitee Email:
                  &nbsp;
                  <input id="invitee_email" type="text" className='change-font input-box'></input>
                  &nbsp;
                </label>
                <Button variant="contained" className="save-button" onClick={handleInviteSubmit} sx={{textTransform: "capitalize"}}>Invite</Button>
                {/* <input type="submit" value="Invite"></input> */}
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

  // This component is built taking Selected ListItem as an example in MUI documentation
  // https://mui.com/components/lists/#selected-listitem
  return (
    <Box 
      id="userspace_modal"
      sx={{ 
        width: '100%', 
        bgcolor: 'background.paper',
        height: {xs: "60vh", md: "60vh"},
        overflowX: "auto",
        overflowY: "scroll"
      }}
    >
      <Typography
        variant="h6"
        noWrap
        className='change-font'
        component="div"
        sx={{ mr: 2, display: 'flex', fontWeight: "bold" }}
      >
        Welcome, {ReactSession.get("firstName") + " " + ReactSession.get("lastName")}!
      </Typography>
      <Typography 
        variant="p"
        noWrap
        className='change-font'
        component="div"
        sx={{ mr: 2, display: 'flex', fontWeight: "bold" }}
      >
        <br/>
        Your Email: <br/>{ReactSession.get("email")}
      </Typography>
      <br/>
      <Divider />
      <br></br>
      <Typography
        variant="h6"
        noWrap
        className='change-font'
        component="div"
        sx={{ mr: 2, display: 'flex', fontWeight: "bold" }}
      >
        Your .md Docs
      </Typography>
      <CreateProjectModal />
      <List component="nav" aria-label="files own by the user">
        <ProjectList type={"owned"} projects={ownProjects} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} handleProjectDelete={handleOwnedProjectDelete} />
      </List>

      <Divider />
      <br></br>

      <Typography
        variant="h6"
        noWrap
        className='change-font'
        component="div"
        sx={{ mr: 2, display: 'flex', fontWeight: "bold" }}
      > 
        .md Together With You
      </Typography>
      <ProjectList type={"shared"} projects={sharedProjects} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} handleProjectDelete={handleSharedProjectDelete} />
      <List component="nav" aria-label="secondary mailbox folder">
        {/* shared projects */}
      </List>

      <Divider />
      <br></br>
      
      <Typography
        variant="h6"
        noWrap
        className='change-font'
        component="div"
        sx={{ mr: 2, display: 'flex', fontWeight: "bold" }}
      > 
        Pending Invitation
      </Typography>
      <CreateInvModal />
      <List component="nav" aria-label="secondary mailbox folder">
        <InvitationList invitations={invitations} />
      </List>
    </Box>
  );
}

export default function UserSpaceComponent() {
  return (
    <div>
      <SelectedListItem />
    </div>
  );
}