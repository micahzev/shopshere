import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';



class Backend extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
          <div>
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default Backend;
