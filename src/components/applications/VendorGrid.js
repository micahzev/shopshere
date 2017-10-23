import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array } from 'prop-types';

import TableRow from '~/src/components/applications/TableRow';
import '~/src/styles/applications.css';

class VendorGrid extends Component {

  static propTypes = {
      applications: array.isRequired,
      categories: array
    };

    static defaultProps = {
      applications: [{
        id: 0
      }],
    };


  render() {

    const {
      categories,
      applications
    } = this.props;

    return (
      <div className="vendorGrid">

        <h2 className="table-title">New Vendor Applications: </h2>

        <div className="headingRow">
          <div className="headingCell">
            Date Received
          </div>
          <div className="headingCell">
            Store Name
          </div>
          <div className="headingCell">
            Contact Details
          </div>
          <div className="statusHeadingCell">
            Status
          </div>
          <div className="actionHeadingCell">
            Action
          </div>
        </div>
        <hr className="rule"/>
        {applications.map((app)=>{
          return (
            <div key={app.id}>
              <TableRow application={app} categories={categories} boundPatchApplication={this.props.boundPatchApplication} />
              <hr/>
            </div>
          )
        })}

      </div>
      );
  }
}


export default VendorGrid;
