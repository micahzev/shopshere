import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router'
import { bindActionCreators } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import Welcome from './Welcome';
import Viewer from './components/Viewer';
import ViewerWidget from './components/ViewerWidget';
import Shops from './components/Shops';
import Shop from './components/Shop';
import Navbar from './Navbar.js';
import App from './App.js';
import Home from './components/user/Home.js';
import Login from './components/Login.js';
import Forgot from './components/Forgot.js';

import DirectoryList from './components/user/DirectoryList.js';
import CategoryShopList from './components/user/CategoryShopList.js';
import ManageCategories from '~/src/components/categories/ManageCategories.js';
import VendorApplications from './components/applications/VendorApplications.js';
import ManageUsers from '~/src/components/users/ManageUsers.js';
import ManageStores from '~/src/components/stores/ManageStores.js';
import AdminBackend from '~/src/components/backend/AdminBackend.js';
import AdminHome from '~/src/components/backend/AdminHome.js';
import Backend from '~/src/components/backend/Backend.js';
import BackendHome from '~/src/components/backend/BackendHome.js';


class RouteContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: syncHistoryWithStore(browserHistory, this.props.store),
      userToken: null,
      updateUserToken: this.updateUserToken.bind(this),
    };
  }

  updateUserToken(userToken) {
    this.setState({
      userToken: userToken
    });
  }


  checkAuth(nextState, replace) {
    let secret = window.localStorage.getItem('secretKey');
    if (secret === null) {
      replace('/login');
    }
  }

  checkAdminAuth(nextState, replace) {
    let secret = window.localStorage.getItem('value');
    if (secret !== 'admin') {
      replace('/login');
    }
  }

  render() {

    return (
      <Router ref="router" history={ this.state.history }>
          <Redirect from="/" to="/login" />
          <Redirect from="/admin-backend" to="/admin-backend/home" component={ AdminHome } />
          <Redirect from="/backend" to="/backend/home" component={ BackendHome } />
          <Route path="/login" component={ Login }>
          </Route>
          <Route path="/forgot" component={ Forgot }>
          </Route>

          <Route path="/" component={ App } onEnter={this.checkAuth}>
              <Route path="/admin-backend" onEnter={this.checkAdminAuth} component={ AdminBackend }>
                  <Route path="/admin-backend/home" component={ AdminHome }>
                  </Route>
                  <Route path="/admin-backend/stores" component={ ManageStores }>
                  </Route>
                  <Route path="/admin-backend/categories" component={ ManageCategories }>
                  </Route>
                  <Route path="/admin-backend/applications" component={ VendorApplications }>
                  </Route>
                  <Route path="/admin-backend/users" component={ ManageUsers }>
                  </Route>
              </Route>
              <Route path="/backend" component={ Backend }>
                  <Route path="/backend/home" component={ BackendHome }>
                  </Route>
              </Route>
          </Route>
          <Redirect from="/*" to="/login" component={ Login } />
      </Router>
      );
  }
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(undefined, mapDispatchToProps)(RouteContainer);
