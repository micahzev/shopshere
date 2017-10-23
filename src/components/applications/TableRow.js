import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object } from 'prop-types';

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
          <div>{application.storeEmail}</div>
          <div>{application.storeTelephone}</div>
        </div>
        <div className="statusTableCell">
          <div>{application.status}</div>
        </div>
        <div className="actionCell">

          <button className="viewButton" onClick={this.handleView.bind(this)}>View/Edit</button>
          <button className="approveButton">Approve</button>
          <button className="rejectButton">Reject</button>

          <ViewShopApplication show={this.state.showViewModal} handleViewClose={this.handleViewClose.bind(this)} application={application} categories={categories}  boundPatchApplication={this.props.boundPatchApplication} />

        </div>

      </div>
      );
  }
}





export default TableRow;
