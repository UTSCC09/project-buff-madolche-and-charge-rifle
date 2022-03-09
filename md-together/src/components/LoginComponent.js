// This component is built taking Sign in and Sign up as examples in Free React Template under MUI documentation
// https://mui.com/getting-started/templates/
// https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sign-in/SignIn.js
// https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sign-up/SignUp.js
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReactSession from 'react-client-session/dist/ReactSession';
const validator = require("validator");

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
    if(!validator.isEmail(email) || !validator.isAlphanumeric(password)){
      console.log("Wrong format of email or password");
      return;
    }
    const body = {
      query:`
      query {
        emailLogin(email:"${email}", password:"${password}"){
          userId
          token
        }
      }
      `
    }
    fetch("http://localhost:3001/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json'
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      ReactSession.set('userId',data.data.emailLogin.userId);
      ReactSession.set('token',data.data.emailLogin.token);
    })
    .catch(err =>{
      console.log(err)
    });

  };

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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
    if(!validator.isEmail(email) 
    || !validator.isAlphanumeric(password) 
    || !validator.isAlpha(firstName) 
    || !validator.isAlpha(lastName)){
      console.log("Wrong format of email or password");
    }
    const body = {
      query:`
      mutation{
        createUser(UserInput:{firstName:"${firstName}", lastName:"${lastName}", email:"${email}",password:"${password}"}){
          _id
          firstName
          lastName
          email
          password
        }
      }
      `
    }
    fetch("http://localhost:3001/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json'
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        throw new Error('Failed');
      }
      return res.json();
    })
    .then(data =>{
      const signin = {
        query:`
        query {
          emailLogin(email:"${email}", password:"${password}"){
            userId
            token
          }
        }
        `
      }
      return fetch("http://localhost:3001/graphql", {
      method: 'POST',
      body: JSON.stringify(signin),
      headers:{
        "Content-Type": 'application/json'
      }
      })
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      ReactSession.set('userId',data.data.emailLogin.userId);
      ReactSession.set('token',data.data.emailLogin.token);
    })
    .catch(err =>{
      console.log(err)
    });
  };

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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
