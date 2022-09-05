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
  getCountries,
  addNewCountrie,
  updateCountrie,
  deleteCountrie,
} from "store/countries/actions";

import { isEmpty, size, map } from "lodash";

class CountriesList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      countries: [],
      countrie: "",
      modal: false,
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, countrie) => <>#{countrie.id}</>,
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
          formatter: (cellContent, countrie) => (
            <div className="d-flex gap-3">
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleCountrieClick(countrie)}
                ></i>
              </Link>
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(countrie)}
                ></i>
              </Link>
            </div>
          ),
        },
      ],
    };
    this.handleCountrieClick = this.handleCountrieClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleCountrieClicks = this.handleCountrieClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  

  componentDidMount() {
    const { countries, onGetCountries } = this.props;
    if (countries && !countries.length) {
      onGetCountries();
    }
    this.setState({ countries });
    console.log(this.state.countries);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleCountrieClicks = () => {
    this.setState({ countrie: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { countries } = this.props;
    if (!isEmpty(countries) && size(prevProps.countries) !== size(countries)) {
      this.setState({ countries: {}, isEdit: false });
        // this.setState({ ...this.state, countries: this.props.countriesData });
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

  onClickDelete = countries => {
    this.setState({ countries: countries });
    this.setState({ deleteModal: true });
  };

  handleDeleteCountrie = () => {
    const { onDeleteCountrie } = this.props;
    const { countries } = this.state;
    if (countries.id !== undefined) {
      onDeleteCountrie(countries, countries.id);
      this.setState({ deleteModal: false });
    }
  };

  handleCountrieClick = arg => {
    const countrie = arg;

    this.setState({
      countrie: {
        id: countrie.id,
        name: countrie.name,
        description: countrie.description
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "Countrie | Admin";

    // const { countrie } = this.state
    const { SearchBar } = Search;

    const { countries } = this.props;

    const { isEdit, deleteModal } = this.state;

    const { onAddNewCountrie, onUpdateCountrie } = this.props;
    const countrie = this.state.countrie;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: countries.length, // replace later with size(countrie),
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
          onDeleteClick={this.handleDeleteCountrie}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Countries" breadcrumbItem="Countries List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={countries}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={countries}
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
                                      onClick={this.handleCountrieClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("Create New Countrie")}
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
                                        {!!isEdit ? this.props.t("Edit Countrie") : this.props.t("Add Countrie")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Formik
                                          enableReinitialize={true}
                                          initialValues={{
                                            name: (countrie && countrie.name) || "",
                                            description:
                                              (countrie && countrie.description) || ""
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
                                              const updateCountrie = {
                                                id: countrie.id,
                                                name: values.name,
                                                description: values.description
                                              };

                                              // update countrie
                                              onUpdateCountrie(updateCountrie);
                                            } else {
                                              const newCountrie = {
                                                name: values["name"],
                                                description:
                                                  values["description"],
                                              };
                                              // save new Countrie
                                              onAddNewCountrie(newCountrie);
                                            }
                                            this.setState({
                                              selectedCountrie: null,
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

CountriesList.propTypes = {
  countries: PropTypes.array,
  className: PropTypes.any,
  onGetCountries: PropTypes.func,
  onAddNewCountrie: PropTypes.func,
  onDeleteCountrie: PropTypes.func,
  onUpdateCountrie: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Countries }) => ({
  countries: Countries.countries,
});

const mapDispatchToProps = dispatch => ({
  onGetCountries: () => dispatch(getCountries()),
  onAddNewCountrie: countrie => dispatch(addNewCountrie(countrie)),
  onUpdateCountrie: countrie => dispatch(updateCountrie(countrie)),
  onDeleteCountrie: countrie => dispatch(deleteCountrie(countrie)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(CountriesList)));
