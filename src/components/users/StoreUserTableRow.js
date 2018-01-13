import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object, array } from 'prop-types';

import Confirm from 'react-confirm-bootstrap';

import ViewEditShop from '~/src/components/stores/ViewEditShop';

import '~/src/styles/store-admin.css';


class StoreUserTableRow extends Component {

  constructor(props) {
      super(props);
      this.state = {
        showViewModal: false,
      };
  };




  handleView = (e) => {
    e.preventDefault()
    this.setState({
      showViewModal:!this.state.showViewModal,
    })
  }

  handleViewClose() {
    this.setState({
      showViewModal:false,
    })
  }


    onConfirmDisable() {

      const userId = this.props.user.id;

      const updateObject = {
        id:userId,
        userStatus:"disabled"
      };

      this.props.boundPatchUser(updateObject);

    }


    onConfirmEnable() {

          const userId = this.props.user.id;

          const updateObject = {
            id:userId,
            userStatus:"enabled"
          };

          this.props.boundPatchUser(updateObject);
    }

    onConfirmDelete() {

      const userId = this.props.user.id;

      this.props.deleteUser(userId);

    }

  onConfirmPasswordReset() {

  }

  render() {

    const {
      user
    } = this.props;


    const email = window.localStorage.getItem('username');

    const isMe = email == user.id ? true : false;

    const isMeStyle = email == user.id ? {'visibility':'hidden'} : {};




    const enabled = user.userStatus == "enabled" ? true : false;

    return (
      <div className="tableRow">
        <div className="tableCell">
          <div>{user.userName} {user.userSurname}</div>
          <div>{user.userTelephone}</div>
        </div>
        <div className="tableCell">
          <div>{user.userEmail}</div>
        </div>
        <div className="tableCell">
          <div>{user.userType}</div>


        </div>
        <div className="tableCell">
          <div>{user.userStatus}</div>
        </div>
        <div className="actionCell">

        {isMe? "My Account!" :null}
        <div style={isMeStyle}>
        {/*}<Confirm
             onConfirm={this.onConfirmPasswordReset.bind(this)}
             body={"Send password reset link to "+ user.id + "?"}
             confirmText="Confirm Password Reset Link Send"
             title="Confirm Send">
             <button className="passwordButton">Send Password <br/> Reset Email</button>
         </Confirm>*/}

        {enabled ?  <Confirm
              onConfirm={this.onConfirmDisable.bind(this)}
              body={"Are you sure you want to disable "+ user.userEmail + "?"}
              confirmText="Confirm User Disable"
              title="Confirm Disable">
              <button className="deactivateButton">Disable User</button>
          </Confirm> :   <Confirm
                onConfirm={this.onConfirmEnable.bind(this)}
                body={"Are you sure you want to enable "+ user.userEmail + "?"}
                confirmText="Confirm User Enable"
                title="Confirm Enable">
                <button className="activateButton">Enable</button>
            </Confirm>}

            <Confirm
                 onConfirm={this.onConfirmDelete.bind(this)}
                 body={"Are you sure you want to delete "+ user.userEmail + "? (this can't be undone)"}
                 confirmText="Confirm User Delete"
                 title="Confirm Delete">
                 <button className="rejectButton">Delete User</button>
             </Confirm>
             </div>
        </div>
      </div>
      );
  }
}

export default StoreUserTableRow;
