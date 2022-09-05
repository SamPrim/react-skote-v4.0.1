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
  getGroups,
  addNewGroup,
  updateGroup,
  deleteGroup,
} from "store/groups/actions";

import { isEmpty, size, map } from "lodash";

class GroupsList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      groups: [],
      group: "",
      modal: false,
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, group) => <>#{group.id}</>,
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
          formatter: (cellContent, group) => (
            <div className="d-flex gap-3">
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleGroupClick(group)}
                ></i>
              </Link>
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(group)}
                ></i>
              </Link>
            </div>
          ),
        },
      ],
    };
    this.handleGroupClick = this.handleGroupClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleGroupClicks = this.handleGroupClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  

  componentDidMount() {
    const { groups, onGetGroups } = this.props;
    if (groups && !groups.length) {
      onGetGroups();
    }
    this.setState({ groups });
    console.log(this.state.groups);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleGroupClicks = () => {
    this.setState({ group: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { groups } = this.props;
    if (!isEmpty(groups) && size(prevProps.groups) !== size(groups)) {
      this.setState({ groups: {}, isEdit: false });
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

  onClickDelete = groups => {
    this.setState({ groups: groups });
    this.setState({ deleteModal: true });
  };

  handleDeleteGroup = () => {
    const { onDeleteGroup } = this.props;
    const { groups } = this.state;
    if (groups.id !== undefined) {
      onDeleteGroup(groups, groups.id);
      this.setState({ deleteModal: false });
    }
  };

  handleGroupClick = arg => {
    const group = arg;

    this.setState({
      group: {
        id: group.id,
        name: group.name,
        description: group.description
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "Group | Admin";

    // const { groups } = this.state
    const { SearchBar } = Search;

    const { groups } = this.props;

    const { isEdit, deleteModal } = this.state;

    const { onAddNewGroup, onUpdateGroup } = this.props;
    const group = this.state.group;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: groups.length, // replace later with size(groups),
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
          onDeleteClick={this.handleDeleteGroup}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Groups" breadcrumbItem="Groups List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={groups}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={groups}
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
                                      onClick={this.handleGroupClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("Create New Group")}
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
                                        {!!isEdit ? this.props.t("Edit Group") : this.props.t("Add Group")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Formik
                                          enableReinitialize={true}
                                          initialValues={{
                                            name: (group && group.name) || "",
                                            description:
                                              (group && group.description) || ""
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
                                              const updateGroup = {
                                                id: group.id,
                                                name: values.name,
                                                description: values.description
                                              };

                                              // update group
                                              onUpdateGroup(updateGroup);
                                            } else {
                                              const newGroup = {
                                                name: values["name"],
                                                description:
                                                  values["description"],
                                              };
                                              // save new group
                                              onAddNewGroup(newGroup);
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
                                                        (errors.descripton &&
                                                        touched.descripton
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

GroupsList.propTypes = {
  groups: PropTypes.array,
  className: PropTypes.any,
  onGetGroups: PropTypes.func,
  onAddNewGroup: PropTypes.func,
  onDeleteGroup: PropTypes.func,
  onUpdateGroup: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Groups }) => ({
  groups: Groups.groups,
});

const mapDispatchToProps = dispatch => ({
  onGetGroups: () => dispatch(getGroups()),
  onAddNewGroup: group => dispatch(addNewGroup(group)),
  onUpdateGroup: group => dispatch(updateGroup(group)),
  onDeleteGroup: group => dispatch(deleteGroup(group)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(GroupsList)));
