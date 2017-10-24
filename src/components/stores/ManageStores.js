import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Topbar from '~/src/components/Topbar/Topbar';
import StoreGrid from '~/src/components/stores/StoreGrid';

import fetch from '~/src/components/fetch';
import { fetchCategories } from '~/src/actions/categories';
import { fetchShops, unboundPatchShop, unboundDeleteShop } from '~/src/actions/shops';
import { fetchUsers } from '~/src/actions/users';

import '~/src/styles/store-admin.css';

class ManageStores extends Component {

  constructor(props) {
    super(props);
  }

  async activateShop(updateObject){

    await this.props.boundPatchShop(updateObject);

    this.props.fetchShops();
  }

  async deactivateShop(updateObject){

    await this.props.boundPatchShop(updateObject);

    this.props.fetchShops();
  }

  async deleteShop(deleteObject){

    const index = _.findIndex(this.props.shops, function(o) {
      return o.id == deleteObject.ID;
    });

    deleteObject.index = index;

    await this.props.boundDeleteShop(deleteObject);

    this.props.fetchShops();
  }

async PatchShop(patchObject) {

  for (var key in patchObject) {
    if (patchObject[key] === "") {
      patchObject[key] = undefined;
    }
  }

  await this.props.boundPatchShop(patchObject);

  this.props.fetchShops();

}

  render() {

    const {
      shops,
      categories,
      users
    } = this.props;

    return (
      <div>
      <Topbar />
      <div className="categories container content-box">
        <div className="row store-section">
          <div className="parent-of-store">
            <h1 className="title">Manage Stores</h1>
          </div>
          <div className="store-details">
          <hr/>
          <StoreGrid
              shops={shops}
              users={users}
              categories={categories}
              activateShop={this.activateShop.bind(this)}
              deactivateShop={this.deactivateShop.bind(this)}
              deleteShop={this.deleteShop.bind(this)}
              PatchShop={this.PatchShop.bind(this)} />

          </div>
        </div>
      </div>
      </div>
      );
  }
}


const FetchedManageStores = fetch(ManageStores, {
  actions: [fetchCategories, fetchShops, fetchUsers]
});

function mapStateToProps(state) {
  const shops = state.shops;
  const users = state.users;
  const categories = state.categories;
  return {
    shops,
    users,
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchShops: bindActionCreators(fetchShops, dispatch),
    fetchUsers: bindActionCreators(fetchUsers, dispatch),
    boundPatchShop: bindActionCreators(unboundPatchShop, dispatch),
    boundDeleteShop: bindActionCreators(unboundDeleteShop, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedManageStores);
