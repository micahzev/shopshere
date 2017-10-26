import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


import StoreOwnerTopbar from '~/src/components/topbar/StoreOwnerTopbar';


class Backend extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
      <StoreOwnerTopbar history={this.props.history} />
          <div>
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default Backend;
