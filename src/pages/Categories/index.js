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
  getCategories,
  addNewCategorie,
  updateCategorie,
  deleteCategorie,
} from "store/categories/actions";
import {
    getNatures,
  } from "store/natures/actions";

import { isEmpty, size, map } from "lodash";

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      categories: [],
      categorie: "",
      modal: false,
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, categorie) => <>#{categorie.id}</>,
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
            dataField: "nature.name",
            text: "Nature",
            sort: true,
            formatter: (cellContent, categorie) => (
                <>
                    {categorie.nature ? categorie.nature.name : 'N/A'}
                </>
            ),
        },
        {
            dataField: "parent.name",
            text: "Parent",
            sort: true,
            formatter: (cellContent, categorie) => (
                <>
                    {categorie.parent ? categorie.parent.name : 'N/A'}
                </>
            ),
        },
        {
          dataField: "menu",
          isDummyField: true,
          editable: false,
          text: "Action",
          formatter: (cellContent, categorie) => (
            <div className="d-flex gap-3">
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleCategorieClick(categorie)}
                ></i>
              </Link>
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(categorie)}
                ></i>
              </Link>
            </div>
          ),
        },
      ],
    };
    this.handleCategorieClick = this.handleCategorieClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleCategorieClicks = this.handleCategorieClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  

  componentDidMount() {
    const { categories, onGetCategories, onGetNatures } = this.props;
    if (categories && !categories.length) {
      onGetCategories();
      onGetNatures();
    }
    this.setState({ categories });
    console.log(this.state.categories);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleCategorieClicks = () => {
    this.setState({ categorie: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { categories } = this.props;
    if (!isEmpty(categories) && size(prevProps.categories) !== size(categories)) {
      this.setState({ categories: {}, isEdit: false });
        // this.setState({ ...this.state, categories: this.props.categoriesData });
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

  onClickDelete = categories => {
    this.setState({ categories: categories });
    this.setState({ deleteModal: true });
  };

  handleDeleteCategorie = () => {
    const { onDeleteCategorie } = this.props;
    const { categories } = this.state;
    if (categories.id !== undefined) {
      onDeleteCategorie(categories, categories.id);
      this.setState({ deleteModal: false });
    }
  };

  handleCategorieClick = arg => {
    const categorie = arg;

    this.setState({
      categorie: {
        id: categorie.id,
        name: categorie.name,
        description: categorie.description,
        // nature_id: categorie.nature.id
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "Categorie | Admin";

    // const { categorie } = this.state
    const { SearchBar } = Search;

    const { categories } = this.props;

    const { isEdit, deleteModal } = this.state;

    const { onAddNewCategorie, onUpdateCategorie } = this.props;
    const categorie = this.state.categorie;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: categories.length, // replace later with size(categorie),
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
          onDeleteClick={this.handleDeleteCategorie}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Categories" breadcrumbItem="Categories List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={categories}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={categories}
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
                                      onClick={this.handleCategorieClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("Create New Category")}
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
                                        {!!isEdit ? this.props.t("Edit Category") : this.props.t("Add Category")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Formik
                                          enableReinitialize={true}
                                          initialValues={{
                                            name: (categorie && categorie.name) || "",
                                            description:
                                              (categorie && categorie.description) || ""
                                          }}
                                          validationSchema={Yup.object().shape({
                                            name: Yup.string().required(
                                              this.props.t("Please Enter Name")
                                            ),
                                            description: Yup.string().required(
                                              this.props.t("Please Enter Description")
                                            ),
                                            nature_id: Yup.string().required(
                                                this.props.t("Please Enter Country")
                                              ),
                                          })}
                                          onSubmit={values => {
                                            if (isEdit) {
                                              const updateCategorie = {
                                                id: categorie.id,
                                                name: values.name,
                                                description: values.description,
                                                nature_id: values.nature_id,
                                                parent_id: values.parent_id
                                              };

                                              // update categorie
                                              onUpdateCategorie(updateCategorie);
                                            } else {
                                              const newCategorie = {
                                                name: values["name"],
                                                description:
                                                  values["description"],
                                                nature_id: values["nature_id"],
                                                parent_id: values["parent_id"]
                                              };
                                              // save new Citie
                                              onAddNewCategorie(newCategorie);
                                            }
                                            this.setState({
                                              selectedCategorie: null,
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
                                                      Nature
                                                    </Label>
                                                    <Field
                                                      name="nature_id"
                                                      as="select"
                                                      className={
                                                        "form-control" +
                                                        (errors.categorie &&
                                                        touched.categorie
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      multiple={false}
                                                    >
                                                      <option>---</option>
                                                      {
                                                        this.props.natures.map((nature) => (
                                                          <option key={nature.id} value={nature.id}>{nature.name}</option>
                                                        ))
                                                      }
                                                    </Field>
                                                  </div>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Ratache to
                                                    </Label>
                                                    <Field
                                                      name="parent_id"
                                                      as="select"
                                                      className={
                                                        "form-control" +
                                                        (errors.parent_id &&
                                                        touched.parent_id
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      multiple={false}
                                                    >
                                                      <option>---</option>
                                                      {
                                                        this.props.categories.map((categorie) => (
                                                          <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
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

CategoriesList.propTypes = {
  categories: PropTypes.array,
  natures: PropTypes.array,
  className: PropTypes.any,
  onGetCategories: PropTypes.func,
  onAddNewCategorie: PropTypes.func,
  onDeleteCategorie: PropTypes.func,
  onUpdateCategorie: PropTypes.func,
  onGetNatures: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Natures, Categories }) => ({
  natures: Natures.natures,
  categories: Categories.categories
});

const mapDispatchToProps = dispatch => ({
  onGetCategories: () => dispatch(getCategories()),
  onAddNewCategorie: categorie => dispatch(addNewCategorie(categorie)),
  onUpdateCategorie: categorie => dispatch(updateCategorie(categorie)),
  onDeleteCategorie: categorie => dispatch(deleteCategorie(categorie)),
  onGetNatures: () => dispatch(getNatures()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(CategoriesList)));
