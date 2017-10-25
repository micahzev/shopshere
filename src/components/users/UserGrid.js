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
        {users.map((user)=>{
          return (
            <div key={user.id}>
              <UserTableRow
                user={user}
                shops={shops}/>
              <hr/>
            </div>
          )
        })}
      </div>
      );
  }
}


export default UserGrid;
