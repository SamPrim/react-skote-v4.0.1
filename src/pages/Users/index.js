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
  getUsers,
  addNewUser,
  updateUser,
  deleteUser,
} from "store/contacts/actions";

import { isEmpty, size, map } from "lodash";
import { getGroups } from "store/actions";

class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      users: [],
      user: "",
      modal: false,
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, user) => <>#{user.id}</>,
        },
        {
          text: "Name",
          dataField: "fullname",
          sort: true,
          formatter: (cellContent, user) => (
            <>
              <h5 className="font-size-14 mb-1">
                <Link to={"/user/"+user.id} className="text-dark">
                  {user.fullname}
                </Link>
              </h5>
              <p className="text-muted mb-0">{user.groups.name}</p>
            </>
          ),
        },
        {
          dataField: "email",
          text: "Email",
          sort: true,
        },
        {
          dataField: "is_active",
          text: "Status",
          sort: true,
        },
        {
          dataField: "groups.name",
          text: "Groupe",
          sort: true,
        },
        {
          dataField: "menu",
          isDummyField: true,
          editable: false,
          text: "Action",
          formatter: (cellContent, user) => (
            <div className="d-flex gap-3">
              <Link className="text-info" to={"/user/"+user.id}>
                <i
                  className="mdi mdi-eye font-size-18"
                  id="edittooltip"
                ></i>
              </Link>
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleUserClick(user)}
                ></i>
              </Link>
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(user)}
                ></i>
              </Link>
            </div>
          ),
        },
      ],
    };
    this.handleUserClick = this.handleUserClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleUserClicks = this.handleUserClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  

  componentDidMount() {
    const { users, onGetUsers, onGetGroups } = this.props;
    if (users && !users.length) {
      onGetUsers();
      onGetGroups()
    }
    this.setState({ users });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleUserClicks = () => {
    this.setState({ user: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { users } = this.props;
    if (!isEmpty(users) && size(prevProps.users) !== size(users)) {
      this.setState({ users: {}, isEdit: false });
        // this.setState({ ...this.state, users: this.props.usersData });
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

  onClickDelete = users => {
    this.setState({ users: users });
    this.setState({ deleteModal: true });
  };

  handleDeleteUser = () => {
    const { onDeleteUser } = this.props;
    const { users } = this.state;
    if (users.id !== undefined) {
      onDeleteUser(users, users.id);
      this.setState({ deleteModal: false });
    }
  };

  handleUserClick = arg => {
    const user = arg;

    this.setState({
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        is_active: user.is_active,
        groups: user.groups.name,
        hashed_password: "Erty1234!"
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "User | Admin";

    // const { users } = this.state
    const { SearchBar } = Search;

    const { users } = this.props;
    const { groups } = this.props.groups

    const { isEdit, deleteModal } = this.state;

    const { onAddNewUser, onUpdateUser } = this.props;
    const user = this.state.user;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: users.length, // replace later with size(users),
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
          onDeleteClick={this.handleDeleteUser}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Users" breadcrumbItem="Users List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={users}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={users}
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
                                      onClick={this.handleUserClicks}
                                    >
                                      
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("Create New User")}
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
                                        {!!isEdit ? this.props.t("Edit User") : this.props.t("Add User")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Formik
                                          enableReinitialize={true}
                                          initialValues={{
                                            fullname: (user && user.fullname) || "",
                                            email:
                                              (user && user.email) || "",
                                            is_active: (user && user.is_active) || [],
                                            group_id:
                                              (user && user.groups.name) || "",
                                          }}
                                          validationSchema={Yup.object().shape({
                                            fullname: Yup.string().required(
                                              this.props.t("Please Enter Name")
                                            ),
                                            email: Yup.string().required(
                                              this.props.t("Please Enter email")
                                            ),
                                            group_id: Yup.string().required(
                                              "Please Enter Your Group"
                                            ),
                                          })}
                                          onSubmit={values => {
                                            if (isEdit) {
                                              const updateUser = {
                                                id: user.id,
                                                fullname: values.fullname,
                                                email: values.email,
                                                is_active: true,
                                                group_id: values.group_id,
                                              };

                                              // update user
                                              onUpdateUser(updateUser);
                                            } else {
                                              const newUser = {
                                                fullname: values["fullname"],
                                                email:
                                                  values["email"],
                                                is_active: true,
                                                hashed_password: "Erty1234!",
                                                group_id: values['group_id'],
                                              };
                                              // save new user
                                              onAddNewUser(newUser);
                                            }
                                            this.setState({
                                              selectedUser: null,
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
                                                      name="fullname"
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
                                                      name="fullname"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Email
                                                    </Label>
                                                    <Field
                                                      name="email"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.email &&
                                                        touched.email
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="email"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>
                                                  {/* <div className="mb-3">
                                                    <Label className="form-label">
                                                      Email
                                                    </Label>
                                                    <Field
                                                      name="email"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.email &&
                                                        touched.email
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="email"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div> */}
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Groups
                                                    </Label>
                                                    <Field
                                                      name="group_id"
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
                                                        this.props.groups.map((group) => (
                                                          <option key={group.id} value={group.id}>{group.name}</option>
                                                        ))
                                                      }
                                                    </Field>
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

ContactsList.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array,
  className: PropTypes.any,
  onGetUsers: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onUpdateUser: PropTypes.func,
  onGetGroups: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ contacts, Groups }) => ({
  users: contacts.users,
  groups: Groups.groups
});

const mapDispatchToProps = dispatch => ({
  onGetUsers: () => dispatch(getUsers()),
  onAddNewUser: user => dispatch(addNewUser(user)),
  onUpdateUser: user => dispatch(updateUser(user)),
  onDeleteUser: user => dispatch(deleteUser(user)),
  onGetGroups: () => dispatch(getGroups()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(ContactsList)));
