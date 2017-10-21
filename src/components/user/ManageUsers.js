import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Topbar from '~/src/components/Topbar/Topbar';
import '~/src/styles/categories.css';

class ManageUsers extends Component {

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
            <h2>Manage Users</h2>
          </div>
          <div className="shop-details">
            Users Go Here!
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
