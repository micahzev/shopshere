import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object, bool, func } from 'prop-types';
import { Modal, Button, Image } from 'react-bootstrap';

import FormInputArea from '~/src/components/applications/FormInputArea';

import crypto from 'crypto';

import * as AWSCognito from 'amazon-cognito-identity-js';

import '~/src/styles/admin-users.css';

import { UserPoolId, ClientId, emailAPI } from '~/src/config';


class AddStoreUser extends Component {

  constructor(props) {
      super(props);
      this.state = {
        type:'storeowner',
        password:this.makeid(),
        email:undefined,
        name:"none",
        surname:"none",
        telephone:"none"
      }
  };

  handleClose(){

    this.state = {
      type:'storeowner',
      password:this.makeid(),
      email:undefined,
      name:"none",
      surname:"none",
      telephone:"none"
    }
    this.props.close();
  }

  makeid() {
      let text = "";
      const possibleMAJ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const possibleMIN = "abcdefghijklmnopqrstuvwxyz";
      const possibleNUM = "0123456789";
      const possibleSYM = "!@#$%^&*()";

      text += possibleMAJ.charAt(Math.floor(Math.random() * possibleMAJ.length));

      for (var i = 0; i < 5; i++)
        text += possibleMIN.charAt(Math.floor(Math.random() * possibleMIN.length));

      text += possibleNUM.charAt(Math.floor(Math.random() * possibleNUM.length));
      text += possibleSYM.charAt(Math.floor(Math.random() * possibleSYM.length));

      return text;
}

signup(email, password, shopid) {


  const userPool = new AWSCognito.CognitoUserPool({
    UserPoolId: UserPoolId,
    ClientId: ClientId
  });

  const attributeList = [];

  const dataEmail = {
      Name : 'email',
      Value : email
  };

  const dataShopId = {
      Name : 'custom:store-id',
      Value : shopid
  };

  const attributeEmail = new AWSCognito.CognitoUserAttribute(dataEmail);
  const attributeShopID = new AWSCognito.CognitoUserAttribute(dataShopId);


  attributeList.push(attributeEmail);
  attributeList.push(attributeShopID);


  return new Promise((resolve, reject) =>
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
        return alert(err.message);
      }
      resolve(result.user)
    })
  );
}

validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

  async handleSubmit(){


const shopID = window.localStorage.getItem('value');

    if (!this.validateEmail(this.state.email)) {
      return alert("invalid email");
    }


      // create user
      const newUser = await this.signup(this.state.email, this.state.password, shopID);

      const userObject = {
        email:this.state.email,
        userType:this.state.type,
        userName: this.state.name,
        userSurname: this.state.surname,
        shopid: shopID,
        userTelephone: this.state.telephone,
        userStatus:"enabled"
      }


      this.props.addUser(userObject);

      this.handleClose()




  }

  handleInputChange(event){
    event.preventDefault();

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSelectedChange(event){


      await this.setState({
          type: event.target.value,
        });

  }

  async handleSelecteShopChange(event){
    await this.setState({
      shop: event.target.value,
    });
  }

  newPassword(event){
    event.preventDefault();
    this.setState({
      password:this.makeid(),
    })
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose.bind(this)}>
              <Modal.Header closeButton>
                    <Modal.Title>
                      Add a New User
                    </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form>


                    <div>
                    <u>Store Owners</u> can perform all backoffice functions, add products, viewpoints, change shop settings and add new users to manage the store.
                    <u>Store Managers</u> can only add products, viewpoints, change shop settings,  they cannot add new users to the store.
                    </div>
                    <hr/>
                    User Role
                    <label>
                        What type of new user do you want to add?
                            <select value={this.state.type} onChange={this.handleSelectedChange.bind(this)}>
                                      <option value="storeowner">Store Owner</option>
                                      <option value="storemanager">Store Manager</option>
                            </select>
                    </label>

                    <hr/>
                    Login Details
                    <FormInputArea name="email" label="Email Address" onChange={this.handleInputChange.bind(this)}  />
                      <label> Password (auto-generated, take a note of this as you will not be able to access this information at a later stage!):  <br/><br/>  <span>{this.state.password}</span><br/></label>
                      <button onClick={this.newPassword.bind(this)}> autogenerate new password </button>
                    <hr/>
                    Additional Information (Optional)
                    <FormInputArea name="name" label="Name" onChange={this.handleInputChange.bind(this)}  />
                    <FormInputArea name="surname" label="Surname" onChange={this.handleInputChange.bind(this)}  />
                    <FormInputArea name="telephone" label="Telephone" onChange={this.handleInputChange.bind(this)}  />
              </form>

              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleSubmit.bind(this)}>Add New User</Button>
                <Button onClick={this.handleClose.bind(this)}>Close</Button>
              </Modal.Footer>
      </Modal>
      );
  }
}

export default AddStoreUser;
