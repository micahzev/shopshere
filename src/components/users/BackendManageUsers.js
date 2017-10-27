import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Topbar from '~/src/components/Topbar/Topbar';

import StoreUserGrid from '~/src/components/users/StoreUserGrid';
import AddStoreUser from '~/src/components/users/AddStoreUser';

import { Button, Glyphicon } from 'react-bootstrap';

import '~/src/styles/admin-users.css';

import fetch from '~/src/components/fetch';
import { fetchUsers, unboundAddUser, unboundPatchUser, deleteUser  } from '~/src/actions/users';

class BackendManageUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddUserModal:false
    }
  }

  open() {
    this.setState({
      showAddUserModal:true
    });
  }

  close() {
    this.setState({
      showAddUserModal:false
    });
  }

  async addUser(userObject) {

     await this.props.boundAddUser(userObject);

     this.props.fetchUsers();
  }

  async editUser(updateObject) {

    await this.props.boundPatchUser(updateObject);

    this.props.fetchUsers();
  }

  async deleteUser(userId) {

    const indexOfDelete = _.findIndex(this.props.users, function(o) { return o.id == userId; });

    let deleteObject = {
      ID: userId,
      index: indexOfDelete
    };

    await this.props.deleteUser(deleteObject);

    this.props.fetchUsers();
  }


  render() {

    const shopID = window.localStorage.getItem('value');

    const {
      users
    } = this.props;

    const myUsers = _.filter(users, {shopid:shopID})

    return (
      <div className="categories container content-box">
        <div className="row store-section">
          <div className="parent-of-store">
            <h1 className="title">Manage Users</h1>
          </div>
          <div className="store-details">
          <hr/>
          <div>
            <button className="add-user-btn" onClick={ this.open.bind(this) }>
              <Glyphicon glyph="plus" /> Add New User
            </button>
            <AddStoreUser
              show={this.state.showAddUserModal}
              close={this.close.bind(this)}
              addUser={this.addUser.bind(this)}/>
          </div>
          <hr/>
          <StoreUserGrid
              users={myUsers}
              boundPatchUser={this.editUser.bind(this)}
              deleteUser={this.deleteUser.bind(this)}/>
          </div>
        </div>
      </div>
      );
  }
}


const FetchedManageUsers = fetch(BackendManageUsers, {
  actions: [ fetchUsers ]
});

function mapStateToProps(state) {
  const users = state.users;
  return {
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: bindActionCreators(fetchUsers, dispatch),
    boundAddUser: bindActionCreators(unboundAddUser, dispatch),
    boundPatchUser: bindActionCreators(unboundPatchUser, dispatch),
    deleteUser: bindActionCreators(deleteUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedManageUsers);
