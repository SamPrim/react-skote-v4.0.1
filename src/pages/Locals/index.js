import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
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
  getLocals,
  addNewLocal,
  updateLocal,
  deleteLocal,
} from "store/local/actions";
import {
    getCities,
  } from "store/cities/actions";

import { isEmpty, size, map } from "lodash";
import moment from "moment";

class LocalsList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      locals: [],
      local: "",
      modal: false,
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, local) => <>#{local.id}</>,
        },
        {
          text: "Name",
          dataField: "name",
          sort: true,
        },
        {
          dataField: "description",
          text: "Description",
          sort: true,
        },
        {
            dataField: "citie.name",
            text: "Citie",
            sort: true,
        },
        {
            dataField: "date_created",
            text: "Created At",
            sort: true,
            formatter: (cellContent, local) => (
                <p className="mb-1">
                    {moment(local.date_created).format("DD/MM/YYYY")}
                </p>
              ),
        },
        {
            dataField: "date_updated",
            text: "Updated At",
            sort: true,
            formatter: (cellContent, local) => (
                <p className="mb-1">
                    {moment(local.date_updated).format("DD/MM/YYYY")}
                </p>
              ),
        },
        {
          dataField: "menu",
          isDummyField: true,
          editable: false,
          text: "Action",
          formatter: (cellContent, local) => (
            <div className="d-flex gap-3">
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleLocalClick(local)}
                ></i>
              </Link>
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(local)}
                ></i>
              </Link>
            </div>
          ),
        },
      ],
    };
    this.handleLocalClick = this.handleLocalClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleLocalClicks = this.handleLocalClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  

  componentDidMount() {
    const { locals, onGetLocals, onGetCities } = this.props;
    if (locals && !locals.length) {
      onGetCities();
      onGetLocals();
    }
    this.setState({ locals });
    console.log(this.state.locals);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleLocalClicks = () => {
    this.setState({ local: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { locals } = this.props;
    if (!isEmpty(locals) && size(prevProps.locals) !== size(locals)) {
      this.setState({ locals: {}, isEdit: false });
        // this.setState({ ...this.state, locals: this.props.localsData });
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

  onClickDelete = locals => {
    this.setState({ locals: locals });
    this.setState({ deleteModal: true });
  };

  handleDeleteLocal = () => {
    const { onDeleteLocal } = this.props;
    const { locals } = this.state;
    if (locals.id !== undefined) {
      onDeleteLocal(locals, locals.id);
      this.setState({ deleteModal: false });
    }
  };

  handleLocalClick = arg => {
    const local = arg;

    this.setState({
      local: {
        id: local.id,
        name: local.name,
        description: local.description,
        citie_id: local.citie.id
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "Local | Admin";

    // const { local } = this.state
    const { SearchBar } = Search;

    const { locals } = this.props;

    const { isEdit, deleteModal } = this.state;

    const { onAddNewLocal, onUpdateLocal } = this.props;
    const local = this.state.local;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: locals.length, // replace later with size(local),
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
          onDeleteClick={this.handleDeleteLocal}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Locals" breadcrumbItem="Locals List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={locals}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={locals}
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
                                      onClick={this.handleLocalClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("Create New Local")}
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
                                        {!!isEdit ? this.props.t("Edit Local") : this.props.t("Add Local")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Formik
                                          enableReinitialize={true}
                                          initialValues={{
                                            name: (local && local.name) || "",
                                            description:
                                              (local && local.description) || ""
                                          }}
                                          validationSchema={Yup.object().shape({
                                            name: Yup.string().required(
                                              this.props.t("Please Enter Name")
                                            ),
                                            description: Yup.string().required(
                                              this.props.t("Please Enter Description")
                                            ),
                                            citie_id: Yup.string().required(
                                                this.props.t("Please Enter citie")
                                              ),
                                          })}
                                          onSubmit={values => {
                                            if (isEdit) {
                                              const updateLocal = {
                                                id: local.id,
                                                name: values.name,
                                                description: values.description,
                                                citie_id: (values.citie_id ? values.citie_id : local.citie.citie_id),
                                              };

                                              // update local
                                              onUpdateLocal(updateLocal);
                                            } else {
                                              const newLocal = {
                                                name: values["name"],
                                                description:
                                                  values["description"],
                                                  citie_id: values["citie_id"]
                                              };
                                              // save new Citie
                                              onAddNewLocal(newLocal);
                                            }
                                            this.setState({
                                              selectedCitie: null,
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
                                                      Name
                                                    </Label>
                                                    <Field
                                                      name="name"
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
                                                      name="name"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Citie
                                                    </Label>
                                                    <Field
                                                      name="citie_id"
                                                      as="select"
                                                      className={
                                                        "form-control" +
                                                        (errors.citie_id &&
                                                        touched.citie_id
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      multiple={false}
                                                    >
                                                      <option>---</option>
                                                      {
                                                        this.props.cities.map((citie) => (
                                                          <option key={citie.id} value={citie.id}>{citie.name}</option>
                                                        ))
                                                      }
                                                    </Field>
                                                    <ErrorMessage
                                                      name="citie_id"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Description
                                                    </Label>
                                                    <Field
                                                      name="description"
                                                      type="textarea"
                                                      className={
                                                        "form-control" +
                                                        (errors.description &&
                                                        touched.description
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="description"
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

LocalsList.propTypes = {
  cities: PropTypes.array,
  locals: PropTypes.array,
  className: PropTypes.any,
  onGetLocals: PropTypes.func,
  onAddNewLocal: PropTypes.func,
  onDeleteLocal: PropTypes.func,
  onUpdateLocal: PropTypes.func,
  onGetCities: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Cities, Locals }) => ({
  cities: Cities.cities,
  locals: Locals.locals
});

const mapDispatchToProps = dispatch => ({
  onGetLocals: () => dispatch(getLocals()),
  onAddNewLocal: local => dispatch(addNewLocal(local)),
  onUpdateLocal: local => dispatch(updateLocal(local)),
  onDeleteLocal: local => dispatch(deleteLocal(local)),
  onGetCities: () => dispatch(getCities()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(LocalsList)));
