import React, {Component} from 'react';
import MetaTags from 'react-meta-tags';  // Added Meta Tag npm Package
import { Container } from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    getUsers,
    addNewUser,
    updateUser,
    deleteUser,
    getUserProfile,
  } from "store/contacts/actions";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            error: false,
            id:  this.props.match.params
        };
    };
    componentDidMount() {
        const { onGetUserData } = this.props;
        onGetUserData(this.state.id.id);
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
            <>
                <div className="page-content">
                    <MetaTags>
                    <title>User | Admin</title>
                    </MetaTags>
                    <Container fluid={true}>
                        <Breadcrumbs title="User Info" breadcrumbItem="User Info" />
                        
                            <h5>{ 
                            (
                                error ? <UserNotFound/>: 
                                    <UserExist/>
                            )} </h5>

                    </Container>
                </div>
            </>
        );
    }
}

User.propTypes = {
    getUserProfile: PropTypes.func,
    error: PropTypes.any,
    success: PropTypes.any,
    resetProfileFlag: PropTypes.func,
  };
  
const mapStateToProps = ({ contacts }) => ({
    UserProfile: contacts.userProfile,
    error : contacts.error
});

const mapDispatchToProps = dispatch => ({
    onGetUserData: id => dispatch(getUserProfile(id)),
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(User));