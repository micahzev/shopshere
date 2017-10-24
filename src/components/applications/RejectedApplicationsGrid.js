import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array } from 'prop-types';

import RejectedTableRow from '~/src/components/applications/RejectedTableRow';
import '~/src/styles/applications.css';

class RejectedApplicationsGrid extends Component {

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

        <h2 className="table-title">Rejected Vendor Applications: </h2>

        <div className="headingRow">
          <div className="headingCell">
            Date Received
          </div>
          <div className="headingCell">
            Date Rejected
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
              <RejectedTableRow application={app}
              reinstateApplication={this.props.reinstateApplication.bind(this)}
              deleteApplication={this.props.deleteApplication.bind(this)}/>
              <hr/>
            </div>
          )
        })}

      </div>
      );
  }
}


export default RejectedApplicationsGrid;
