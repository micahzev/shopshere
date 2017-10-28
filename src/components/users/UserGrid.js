import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array } from 'prop-types';

import UserTableRow from '~/src/components/users/UserTableRow';

import '~/src/styles/admin-users.css';

class UserGrid extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let {
      shops,
      users
    } = this.props;

    if (!(users instanceof Array)) {
      users = [];
    }

    const userCollection = !users ? [] : users;

    return (
      <div className="storeGrid">
        <div className="headingRow">
          <div className="headingCell">
            Personal Details
          </div>
          <div className="headingCell">
            Email
          </div>
          <div className="headingCell">
            User Type
          </div>
          <div className="headingCell">
            Status
          </div>
          <div className="actionHeadingCell">
            Action
          </div>
        </div>
        <hr className="rule"/>
        {userCollection.map((user)=>{
          return (
            <div key={user.id}>
              <UserTableRow
                user={user}
                shops={shops}
                boundPatchUser={this.props.boundPatchUser.bind(this)}
                deleteUser={this.props.deleteUser.bind(this)}/>
              <hr/>
            </div>
          )
        })}
      </div>
      );
  }
}


export default UserGrid;
