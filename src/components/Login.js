import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert } from 'react-bootstrap';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import { routerMiddleware, push } from 'react-router-redux';

import '~/src/styles/login.css';


class Login extends Component {

  login() {
    let email = document.getElementById('email').value;
    let secret = document.getElementById('password').value;
    window.localStorage.setItem('secretKey', secret);
    window.localStorage.setItem('username', email);

    alert(email+" " + secret);

    this.props.history.push('/');
  }

  componentDidMount() {
    window.localStorage.removeItem('secretKey');
  }

  render() {
    return (
      <div className="login-form">
        <h1>Login to ShopSure Admin</h1>
        <div className="input-form">
        <label className="label-form">Email:</label>
        <input className="text-input" id='email' ></input>
        </div>
        <div className="input-form">
        <label className="label-form">Password:</label>
        <input className="text-input" id='password'></input>
        </div>
        <Button className="login-button" onClick={this.login.bind(this)}>Go!</Button>
      </div>
    )
  }
}

export default Login;
