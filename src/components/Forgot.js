import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert } from 'react-bootstrap';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import { routerMiddleware, push } from 'react-router-redux';

import '~/src/styles/login.css';


class Forgot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      forgot: false,
      invalid:false,
      email:"",
      disable:false,
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

    this.setState({
      invalid:false,
      forgot: true,
      email: email,
      disable:true,
    });


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


        <div className="input-form">
        <label className="label-form">email</label>
        <input className="text-input" id='email' ></input>
        </div>
        <button className="button" disable={this.state.disable} onClick={this.forgot.bind(this)}>Reset Password!</button>
        {this.state.forgot ?   <h5 className="sent">An email has been sent to {this.state.email}, follow the instructions in it to reset your password</h5>
        : null}
        {this.state.invalid ?   <h5 className="sent">Invalid Email address</h5>
        : null}
      </div>
    )
  }
}

export default Forgot;
