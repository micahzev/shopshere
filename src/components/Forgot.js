import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert } from 'react-bootstrap';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import { routerMiddleware, push } from 'react-router-redux';

import '~/src/styles/login.css';

import {
  CognitoUserPool,
  CognitoUser
} from "amazon-cognito-identity-js";

import { UserPoolId, ClientId } from '~/src/config';

class Forgot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      forgot: false,
      invalid:false,
      email:"",
      disable:false,
      message:""
    };
  }


  forgot() {
    let email = document.getElementById('email').value;

    if (this.state.disable) {
      return;
    }

    if(!this.validateEmail(email)) {
      this.setState({
        forgot: false,
        invalid:true,
      });
      return;
    }

    document.getElementById('email').value = "";

    const userPool = new CognitoUserPool({
      UserPoolId: UserPoolId,
      ClientId: ClientId
    });

    const user = new CognitoUser({ Username: email, Pool: userPool });

    return new Promise((resolve, reject) =>
      user.forgotPassword({
        onSuccess: (result) => {
          this.setState({
            invalid:false,
            forgot: true,
            email: email,
            disable:true,
            message:""
          });

          resolve(result);
          this.props.history.push('/reset/'+email);
        },
        onFailure: (err) => {
          this.setState({
            message:err.message
          });
          reject(err);
        }
      })
    );
  }




  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }



  render() {
    return (
      <div className="login-form">
        <h1>ShopSure Admin</h1>
        <h2>Forgot Password</h2>

        <h5>An email will be sent to you in order to reset your password</h5>

        <div>{this.state.message}</div>

        <div className="input-form">
        <label className="label-form">email</label>
        <input className="text-input" id='email' ></input>
        </div>
        <button className="button" disable={this.state.disable} onClick={this.forgot.bind(this)}>Send Reset Password Code</button>
        {this.state.invalid ?   <h5 className="sent">Invalid Email address</h5>
        : null}
      </div>
    )
  }
}

export default Forgot;
