import React, { Component } from 'react';
import { Header } from './components/header/header.component';
import { ChatPanel } from './components/chatpanel/chatpanel.component';
import Passport from './services/passport';


import './App.scss';

class App extends Component {

  constructor(){
    super();
    this.state = {
      guest : []    
    }
  }

  componentDidMount(){
    const jwt_auth_token = localStorage.getItem('jwt_auth_token');
    this.checkSession(jwt_auth_token);
  }

  checkSession(jwt_auth_token){
    /* if token exists - check for session validity , else generate a new token & user */
    if(jwt_auth_token){
      // check for session validity
      Passport.validateSession(jwt_auth_token).then(response =>{
        // if not valid - then generate new token & new user. 
        if(response.data.name === 'TokenExpiredError'){
          this.generatenewToken();
        }
        // if valid - get user details
        else if(response.data.guest){
          this.setState({guest : [response.data.guest]});
        }
      }).catch(err => {
        console.log(err)
      });

    }else{
      this.generatenewToken();
    }
  }

  generatenewToken() {
    // generate a new user & access token 
    Passport.generatenewToken().then(response =>{
      this.saveCredentials(response.data.token,response.data.guest);
      this.setState({guest : [response.data.guest]});
    }).catch(err => {
      console.log(err);
    });
  }

  saveCredentials(token,guest){
    localStorage.setItem('jwt_auth_token', token);
  }

  render(){
    const { guest } = this.state;
    return (
      <div className='App'>
        <div className="container-fluid">
          <Header></Header>
          <div className="row justify-content-md-center">
            <div className="col col-lg-9">
              <ChatPanel guest={guest}></ChatPanel>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
