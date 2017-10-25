import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array } from 'prop-types';

import Topbar from '~/src/components/Topbar/Topbar';
import VendorGrid from '~/src/components/applications/VendorGrid';
import ApprovedApplicationsGrid from '~/src/components/applications/ApprovedApplicationsGrid';
import RejectedApplicationsGrid from '~/src/components/applications/RejectedApplicationsGrid';

import fetch from '~/src/components/fetch';
import { fetchCategories } from '~/src/actions/categories';
import { fetchApplications } from '~/src/actions/applications';
import { fetchUsers } from '~/src/actions/users';
import { unboundPatchApplication, deleteApplication } from '~/src/actions/applications';
import { unboundAddShop } from '~/src/actions/shops';
import { unboundAddUser } from '~/src/actions/users';
import request from 'superagent';

import crypto from 'crypto';

import * as AWSCognito from 'amazon-cognito-identity-js';

import '~/src/styles/applications.css';

import { UserPoolId, ClientId, emailAPI } from '~/src/config';

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

  makeid() {
      let text = "";
      const possibleMAJ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const possibleMIN = "abcdefghijklmnopqrstuvwxyz";
      const possibleNUM = "0123456789";
      const possibleSYM = "!@#$%^&*()";

      text += possibleMAJ.charAt(Math.floor(Math.random() * possibleMAJ.length));

      for (var i = 0; i < 5; i++)
        text += possibleMIN.charAt(Math.floor(Math.random() * possibleMIN.length));

      text += possibleNUM.charAt(Math.floor(Math.random() * possibleNUM.length));
      text += possibleSYM.charAt(Math.floor(Math.random() * possibleSYM.length));

      return text;
}

signup(email, password, shopid) {

  const userPool = new AWSCognito.CognitoUserPool({
    UserPoolId: UserPoolId,
    ClientId: ClientId
  });

  const attributeList = [];

  const dataEmail = {
      Name : 'email',
      Value : email
  };

  const dataShopId = {
      Name : 'custom:store-id',
      Value : shopid
  };

  const attributeEmail = new AWSCognito.CognitoUserAttribute(dataEmail);
  const attributeShopID = new AWSCognito.CognitoUserAttribute(dataShopId);


  attributeList.push(attributeEmail);
  attributeList.push(attributeShopID);


  return new Promise((resolve, reject) =>
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.user)
    })
  );
}


emailUser(email, password){
  request.post(emailAPI)
    .set('Content-Type', 'application/json')
    .send({
      email:email,
      password:password
    })
    .end(function(err, res) {
      // if (err || !res.ok) {
      //   console.log('Oh no! error' + JSON.stringify(err));
      // } else {
      //   console.log('yay posted ' + JSON.stringify(res.body));
      //   // resolve(res.body);
      // }
    })
}



    async approveApplication(shopObject, applicationObject){

        const userExists = _.find(this.props.users, { 'id': shopObject.email });

        if (userExists) {
          alert("A user with this email address ("+ shopObject.email+ ") already exists. Application will not be approved.");
        } else {

            // create new shop
            const createdShop = await this.props.boundAddShop(shopObject);

            // create temp password for user
            const tempPW = this.makeid();

            // create user
            const newUser = await this.signup(shopObject.email, tempPW, createdShop.id);

            this.props.boundAddUser({
              email:shopObject.email,
              userType:"storeowner",
              userName: applicationObject.applicantName,
              userSurname: applicationObject.applicantSurname,
              shopid: createdShop.id,
              userTelephone: applicationObject.storeTelephone,
              userStatus:"enabled"
            });

            // email user informing them of approval
            this.emailUser(shopObject.email, tempPW);

            await this.props.boundPatchApplication({
              id:applicationObject.id,
              applicationStatus: 'approved',
              isAccepted: true,
              approvedAt: new Date().getTime()
            })

            this.props.fetchApplications();
        }


    }


    async rejectApplication(applicationObject) {
      await this.props.boundPatchApplication({
        id:applicationObject.id,
        applicationStatus: 'rejected',
        isAccepted: false,
        rejectedAt: new Date().getTime()
      })

      this.props.fetchApplications();
    }

async reinstateApplication(applicationObject){
  await this.props.boundPatchApplication({
    id:applicationObject.id,
    applicationStatus: 'new',
    isAccepted: false,
    createdAt: new Date().getTime()
  })

  this.props.fetchApplications();
}


async deleteApplication(applicationObject){

    const indexOfDelete = _.findIndex(this.props.applications, function(o) { return o.id == applicationObject.id; });

      let deleteObject = {
        ID: applicationObject.id,
        index: indexOfDelete
      };

      await this.props.deleteApplication(deleteObject);

      this.props.fetchApplications();
}

  render() {

    const {
      categories,
      applications
    } = this.props

    const newApplications = _.filter(applications, { 'applicationStatus': 'new' });

    const unattendedSize = _.size(newApplications);

    const approvedApplications = _.filter(applications, { 'applicationStatus': 'approved' });

    const rejectedApplications = _.filter(applications, { 'applicationStatus': 'rejected' });

    return (
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
            <VendorGrid
              applications={newApplications}
              categories={categories}
              boundPatchApplication={this.patchApplication.bind(this)}
              approveApplication={this.approveApplication.bind(this)}
              rejectApplication={this.rejectApplication.bind(this)} />
              <RejectedApplicationsGrid applications={rejectedApplications}
              reinstateApplication={this.reinstateApplication.bind(this)}
              deleteApplication={this.deleteApplication.bind(this)}/>
              <ApprovedApplicationsGrid applications={approvedApplications} />
            <hr/>
          </div>
        </div>
      </div>
      );
  }
}



const FetchedVendorApplications = fetch(VendorApplications, {
  actions: [fetchApplications, fetchCategories, fetchUsers]
});

function mapStateToProps(state) {
  const users = state.users;
  const categories = state.categories;
  const applications = state.applications;
  return {
    users,
    categories,
    applications
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchApplications: bindActionCreators(fetchApplications, dispatch),
    fetchUsers: bindActionCreators(fetchUsers, dispatch),
    boundPatchApplication: bindActionCreators(unboundPatchApplication, dispatch),
    boundAddShop: bindActionCreators(unboundAddShop, dispatch),
    boundAddUser: bindActionCreators(unboundAddUser, dispatch),
    deleteApplication: bindActionCreators(deleteApplication, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedVendorApplications);
