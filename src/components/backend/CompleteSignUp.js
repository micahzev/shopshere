import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip, Image, Alert } from 'react-bootstrap';
import fetch from '~/src/components/fetch';
import { fetchViewpoints } from '~/src/actions/viewpoints';
import { unboundPatchShop } from '~/src/actions/shops';
import { fetchCategories } from '~/src/actions/categories';
import { fetchShops } from '~/src/actions/shops';
import ColorPick from '~/src/components/utility/ColorPick';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';

import { find } from 'lodash';

import '~/src/styles/shops.css';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { logoFolderURL } from '~/src/config';

import { array } from 'prop-types'

class CompleteSignUp extends Component {


  static propTypes = {
    categories: array.isRequired,
    viewpoints:array.isRequired
  }

  static defaultProps = {
  categories: [{
    text:'loading',
    id:0
  }],
  viewpoints:[{
    name:'loading',
    id:0
  }]
  }

  componentDidUpdate (prevProps)
	{
    if (prevProps.categories != this.props.categories && this.props.categories.length != 0) {

      const shopID = window.localStorage.getItem('value');

      const thisShop = this.props.shop;

      const catText =_.find(this.props.categories, {'id':thisShop.category}).text;

      this.setState({
        categoryValue: catText
      });

    }

    if (this.props.viewpoints.length == 0 ){
      const shopID = window.localStorage.getItem('value');
      this.props.fetchViewpoints({
        shopID: shopID
      });
    }


    if (prevProps.viewpoints != this.props.viewpoints && this.props.viewpoints.length != 0) {


            const shopID = window.localStorage.getItem('value');

            const thisShop = this.props.shop;

            const entVPText =_.find(this.props.viewpoints, {'id':thisShop.entranceViewpoint}).name;

            this.setState({
              viewpointValue: entVPText
            });

    }


	}

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  clickedEditShop() {

    const shopID = window.localStorage.getItem('value');

    const thisShop = this.props.shop;

    var shortCircuit = 0;

    //validate name

    var nameInput = this.refs.nameBox.getValue();

    if (!nameInput) {
      this.handleAlertNoNameShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoNameDismiss();
    }

    //validate email

    var emailInput = this.refs.shopContactEmailBox.getValue();

    if (!this.validateEmail(emailInput)) {
      this.handleAlertBadEmailShow();
      shortCircuit = 1;
    } else {
      this.handleAlertBadEmailDismiss();
    }

    //validate URL
    var URLInput = this.refs.shopContactURLBox.getValue();
    if (!URLInput) {
      this.handleAlertNoURLShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoURLDismiss();
    }

    //validate Phone
    var phoneInput = this.refs.shopContactPhoneBox.getValue();
    if (!phoneInput) {
      this.handleAlertNoPhoneShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoPhoneDismiss();
    }

    //validate Address
    var address1Input = this.refs.shopAddressLine1Box.getValue();
    var address2Input = this.refs.shopAddressLine2Box.getValue();
    var cityInput = this.refs.shopAddressCityBox.getValue();
    var provinceInput = this.refs.shopAddressProvinceBox.getValue();
    var codeInput = this.refs.shopAddressPostBox.getValue();

    if (!address1Input || !address2Input || !cityInput || !provinceInput || !codeInput) {
      this.handleAlertNoAddressShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoAddressDismiss();
    }


    var catval = this.refs.catBox.getValue();

    if (catval == "") {
      this.handleAlertNoCatShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoCatDismiss();
    }

    var cat = _.find(this.props.categories, function(o) {
      return o.text == catval
    });

    var entVPval = this.refs.entranceViewpointBox.getValue();

    if (entVPval == "") {
      this.handleAlertNoEVPShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoEVPDismiss();
    }


    if (this.state.changeImage) {
      this.handleAlertNoImageShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoImageDismiss();
    }

    if (shortCircuit == 1) {
      return;
    }

    var viewp = _.find(this.props.viewpoints, function(o) {
      return o.name == entVPval
    });

    var logo;

    if (this.state.logoFile) {
      logo = this.state.logoFile;
    } else {
      logo = thisShop.logoFile;
    }


    var patchShopObject = {
      id: shopID,
      name: nameInput,
      email: emailInput,
      url: URLInput,
      phone: phoneInput,
      address1: address1Input,
      address2: address2Input,
      city: cityInput,
      province: provinceInput,
      code: codeInput,
      category: cat["id"],
      logoFile: logo,
      logoColor: this.refs.colorHexBox.getValue(),
      entranceViewpoint: viewp["id"],
      visible: !this.refs.checkbox.checked,
      isNew:false
    }


    for (var key in patchShopObject) {
      if (patchShopObject[key] === "") {
        patchShopObject[key] = undefined;
      }
    }

    this.props.boundPatchShop(patchShopObject);
    this.handleAlertNoCatDismiss();
    this.handleAlertBadEmailDismiss();
    this.handleAlertNoEVPDismiss();

    this.props.signUpComplete();

    this.setState({
      showModal: false,
      logoFile: undefined,
      changeImage: false,
      selectedShop: {}
    });

  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      selectedShop: {},
      changeImage: false,
      logoFile: undefined,
      alertNoCatVisible: false,
      alertBadEmailVisible: false,
      alertNoEVPVisible: false,
      alertNoNameVisible: false,
      alertNoURLVisible: false,
      alertNoPhoneVisible: false,
      alertNoAddressVisible: false,
      alertNoImageVisible: false
    };
  }

  close() {
    this.setState({
      showModal: false,
      logoFile: undefined,
      changeImage: false,
      selectedShop: {},
      alertNoCatVisible: false,
      alertBadEmailVisible: false,
      alertNoEVPVisible: false,
      alertNoNameVisible: false,
      alertNoURLVisible: false,
      alertNoPhoneVisible: false,
      alertNoAddressVisible: false,
      alertNoImageVisible: false
    });
  }


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

  clickCategory(event) {

    this.setState({
      categoryValue: event.target.innerText
    });

  }

  clickViewpoint(event) {

    this.setState({
      viewpointValue: event.target.innerText
    });

  }

  clickedDeleteImage() {
    this.setState({
      changeImage: true
    });
  }

  handleChangeComplete(color) {

    var refstring = 'colorHexBox'
    var refstring2 = 'colorDisplayBox'

    this.refs[refstring].refs.input.value = color.hex;

    this.refs[refstring2].style.backgroundColor = color.hex;
    this.refs[refstring2].style.height = '30px';
    this.refs[refstring2].style.width = '30px';
    this.refs[refstring2].style.borderRadius = '20px';
  }


  handleColorClose() {
    return;
  }

  setColorBoxes() {

    var refToThis = this;
    var refstring2 = 'colorDisplayBox'
    refToThis.refs[refstring2].style.backgroundColor = this.state.selectedShop.logoColor;
    refToThis.refs[refstring2].style.height = '30px';
    refToThis.refs[refstring2].style.width = '30px';
    refToThis.refs[refstring2].style.borderRadius = '20px';

  }

  handleAlertNoNameDismiss() {
    this.setState({
      alertNoNameVisible: false
    });
  }

  handleAlertNoNameShow() {
    this.setState({
      alertNoNameVisible: true
    });
  }

  handleAlertNoCatDismiss() {
    this.setState({
      alertNoCatVisible: false
    });
  }

  handleAlertNoCatShow() {
    this.setState({
      alertNoCatVisible: true
    });
  }

  handleAlertBadEmailDismiss() {
    this.setState({
      alertBadEmailVisible: false
    });
  }

  handleAlertBadEmailShow() {
    this.setState({
      alertBadEmailVisible: true
    });
  }

  handleAlertNoEVPDismiss() {
    this.setState({
      alertNoEVPVisible: false
    });
  }

  handleAlertNoEVPShow() {
    this.setState({
      alertNoEVPVisible: true
    });
  }

  handleAlertNoURLDismiss() {
    this.setState({
      alertNoURLVisible: false
    });
  }

  handleAlertNoURLShow() {
    this.setState({
      alertNoURLVisible: true
    });
  }

  handleAlertNoPhoneDismiss() {
    this.setState({
      alertNoPhoneVisible: false
    });
  }

  handleAlertNoPhoneShow() {
    this.setState({
      alertNoPhoneVisible: true
    });
  }

  handleAlertNoAddressDismiss() {
    this.setState({
      alertNoAddressVisible: false
    });
  }

  handleAlertNoAddressShow() {
    this.setState({
      alertNoAddressVisible: true
    });
  }

  handleAlertNoImageDismiss() {
    this.setState({
      alertNoImageVisible: false
    });
  }

  handleAlertNoImageShow() {
    this.setState({
      alertNoImageVisible: true
    });
  }

  render() {
    const shopID = window.localStorage.getItem('value');

    const thisShop = this.props.shop;

    const entVPObjct = this.props.viewpoints ? (thisShop.entranceViewpoint ? _.find(this.props.viewpoints, {'id':thisShop.entranceViewpoint}) : {name:""}) : {name:""} ;
    const entVPText = entVPObjct ? entVPObjct.name : "";

    const logoFile = this.state.logoFile ? this.state.logoFile : thisShop.logoFile;

    return (
        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) } onEntered={ this.setColorBoxes.bind(this) } backdrop="static">
          <Modal.Header>
            <Modal.Title>Welcome to ShopSure! Review your store information below to start using our platform.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Input label="Name" type="text" ref='nameBox' defaultValue={ thisShop.name } required />
          { this.state.alertNoNameVisible ?
            <Alert bsStyle="danger" onDismiss={ this.handleAlertNoNameDismiss.bind(this) }>
              <p>Shop name is required.</p>
            </Alert> : null }
          <div className="contact-outer">
            <label>Contact Details:</label>
            <div className="contact-inner">
              <Input type="email" label="Email" ref="shopContactEmailBox" defaultValue={ thisShop.email } />
              { this.state.alertBadEmailVisible ?
                <Alert bsStyle="danger" onDismiss={ this.handleAlertBadEmailDismiss.bind(this) }>
                  <h4>Please add a valid email address.</h4>
                  <p>The email address entered is either invalid or empty.</p>
                </Alert> : null }
              <Input type="url" label="URL" ref="shopContactURLBox" defaultValue={ thisShop.url } />
              { this.state.alertNoURLVisible ?
                <Alert bsStyle="danger" onDismiss={ this.handleAlertNoURLDismiss.bind(this) }>
                  <p>Shop URL is required.</p>
                </Alert> : null }
              <Input type="tel" label="Phone" ref="shopContactPhoneBox" defaultValue={ thisShop.phone } />
              { this.state.alertNoPhoneVisible ?
                <Alert bsStyle="danger" onDismiss={ this.handleAlertNoPhoneDismiss.bind(this) }>
                  <p>Shop contact phone number is required.</p>
                </Alert> : null }
            </div>
          </div>
          <div className="contact-outer">
            <label>Physical Address:</label>
            <div className="contact-inner">
              <Input type="text" label="Address Line 1" ref="shopAddressLine1Box" defaultValue={ thisShop.address1 } />
              <Input type="text" label="Address Line 2" ref="shopAddressLine2Box" defaultValue={ thisShop.address2 } />
              <Input type="text" label="City" ref="shopAddressCityBox" defaultValue={ thisShop.city } />
              <Input type="text" label="Province" ref="shopAddressProvinceBox" defaultValue={ thisShop.province } />
              <Input type="text" label="Postal Code" ref="shopAddressPostBox" defaultValue={ thisShop.code } />
            </div>
            { this.state.alertNoAddressVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoAddressDismiss.bind(this) }>
                <p>All address fields are required.</p>
              </Alert> : null }
          </div>
          <label htmlFor="checkbox" className="form-element">Shop Visibility</label>
          <div className="checkbox">
            <input id="checkbox" type="checkbox" ref="checkbox" readOnly  checked={true} />
            <label htmlFor="checkbox">
              <b> Hide Shop <br/>  (Your store will be hidden on the platform for now until you add some products and 360 viewpoints. You will be able to make your store visible in the Settings tab later on.) </b>
            </label>
          </div>
          <label htmlFor="inputShopCategory" className="form-element">Category</label>
          <div className="cat-button">
            <DropdownButton bsStyle={ 'primary' } title={ 'Select a category' } id="catbutton">
              { this.props.categories.map((categories, index) => <MenuItem eventKey={ index } key={ index } onClick={ this.clickCategory.bind(this) }>
                                                                 { categories.text } </MenuItem>
                ) }
            </DropdownButton>
          </div>
          <div className="cat-box">
            <Input id="inputShopCategory" type="text" readOnly ref='catBox' bsClass="input-group" value={ this.state.categoryValue } />
          </div>
          { this.state.alertNoCatVisible ?
            <Alert bsStyle="danger" onDismiss={ this.handleAlertNoCatDismiss.bind(this) }>
              <h4>Please select a category.</h4>
              <p>You have not yet selected a category for this shop.</p>
            </Alert> : null }
          <label htmlFor="inputShopEntranceViewpoint" className="form-element">Entrance Viewpoint</label>
          <div className="cat-button">
            <DropdownButton bsStyle={ 'primary' } title={ 'Select an entrance viewpoint' } id="catbutton">
              { this.props.viewpoints.map((viewpoint, index) => <MenuItem eventKey={ index } key={ index } data={ viewpoint.id } onClick={ this.clickViewpoint.bind(this) }>
                                                                { viewpoint.name } </MenuItem>
                ) }
            </DropdownButton>
          </div>
          <div className="cat-box">
            <Input id="inputShopEntranceViewpoint" type="text" readOnly ref='entranceViewpointBox' bsClass="input-group" value={ this.state.viewpointValue }  />
          </div>
          { this.state.alertNoEVPVisible ?
            <Alert bsStyle="danger" onDismiss={ this.handleAlertNoEVPDismiss.bind(this) }>
              <p>Please select an entrance viewpoint for this shop.</p>
            </Alert> : null }
          <label htmlFor="inputShopLogoImageFile" className="form-element">Shop Logo</label>
          <br/>
          { !this.state.changeImage ?
            <Grid fluid>
              <div>
                <Row className="padded-row">
                  <Col xs={ 8 } md={ 8 }>
                  <Image src={ logoFile } responsive />
                  </Col>
                  <Col xs={ 1 } md={ 1 }>
                  <div>
                    <OverlayTrigger overlay={ <Tooltip id="remove-image">Remove image.</Tooltip> }>
                      <Button bsStyle="danger" onClick={ this.clickedDeleteImage.bind(this) }>Change Logo</Button>
                    </OverlayTrigger>
                  </div>
                  </Col>
                </Row>
              </div>
            </Grid>
            :
            <S3Uploader onUploadStart={ this.imageUploadStarted.bind(this) } onUploadFinish={ this.imageUploadComplete.bind(this) } folderURL={ logoFolderURL } /> }
          { this.state.alertNoImageVisible ?
            <Alert bsStyle="danger" onDismiss={ this.handleAlertNoImageDismiss.bind(this) }>
              <p>A shop Logo Image is required.</p>
            </Alert> : null }
          <label htmlFor="inputShopLogoBackground" className="form-element">Shop Logo Background Color </label>
          <Grid fluid>
            <Row className="padded-row">
              <Col xs={ 3 } md={ 3 }>
              <ColorPick handleChange={ this.handleChangeComplete.bind(this) } onClosing={ this.handleColorClose.bind(this) } index='0' />
              </Col>
              <Col xs={ 1 } md={ 1 }>
              <div ref='colorDisplayBox'>
              </div>
              </Col>
              <Col xs={ 3 } md={ 3 }>
              <Input id="inputShopLogoBackground" type="text" ref='colorHexBox' readOnly defaultValue={ thisShop.logoColor } placeholder="Hex Value" />
              </Col>
            </Row>
          </Grid>
          </Modal.Body>
          <Modal.Footer>
            <ButtonInput type="submit" bsStyle="primary" onClick={ this.clickedEditShop.bind(this) } disabled={ this.state.submitDisabled }>
              { this.state.submitDisabled ? 'Wait for upload to finish' : 'Complete Store SignUp' }
            </ButtonInput>
          </Modal.Footer>
        </Modal>
      );
  }
}

const FetchedCompleteSignUp = fetch(CompleteSignUp, {
  actions: [fetchCategories, fetchViewpoints]
});

function mapStateToProps(state) {
  const categories = state.categories;
  const viewpoints = state.viewpoints;
  return {
    categories,
    viewpoints
  };
}
;

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    boundPatchShop: bindActionCreators(unboundPatchShop, dispatch),
    fetchViewpoints: bindActionCreators(fetchViewpoints, dispatch)
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(FetchedCompleteSignUp);
