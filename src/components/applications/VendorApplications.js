import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array } from 'prop-types';

import Topbar from '~/src/components/Topbar/Topbar';
import VendorGrid from '~/src/components/applications/VendorGrid';

import fetch from '~/src/components/fetch';
import { fetchCategories } from '~/src/actions/categories';
import { fetchApplications } from '~/src/actions/applications';
import { unboundPatchApplication } from '~/src/actions/applications';

import '~/src/styles/applications.css';



class VendorApplications extends Component {

  static propTypes = {
      applications: array.isRequired
    }

    static defaultProps = {
      applications: [{
        id: 0
      }],
    }

    async patchApplication(object){

        await this.props.boundPatchApplication(object);

        this.props.fetchApplications();

    }



  render() {

    const {
      categories,
      applications
    } = this.props

    const unattendedSize = _.size(_.filter(applications, { 'status': 'new' }));

    return (
      <div>
      <Topbar />
      <div className="categories container content-box">
        <div className="row application-section">
          <div className="parent-of-application">
            <h1 className="title">Manage Vendor Applications</h1>
              {unattendedSize < 2 ?
                unattendedSize < 1 ?
                  <div className="admin-notice"> There are <br/> <strong>{unattendedSize}</strong> <br/> unactioned applications</div>
                 : <div className="admin-notice">There is <br/> <strong>{unattendedSize}</strong> <br/> unactioned application</div>
                 : <div className="admin-notice">There are <br/> <strong>{unattendedSize}</strong> <br/> unactioned applications</div>}
          </div>
          <div className="application-details">
          <hr/>
            <VendorGrid applications={applications} categories={categories} boundPatchApplication={this.patchApplication.bind(this)} />
          </div>
        </div>
      </div>
      </div>
      );
  }
}



const FetchedVendorApplications = fetch(VendorApplications, {
  actions: [fetchApplications, fetchCategories]
});

function mapStateToProps(state) {
  const categories = state.categories;
  const applications = state.applications;
  return {
    categories,
    applications
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchApplications: bindActionCreators(fetchApplications, dispatch),
    boundPatchApplication: bindActionCreators(unboundPatchApplication, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedVendorApplications);
