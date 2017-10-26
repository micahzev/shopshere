import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip, Image, Alert } from 'react-bootstrap';
import fetch from '~/src/components/fetch';
import { fetchViewpoints } from '~/src/actions/viewpoints';
import { unboundPatchShop } from '~/src/actions/shops';
import { fetchCategories } from '~/src/actions/categories';
import { fetchShops } from '~/src/actions/shops';
import ColorPick from '~/src/components/utility/ColorPick';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';

import { find } from 'lodash';

import '~/src/styles/shops.css';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { logoFolderURL } from '~/src/config';

import BackendSettings from '~/src/components/backend/BackendSettings';

class BackendSettingsWrapper extends Component {

  constructor(props) {
    super(props);
    this.state ={
      loading:true
    }
  }

  componentDidMount(){

    const shopID = window.localStorage.getItem('value');

    this.loadViewpoints(shopID);

  }

  async loadViewpoints(shopID) {

    await this.props.fetchViewpoints({
      shopID: shopID
    });
    await this.props.fetchShops();
    await this.props.fetchCategories();
    this.setState({
      loading:false
    });
  }

  render() {

    const {
      categories,
      shops,
      viewpoints
    } = this.props;



    return (
      <div className="categories container content-box">
        <div className="row shops-section">
          <div className="parent-of-list">
            <h2>Manage Your Store&#39;s Settings</h2>

          </div>
          <div className="shop-details">
      {this.state.loading ? "loading...": <BackendSettings
        categories={categories}
        shops={shops}
        viewpoints={viewpoints}
        boundPatchShop={this.props.boundPatchShop.bind(this)}/> }
            </div>
          </div>
        </div>
      );
  }
}

const FetchedBackendSettingsWrapper = fetch(BackendSettingsWrapper, {
  actions: [fetchShops, fetchCategories]
});

function mapStateToProps(state) {
  const categories = state.categories;
  const shops = state.shops;
  const viewpoints = state.viewpoints;
  return {
    categories,
    shops,
    viewpoints
  };
}
;

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchShops: bindActionCreators(fetchShops, dispatch),
    boundPatchShop: bindActionCreators(unboundPatchShop, dispatch),
    fetchViewpoints: bindActionCreators(fetchViewpoints, dispatch)
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(FetchedBackendSettingsWrapper);
