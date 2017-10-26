import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import List from '~/src/components/products/List';
import AddProductButton from '~/src/components/products/AddProductButton';

class BackendProducts extends Component {

  constructor(props){
    super(props);
  }

  render() {

    const shopID = window.localStorage.getItem('value');

    return (
      <div className="categories container content-box">
        <div className="row shops-section">
          <div className="parent-of-list">
            <h2>Manage Your Products</h2>
          </div>
          <div className="shop-details">
          <List shopID={ shopID } />
          <AddProductButton shopID={ shopID } />
          </div>
        </div>
      </div>
      );
  }
}

export default BackendProducts;
