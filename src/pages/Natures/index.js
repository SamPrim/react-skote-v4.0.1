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
  getNatures,
  addNewNature,
  updateNature,
  deleteNature,
} from "store/natures/actions";

import { isEmpty, size, map } from "lodash";

class NaturesList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      natures: [],
      nature: "",
      modal: false,
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, nature) => <>#{nature.id}</>,
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
          formatter: (cellContent, nature) => (
            <div className="d-flex gap-3">
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleNatureClick(nature)}
                ></i>
              </Link>
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(nature)}
                ></i>
              </Link>
            </div>
          ),
        },
      ],
    };
    this.handleNatureClick = this.handleNatureClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleNatureClicks = this.handleNatureClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  

  componentDidMount() {
    const { natures, onGetNatures } = this.props;
    if (natures && !natures.length) {
      onGetNatures();
    }
    this.setState({ natures });
    console.log(this.state.natures);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleNatureClicks = () => {
    this.setState({ nature: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { natures } = this.props;
    if (!isEmpty(natures) && size(prevProps.natures) !== size(natures)) {
      this.setState({ natures: {}, isEdit: false });
        // this.setState({ ...this.state, groups: this.props.groupsData });
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

  onClickDelete = natures => {
    this.setState({ natures: natures });
    this.setState({ deleteModal: true });
  };

  handleDeleteNature = () => {
    const { onDeleteNature } = this.props;
    const { natures } = this.state;
    if (natures.id !== undefined) {
      onDeleteNature(natures, natures.id);
      this.setState({ deleteModal: false });
    }
  };

  handleNatureClick = arg => {
    const nature = arg;

    this.setState({
      nature: {
        id: nature.id,
        name: nature.name,
        description: nature.description
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "Nature | Admin";

    // const { natures } = this.state
    const { SearchBar } = Search;

    const { natures } = this.props;

    const { isEdit, deleteModal } = this.state;

    const { onAddNewNature, onUpdateNature } = this.props;
    const nature = this.state.nature;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: natures.length, // replace later with size(natures),
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
          onDeleteClick={this.handleDeleteNature}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Natures" breadcrumbItem="Natures List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={natures}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={natures}
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
                                      onClick={this.handleNatureClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("Create New Type")}
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
                                        {!!isEdit ? this.props.t("Edit Type") : this.props.t("Add Type")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Formik
                                          enableReinitialize={true}
                                          initialValues={{
                                            name: (nature && nature.name) || "",
                                            description:
                                              (nature && nature.description) || ""
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
                                              const updateNature = {
                                                id: nature.id,
                                                name: values.name,
                                                description: values.description
                                              };

                                              // update nature
                                              onUpdateNature(updateNature);
                                            } else {
                                              const newNature = {
                                                name: values["name"],
                                                description:
                                                  values["description"],
                                              };
                                              // save new group
                                              onAddNewNature(newNature);
                                            }
                                            this.setState({
                                              selectedNature: null,
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

NaturesList.propTypes = {
  natures: PropTypes.array,
  className: PropTypes.any,
  onGetNatures: PropTypes.func,
  onAddNewNature: PropTypes.func,
  onDeleteNature: PropTypes.func,
  onUpdateNature: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Natures }) => ({
  natures: Natures.natures,
});

const mapDispatchToProps = dispatch => ({
  onGetNatures: () => dispatch(getNatures()),
  onAddNewNature: nature => dispatch(addNewNature(nature)),
  onUpdateNature: nature => dispatch(updateNature(nature)),
  onDeleteNature: nature => dispatch(deleteNature(nature)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(NaturesList)));
