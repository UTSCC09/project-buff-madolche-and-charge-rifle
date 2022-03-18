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

function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // user's projects and the shared projects
  const [ownProjects, setOwnProjects] = React.useState(null);
  let sharedProjects = null;
  //in restrict mode the following fetch will be sent twice, so I comment restrict mode in index.js
  //or we can write a handle and put the following fetch inside handle
  //I also write create/accpet/reject invitation and create/delete/ownerdelete project in the backend, 
  //please provide the corresponding button(I can see the button right now but there is no js function) in frontend
  const ownedbody = {
    query:`
    query{
      owned(userId:"${ReactSession.get("userId")}"){
        _id
        name
      }
    }
    `
  }
  const sharedbody = {
    query:`
    query{
      shared(userId:"${ReactSession.get("userId")}"){
        _id
        name
      }
    }
    `
  }
  let err = false;
  let backenderr = false;
  let projects;
  fetch("http://localhost:3001/graphql", {
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
      projects = data.data.owned;
      setOwnProjects(projects);
      console.log(ownProjects);
      // console.log(data);
      //projects has format[{_id:"",name:""}]
    }
  })
  .catch(err =>{
    // need to change this to actual error messages
    // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
    console.log(err)
  });
  fetch("http://localhost:3001/graphql", {
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
      projects = data.data.shared;
      sharedProjects = projects;
      console.log(sharedProjects);
      // console.log(data);
      //projects has format[{_id:"",name:""}]
    }
  })
  .catch(err =>{
    // need to change this to actual error messages
    // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
    console.log(err)
  });
  const handleListItemClick = (event, index) => {
    //setSelectedIndex(index);

  };

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
  }

  // from Transition modal example in MUI documentation
  // https://mui.com/components/modal/#transitions
  function CreateProjectModal() {
    return (
      <div>
        <button onClick={handleCreateModalOpen}>
          <div sx={{ color: "#000000DE", textTransform: "capitalize" }}>Create New Doc</div>
        </button>
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
              <form onSubmit={handleCreateSubmit}>
                <label>Document Name:
                    &nbsp;
                    <input id="create_doc_name" type="text"></input>
                    &nbsp;
                  </label>
                <input type="submit" value="Create"></input>
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
  }

  // from Transition modal example in MUI documentation
  // https://mui.com/components/modal/#transitions
  function CreateInvModal() {
    return (
      <div>
        <button onClick={handleInviteModalOpen}>
          <div sx={{ color: "#000000DE", textTransform: "capitalize" }}>Invite User</div>
        </button>
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
              <form onSubmit={handleInviteSubmit}>
                <label>Invitee Email:
                    &nbsp;
                    <input id="invitee_email" type="text"></input>
                    &nbsp;
                  </label>
                <input type="submit" value="Invite"></input>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

  function OwnProjectList(props) {
    console.log(props.ownProjects);
    if (props.ownProjects !== null) {
      return (
        <div>
          {
            props.ownProjects.map((project, i) => (
              <ListItemButton
                selected={selectedIndex === i}
                onClick={(event) => handleListItemClick(event, i)}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary={project.name} />
                <IconButton>
                  <DeleteIcon onClick={handleProjectDelete} />
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

  function handleAccInv(e) {
    // accept the invitation
    e.preventDefault();
  }

  function handleDelInv(e) {
    // decline the invitation
    e.preventDefault();
  }

  function InvitationList() {
    // get all invitations of current user and use forEach to list them
    // if (invitations !== null) {
    //   return (
    //     <div>
    //       {
    //         invitations.forEach((invitation) => (
    //           <div>
    //             <ListItemIcon>
    //               <RsvpIcon />
    //             </ListItemIcon>
    //             <ListItemText primary={invitation.name} />
    //             <IconButton sx={{ mr: 3 }}>
    //               <CheckIcon onClick={handleAccInv} />
    //             </IconButton>
    //             <IconButton>
    //               <ClearIcon onClick={handleDelInv} />
    //             </IconButton>
    //           </div>
    //         ))
    //       }
    //     </div>
    //   );
    // } else {
    //   return <div></div>;
    // }

    // temporary, just to escape errors
    return <div></div>
  }

  function handleProjectDelete(e) {
    // onclick function for project deletion
    e.preventDefault();

  }

  // This component is built taking Selected ListItem as an example in MUI documentation
  // https://mui.com/components/lists/#selected-listitem
  return (
    <Box 
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
        component="div"
        sx={{ mr: 2, display: 'flex', fontWeight: "bold" }}
      >
        Your .md Docs
      </Typography>
      <CreateProjectModal />
      <List component="nav" aria-label="files own by the user">
        <OwnProjectList ownProjects = {ownProjects}/>
      </List>

      <Divider />
      <br></br>

      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: 'flex', fontWeight: "bold" }}
      > 
        .md Together With You
      </Typography>
      <List component="nav" aria-label="secondary mailbox folder">
        {/* <ListItemButton
          selected={selectedIndex === 8}
          onClick={(event) => handleListItemClick(event, 8)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 9" />
        </ListItemButton> */}
      </List>

      <Divider />
      <br></br>
      
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: 'flex', fontWeight: "bold" }}
      > 
        Pending Invitation
      </Typography>
      <CreateInvModal />
      <List component="nav" aria-label="secondary mailbox folder">
        <InvitationList />
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