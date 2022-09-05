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
  getCities,
  addNewCitie,
  updateCitie,
  deleteCitie,
} from "store/cities/actions";
import {
    getCountries,
  } from "store/countries/actions";

import { isEmpty, size, map } from "lodash";

class CitiesList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      cities: [],
      citie: "",
      modal: false,
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, citie) => <>#{citie.id}</>,
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
            dataField: "countrie.name",
            text: "Countrie",
            sort: true,
        },
        {
          dataField: "menu",
          isDummyField: true,
          editable: false,
          text: "Action",
          formatter: (cellContent, citie) => (
            <div className="d-flex gap-3">
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleCitieClick(citie)}
                ></i>
              </Link>
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(citie)}
                ></i>
              </Link>
            </div>
          ),
        },
      ],
    };
    this.handleCitieClick = this.handleCitieClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleCitieClicks = this.handleCitieClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  

  componentDidMount() {
    const { cities, onGetCities, onGetCountries } = this.props;
    if (cities && !cities.length) {
      onGetCities();
      onGetCountries();
    }
    this.setState({ cities });
    console.log(this.state.cities);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleCitieClicks = () => {
    this.setState({ citie: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { cities } = this.props;
    if (!isEmpty(cities) && size(prevProps.cities) !== size(cities)) {
      this.setState({ cities: {}, isEdit: false });
        // this.setState({ ...this.state, cities: this.props.citiesData });
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

  onClickDelete = cities => {
    this.setState({ cities: cities });
    this.setState({ deleteModal: true });
  };

  handleDeleteCitie = () => {
    const { onDeleteCitie } = this.props;
    const { cities } = this.state;
    if (cities.id !== undefined) {
      onDeleteCitie(cities, cities.id);
      this.setState({ deleteModal: false });
    }
  };

  handleCitieClick = arg => {
    const citie = arg;

    this.setState({
      citie: {
        id: citie.id,
        name: citie.name,
        description: citie.description,
        countrie: citie.countrie.name
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "Citie | Admin";

    // const { citie } = this.state
    const { SearchBar } = Search;

    const { cities } = this.props;

    const { isEdit, deleteModal } = this.state;

    const { onAddNewCitie, onUpdateCitie } = this.props;
    const citie = this.state.citie;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: cities.length, // replace later with size(citie),
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
          onDeleteClick={this.handleDeleteCitie}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Cities" breadcrumbItem="Cities List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={cities}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={cities}
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
                                      onClick={this.handleCitieClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("Create New Citie")}
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
                                        {!!isEdit ? this.props.t("Edit Citie") : this.props.t("Add Citie")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Formik
                                          enableReinitialize={true}
                                          initialValues={{
                                            name: (citie && citie.name) || "",
                                            description:
                                              (citie && citie.description) || ""
                                          }}
                                          validationSchema={Yup.object().shape({
                                            name: Yup.string().required(
                                              this.props.t("Please Enter Name")
                                            ),
                                            description: Yup.string().required(
                                              this.props.t("Please Enter Description")
                                            ),
                                            countrie_id: Yup.string().required(
                                                this.props.t("Please Enter Countrie")
                                              ),
                                          })}
                                          onSubmit={values => {
                                            if (isEdit) {
                                              const updateCitie = {
                                                id: citie.id,
                                                name: values.name,
                                                description: values.description,
                                                countrie_id: values.countrie_id
                                              };

                                              // update citie
                                              onUpdateCitie(updateCitie);
                                            } else {
                                              const newCitie = {
                                                name: values["name"],
                                                description:
                                                  values["description"],
                                                countrie_id: values["countrie_id"]
                                              };
                                              // save new Citie
                                              onAddNewCitie(newCitie);
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
                                                      Countrie
                                                    </Label>
                                                    <Field
                                                      name="countrie_id"
                                                      as="select"
                                                      className={
                                                        "form-control" +
                                                        (errors.tags &&
                                                        touched.tags
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      multiple={false}
                                                    >
                                                      <option>---</option>
                                                      {
                                                        this.props.countries.map((countrie) => (
                                                          <option key={countrie.id} value={countrie.id}>{countrie.name}</option>
                                                        ))
                                                      }
                                                    </Field>
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

CitiesList.propTypes = {
  cities: PropTypes.array,
  countries: PropTypes.array,
  className: PropTypes.any,
  onGetCities: PropTypes.func,
  onAddNewCitie: PropTypes.func,
  onDeleteCitie: PropTypes.func,
  onUpdateCitie: PropTypes.func,
  onGetCountries: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Cities, Countries }) => ({
  cities: Cities.cities,
  countries: Countries.countries
});

const mapDispatchToProps = dispatch => ({
  onGetCities: () => dispatch(getCities()),
  onAddNewCitie: citie => dispatch(addNewCitie(citie)),
  onUpdateCitie: citie => dispatch(updateCitie(citie)),
  onDeleteCitie: citie => dispatch(deleteCitie(citie)),
  onGetCountries: () => dispatch(getCountries()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(CitiesList)));
