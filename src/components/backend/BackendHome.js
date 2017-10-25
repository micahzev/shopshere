import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Topbar from '~/src/components/Topbar/Topbar';
import { LinkContainer } from 'react-router-bootstrap';
import '~/src/styles/backend.css';

class BackendHome extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const shopid = window.localStorage.getItem('value');

    return (
      <div className="categories container content-box">
        <div className="row shops-section">
          <div className="parent-of-list">
            <h1 className="admin-hello">Welcome to ShopSure Administration</h1>
          </div>
          <div className="shop-details">
            {shopid}
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

export default connect(mapStateToProps, mapDispatchToProps)(BackendHome);
