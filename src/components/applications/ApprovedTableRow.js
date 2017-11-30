import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object } from 'prop-types';

import Confirm from 'react-confirm-bootstrap';

import '~/src/styles/applications.css';

import ApproveApplication from '~/src/components/applications/ApproveApplication';
import RejectApplication from '~/src/components/applications/RejectApplication';
import ViewShopApplication from '~/src/components/applications/ViewShopApplication';

class ApprovedTableRow extends Component {

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


  render() {

    const {
      categories,
      application
    } = this.props;

    const receivedDate = new Date(application.createdAt);
    const approvedDate = new Date(application.approvedAt);

    return (
      <div className="tableRow">
        <div className="tableCell">
          <div>{receivedDate.toString().slice(0, 15)}</div>
          <div>{receivedDate.toString().slice(16, 21)}</div>
        </div>
        <div className="tableCell">
          <div>{approvedDate.toString().slice(0, 15)}</div>
          <div>{approvedDate.toString().slice(16, 21)}</div>
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
      </div>
      );
  }
}





export default ApprovedTableRow;
