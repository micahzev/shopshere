import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert } from 'react-bootstrap';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import { routerMiddleware, push } from 'react-router-redux';

import { fetchOneUser } from '~/src/actions/users';

import { withCookies, Cookies } from 'react-cookie';

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CookieStorage
} from "amazon-cognito-identity-js";

import decode from 'jwt-decode';

import '~/src/styles/login.css';

import { UserPoolId, ClientId, ApplicationDomain } from '~/src/config';

class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
        userMessage: "",
      };
  };

  componentDidMount() {
    window.localStorage.setItem('secretKey', null);
	  window.localStorage.setItem('username', null);
		window.localStorage.setItem('value', null);

  }

  async login() {

    await this.setState({
          userMessage:""
        });

    try {
      const loggedIn = await this.awslogin();
      const storeId = decode(loggedIn.idToken.jwtToken)["custom:store-id"];
      const accessExpiry = decode(loggedIn.accessToken.jwtToken)["exp"];

      let email = document.getElementById('email').value;

      try {
        const userDetails = await this.props.fetchOneUser({
          id:email
        });
      } catch(e) {
        this.setState({
            userMessage:'There was an error logging you in. Contact shopsure support for help logging in.'
          });
          return;
      }

      const userDetails = await this.props.fetchOneUser({
        id:email
      });

      if (userDetails.userStatus != 'enabled') {
        this.setState({
            userMessage:'You cannot login at this time. Please contact shopsure support for help logging into your account.'
          });
          return;
      }


      const epochNow = Math.round(new Date().getTime()/1000.0);

      document.getElementById('email').value = "";
      document.getElementById('password').value = "";

      window.localStorage.setItem('value', storeId);


      console.log("Post Login LocalStorage:");
      console.log(localStorage);
      console.log(document.cookie);
      console.log(ApplicationDomain);


      if (epochNow < accessExpiry) {
              if ( storeId == 'admin'){
                  this.props.history.push('/admin-backend');
              } else {
                  this.props.history.push('/backend');
              }
      } else {
        this.setState({
          userMessage:'Your login session has expired. Relogin to refresh your login session.'
        })
      }



    }
    catch(e) {
      this.setState({
        userMessage:e.message
      });
    }
  };

  awslogin() {

    let email = document.getElementById('email').value;
    let secret = document.getElementById('password').value;


    window.localStorage.setItem('secretKey', "loggedin");
    window.localStorage.setItem('username', email);

    const userPool = new CognitoUserPool({
      UserPoolId: UserPoolId,
      ClientId: ClientId,
      Storage: new CookieStorage({
        domain: ApplicationDomain,
        secure: false
      })
    });

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
      Storage: new CookieStorage({
        domain: ApplicationDomain,
        secure: false
      })
     });
    const authenticationData = { Username: email, Password: secret };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result)
        },
        onFailure: (err) => {
          reject(err)
          this.setState({
            userMessage:err.message
          })
        }
      })
    );

  }

  forgot() {
    this.props.history.push('/forgot');
  }

  componentDidMount() {
    window.localStorage.removeItem('secretKey');
  }

  render() {

    const emailAddress = this.props.params.email ? this.props.params.email : "";

    console.log("Initial LocalStorage:");
    console.log(localStorage);
    console.log(document.cookie);
    console.log(ApplicationDomain);

    return (
      <div className="login-form">
        <h1>ShopSure Admin</h1>
        <h2>Login</h2>
        <div>{this.state.userMessage}</div>
        <div className="input-form">
        <label className="label-form">email</label>
        <input className="text-input" id='email' defaultValue={emailAddress}></input>
        </div>
        <div className="input-form">
        <label className="label-form">password</label>
        <input className="password-input" autoComplete="off" id='password'></input>
        </div>
        <button className="button" onClick={this.login.bind(this)}>Go!</button>
        <p><span onClick={this.forgot.bind(this)}>forgot password?</span></p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOneUser: bindActionCreators(fetchOneUser, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
