import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Topbar from '~/src/components/Topbar/Topbar';
import { LinkContainer } from 'react-router-bootstrap';
import '~/src/styles/backend.css';

class AdminBackend extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <Topbar />
      <div className="categories container content-box">
        <div className="row shops-section">
          <div className="parent-of-list">
            <h1 className="admin-hello">Welcome to ShopSure Super Administration</h1>
          </div>
          <div className="shop-details">
            <h3>What would you like to do?</h3>
            <span>
              <LinkContainer className="adminlink" to={{ pathname: `/stores` }}><pre className="selection"><span className="fleche">&#10132; </span> Manage Stores</pre></LinkContainer>
              <LinkContainer className="adminlink" to={{ pathname: `/categories` }}><pre><span className="fleche">&#10132; </span> Manage Categories</pre></LinkContainer>
              <LinkContainer className="adminlink" to={{ pathname: `/applications` }}><pre><span className="fleche">&#10132; </span> Manage Vendor Applications</pre></LinkContainer>
              <LinkContainer className="adminlink" to={{ pathname: `/users` }}><pre><span className="fleche">&#10132; </span> Manage Backend Users</pre></LinkContainer>
            </span>
          </div>
        </div>
      </div>
      </div>
      );
  }
}



function mapStateToProps(state) {
  return {};
}
;

function mapDispatchToProps(dispatch) {
  return {};
}
;

export default connect(mapStateToProps, mapDispatchToProps)(AdminBackend);
