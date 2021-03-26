import React from 'react';
import { AppBar, Avatar, Button, Grid, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom';
import {
    authFunctions
} from '../firebase'

const gridStyle = {
    width: "100%",
    margin: "0px"
}

const leftPaperStyle = {
    width: "100%",
    backgroundColor: "#405185"
}

const h3Style = {
    color: "#FFF",
    padding: "20px"
}

const rightPaperStyle = {
     padding: "20px",
     height: "60vh",
     width: "250px",
     margin: "20px auto"
}

const buttonStyle = {
    margin: "10px 0px"
}

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            success: false,
            login: false,
            uid: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToLogIn = this.redirectToLogIn.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        authFunctions.signUp(
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.password
        );
        authFunctions.onUserActive((uid) => {
            this.setState({
                success: true,
                uid: uid
            });
        });
        event.preventDefault();
    }

    redirectToLogIn() {
        this.setState({login: true})
    }
    
    render() {
        if (this.state.login) {
            return <Redirect to='./login'/>
        }
        if (this.state.success) {
            return <Redirect to='./home'/>
        }
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <h1>Find-A-Friend</h1>
                    </Toolbar>
                </AppBar>
                <Grid container style={gridStyle} spacing={2}>
                    <Grid item xs={9}>
                        <Paper style={leftPaperStyle}>
                            <div>
                                <h3 style={h3Style}> 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </h3>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper style={rightPaperStyle} elevation={10}>
                            <Grid align="center">
                                <Avatar></Avatar>
                                <h2>Sign Up</h2>
                            </Grid>
                            <form onSubmit={this.handleSubmit}>
                                <TextField label="First Name" placeholder="John" name="firstname" id="firstname" fullWidth required autoFocus value={this.state.firstname} onChange={this.handleChange}/>
                                <TextField label="Last Name" placeholder="Dovey" name="lastname" id="lastname" fullWidth required value={this.state.lastname} onChange={this.handleChange}/>
                                <TextField label="Email" placeholder="Enter your email" name="email" id="email" fullWidth required value={this.state.email} onChange={this.handleChange}/>
                                <TextField label="Password" placeholder="Enter your password" name="password" id="password" fullWidth required type="password" value={this.state.password} onChange={this.handleChange}/>
                                <Button type="submit" color="primary" variant="contained" fullWidth style={buttonStyle}>
                                    Sign Up
                                </Button>
                            </form>
                            <Typography>
                                Already have an account? <Link href="" onClick={this.redirectToLogIn}>Log in</Link>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default SignUp;