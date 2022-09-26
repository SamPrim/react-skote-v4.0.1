import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";

//Lightbox
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";





class UiLightbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFits: false,
      isEffects: false,
      isGalleryZoom: false,
      isOpen: false,
      isOpen1: false,
      modal_standard: false,
    };
    this.openModal = this.openModal.bind(this);
    this.openModal1 = this.openModal1.bind(this);
    this.tog_standard = this.tog_standard.bind(this);
  }

  tog_standard() {
    this.setState(prevState => ({
      modal_standard: !prevState.modal_standard,
    }));
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  openModal1() {
    this.setState({ isOpen1: true });
  }

  render() {

    //meta title
    document.title = "Lightbox | Skote - React Admin & Dashboard Template";
    const images = this.props.images
    const photoIndex = this.props.photoIndex;
    console.log(this.props.isGallery);
    return (
      <React.Fragment>
            {this.props.isGallery ? (
              <Lightbox
                mainSrc={process.env.REACT_APP_STATIC_URL+"livraisons/"+images[this.props.photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={
                  images[(photoIndex + images.length - 1) % images.length]
                }
                enableZoom={true}
                onCloseRequest={() => this.props.onCloseRequest(false)}
                onMovePrevRequest={() => this.props.onMovePrevRequest(photoIndex + images.length - 1) % images.length
                }
                onMoveNextRequest={() => this.props.onMoveNextRequest(photoIndex + 1) % images.length
                }
                imageCaption={"Project " + parseFloat(photoIndex + 1)}
              />
            ) : null}
      </React.Fragment>
    );
  }
}

export default UiLightbox;
