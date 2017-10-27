import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array } from 'prop-types';

import StoreUserTableRow from '~/src/components/users/StoreUserTableRow';

import '~/src/styles/admin-users.css';

class StoreUserGrid extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let {
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
              <StoreUserTableRow
                user={user}
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


export default StoreUserGrid;
