import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import { Image } from 'react-bootstrap';
import fetch from '~/src/components/fetch';
import { fetchShops } from '~/src/actions/shops';
import { LinkContainer } from 'react-router-bootstrap';
import '~/src/styles/backend.css';

class BackendHome extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const shopid = window.localStorage.getItem('value');

    const myshop = _.find(this.props.shops, {'id':shopid});

    return (
      <div className="categories container content-box">
        <div className="row shops-section">
          <div className="parent-of-list">
            <Image src={ myshop.logoFile } responsive />
            <div className="owner-hello">Welcome to <u>{myshop.name}</u> Backend ShopSure Administration</div>
          </div>
          <div className="shop-details">
            Status: {myshop.name} is currently <u>{myshop.visible? "visible" : "not visible"}</u> on the ShopSure platform.
          </div>
        </div>
      </div>
      );
  }
}

const FetchedBackendHome = fetch(BackendHome, {
  actions: [ fetchShops ]
});

function mapStateToProps(state) {
  const shops = state.shops;
  return {
    shops,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShops: bindActionCreators(fetchShops, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedBackendHome);
