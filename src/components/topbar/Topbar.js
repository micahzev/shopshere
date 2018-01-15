import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { ClientId } from '~/src/config';
import { withCookies } from 'react-cookie';

class Topbar extends Component {

	constructor(props) {
    super(props);
  }


	signOut(){
	  window.localStorage.setItem('secretKey', null);
	  window.localStorage.setItem('username', null);
		window.localStorage.setItem('value', null);
		if (this.props.cookies.get('CognitoIdentityServiceProvider.' + ClientId + '.LastAuthUser')) {

			console.log("here");

			const loggedInID = this.props.cookies.get('CognitoIdentityServiceProvider.' + ClientId + '.LastAuthUser');

			this.props.cookies.set('CognitoIdentityServiceProvider.' + ClientId + '.LastAuthUser',"");
			this.props.cookies.set('CognitoIdentityServiceProvider.' + ClientId + '.' + loggedInID + '.idToken',"");
			this.props.cookies.set('CognitoIdentityServiceProvider.' + ClientId + '.' + loggedInID + '.accessToken',"");
			this.props.cookies.set('CognitoIdentityServiceProvider.' + ClientId + '.' + loggedInID + '.refreshToken',"");

			console.log("there");
		}
		this.props.history.push('/login');
	}


render() {

	return(

            <div className="b-topbar" id="b-topbar">

              <div className="b-topbar-loadingbar">
                <div className="b-topbar-loadingbar-progress" id="b-topbar-loadingbar-progress"></div>
              </div>

              <div className="b-topbar-left">

                <div className="b-topbar-section b-topbar-section-logo b-no-padding">
                  <LinkContainer to={ { pathname: `/admin-backend/home` } }>
                    <a href="/admin-backend/home" className="b-topbar-logo-link" bsStyle="primary" bsSize="large">
                      <img src="/images/logo.png" alt="ShopSure" />
                    </a>
                  </LinkContainer>
                </div>

                <div className="b-topbar-section b-topbar-section-storedirectory">
	                <LinkContainer to={ { pathname: `/admin-backend/stores` } }>
	                  <button className="b-topbar-button" id="b-topbar-button-storedirectory" onclick="location.href = '/admin-backend/stores'">
	                    <span className="b-icon b-icon-shop"></span>
	                    <span className="b-text">Stores</span>
	                  </button>
	                </LinkContainer>
                </div>

                <div className="b-topbar-section b-topbar-section-storedirectory">
	                <LinkContainer to={ { pathname: `/admin-backend/categories` } }>
	                  <button className="b-topbar-button" id="b-topbar-button-categories" onclick="location.href = '/admin-backend/categories'">
	                    <span className="b-icon b-icon-category"></span>
	                    <span className="b-text">Categories</span>
	                  </button>
	                </LinkContainer>
                </div>

								<div className="b-topbar-section b-topbar-section-storedirectory">
									<LinkContainer to={ { pathname: `/admin-backend/applications` } }>
										<button className="b-topbar-button" id="b-topbar-button-categories" onclick="location.href = '/admin-backend/applications'">
											<span className="b-icon"><Glyphicon glyph="pencil" /></span>
											<span className="b-text">Vendor<br/>Applications</span>
										</button>
									</LinkContainer>
								</div>

								<div className="b-topbar-section b-topbar-section-storedirectory">
									<LinkContainer to={ { pathname: `/admin-backend/users` } }>
										<button className="b-topbar-button" id="b-topbar-button-categories" onclick="location.href = '/admin-backend/users'">
											<span className="b-icon"><Glyphicon glyph="user" /></span>
											<span className="b-text">Users</span>
										</button>
									</LinkContainer>
								</div>

								<div className="b-topbar-section b-topbar-section-storedirectory">
									<LinkContainer to={ { pathname: `/admin-backend/manage` } }>
										<button className="b-topbar-button" id="b-topbar-button-categories" onclick="location.href = '/admin-backend/manage'">
											<span className="b-icon"><Glyphicon glyph="folder-close" /></span>
											<span className="b-text">Edit All<br/>Store Information</span>
										</button>
									</LinkContainer>
								</div>

              </div>

              <div className="b-topbar-right">

                <div className="b-topbar-section b-topbar-section-continue">

                  <div className="b-topbar-section b-topbar-section-storedirectory">
										<div>
		                  <button className="b-topbar-button" id="b-topbar-button-signout" onClick={this.signOut.bind(this)}>
		                    <span className="b-icon b-icon-ui-signout"></span>
		                    <span className="b-text">Sign Out</span>
		                  </button>
		                </div>
                  </div>

                </div>

              </div>

            </div>
        )

    }

}

export default withCookies(Topbar);
