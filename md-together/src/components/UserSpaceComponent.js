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
  //in restrict mode the following fetch will be sent twice, so I comment restrict mode in index.js
  //or we can write a handle and put the following fetch inside handle
  //I also write create/accpet/reject invitation and create/delete/ownerdelete project in the backend, 
  //please provide the corresponding button(I can see the button right now but there is no js function) in frontend
  const body = {
    query:`
    query{
      project(userId:""){
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
      projects = data.data.project;
      console.log(projects);
      //projects has format[{_id:"",name:""}]
    }
  })
  .catch(err =>{
    // need to change this to actual error messages
    // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
    console.log(err)
  });
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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
      <List component="nav" aria-label="files own by the user">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 1" />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 2" />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 3" />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 4" />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 5" />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 6" />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 7" />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 8" />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
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
        <ListItemButton
          selected={selectedIndex === 8}
          onClick={(event) => handleListItemClick(event, 8)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 9" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 9}
          onClick={(event) => handleListItemClick(event, 9)}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="File 10" />
        </ListItemButton>
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
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 10}
          onClick={(event) => handleListItemClick(event, 10)}
        >
          <ListItemIcon>
            <RsvpIcon />
          </ListItemIcon>
          <ListItemText primary="Invitation From Alice" />
          <IconButton sx={{ mr: 3 }}>
            <CheckIcon />
          </IconButton>
          <IconButton>
            <ClearIcon />
          </IconButton>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 11}
          onClick={(event) => handleListItemClick(event, 11)}
        >
          <ListItemIcon>
            <RsvpIcon />
          </ListItemIcon>
          <ListItemText primary="Invitation From Bob" />
          <IconButton sx={{ mr: 3 }}>
            <CheckIcon />
          </IconButton>
          <IconButton>
            <ClearIcon />
          </IconButton>
        </ListItemButton>
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