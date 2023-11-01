import React, { useState } from "react";
import { SERVER_URL } from "../constants.js"
import Carlist from './Carlist';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
//import { SERVER_URL } from "./constants.js";
import '../App.css';
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import OwnerList from "./Ownerlist";
import carshop from '../img/carshop.jpeg';
import HomeIcon from '@mui/icons-material/Home';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';

function Login()
{
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [open, setOpen] = useState(false);

    const [isAuthenticated, setAuth] = useState(false);

    const handleChange =  event =>{
        setUser({...user, [event.target.name]: event.target.value });
    };

    const login = () => {
        fetch(SERVER_URL + "login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user),
        })
          .then(res => {
            const jwtToken = res.headers.get("Authorization");
            if (jwtToken != null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            } else{
                setOpen(true);
            }
          })
            .catch(err => console.error(err));
    };

    const logout = () => {
        if (window.confirm("Are you sure you wanna logout ?")) {
            sessionStorage.removeItem("jwt");
            setAuth(false);
        }
    };

    const [button1Color, setButton1Color] = useState('primary');
    const [button2Color, setButton2Color] = useState('primary');
    const [button3Color, setButton3Color] = useState('primary');
    const [showCarlist, setShowCarlist] = useState(true);

    const handleButtonClick = (buttonNumber) => {
        // Toggle the color of the clicked button
        if (buttonNumber === 1) {
          setButton1Color('secondary');
          setButton2Color('primary');
          setButton3Color('primary');
          setShowCarlist(true);
        } else if (buttonNumber === 2) {
            setButton2Color('secondary');
            setButton1Color('primary');
            setButton3Color('primary');
            setShowCarlist(true);
        } else if (buttonNumber === 3) {
            setButton3Color('secondary');
            setButton2Color('primary');
            setButton1Color('primary');
            setShowCarlist(false);
        }
      };

    if (isAuthenticated) {
        return (
            <div id="app" className="App">
                <AppBar position='static'>
                <Toolbar>
                <img src={carshop} alt='carshop' width={100} height={100}/>
                <Typography variant='h6'><strong>CAR-SHOP</strong></Typography>
                <Toolbar></Toolbar>
                <Toolbar>
                    <Button variant='contained' size='small' id="b1" color={button1Color} onClick={() => handleButtonClick(1)}><HomeIcon/></Button>
                </Toolbar>
                <Toolbar></Toolbar>
                <Toolbar>
                    <Button variant='contained' size='small' id="b2" color={button2Color} onClick={() => handleButtonClick(2)}><AirportShuttleIcon/><strong>CARS</strong></Button>
                </Toolbar>
                <Toolbar></Toolbar>
                <Toolbar>
                    <Button variant='contained' size='small' id="b3" color={button3Color} onClick={() => handleButtonClick(3)}><PersonIcon/><strong>OWNERS</strong></Button>
                </Toolbar>
                <Toolbar></Toolbar><Toolbar></Toolbar><Toolbar></Toolbar><Toolbar></Toolbar><Toolbar></Toolbar><Toolbar></Toolbar><Toolbar></Toolbar>
                <Toolbar>
                    <Button variant='contained' size='small' id="b4" onClick={logout}><LoginIcon/></Button>
                </Toolbar>
                </Toolbar>    
                </AppBar>
                {showCarlist ? <Carlist /> : <OwnerList />}
            </div>
        );
    }
    else{
        return (
            <div>
            <div className="box">
                <img src={carshop} alt='carshop' width={100} height={100}/>
                <Stack spacing={2} alignItems="center" mt={2}>
                    <TextField className="connect" name="username" label="Username" onChange={handleChange}/>
                    <TextField className="connect"
                        type="password"
                        name="password"
                        label="Password"
                        onChange={handleChange}
                    />
                    <Button variant="outlined" color="primary" onClick={login}>Login</Button>
                </Stack>
                <Snackbar
                className="connect"
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Login failed: Check your username or password"
                />
            </div>
            </div>
        );
    }
}

export default Login;