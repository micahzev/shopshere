import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object } from 'prop-types';

import '~/src/styles/applications.css';

class RejectApplication extends Component {

  static propTypes = {
      application: object.isRequired
    };

    static defaultProps = {
      application: {
        id: 0
      },
    };

  render() {

    const {
      application
    } = this.props;

    const receivedDate = new Date(application.createdAt);

    return (
      <div>
        Reject
      </div>
      );
  }
}

export default RejectApplication;
