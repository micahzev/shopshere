import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object, bool, func } from 'prop-types';
import { Modal, Button, Image } from 'react-bootstrap';

import FormInputArea from '~/src/components/applications/FormInputArea';

import { unboundPatchApplication } from '~/src/actions/applications';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { logoFolderURL } from '~/src/config';

import '~/src/styles/applications.css';

class ViewShopApplication extends Component {

  constructor(props) {
      super(props);
      this.state = {
        storeName: this.props.application.storeName,
        storeCategory: this.props.application.storeCategory,
        storeUrl: this.props.application.storeUrl,
        storeEmail: this.props.application.storeEmail,
        storeTelephone: this.props.application.storeTelephone,
        address1: this.props.application.address1,
        address2: this.props.application.address2,
        storeCity: this.props.application.storeCity,
        province: this.props.application.province,
        postcode: this.props.application.postcode,
        storeLogo: this.props.application.storeLogo,
        storeDescription: this.props.application.storeDescription,
        storePlan: this.props.application.storePlan,
        applicantName: this.props.application.applicantName,
        applicantSurname: this.props.application.applicantSurname,
        applicantTelephone: this.props.application.applicantTelephone,
        applicantEmail: this.props.application.applicantEmail,
        applicantCompany: this.props.application.applicantCompany,
        changeImage: false,
        submitDisabled: false,
      };

  };

  componentWillReceiveProps(nextProps) {
      if (this.props.application != nextProps.application){
        this.setState({
            storeName: nextProps.application.storeName,
            storeCategory: nextProps.application.storeCategory,
            storeUrl: nextProps.application.storeUrl,
            storeEmail: nextProps.application.storeEmail,
            storeTelephone: nextProps.application.storeTelephone,
            address1: nextProps.application.address1,
            address2: nextProps.application.address2,
            storeCity: nextProps.application.storeCity,
            province: nextProps.application.province,
            postcode: nextProps.application.postcode,
            storeLogo: nextProps.application.storeLogo,
            storeDescription: nextProps.application.storeDescription,
            storePlan: nextProps.application.storePlan,
            applicantName: nextProps.application.applicantName,
            applicantSurname: nextProps.application.applicantSurname,
            applicantTelephone: nextProps.application.applicantTelephone,
            applicantEmail: nextProps.application.applicantEmail,
            applicantCompany: nextProps.application.applicantCompany,
        })
      }
  };

  static propTypes = {
      application: object.isRequired,
      show: bool.isRequired,
      handleViewClose: func.isRequired,
  };

  static defaultProps = {
      applications: [{
        id: 0
      }],
      show: false,
  };

  handleInputChange(event) {
    event.preventDefault();

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  imageUploadStarted() {
    this.setState({
      submitDisabled: true
    });
  }

  imageUploadComplete(logoFile) {
    this.setState({
      submitDisabled: false,
      storeLogo: logoFile,
      changeImage: false
    });
  }

  clickedChangeLogo(){
    this.setState({
      changeImage: true
    });
  }

  handleSubmit(event){
    const updateObject = {
      id:this.props.application.id,
      storeName: this.state.storeName,
      storeCategory: this.state.storeCategory,
      storeUrl: this.state.storeUrl,
      storeEmail: this.state.storeEmail,
      storeTelephone: this.state.storeTelephone,
      address1: this.state.address1,
      address2: this.state.address2,
      storeCity: this.state.storeCity,
      province: this.state.province,
      postcode: this.state.postcode,
      storeLogo: this.state.storeLogo,
      applicantName: this.state.applicantName,
      applicantSurname: this.state.applicantSurname,
      applicantTelephone: this.state.applicantTelephone,
      applicantEmail: this.state.applicantEmail,
      applicantCompany: this.state.applicantCompany,
      storePlan: this.state.storePlan,
      storeDescription: this.state.storeDescription,
    }

    this.props.boundPatchApplication(updateObject);

    this.props.handleViewClose();
  }

  handleViewClose(){
    this.setState({
        storeName: this.props.application.storeName,
        storeCategory: this.props.application.storeCategory,
        storeUrl: this.props.application.storeUrl,
        storeEmail: this.props.application.storeEmail,
        storeTelephone: this.props.application.storeTelephone,
        address1: this.props.application.address1,
        address2: this.props.application.address2,
        storeCity: this.props.application.storeCity,
        province: this.props.application.province,
        postcode: this.props.application.postcode,
        storeLogo: this.props.application.storeLogo,
        applicantName: this.props.application.applicantName,
        applicantSurname: this.props.application.applicantSurname,
        applicantTelephone: this.props.application.applicantTelephone,
        applicantEmail: this.props.application.applicantEmail,
        applicantCompany: this.props.application.applicantCompany,
        storePlan: this.props.application.storePlan,
        storeDescription: this.props.application.storeDescription,
        changeImage: false,
        submitDisabled: false,
    })

    this.props.handleViewClose();
  }

  render() {

    const {
      categories,
      application
    } = this.props;

    const receivedDate = new Date(application.createdAt);

    return (
      <Modal show={this.props.show} onHide={this.handleViewClose.bind(this)}>
              <Modal.Header closeButton>
                    <Modal.Title>
                          View Vendor Application - <span className="data-variable">{application.storeName}</span>
                    </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    <div className="view-data">Applicant Name: <span className="data-variable">{application.applicantName} {application.applicantSurname}</span></div>
                    <div className="view-data">Applicant Telephone: <span className="data-variable">{application.applicantTelephone}</span></div>
                    <div className="view-data">Applicant Email: <span className="data-variable">{application.applicantEmail}</span></div>
                    <div className="view-data">Applicant Company: <span className="data-variable">{application.applicantCompany}</span></div>
                    <div className="view-data">Application Date: <span className="data-variable">{receivedDate.toString().slice(0, 25)}</span></div>
                    <hr/>
                    <form>
                          <FormInputArea name="storeName" label="Store Name" onChange={this.handleInputChange.bind(this)} value={this.state.storeName} />
                          <FormInputArea name="storeDescription" label="Description" onChange={this.handleInputChange.bind(this)} value={this.state.storeDescription} />
                          <FormInputArea name="storePlan" label="Plan" onChange={this.handleInputChange.bind(this)} value={this.state.storePlan} />
                          <label>
                            Category
                            <select name="storeCategory" value={this.state.storeCategory} onChange={this.handleInputChange.bind(this)}>
                              {categories.map((cat)=> <option key={cat.id} value={cat.id}>{cat.text}</option>)}
                            </select>
                          </label>
                          <FormInputArea name="storeUrl" label="Website" onChange={this.handleInputChange.bind(this)} value={this.state.storeUrl} />
                          <FormInputArea name="storeEmail" label="Email" onChange={this.handleInputChange.bind(this)} value={this.state.storeEmail} />
                          <FormInputArea name="storeTelephone" label="Telephone" onChange={this.handleInputChange.bind(this)} value={this.state.storeTelephone} />
                          <FormInputArea name="address1" label="Address Line 1" onChange={this.handleInputChange.bind(this)} value={this.state.address1} />
                          <FormInputArea name="address2" label="Address Line 2" onChange={this.handleInputChange.bind(this)} value={this.state.address2} />
                          <FormInputArea name="storeCity" label="City" onChange={this.handleInputChange.bind(this)} value={this.state.storeCity} />
                          <FormInputArea name="province" label="Province" onChange={this.handleInputChange.bind(this)} value={this.state.province} />
                          <FormInputArea name="postcode" label="Postcode" onChange={this.handleInputChange.bind(this)} value={this.state.postcode} />
                    </form>
                    <hr/>
                    <div className="view-data">Logo:
                    { !this.state.changeImage ?
                          <div>
                              <Image src={ this.state.storeLogo } responsive />
                              <button bsStyle="danger" onClick={ this.clickedChangeLogo.bind(this) }>Change Logo Image</button>
                          </div>
                      :
                      <S3Uploader onUploadStart={ this.imageUploadStarted.bind(this) } onUploadFinish={ this.imageUploadComplete.bind(this) } folderURL={ logoFolderURL } /> }
                    </div>


              </Modal.Body>
              <Modal.Footer>
                      <Button onClick={this.handleSubmit.bind(this)}>Submit and Save</Button>
                      <Button onClick={this.handleViewClose.bind(this)}>Close</Button>
              </Modal.Footer>
      </Modal>
      );
  }
}

export default ViewShopApplication;
