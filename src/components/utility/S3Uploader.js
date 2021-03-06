import React, { Component, PropTypes } from 'react';

import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import uuid from 'node-uuid';
import { Image } from 'react-bootstrap';
import '~/src/styles/uploader.css';


const gifSource = "/images/spin.gif"

class S3Uploader extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onDrop(files) {
    const fileName = uuid.v1() + '_' + files[0].name;
    const fileURL = this.props.folderURL + fileName;
    this.setState({
      uploadInProgress: true,
      uploadFileURL: fileURL
    });
    this.props.onUploadStart();

    superagent
      .put(fileURL + '?x-amz-acl=public-read')
      .set('Content-Type', 'image/jpg')
      .set('Content-Disposition', 'attachment; filename=' + fileName)
      .set('Content-Length', files[0].length)
      .send(files[0])
      .end(this.uploadFinished.bind(this))
  }

  uploadFinished() {
    this.props.onUploadFinish(this.state.uploadFileURL);
    this.setState({
      uploadInProgress: false,
      uploadCompleted: true
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset != this.props.reset && nextProps.reset) {
      this.state = {};
    }
  }

  render() {

    const dropZone = !this.state.uploadInProgress && !this.state.uploadCompleted &&
      <Dropzone onDrop={ this.onDrop.bind(this) }>
        <div className="dropzone">Drop a file here, or click to select a file to upload.</div>
      </Dropzone>;
    const uploadProgress = this.state.uploadInProgress && <div>
                                                            <Image src={ gifSource } />
                                                          </div>;
    const uploadPreview = this.state.uploadCompleted &&
    <img src={ this.state.uploadFileURL } style={ { maxWidth: '100%', maxHeight: '100%' } } />;
    return (
      <div>
        { dropZone }
        { uploadProgress }
        { uploadPreview }
      </div>
      );
  }
}

export default S3Uploader;
