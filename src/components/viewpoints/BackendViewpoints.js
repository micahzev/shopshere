import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import List from '~/src/components/viewpoints/List';
import Add from '~/src/components/viewpoints/Add';
import Edit from '~/src/components/viewpoints/Edit';

import fetch from '~/src/components/fetch';
import { fetchShops } from '~/src/actions/shops';

class BackendViewpoints extends Component {

  constructor(props){
    super(props);
  }

  render() {

    const shopID = window.localStorage.getItem('value');

    const thisShop = _.find(this.props.shops, {'id':shopID});

    return (
      <div className="categories container content-box">
        <div className="row shops-section">
          <div className="parent-of-list">
            <h2>Manage Your Viewpoints</h2>
          </div>
          <div className="shop-details">
          <div>
            <div className="side">
              <Edit shopID={ shopID } />
            </div>
            <div className="side">
              <List shopID={ shopID } thisShop={ thisShop } />
            </div>
            <Add shopID={ shopID } />
          </div>
          </div>
        </div>
      </div>
      );
  }
}

const FetchedBackendViewpoints = fetch(BackendViewpoints, {
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

export default connect(mapStateToProps, mapDispatchToProps)(FetchedBackendViewpoints);
