// This component is built taking Sign in and Sign up as examples in Free React Template under MUI documentation
// https://mui.com/getting-started/templates/
// https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sign-in/SignIn.js
// https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sign-up/SignUp.js
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReactSession from 'react-client-session/dist/ReactSession';
// const validator = require("validator");

const theme = createTheme();


// Taking from Sign in example in Free React Template under MUI documentation
// https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sign-in/SignIn.js
function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let email= data.get('email');
    let password= data.get('password');
    event.currentTarget.reset();
    const body = {
      query:`
      query {
        emailLogin(email:"${email}", password:"${password}"){
          userId
          email
          token
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    fetch("http://mdtogether.live:3001/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json'
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
          document.getElementById("Log In Error Box").innerHTML = "Something wrong with server, please contact to admin";
        }else{
          document.getElementById("Log In Error Box").innerHTML = "** " + data.errors[0].message + " **";
        }
      }else{
        ReactSession.set('userId',data.data.emailLogin.userId);
        ReactSession.set('email',data.data.emailLogin.email);
        ReactSession.set('token',data.data.emailLogin.token);
        ReactSession.set('projectId', null);
        ReactSession.set('type', null);
        window.location.reload();
        //console.log(data);
      }
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });
  };

  function handleFormChange() {
    document.getElementById("Log In Error Box").innerHTML = "";
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} onChange={handleFormChange}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <div id="Log In Error Box" className='error-box'></div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// Taking from Sign up example in Free React Template under MUI documentation
// https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sign-up/SignUp.js
function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let email= data.get('email');
    let password= data.get('password');
    let firstName = data.get('firstName');
    let lastName = data.get('lastName');
    event.currentTarget.reset();
    const body = {
      query:`
      mutation{
        createUser(UserInput:{firstName:"${firstName}", lastName:"${lastName}", email:"${email}",password:"${password}"}){
          userId
          email
          token
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    fetch("http://mdtogether.live:3001/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json'
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
          document.getElementById("Sign Up Error Box").innerHTML ="Something wrong with server, please contact to admin";
        }else{
          document.getElementById("Sign Up Error Box").innerHTML = "** " + data.errors[0].message + " **";
        }
      }else{
        ReactSession.set('userId',data.data.createUser.userId);
        ReactSession.set('email',data.data.createUser.email);
        ReactSession.set('token',data.data.createUser.token);
        window.location.reload();
      }
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });
    // .then(data =>{
    //   const signin = {
    //     query:`
    //     query {
    //       emailLogin(email:"${email}", password:"${password}"){
    //         userId
    //         token
    //       }
    //     }
    //     `
    //   }
    //   return fetch("http://mdtogether.live:3001/graphql", {
    //     method: 'POST',
    //     body: JSON.stringify(signin),
    //     headers:{
    //       "Content-Type": 'application/json'
    //     }
    //   })
    // })
    // .then(res =>{
    //   if(res.status !== 200 && res.status !== 201) {
    //     // need to change this to actual error messages
    //     document.getElementById("Sign Up Error Box").innerHTML = res.statusText;
    //     // console.log("Failed");
    //     return res.json();
    //   }
    //   window.location.reload();
    //   return res.json();
    // })
    // .then(data =>{
    //   ReactSession.set('userId',data.data.emailLogin.userId);
    //   ReactSession.set('token',data.data.emailLogin.token);
    // })
    // .catch(err =>{
    //   // need to change this to actual error messages
    //   // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
    //   console.log(err)
    // });
  };

  function handleFormChange() {
    document.getElementById("Sign Up Error Box").innerHTML = "";
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} onChange={handleFormChange}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <div id="Sign Up Error Box" className='error-box'></div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default function LoginComponent() {
  const [modalValue, setModalValue] = React.useState(0);

  let CurrModal = modalValue === 0 ? <SignIn/> : <SignUp/>;

  const handleModalValueChange = (event, newValue) => {
    setModalValue(newValue);
  };

  return (
    <div>
      <Box>
        <Tabs value={modalValue} onChange={handleModalValueChange} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        {CurrModal}
      </Box>
    </div>
  );
}
