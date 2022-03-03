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
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import {getUserSpace} from '../store/actions/userAction';
import fbConfig from '../config/fbConfig';

function SelectedListItem(prop) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  let cookie = new Cookies();
  let userId = cookie.get('userId');
  console.log("inside user space component");
  async function getUserSpace() {
    return await fbConfig.collection("userSpace").where("user","==", userId).get()
  } 
        getUserSpace()
        .then(function(data){
          console.log("then");
          data.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
          })
        }).catch(function(err){
            console.log(err);
        });
  // async function getUserSpace(){
  //   return await prop.prop.getUserSpace();
  // }
  // getUserSpace().then(function(data){
    // data.forEach(doc =>{
    //   console.log(doc.id, "=>", doc.data());
    // };
  // }).catch(function(err){
  //   console.log("inside user space component");
  //   console.log(err);
  // })


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

function UserSpaceComponent(prop) {
  return (
    <div>
      <SelectedListItem prop={prop}/>
    </div>
  );
}

const mapStateToProp = (state) => {
  console.log(state);
  const cookie = new Cookies();
  return {
   // userSpace : state.firestore.where({collection:'userSpace', where:['user','==',cookie.get('userId')]})
   userSpace: state.firestore.storeget({collection:'userSpace'})
  }
}
const mapDispatchToProp = (dispatch) =>{
  return{
    getUserSpace: () => dispatch(getUserSpace())
  }
}
export default connect(null, mapDispatchToProp)(UserSpaceComponent)