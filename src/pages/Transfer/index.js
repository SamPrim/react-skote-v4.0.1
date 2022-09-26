import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import BootstrapTable from "react-bootstrap-table-next";

import images from "assets/images";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import DeleteModal from "components/Common/DeleteModal";
//i18n
import { withTranslation } from "react-i18next";

import {
  getTransferts,
  addNewTransfert,
  updateTransfert,
  deleteTransfert,
} from "store/transfert/actions";

import {
  getProducts,
} from "store/products/actions";
import {
  getLocations,
} from "store/location/actions";

import { isEmpty, size, map } from "lodash";
import inventory from "pages/inventory";

class TransfertsList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      transferts: [],
      transfert: "",
      userConnect: "",
      id: "",
      modal: false,
      deleteModal: false,
      deleteModalTransfert: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, transfert) => <>#{transfert.id}</>,
        },
        {
          text: "Materiel",
          dataField: "produit.name",
          sort: true,
        },
        {
          dataField: "qte",
          text: "Quantity",
          sort: true,
        },
        {
          text: "Status",
          sort: true,
          formatter: (cellContent, transfert) => (
            <>
              {transfert.type ? <span className="badge rounded-pill bg-success float-start px-3 py-2">Retrait</span>: <span className="badge px-3 py-2 rounded-pill bg-warning float-start ">Retour</span>}
            </>
          ),
        },
        {
          dataField: "produit.serial_number",
          text: "Serial Number",
          sort: true,
          formatter: (cellContent, transfert) => (
            <>
              {transfert.serial_number ? transfert.serial_number: "N/A"}
            </>
          )
        },
        {
          dataField: "comment",
          text: "Description",
          sort: true,
        },
        {
          dataField: "date_created",
          text:"Date Transfert",
          sort: true,
          formatter: (cellContent, transfert) => (
            <p className="mb-1">
                {moment(transfert.date_created).format("YYYY-MM-DD  HH:mm:ss")}
            </p>
          ),
        },
        {
          text: "Etat",
          sort: true,
          formatter: (cellContent, transfert) => (
            <>
              { transfert.etat==0 ? <span className="badge rounded-pill bg-success float-start px-3 py-2">Bon Etat</span>: 
                transfert.etat==1 ? <span className="badge px-3 py-2 rounded-pill bg-warning float-start ">Neutre</span> :<span className="badge px-3 py-2 rounded-pill bg-danger float-start ">Defectueux</span>}
            </>
          ),
        },
        {
          dataField: "menu",
          isDummyField: true,
          editable: false,
          text: "Action",
          formatter: (cellContent, transfert) => (
            <div className="d-flex gap-3">
              {
                transfert.valid ? <i className="dripicons-checkmark font-size-18 text-success"></i>:
                ( transfert.personnel.id == JSON.parse(localStorage.getItem("authUser")).id ? <>
                  <Link className="text-success" to="#">
                    <i
                      className="mdi mdi-pencil font-size-18"
                      id="edittooltip"
                      onClick={() => this.handleTransfertClick(transfert)}
                    ></i>
                  </Link>
                  <Link className="text-danger" to="#">
                    <i
                      className="mdi mdi-delete font-size-18"
                      id="deletetooltip"
                      onClick={() => this.onClickDelete(transfert)}
                    ></i>
                  </Link>
                  {
                    transfert.personnel.id == 1 ?
                      <Link className="text-danger" to="#">
                        <i
                        className="badge rounded bg-success px-3 py-2 cursor"
                        id="deletetooltip"
                        onClick={() => this.onClickDeleteTransfert(transfert)}
                        >Validate transfer</i>
                    </Link>:''
                  }
                </>: <>
                      <Link className="text-danger" to="#">
                        <i
                        className="badge rounded bg-success px-3 py-2 cursor"
                        id="deletetooltip"
                        onClick={() => this.onClickDeleteTransfert(transfert)}
                        >Validate transfer</i>
                      </Link>
                    </>)
              }
            </div>
          ),
        },
      ],
    };
    this.handleTransfertClick = this.handleTransfertClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleTransfertClicks = this.handleTransfertClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  

  componentDidMount() {
    const { transferts, onGetTransferts, onGetProducts, onGetLocations } = this.props;
    // if (transferts && !transferts.length) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      onGetTransferts({"user_id": obj.id});
      onGetProducts();
      onGetLocations();
    // }
    this.setState({ transferts });
    console.log(this.state.transferts);

    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      this.setState({userConnect: obj});
  }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleTransfertClicks = () => {
    this.setState({ transfert: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { transferts, onGetTransferts } = this.props;
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (!isEmpty(transferts) && size(prevProps.transferts) !== size(transferts)) {
      onGetTransferts({"user_id": obj.id});
      this.setState({ transferts: {}, isEdit: false });
        // this.setState({ ...this.state, transferts: this.props.transfertsData });
    }
  }

  onPaginationPageChange = page => {
    if (
      this.node &&
      this.node.current &&
      this.node.current.props &&
      this.node.current.props.pagination &&
      this.node.current.props.pagination.options
    ) {
      this.node.current.props.pagination.options.onPageChange(page);
    }
  };

  /* Insert,Update Delete data */

  toggleDeleteModal = () => {
    this.setState(prevState => ({
      deleteModal: !prevState.deleteModal,
    }));
  };

  onClickDelete = transferts => {
    this.setState({ transferts: transferts });
    this.setState({ deleteModal: true });
  };

  onClickDeleteTransfert = (transfert) => {
    this.setState({ transfert: transfert });
    this.setState({ deleteModalTransfert: true, id: transfert.id});
  };

  handleValidateTransfert = () => {
    console.log("transfert validate "+this.state.id);
    const { transfert } = this.state;
    const { onUpdateTransfert } = this.props;
    transfert["valid"] = true
    onUpdateTransfert(transfert)
    this.setState({ deleteModalTransfert: false });
  }

  handleDeleteTransfert = () => {
    const { onDeleteTransfert } = this.props;
    const { transferts } = this.state;
    if (transferts.id !== undefined) {
      onDeleteTransfert(transferts, transferts.id);
      this.setState({ deleteModal: false });
    }
  };

  handleTransfertClick = arg => {
    const transfert = arg;

    this.setState({
      transfert: {
        id: transfert.id,
        serial_number: transfert.produit ?transfert.produit.serial_number:null,
        comment: transfert.comment,
        qte: transfert.qte,
        product: transfert.produit.id,
        location: transfert.location.id,
        etat: transfert.etat,
        type: transfert.type,
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "Transfert | Admin";

    // const { transferts } = this.state
    const { SearchBar } = Search;

    const { transferts } = this.props;

    const { isEdit, deleteModal, deleteModalTransfert } = this.state;

    const { onAddNewTransfert, onUpdateTransfert } = this.props;
    const transfert = this.state.transfert;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: transferts.length, // replace later with size(transferts),
      custom: true,
    };

    const defaultSorted = [
      {
        dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
        order: "desc", // desc or asc
      },
    ];

    const selectRow = {
      mode: "checkbox",
    };

    return (
      <React.Fragment>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={this.handleDeleteTransfert}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <DeleteModal
          show={deleteModalTransfert}
          onDeleteClick={this.handleValidateTransfert}
          onCloseClick={() => this.setState({ deleteModalTransfert: false })}
        />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Transfert" breadcrumbItem="Transfert List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={transferts}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={transferts}
                          search
                        >
                          {toolkitprops => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitprops.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={this.handleTransfertClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("New Transfer")}
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      {...toolkitprops.baseProps}
                                      {...paginationTableProps}
                                      selectRow={selectRow}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      ref={this.node}
                                    />

                                    <Modal
                                      isOpen={this.state.modal}
                                      className={this.props.className}
                                    >
                                      <ModalHeader
                                        toggle={this.toggle}
                                        tag="h4"
                                      >
                                        {!!isEdit ? this.props.t("Edit Transfer") : this.props.t("Add Transfer")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Formik
                                          enableReinitialize={true}
                                          initialValues={{
                                            serial_number: (transfert && transfert.serial_number) || "",
                                            comment:
                                              (transfert && transfert.comment) || "",
                                            product: (transfert && transfert.product) || "",
                                            location: (transfert && transfert.location) || "",
                                            qte: (transfert && transfert.qte) || "",
                                            etat: (transfert && transfert.etat) || "",
                                            type: (transfert && transfert.type) || "",
                                          }}
                                          validationSchema={Yup.object().shape({
                                            serial_number: Yup.string().required(
                                              this.props.t("Please Enter serial_number")
                                            ),
                                            comment: Yup.string().required(
                                              this.props.t("Please Enter comment")
                                            ),
                                          })}
                                          onSubmit={values => {
                                            if (isEdit) {
                                              console.log(values.type);
                                              const updateTransfert = {
                                                id: transfert.id,
                                                serial_number: values.serial_number,
                                                comment: values.comment,
                                                product_id: values.prduct,
                                                location_id: values.location,
                                                etat: values.etat,
                                                qte: values.qte,
                                                type: parseInt(values.type),
                                                valid: false
                                              };

                                              // update transfert
                                              onUpdateTransfert(updateTransfert);
                                            } else {
                                              console.log(values["type"]);
                                              const newTransfert = {
                                                serial_number: values["serial_number"],
                                                comment:
                                                  values["comment"],
                                                produit_id: values["product"],
                                                location_id: values['location'],
                                                etat: values["etat"],
                                                qte: values['qte'],
                                                type: parseInt(values['type']),
                                                manager_id: this.state.userConnect._group_id ==1 ? this.state.userConnect.id:null,
                                                personnel_id: this.state.userConnect.id
                                              };
                                              // save new transfert
                                              onAddNewTransfert(newTransfert);
                                            }
                                            this.setState({
                                              selectedGroup: null,
                                            });
                                            this.toggle();
                                          }}
                                        >
                                          {({ errors, status, touched }) => (
                                            <Form>
                                              <Row>
                                                <Col className="col-12">
                                                  
                                                <div className="mb-3">
                                                    <Label className="form-label">
                                                      Materiel
                                                    </Label>
                                                    <Field
                                                      name="product"
                                                      as="select"
                                                      className={
                                                        "form-control" +
                                                        (errors.product &&
                                                        touched.product
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      multiple={false}
                                                    >
                                                      <option>---</option>
                                                      {
                                                        this.props.products.map((product) => (
                                                          <option key={product.id} value={product.id}>{product.name}</option>
                                                         ))
                                                      }
                                                    </Field>
                                                    <ErrorMessage
                                                      name="product"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Location
                                                    </Label>
                                                    <Field
                                                      name="location"
                                                      as="select"
                                                      className={
                                                        "form-control" +
                                                        (errors.location &&
                                                        touched.location
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      multiple={false}
                                                    >
                                                      <option>---</option>
                                                      {
                                                        this.props.locations.map((location) => (
                                                          <option key={location.id} value={location.id}>{location.name}</option>
                                                         ))
                                                      }
                                                    </Field>
                                                    <ErrorMessage
                                                      name="location"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Serial Number
                                                    </Label>
                                                    <Field
                                                      name="serial_number"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.serial_number &&
                                                        touched.serial_number
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="serial_number"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Quantité
                                                    </Label>
                                                    <Field
                                                      name="qte"
                                                      type="number"
                                                      className={
                                                        "form-control" +
                                                        (errors.qte &&
                                                        touched.qte
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="qte"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Etat
                                                    </Label>
                                                    <Field
                                                      name="etat"
                                                      as="select"
                                                      className={
                                                        "form-control" +
                                                        (errors.etat &&
                                                        touched.etat
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      multiple={false}
                                                    >
                                                      <option>---</option>
                                                      <option value="0">Retour bon etat</option>
                                                      <option value="2">Retour defectueux</option>
                                                      <option value="1">Retour ----</option>
                                                    </Field>
                                                    <ErrorMessage
                                                      name="location"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>

                                                  <Col>
                                                    <div className="my-4">
                                                      <div className="form-check mb-3">
                                                        <Field
                                                          className="form-check-input"
                                                          type="radio"
                                                          name="type"
                                                          id="exampleRadios1"
                                                          value="1"
                                                        />
                                                        <label
                                                          className="form-check-label"
                                                          htmlFor="exampleRadios1"
                                                        >
                                                          Retrait materiel
                                                        </label>
                                                      </div>
                                                      <div className="form-check">
                                                        <Field
                                                          className="form-check-input"
                                                          type="radio"
                                                          name="type"
                                                          id="exampleRadios2"
                                                          value="0"
                                                        />
                                                        <label
                                                          className="form-check-label"
                                                          htmlFor="exampleRadios2"
                                                        >Retour materiel
                                                        </label>
                                                      </div>
                                                    </div>
                                                  </Col>

                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Commentaire
                                                    </Label>
                                                    <Field
                                                      name="comment"
                                                      type="textarea"
                                                      className={
                                                        "form-control" +
                                                        (errors.comment &&
                                                        touched.comment
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="comment"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>
                                                </Col>
                                              </Row>
                                              <Row>
                                                <Col>
                                                  <div className="text-end">
                                                    <button
                                                      type="submit"
                                                      className="btn btn-success save-user"
                                                    >
                                                      Save
                                                    </button>
                                                  </div>
                                                </Col>
                                              </Row>
                                            </Form>
                                          )}
                                        </Formik>
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

TransfertsList.propTypes = {
  transferts: PropTypes.array,
  products: PropTypes.array,
  locations:  PropTypes.array,
  className: PropTypes.any,
  onGetTransferts: PropTypes.func,
  onAddNewTransfert: PropTypes.func,
  onDeleteTransfert: PropTypes.func,
  onUpdateTransfert: PropTypes.func,
  onGetProducts: PropTypes.func,
  onGetLocations: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Transferts, Products, Locations }) => ({
  transferts: Transferts.transferts,
  products: Products.products,
  locations: Locations.locations,
});

const mapDispatchToProps = dispatch => ({
  onGetTransferts: user => dispatch(getTransferts(user)),
  onAddNewTransfert: transfert => dispatch(addNewTransfert(transfert)),
  onUpdateTransfert: transfert => dispatch(updateTransfert(transfert)),
  onDeleteTransfert: transfert => dispatch(deleteTransfert(transfert)),
  onGetLocations: () => dispatch(getLocations()),
  onGetProducts: () => dispatch(getProducts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(TransfertsList)));
