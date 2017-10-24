import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object, bool, func } from 'prop-types';
import { Modal, Button, Image } from 'react-bootstrap';

import FormInputArea from '~/src/components/applications/FormInputArea';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { logoFolderURL } from '~/src/config';

import '~/src/styles/store-admin.css';

class ViewEditShop extends Component {

  constructor(props) {
      super(props);
      this.state = {
        name: this.props.shop.name,
        email: this.props.shop.email,
        phone: this.props.shop.phone,
        url: this.props.shop.url,
        category: this.props.shop.category,
        address1: this.props.shop.address1,
        address2: this.props.shop.address2,
        city: this.props.shop.city,
        code: this.props.shop.code,
        province: this.props.shop.province,
        visible: this.props.shop.visible,
        logoFile: this.props.shop.logoFile,
        changeImage: false,
        submitDisabled: false,
      };

  };

  componentWillReceiveProps(nextProps) {
      if (this.props.shop != nextProps.shop){
        this.setState({
          name: nextProps.shop.name,
          email: nextProps.shop.email,
          phone: nextProps.shop.phone,
          url: nextProps.shop.url,
          category: nextProps.shop.category,
          address1: nextProps.shop.address1,
          address2: nextProps.shop.address2,
          city: nextProps.shop.city,
          code: nextProps.shop.code,
          province: nextProps.shop.province,
          visible: nextProps.shop.visible,
          logoFile: nextProps.shop.logoFile
        })
      }
  };

  handleInputChange(event) {
    // event.preventDefault();

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
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
      logoFile: logoFile,
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
      id:this.props.shop.id,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      url: this.state.url,
      category: this.state.category,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      code: this.state.code,
      province: this.state.province,
      visible: this.state.visible,
      logoFile: this.state.logoFile,
    }

    this.props.PatchShop(updateObject);

    this.handleViewClose();
  }

  handleViewClose(){
    this.setState({
      name: this.props.shop.name,
      email: this.props.shop.email,
      phone: this.props.shop.phone,
      url: this.props.shop.url,
      category: this.props.shop.category,
      address1: this.props.shop.address1,
      address2: this.props.shop.address2,
      city: this.props.shop.city,
      code: this.props.shop.code,
      province: this.props.shop.province,
      visible: this.props.shop.visible,
      logoFile: this.props.shop.logoFile,
      changeImage: false,
      submitDisabled: false
    })

    this.props.handleViewClose();
  }

  render() {

    const {
      categories,
      shop,
      owner
    } = this.props;

    return (
      <Modal show={this.props.show} onHide={this.handleViewClose.bind(this)}>
              <Modal.Header closeButton>
                    <Modal.Title>
                          View Shop - <span className="data-variable">{shop.name}</span>
                    </Modal.Title>
              </Modal.Header>
              <Modal.Body>

                    <div className="view-data">Store Owner Name: <span className="data-variable">{owner.userName} {owner.userSurname}</span></div>
                    <div className="view-data">Store Owner Email: <span className="data-variable">{owner.id}</span></div>
                    <div className="view-data">Store Owner Telephone: <span className="data-variable">{owner.userTelephone}</span></div>
                    <hr/>
                    <div className="view-data">Is Activated: <span className="data-variable">{shop.isActivated ? "Yes" : "No"}</span></div>
                    <hr/>
                    <label className="view-data">
                      Is Visible In Store Catalogue:

                        <div className="slideThree">
                          <input type="checkbox"  id="slideThree" name="visible" checked={this.state.visible} onChange={this.handleInputChange.bind(this)}  />
                          <label htmlFor="slideThree"></label>
                        </div>
                    </label>
                    <hr/>
                    <form>
                          <FormInputArea name="name" label="Store Name" onChange={this.handleInputChange.bind(this)} value={this.state.name} />
                          <label>
                            Category
                            <select name="category" value={this.state.category} onChange={this.handleInputChange.bind(this)}>
                              {categories.map((cat)=> <option key={cat.id} value={cat.id}>{cat.text}</option>)}
                            </select>
                          </label>
                          <FormInputArea name="url" label="Website" onChange={this.handleInputChange.bind(this)} value={this.state.url} />
                          <FormInputArea name="email" label="Email" onChange={this.handleInputChange.bind(this)} value={this.state.email} />
                          <FormInputArea name="phone" label="Telephone" onChange={this.handleInputChange.bind(this)} value={this.state.phone} />
                          <FormInputArea name="address1" label="Address Line 1" onChange={this.handleInputChange.bind(this)} value={this.state.address1} />
                          <FormInputArea name="address2" label="Address Line 2" onChange={this.handleInputChange.bind(this)} value={this.state.address2} />
                          <FormInputArea name="city" label="City" onChange={this.handleInputChange.bind(this)} value={this.state.city} />
                          <FormInputArea name="province" label="Province" onChange={this.handleInputChange.bind(this)} value={this.state.province} />
                          <FormInputArea name="code" label="Postcode" onChange={this.handleInputChange.bind(this)} value={this.state.code} />
                    </form>
                    <hr/>
                    <div className="view-data">Logo:
                    { !this.state.changeImage ?
                          <div>
                              <Image src={ this.state.logoFile } responsive />
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

export default ViewEditShop;
