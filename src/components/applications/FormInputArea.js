import React, { Component } from 'react';

import '~/src/styles/applications.css';

class FormInputArea extends Component {

  render() {
    return(
      <label className="view-data">
            {this.props.label}
            <input className="data-variable" type="text" name={this.props.name} onChange={this.props.onChange} value={this.props.value} />
      </label>
    )
  }
}

export default FormInputArea;
