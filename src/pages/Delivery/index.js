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
  Input
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
  getDeleverys,
  addNewDelevery,
  updateDelevery,
  deleteDelevery,
} from "store/delevery/actions";

import { isEmpty, size, map } from "lodash";

class DeliverysList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      deleverys: [],
      delevery: "",
      modal: false,
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, delevery) => <>#{delevery.id}</>,
        },
        {
          text: "Numero de Bordereau",
          dataField: "numero_bordereau",
          sort: true,
        },
        {
          dataField: "fournisseur",
          text: "Fournisseur",
          sort: true,
        },
        {
          dataField: "date_created",
          text: "Created At",
          sort: true,
          formatter: (cellContent, delevery) => (
              <p className="mb-1">
                  {moment(delevery.date_created).format("DD/MM/YYYY")}
              </p>
            ),
        },
        {
          text: "Document",
          sort: true,
          formatter: (cellContent, delevery) => (
              <p className="mb-1">
                  {delevery.numero_bordereau+"-"+delevery.fournisseur+".png"}
              </p>
            ),
        },
        {
          dataField: "menu",
          isDummyField: true,
          editable: false,
          text: "Action",
          formatter: (cellContent, delevery) => (
            <div className="d-flex gap-3">
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleDeleveryClick(delevery)}
                ></i>
              </Link>
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(delevery)}
                ></i>
              </Link>
            </div>
          ),
        },
      ],
    };
    this.handleDeleveryClick = this.handleDeleveryClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleDeleveryClicks = this.handleDeleveryClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  

  componentDidMount() {
    const { deleverys, onGetDeleverys } = this.props;
    if (deleverys && !deleverys.length) {
      onGetDeleverys();
    }
    this.setState({ deleverys });
    console.log(this.state.deleverys);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleDeleveryClicks = () => {
    this.setState({ delevery: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { deleverys } = this.props;
    if (!isEmpty(deleverys) && size(prevProps.deleverys) !== size(deleverys)) {
      this.setState({ deleverys: {}, isEdit: false });
        // this.setState({ ...this.state, deleverys: this.props.deleverysData });
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

  onClickDelete = deleverys => {
    this.setState({ deleverys: deleverys });
    this.setState({ deleteModal: true });
  };

  handleDeleteDelevery = () => {
    const { onDeleteDelevery } = this.props;
    const { deleverys } = this.state;
    if (deleverys.id !== undefined) {
      onDeleteDelevery(deleverys, deleverys.id);
      this.setState({ deleteModal: false });
    }
  };

  handleDeleveryClick = arg => {
    const delevery = arg;

    this.setState({
      delevery: {
        id: delevery.id,
        numero_bordereau: delevery.numero_bordereau,
        fournisseur: delevery.fournisseur
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "Delevery | Admin";

    // const { groups } = this.state
    const { SearchBar } = Search;

    const { deleverys } = this.props;

    const { isEdit, deleteModal } = this.state;

    const { onAddNewDelevery, onUpdateDelevery } = this.props;
    const delevery = this.state.delevery;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: deleverys.length, // replace later with size(deleverys),
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
          onDeleteClick={this.handleDeleteDelevery}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Delivery" breadcrumbItem="Delivery List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={deleverys}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={deleverys}
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
                                      onClick={this.handleDeleveryClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("Create New Delivery")}
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
                                        {!!isEdit ? this.props.t("Edit Delivery") : this.props.t("Add Delivery")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Formik
                                          enableReinitialize={true}
                                          initialValues={{
                                            numero_bordereau: (delevery && delevery.numero_bordereau) || "",
                                            fournisseur:
                                              (delevery && delevery.fournisseur) || "",
                                            photo: null
                                          }}
                                          validationSchema={Yup.object().shape({
                                            numero_bordereau: Yup.string().required(
                                              this.props.t("Please Enter Number")
                                            ),
                                            fournisseur: Yup.string().required(
                                              this.props.t("Please Enter Name")
                                            ),
                                          })}
                                          onSubmit={values => {
                                            console.log(values);
                                            if (isEdit) {
                                                let updateDelevery = new FormData();
                                                updateDelevery.append("id", delevery.id),
                                                updateDelevery.append("numero_bordereau", values.numero_bordereau),
                                                updateDelevery.append("fournisseur", values.fournisseur),
                                                updateDelevery.append("facture", values.photo)

                                                // update delevery
                                                onUpdateDelevery(updateDelevery);
                                            } else {
                                              let newDelevery = new FormData();
                                              newDelevery.append("id", delevery.id),
                                              newDelevery.append("numero_bordereau", values["numero_bordereau"]),
                                              newDelevery.append("fournisseur", values["fournisseur"]),
                                              newDelevery.append("facture", values["photo"])
                                              // const newDelevery = {
                                              //   numero_bordereau: values["numero_bordereau"],
                                              //   fournisseur:
                                              //     values["fournisseur"],
                                              //   facture: values["photo"]
                                              // };
                                              // save new delevery
                                              onAddNewDelevery(newDelevery);
                                            }
                                            this.setState({
                                              selectedDelivery: null,
                                            });
                                            this.toggle();
                                          }}
                                        >
                                          {({setFieldValue, errors, status, touched}) => (
                                            <Form>
                                              <Row>
                                                <Col className="col-12">
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Numero De Bordereau
                                                    </Label>
                                                    <Field
                                                      name="numero_bordereau"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.name &&
                                                        touched.name
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="numero_bordereau"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Fournisseur
                                                    </Label>
                                                    <Field
                                                      name="fournisseur"
                                                      type="textarea"
                                                      className={
                                                        "form-control" +
                                                        (errors.fournisseur &&
                                                        touched.fournisseur
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="fournisseur"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Attach Document
                                                    </Label>
                                                    <Input
                                                      name="photo"
                                                      type="file"
                                                      onChange={(event) => 
                                                        setFieldValue("photo", event.target.files[0])
                                                      }
                                                      className={
                                                        "form-control" +
                                                        (errors.photo &&
                                                        touched.photo
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="photo"
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

DeliverysList.propTypes = {
  deleverys: PropTypes.array,
  className: PropTypes.any,
  onGetDeleverys: PropTypes.func,
  onAddNewDelevery: PropTypes.func,
  onDeleteDelevery: PropTypes.func,
  onUpdateDelevery: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Deleverys }) => ({
  deleverys: Deleverys.deleverys,
});

const mapDispatchToProps = dispatch => ({
  onGetDeleverys: () => dispatch(getDeleverys()),
  onAddNewDelevery: delevery => dispatch(addNewDelevery(delevery)),
  onUpdateDelevery: delevery => dispatch(updateDelevery(delevery)),
  onDeleteDelevery: delevery => dispatch(deleteDelevery(delevery)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(DeliverysList)));
