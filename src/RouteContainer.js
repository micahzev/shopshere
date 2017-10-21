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
import ManageUsers from '~/src/components/user/ManageUsers.js';
import ManageStores from '~/src/components/stores/ManageStores.js';
import AdminBackend from '~/src/components/backend/AdminBackend.js';



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

  render() {

    return (
      <Router ref="router" history={ this.state.history }>
          <Redirect from="/" to="/admin-backend" />
          <Route path="/login" component={ Login }>
          </Route>
          <Route path="/forgot" component={ Forgot }>
          </Route>

          <Route path="/" component={ App } onEnter={this.checkAuth}>


              <Route path="/admin-backend" component={ AdminBackend }>
              </Route>

              <Route path="/stores" component={ ManageStores }>
              </Route>

              <Route path="/categories" component={ ManageCategories }>
              </Route>
              <Route path="/applications" component={ VendorApplications }>
              </Route>

              <Route path="/users" component={ ManageUsers }>
              </Route>


          </Route>

          <Route path="/backend" component={ App } onEnter={this.checkAuth}>
          <Redirect from="/" to="/shops" />
          <Redirect from="/" to="/shops" />
            <Route path="/backend" component={ Shops }>
            </Route>
            <Route path="/user" component={ Home }>
              <Route path="/user/directory" component={ DirectoryList }>
              </Route>
              <Route path="/user/:category" component={ CategoryShopList }>
              </Route>
            </Route>
            <Route path="/viewer" component={ Viewer }>
            </Route>
            <Route path="/viewerwidget" component={ ViewerWidget }>
            </Route>
            <Route path="/shops" component={ Shops }>
              <Route path="/shops/:name" component={ Shop }>
              </Route>
            </Route>
          </Route>
      </Router>
      );
  }
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(undefined, mapDispatchToProps)(RouteContainer);
