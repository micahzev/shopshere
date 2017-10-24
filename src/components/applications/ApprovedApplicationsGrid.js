import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array } from 'prop-types';

import ApprovedTableRow from '~/src/components/applications/ApprovedTableRow';
import '~/src/styles/applications.css';

class ApprovedVendorGrid extends Component {

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

        <h2 className="table-title">Approved Vendor Applications: </h2>

        <div className="headingRow">
          <div className="headingCell">
            Date Received
          </div>
          <div className="headingCell">
            Date Approved
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
        </div>
        <hr className="rule"/>
        {applications.map((app)=>{
          return (
            <div key={app.id}>
              <ApprovedTableRow application={app}/>
              <hr/>
            </div>
          )
        })}

      </div>
      );
  }
}


export default ApprovedVendorGrid;
