import React, { Component } from "react";
import {
    Container,
} from 'reactstrap'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

class Products extends Component {
    render() {
        document.title = "Product | Admin"
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Products" breadcrumbItem="Add Product" />
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default Products;