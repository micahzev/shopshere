import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ShopList from '~/src/components/ShopList';
import Topbar from '~/src/components/Topbar/Topbar';
import '~/src/styles/shops.css';

class Shops extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='container content-box'>
          <div className='row'>
            <div className="column container-header">Shops</div>
          </div>
          <div className="row shops-section">
            <ShopList />
            <div className="shop-details">
              { this.props.children }
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default Shops;
