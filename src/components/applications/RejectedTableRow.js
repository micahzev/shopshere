import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object } from 'prop-types';

import Confirm from 'react-confirm-bootstrap';

import '~/src/styles/applications.css';

import ApproveApplication from '~/src/components/applications/ApproveApplication';
import RejectApplication from '~/src/components/applications/RejectApplication';
import ViewShopApplication from '~/src/components/applications/ViewShopApplication';

class RejectedTableRow extends Component {

  constructor(props) {
      super(props);

  };

  static propTypes = {
      application: object.isRequired
    };

    static defaultProps = {
      application: {
        id: 0
      },
    };


  onConfirmReinstate(){
   this.props.reinstateApplication(this.props.application);
  }

  onConfirmDelete(){
  this.props.deleteApplication(this.props.application);
  }

  render() {

    const {
      categories,
      application
    } = this.props;

    const receivedDate = new Date(application.createdAt);
    const rejectedDate = new Date(application.rejectedAt);

    return (
      <div className="tableRow">
        <div className="tableCell">
          <div>{receivedDate.toString().slice(0, 15)}</div>
          <div>{receivedDate.toString().slice(16, 21)}</div>
        </div>
        <div className="tableCell">
          <div>{rejectedDate.toString().slice(0, 15)}</div>
          <div>{rejectedDate.toString().slice(16, 21)}</div>
        </div>
        <div className="tableCell">
          <div>{application.storeName}</div>
        </div>
        <div className="tableCell">
          <div>{application.applicantName} {application.applicantSurname}</div>
          <div>{application.applicantCompany}</div>
          <div>{application.applicantEmail}</div>
          <div>{application.applicantTelephone}</div>
        </div>
        <div className="statusTableCell">
          <div>{application.applicationStatus}</div>
        </div>
        <div className="actionCell">
        <Confirm
            onConfirm={this.onConfirmReinstate.bind(this)}
            body={"Are you sure you want to reinstate "+ application.storeName + "?"}
            confirmText="Reinstate Vendor Application"
            title="Reinstate Application">
            <button className="reinstateButton">Reinstate</button>
        </Confirm>
        <Confirm
            onConfirm={this.onConfirmDelete.bind(this)}
            body={"Are you sure you want to Delete "+ application.storeName + "? (This action can't be undone.)"}
            confirmText="Delete Vendor Application"
            title="Delete Application">
            <button className="rejectButton">Delete</button>
        </Confirm>
        </div>
      </div>
      );
  }
}





export default RejectedTableRow;
