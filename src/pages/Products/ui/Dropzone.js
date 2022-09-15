import React, { Component } from "react"
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  Row,
} from "reactstrap"
import Dropzone from "react-dropzone"

import axios from 'axios'


import { Link } from "react-router-dom"

class FormUpload extends Component {
  constructor(props) {
    super(props)
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this)
    this.state = { selectedFiles: []}
  }

  handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    )

    this.setState({ selectedFiles: files })
  }

  /**
   * Formats the size
   */
  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  async sendDocument(){
    const formData = new FormData()
    console.log(this.state.selectedFiles)
    this.props.closeModal()
    for(let i=0;i<this.state.selectedFiles.length;i++){
        formData.append("document", this.state.selectedFiles[0])
        await axios({
            method: "put",
            url:process.env.REACT_APP_URL+"stock/"+this.props.id+"/add_document?filename="+this.state.selectedFiles[i].name,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    }
  }
  render() {
    
     //meta title
    return (
            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <Form >
                      <Dropzone
                        onDrop={acceptedFiles =>
                          this.handleAcceptedFiles(acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        {this.state.selectedFiles.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          )
                        })}
                      </div>
                    </Form>

                    <div className="text-center mt-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={()=> this.sendDocument()}
                      >
                        Send Files
                      </button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
    )
  }
}

export default FormUpload
