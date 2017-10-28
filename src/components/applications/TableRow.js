import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object } from 'prop-types';

import Confirm from 'react-confirm-bootstrap';

import '~/src/styles/applications.css';

import ViewApplication from '~/src/components/applications/ViewApplication';
import ApproveApplication from '~/src/components/applications/ApproveApplication';
import RejectApplication from '~/src/components/applications/RejectApplication';
import ViewShopApplication from '~/src/components/applications/ViewShopApplication';

class TableRow extends Component {

  constructor(props) {
      super(props);
      this.state = {
        showViewModal: false,
      };
  };

  static propTypes = {
      application: object.isRequired
    };

    static defaultProps = {
      application: {
        id: 0
      },
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

  onConfirmAccept() {
    const createShopObject = {
      name: this.props.application.storeName,
      email: this.props.application.storeEmail,
      url: this.props.application.storeUrl,
      phone: this.props.application.storeTelephone,
      address1: this.props.application.address1,
      address2: this.props.application.address2,
      city: this.props.application.storeCity,
      province: this.props.application.province,
      code: this.props.application.postcode,
      category: this.props.application.storeCategory,
      logoFile: this.props.application.storeLogo,
      logoColor: "#ffffff",
      entranceViewpoint: undefined,
      visible: false,
      isActivated:false,
      isNew:true
    };

    this.props.approveApplication(createShopObject, this.props.application);


  }

  onConfirmReject(){
    this.props.rejectApplication(this.props.application);
  }

  render() {

    const {
      categories,
      application
    } = this.props;

    const receivedDate = new Date(application.createdAt);

    return (
      <div className="tableRow">
        <div className="tableCell">
          <div>{receivedDate.toString().slice(0, 15)}</div>
          <div>{receivedDate.toString().slice(16, 21)}</div>
        </div>
        <div className="tableCell">
          <div>{application.storeName}</div>
        </div>
        <div className="tableCell">
          <div>{application.applicantName} {application.applicantSurname}</div>
          <div>{application.storeEmail}</div>
          <div>{application.storeTelephone}</div>
        </div>
        <div className="statusTableCell">
          <div>{application.applicationStatus}</div>
        </div>
        <div className="actionCell">

          <button className="viewButton" onClick={this.handleView.bind(this)}>View/Edit</button>
          <Confirm
              onConfirm={this.onConfirmAccept.bind(this)}
              body={"Are you sure you want to approve "+ application.storeName + "?"}
              confirmText="Confirm Vendor Application"
              title="Confirm Application">
              <button className="approveButton">Approve</button>
          </Confirm>
          <Confirm
              onConfirm={this.onConfirmReject.bind(this)}
              body={"Are you sure you want to reject "+ application.storeName + "?"}
              confirmText="Reject Vendor Application"
              title="Reject Application">
              <button className="rejectButton">Reject</button>
          </Confirm>

          <ViewShopApplication show={this.state.showViewModal} handleViewClose={this.handleViewClose.bind(this)} application={application} categories={categories}  boundPatchApplication={this.props.boundPatchApplication} />

        </div>

      </div>
      );
  }
}





export default TableRow;
