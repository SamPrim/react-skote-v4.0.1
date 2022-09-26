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
  getLocations,
  addNewLocation,
  updateLocation,
  deleteLocation,
} from "store/location/actions";
import {
    getCities,
  } from "store/cities/actions";

import { isEmpty, size, map } from "lodash";
import moment from "moment";

class LocationsList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      locations: [],
      location: "",
      modal: false,
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, location) => <>#{location.id}</>,
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
          dataField: "menu",
          isDummyField: true,
          editable: false,
          text: "Action",
          formatter: (cellContent, location) => (
            <div className="d-flex gap-3">
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleLocationClick(location)}
                ></i>
              </Link>
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(location)}
                ></i>
              </Link>
            </div>
          ),
        },
      ],
    };
    this.handleLocationClick = this.handleLocationClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleLocationClicks = this.handleLocationClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  

  componentDidMount() {
    const { locations, onGetLocations, onGetCities } = this.props;
    if (locations && !locations.length) {
      onGetCities();
      onGetLocations();
    }
    this.setState({ locations });
    console.log(this.state.locations);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleLocationClicks = () => {
    this.setState({ location: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { locations } = this.props;
    if (!isEmpty(locations) && size(prevProps.locations) !== size(locations)) {
      this.setState({ locations: {}, isEdit: false });
        // this.setState({ ...this.state, locations: this.props.locationsData });
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

  onClickDelete = locations => {
    this.setState({ locations: locations });
    this.setState({ deleteModal: true });
  };

  handleDeleteLocation = () => {
    const { onDeleteLocation } = this.props;
    const { locations } = this.state;
    if (locations.id !== undefined) {
      onDeleteLocation(locations, locations.id);
      this.setState({ deleteModal: false });
    }
  };

  handleLocationClick = arg => {
    const location = arg;

    this.setState({
      location: {
        id: location.id,
        name: location.name,
        description: location.description
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "Location | Admin";

    // const { location } = this.state
    const { SearchBar } = Search;

    const { locations } = this.props;

    const { isEdit, deleteModal } = this.state;

    const { onAddNewLocation, onUpdateLocation } = this.props;
    const location = this.state.location;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: locations.length, // replace later with size(location),
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
          onDeleteClick={this.handleDeleteLocation}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Locations" breadcrumbItem="Locations List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={locations}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={locations}
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
                                      onClick={this.handleLocationClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("Create New Location")}
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
                                        {!!isEdit ? this.props.t("Edit Location") : this.props.t("Add Location")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Formik
                                          enableReinitialize={true}
                                          initialValues={{
                                            name: (location && location.name) || "",
                                            description:
                                              (location && location.description) || ""
                                          }}
                                          validationSchema={Yup.object().shape({
                                            name: Yup.string().required(
                                              this.props.t("Please Enter Name")
                                            ),
                                            description: Yup.string().required(
                                              this.props.t("Please Enter Description")
                                            ),
                                          })}
                                          onSubmit={values => {
                                            if (isEdit) {
                                              const updateLocation = {
                                                id: location.id,
                                                name: values.name,
                                                description: values.description,
                                              };

                                              // update location
                                              onUpdateLocation(updateLocation);
                                            } else {
                                              const newLocation = {
                                                name: values["name"],
                                                description:
                                                  values["description"],
                                              };
                                              // save new Citie
                                              onAddNewLocation(newLocation);
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

LocationsList.propTypes = {
  cities: PropTypes.array,
  locations: PropTypes.array,
  className: PropTypes.any,
  onGetLocations: PropTypes.func,
  onAddNewLocation: PropTypes.func,
  onDeleteLocation: PropTypes.func,
  onUpdateLocation: PropTypes.func,
  onGetCities: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Cities, Locations }) => ({
  cities: Cities.cities,
  locations: Locations.locations
});

const mapDispatchToProps = dispatch => ({
  onGetLocations: () => dispatch(getLocations()),
  onAddNewLocation: location => dispatch(addNewLocation(location)),
  onUpdateLocation: location => dispatch(updateLocation(location)),
  onDeleteLocation: location => dispatch(deleteLocation(location)),
  onGetCities: () => dispatch(getCities()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(LocationsList)));
