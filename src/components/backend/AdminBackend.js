import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Topbar from '~/src/components/Topbar/Topbar';

class AdminBackend extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
      <Topbar history={this.props.history} />
          <div>
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default AdminBackend;