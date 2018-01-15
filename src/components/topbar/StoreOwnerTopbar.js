import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { ClientId, ApplicationDomain } from '~/src/config';
import { withCookies } from 'react-cookie';


class StoreOwnerTopbar extends Component {

	constructor(props) {
    super(props);
  }

	signOut(){
	  window.localStorage.setItem('secretKey', null);
	  window.localStorage.setItem('username', null);
		window.localStorage.setItem('value', null);
		if (this.props.cookies.get('CognitoIdentityServiceProvider.' + ClientId + '.LastAuthUser')) {

			const loggedInID = this.props.cookies.get('CognitoIdentityServiceProvider.' + ClientId + '.LastAuthUser');

			this.props.cookies.remove('CognitoIdentityServiceProvider.' + ClientId + '.LastAuthUser', { domain: ApplicationDomain });
			this.props.cookies.remove('CognitoIdentityServiceProvider.' + ClientId + '.' + loggedInID + '.idToken', { domain: ApplicationDomain });
			this.props.cookies.remove('CognitoIdentityServiceProvider.' + ClientId + '.' + loggedInID + '.accessToken', { domain: ApplicationDomain });
			this.props.cookies.remove('CognitoIdentityServiceProvider.' + ClientId + '.' + loggedInID + '.refreshToken', { domain: ApplicationDomain });
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
                  <LinkContainer to={ { pathname: `/backend/home` } }>
                    <a href="/backend/home" className="b-topbar-logo-link" bsStyle="primary" bsSize="large">
                      <img src="/images/logo.png" alt="ShopSure" />
                    </a>
                  </LinkContainer>
                </div>

                <div className="b-topbar-section b-topbar-section-storedirectory">
	                <LinkContainer to={ { pathname: `/backend/products` } }>
	                  <button className="b-topbar-button" id="b-topbar-button-storedirectory" onclick="location.href = '/backend/products'">
	                    <span className="b-icon"><Glyphicon glyph="tag" /></span>
	                    <span className="b-text">Products</span>
	                  </button>
	                </LinkContainer>
                </div>

                <div className="b-topbar-section b-topbar-section-storedirectory">
	                <LinkContainer to={ { pathname: `/backend/viewpoints` } }>
	                  <button className="b-topbar-button" id="b-topbar-button-categories" onclick="location.href = '/backend/viewpoints'">
	                    <span className="b-icon"><Glyphicon glyph="picture" /></span>
	                    <span className="b-text">Viewpoints</span>
	                  </button>
	                </LinkContainer>
                </div>

								<div className="b-topbar-section b-topbar-section-storedirectory">
									<LinkContainer to={ { pathname: `/backend/settings` } }>
										<button className="b-topbar-button" id="b-topbar-button-categories" onclick="location.href = '/backend/settings'">
											<span className="b-icon"><Glyphicon glyph="wrench" /></span>
											<span className="b-text">Settings</span>
										</button>
									</LinkContainer>
								</div>

								<div className="b-topbar-section b-topbar-section-storedirectory">
									<LinkContainer to={ { pathname: `/backend/managers` } }>
										<button className="b-topbar-button" id="b-topbar-button-categories" onclick="location.href = '/backend/managers'">
											<span className="b-icon"><Glyphicon glyph="user" /></span>
											<span className="b-text">Managers</span>
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

export default withCookies(StoreOwnerTopbar);
