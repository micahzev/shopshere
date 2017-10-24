import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object } from 'prop-types';

import Confirm from 'react-confirm-bootstrap';

import ViewEditShop from '~/src/components/stores/ViewEditShop';

import '~/src/styles/store-admin.css';


class StoreTableRow extends Component {

  constructor(props) {
      super(props);
      this.state = {
        showViewModal: false,
      };
  };

  static propTypes = {
      categories: array.isRequired
    };

    static defaultProps = {
      categories: [{
        text:"loading",
        id:0
      }],
    };



  handleView = (e) => {
    e.preventDefault()
    this.setState({
      showViewModal:!this.state.showViewModal,
    })
  }

  handleViewClose() {
    this.setState({
      showViewModal:false,
    })
  }

  onConfirmDeactivate() {

    const updateObject = {
      id:this.props.shop.id,
      isActivated:false,
    }

    this.props.deactivateShop(updateObject);
  }

  onConfirmActivate() {

    const updateObject = {
      id:this.props.shop.id,
      isActivated:true,
    }

    this.props.activateShop(updateObject);
  }

  onConfirmDelete() {

    const deleteObject = {
      ID:this.props.shop.id,
    }

    this.props.deleteShop(deleteObject);
  }

  render() {

    const {
      shop,
      categories,
      users
    } = this.props;

    const storeOwner = _.find(users, { 'shopid': shop.id });

    const ownerDetails = storeOwner ? storeOwner : {
      userName: "nodata",
      userSurame: "nodata",
      id: "nodata",
      userTelephone: "nodata"
    };

    const storeCategory = _.find(categories, {'id': shop.category}) ?  _.find(categories, {'id': shop.category}) : {text:"No category found", id:0};

    const activated = shop.isActivated ? "Activated" : "Deactivated";

    const visible = shop.visible ? "Yes" : "No";

    return (
      <div className="tableRow">
        <div className="tableCell">
          <div>{shop.name}</div>
        </div>
        <div className="tableCell">
          <div>{ownerDetails.userName} {ownerDetails.userSurame}</div>
          <div>{ownerDetails.id}</div>
          <div>{ownerDetails.userTelephone}</div>
        </div>
        <div className="tableCell">
          <div>{storeCategory.text}</div>
        </div>
        <div className="statusTableCell">
          <div>{activated}</div>
        </div>
        <div className="statusTableCell">
          <div>{visible}</div>
        </div>
        <div className="actionCell">

        <button className="viewButton" onClick={this.handleView.bind(this)}>View/Edit</button>

        {shop.isActivated ?  <Confirm
              onConfirm={this.onConfirmDeactivate.bind(this)}
              body={"Are you sure you want to deactivate "+ shop.name + "?"}
              confirmText="Confirm Store Deactivation"
              title="Confirm Deactivation">
              <button className="deactivateButton">Deactivate</button>
          </Confirm> :   <Confirm
                onConfirm={this.onConfirmActivate.bind(this)}
                body={"Are you sure you want to activate "+ shop.name + "?"}
                confirmText="Confirm Store Activation"
                title="Confirm Activation">
                <button className="activateButton">Activate</button>
            </Confirm>}

        {shop.isActivated ? null : <Confirm
            onConfirm={this.onConfirmDelete.bind(this)}
            body={"Are you sure you want to delete "+ shop.name + "?"}
            confirmText="Delete Store"
            title="Delete Store">
            <button className="rejectButton">Delete</button>
        </Confirm>}

        <ViewEditShop
          categories={categories}
          shop={shop}
          owner={ownerDetails}
          show={this.state.showViewModal}
          handleViewClose={this.handleViewClose.bind(this)}
          boundPatchApplication={this.props.boundPatchApplication}
          PatchShop={this.props.PatchShop} />

        </div>
      </div>
      );
  }
}





export default StoreTableRow;
