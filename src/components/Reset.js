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

class Reset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message:"",
      success:false
    };
  }



  reset() {

      const username = this.props.params.email;
      const verifcode = document.getElementById('verifcode').value;
      const password1 = document.getElementById('password1').value;
      const password2 = document.getElementById('password2').value;

      if (verifcode == "" || password1=="" || password2 =="") {
        this.setState({
          message:"Some fields are empty."
        })
        return;
      }

      if (password1 != password2){
        this.setState({
          message:"Passwords do not match."
        })
        return;
      }

    const userPool = new CognitoUserPool({
      UserPoolId: UserPoolId,
      ClientId: ClientId
    });

    const user = new CognitoUser({ Username: username, Pool: userPool });

    return new Promise((resolve, reject) => {
        user.confirmPassword(verifcode, password1, {
            onFailure: (err) => {
                reject(err);
                this.failMessage(err);
            },
            onSuccess: (result) => {
              document.getElementById('verifcode').value="";
              document.getElementById('password1').value="";
              document.getElementById('password2').value="";
              this.setState({
                message:"",
                success:true
              });
                resolve(result);
            }
        });
    });
}


failMessage(err){
  this.setState({
    message:err.message
  });
}

resend(){

  const username = this.props.params.email;

  const userPool = new CognitoUserPool({
    UserPoolId: UserPoolId,
    ClientId: ClientId
  });

  const user = new CognitoUser({ Username: username, Pool: userPool });

  return new Promise((resolve, reject) =>
    user.forgotPassword({
      onSuccess: (result) => {
        this.setState({
          message:"A verification code was resent to your email address."
        });
        document.getElementById('verifcode').value="";
        document.getElementById('password1').value="";
        document.getElementById('password2').value="";
        resolve(result);
        this.props.history.push('/reset/'+username);
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

redirect(){
  const username = this.props.params.email;
  this.props.history.push('/login/'+username);
}


  render() {

    const userEmail = this.props.params.email;

    return (
      <div className="login-form">
        <h1>ShopSure Admin</h1>
        <h2>Reset Password</h2>

        <div className="resetmessage">An email has been sent to <u>{userEmail}</u> with a verification code. <br/> Paste the code in the form below to set a new password for your account.
        <button className="resendbutton" onClick={this.resend.bind(this)}>resend verif code</button></div>

        <br/>
        <div className="reseterrormessage">{this.state.message}</div>
        <br/>

        <div className="input-form">
        <label className="label-form">Verification Code</label>
        <input className="text-input" id='verifcode' ></input>
        </div>
        <hr/>
        <div className="input-form">
        <label className="label-form">New Password</label>
        <input className="password-input" autoComplete="off" id='password1'></input>
        </div>
        <div className="input-form">
        <label className="label-form">Confirm New Password</label>
        <input className="password-input" autoComplete="off" id='password2'></input>
        </div>

        <button className="button" onClick={this.reset.bind(this)}>Reset Password!</button>

        {this.state.success ?
          <div className="successResetMessage"> Your password has successfully been reset. Click <span className="clicklylink" onClick={this.redirect.bind(this)}>here</span> to login with your new login details. </div> : null}
      </div>
    )
  }
}

export default Reset;
