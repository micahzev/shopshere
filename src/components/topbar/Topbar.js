import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Glyphicon } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import { bindActionCreators } from 'redux';
// import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert, Glyphicon } from 'react-bootstrap';

class Topbar extends Component {

render() {

	return(

            <div className="b-topbar" id="b-topbar">

              <div className="b-topbar-loadingbar">
                <div className="b-topbar-loadingbar-progress" id="b-topbar-loadingbar-progress"></div>
              </div>

              <div className="b-topbar-left">

                <div className="b-topbar-section b-topbar-section-logo b-no-padding">
                  <LinkContainer to={ { pathname: `/` } }>
                    <a href="/" className="b-topbar-logo-link" bsStyle="primary" bsSize="large">
                      <img src="/images/logo.png" alt="ShopSure" />
                    </a>
                  </LinkContainer>
                </div>

                <div className="b-topbar-section b-topbar-section-storedirectory">
	                <LinkContainer to={ { pathname: `/stores` } }>
	                  <button className="b-topbar-button" id="b-topbar-button-storedirectory" onclick="location.href = '/stores'">
	                    <span className="b-icon b-icon-shop"></span>
	                    <span className="b-text">Stores</span>
	                  </button>
	                </LinkContainer>
                </div>

                <div className="b-topbar-section b-topbar-section-storedirectory">
	                <LinkContainer to={ { pathname: `/categories` } }>
	                  <button className="b-topbar-button" id="b-topbar-button-categories" onclick="location.href = '/categories'">
	                    <span className="b-icon b-icon-category"></span>
	                    <span className="b-text">Categories</span>
	                  </button>
	                </LinkContainer>
                </div>

								<div className="b-topbar-section b-topbar-section-storedirectory">
									<LinkContainer to={ { pathname: `/applications` } }>
										<button className="b-topbar-button" id="b-topbar-button-categories" onclick="location.href = '/applications'">
											<span className="b-icon"><Glyphicon glyph="pencil" /></span>
											<span className="b-text">Vendor Applications</span>
										</button>
									</LinkContainer>
								</div>

								<div className="b-topbar-section b-topbar-section-storedirectory">
									<LinkContainer to={ { pathname: `/users` } }>
										<button className="b-topbar-button" id="b-topbar-button-categories" onclick="location.href = '/users'">
											<span className="b-icon"><Glyphicon glyph="user" /></span>
											<span className="b-text">Users</span>
										</button>
									</LinkContainer>
								</div>

              </div>

              <div className="b-topbar-right">

                <div className="b-topbar-section b-topbar-section-continue">

                  <div className="b-topbar-section b-topbar-section-storedirectory">
										<LinkContainer to={ { pathname: `/login` } }>
		                  <button className="b-topbar-button" id="b-topbar-button-signout" onclick="location.href = '/login'">
		                    <span className="b-icon b-icon-ui-signout"></span>
		                    <span className="b-text">Sign Out</span>
		                  </button>
		                </LinkContainer>
                  </div>

                </div>

              </div>

            </div>
        )

    }

}

export default Topbar;
