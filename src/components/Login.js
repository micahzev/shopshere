import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert } from 'react-bootstrap';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import { routerMiddleware, push } from 'react-router-redux';

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

import decode from 'jwt-decode';

import '~/src/styles/login.css';

import { UserPoolId, ClientId } from '~/src/config';

class Login extends Component {

  async login() {
    try {
      const loggedIn = await this.awslogin();
      const storeId = decode(loggedIn.idToken.jwtToken)["custom:store-id"];
      const accessExpiry = decode(loggedIn.accessToken.jwtToken)["exp"];



      const epochNow = Math.round(new Date().getTime()/1000.0);

      document.getElementById('email').value = "";
      document.getElementById('password').value = "";

      window.localStorage.setItem('value', storeId);

      // console.log(storeId);
      // console.log(accessExpiry);
      // console.log(epochNow);

      if (epochNow < accessExpiry) {
              if ( storeId == 'admin'){
                  this.props.history.push('/admin-backend');
              } else {
                  this.props.history.push('/backend');
              }
      }



    }
    catch(e) {
      // console.log(e);
    }
  };

  awslogin() {

    let email = document.getElementById('email').value;
    let secret = document.getElementById('password').value;


    window.localStorage.setItem('secretKey', "loggedin");
    window.localStorage.setItem('username', email);

    const userPool = new CognitoUserPool({
      UserPoolId: UserPoolId,
      ClientId: ClientId
    });

    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationData = { Username: email, Password: secret };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(result),
        onFailure: err => reject(err)
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
    return (
      <div className="login-form">
        <h1>ShopSure Admin</h1>
        <h2>Login</h2>
        <div className="input-form">
        <label className="label-form">email</label>
        <input className="text-input" id='email' ></input>
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

export default Login;
