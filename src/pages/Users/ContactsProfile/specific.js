import React, {Component} from 'react';
import MetaTags from 'react-meta-tags';  // Added Meta Tag npm Package
import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
    Table,
  } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
    getUsers,
    addNewUser,
    updateUser,
    deleteUser,
    getUserProfile,
} from "store/contacts/actions";
import {
  getTransferts,
} from "store/transfert/actions";
import profile1 from "assets/images/profile-img.png";
import avatar from "assets/images/users/avatar-6.jpg";
// import charts
import ApexRevenue from "../ApexRevenue";
//Import mini card widgets
import MiniCards from "./mini-card";
import images from "assets/images";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
//i18n
import { withTranslation } from "react-i18next";
import projectColumns from "./projectColumns";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            error: false,
            id:  this.props.match.params,
            miniCards: [
                {
                  title: "Completed Projects",
                  iconClass: "bx-check-circle",
                  text: "125",
                },
                { title: "Pending Projects", iconClass: "bx-hourglass", text: "12" },
                { title: "Total Revenue", iconClass: "bx-package", text: "$36,524" },
              ],
        };
    };
    componentDidMount() {
        const { onGetUserData, onGetTransferts } = this.props;
        onGetUserData(this.state.id.id);
        onGetTransferts({"user_id": this.state.id.id})
    };
    //get Data
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ ...this.state, user: this.props.UserProfile, error: this.props.error });
        }
    };

    render() {
        const { id } = this.state.id;
        const error = this.state.error
        const user = this.state.user

        function UserNotFound(){
            return(
                <>
                    <h5>User not found</h5>
                </>
            )
        }

        function UserExist(){
            return(
                <>
                    <h5>User : {user.fullname}</h5>
                    <p>{user.email}</p>
                    <p>{user.is_active ? "Actif": "Non actif"}</p>
                    <p>{user.groups ? user.groups.name:""}</p>
                </>
            )
        }
            
        
        console.log(error)
        return (
            <React.Fragment>
              <div className="page-content">
                <Container fluid>
                  {/* Render Breadcrumbs */}
                  <Breadcrumbs title="Contacts" breadcrumbItem="Profile" />
      
                  <Row>
                    <Col xl="4">
                      <Card className="overflow-hidden">
                        <div className="bg-primary bg-soft">
                          <Row>
                            <Col xs="7">
                              <div className="text-primary p-3">
                                <h5 className="text-primary">{this.props.t("Welcome Back !")}</h5>
                                <p>{this.props.t("It will seem like simplified")}</p>
                              </div>
                            </Col>
                            <Col xs="5" className="align-self-end">
                              <img src={profile1} alt="" className="img-fluid" />
                            </Col>
                          </Row>
                        </div>
                        <CardBody className="pt-0">
                          <Row>
                            <Col sm="4">
                              <div className="avatar-md profile-user-wid mb-4">
                                <img
                                  src={avatar}
                                  alt=""
                                  className="img-thumbnail rounded-circle"
                                />
                              </div>
                              <h5 className="font-size-15 text-truncate">
                                {user.fullname}
                              </h5>
                              <p className="text-muted mb-0 text-truncate">
                                Dev 
                              </p>
                            </Col>
      
                            <Col sm={8}>
                              <div className="pt-4">
                                <Row>
                                  <Col xs="6">
                                    <h5 className="font-size-15">
                                      12
                                    </h5>
                                    <p className="text-muted mb-0">Projects</p>
                                  </Col>
                                  <Col xs="6">
                                    <h5 className="font-size-15">
                                      $50
                                    </h5>
                                    <p className="text-muted mb-0">Revenue</p>
                                  </Col>
                                </Row>
                                <div className="mt-4">
                                  <Link to="" className="btn btn-primary btn-sm">
                                    View Profile{" "}
                                    <i className="mdi mdi-arrow-right ms-1" />
                                  </Link>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
      
                      <Card>
                        <CardBody>
                          <CardTitle className="mb-4 h4">
                          {this.props.t("Personal Information")}
                          </CardTitle>
      
                          <p className="text-muted mb-4">
                            {user.id}
                          </p>
                          <div className="table-responsive">
                            <Table className="table-nowrap mb-0">
                              <tbody>
                                <tr>
                                  <th scope="row">{this.props.t("Full Name")} :</th>
                                  <td>{user.fullname}</td>
                                </tr>
                                <tr>
                                  <th scope="row">{this.props.t("Mobile")} :</th>
                                  <td>{user.is_active}</td>
                                </tr>
                                <tr>
                                  <th scope="row">{this.props.t("E-mail")} :</th>
                                  <td>{user.email}</td>
                                </tr>
                                <tr>
                                  <th scope="row">{this.props.t("Location")} :</th>
                                  <td>{user.is_active}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
      
                    <Col xl="8">
                      <Row>
                        {this.state.miniCards.map((card, key) => (
                          <MiniCards
                            title={card.title}
                            text={card.text}
                            iconClass={card.iconClass}
                            key={"_card_" + key}
                          />
                        ))}
                      </Row>
                      <Card>
                        <CardBody>
                          <CardTitle className="mb-4 h4">Revenue</CardTitle>
                          <div id="revenue-chart" className="apex-charts">
                            <ApexRevenue />
                          </div>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>
                          <CardTitle className="mb-4 h4">{this.props.t("Transfer")}</CardTitle>
                          <ToolkitProvider
                            keyField="id"
                            data={this.props.transferts || []}
                            columns={projectColumns()}
                            bootstrap4
                          >
                            {toolkitProps => (
                              <React.Fragment>
                                <Row>
                                  <Col xl="12">
                                    <div className="table-responsive">
                                      <BootstrapTable
                                        responsive
                                        remote
                                        bordered={false}
                                        striped={false}
                                        classes={
                                          "table table-nowrap table-hover mb-0"
                                        }
                                        headerWrapperClasses={"tbody-light"}
                                        {...toolkitProps.baseProps}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </React.Fragment>
                            )}
                          </ToolkitProvider>
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

User.propTypes = {
  transferts: PropTypes.array,
  getUserProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
  resetProfileFlag: PropTypes.func,
  onGetTransferts: PropTypes.func,
  t: PropTypes.any,
  };
  
const mapStateToProps = ({ contacts, Transferts }) => ({
  UserProfile: contacts.userProfile,
  error : contacts.error,
  transferts: Transferts.transferts,
});

const mapDispatchToProps = dispatch => ({
  onGetUserData: id => dispatch(getUserProfile(id)),
  onGetTransferts: user => dispatch(getTransferts(user)),
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withTranslation()(User)));