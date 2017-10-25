import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Topbar from '~/src/components/Topbar/Topbar';
import UserGrid from '~/src/components/users/UserGrid';
import AddUser from '~/src/components/users/AddUser';

import { Button, Glyphicon } from 'react-bootstrap';

import '~/src/styles/admin-users.css';

import fetch from '~/src/components/fetch';
import { fetchShops } from '~/src/actions/shops';
import { fetchUsers, unboundAddUser } from '~/src/actions/users';

class ManageUsers extends Component {

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

  render() {

    const {
      shops,
      users
    } = this.props;

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
            <AddUser
              show={this.state.showAddUserModal}
              shops={shops}
              close={this.close.bind(this)}
              addUser={this.addUser.bind(this)} />
          </div>
          <hr/>
          <UserGrid
              shops={shops}
              users={users}/>
          </div>
        </div>
      </div>
      );
  }
}


const FetchedManageUsers = fetch(ManageUsers, {
  actions: [ fetchShops, fetchUsers ]
});

function mapStateToProps(state) {
  const shops = state.shops;
  const users = state.users;
  return {
    shops,
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShops: bindActionCreators(fetchShops, dispatch),
    fetchUsers: bindActionCreators(fetchUsers, dispatch),
    boundAddUser: bindActionCreators(unboundAddUser, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedManageUsers);
