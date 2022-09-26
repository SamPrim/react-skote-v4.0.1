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
  InputGroup,
  Input,
  FormGroup,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, {
  Search
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

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
  getInventory
} from "store/inventory/actions";

import { isEmpty, size, map } from "lodash";

class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      inventorys: [],
      inventory: "",
      modal: false,
      dropdowDownload:false,
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, inventory) => <>#{inventory.id}</>,
        },
        {
          text: "MATERIEL",
          sort: true,
          formatter: (cellContent, inventory) => <>{inventory.product.name}</>,
        },
        {
            text: "TYPE",
            sort: true,
            formatter: (cellContent, inventory) => (
                <>{inventory.categorie ? inventory.categorie.name:"N/A"}</>
            ),
        },
        {
            text: "Lieu",
            sort: true,
            formatter: (cellContent, inventory) => (
                <>magasin</>
            ),
        },
        {
            text: "EMPLACEMENT",
            sort: true,
            formatter: (cellContent, inventory) => (
                <>{inventory.lieu ? inventory.lieu.name:"N/A"}</>
            ),
        },
        {
            text: "CONSOMMABLES",
            sort: true,
            formatter: (cellContent, inventory) => (
                <div className={inventory.stock < inventory.product.stock_limit ?
                     "d-flex justify-content-between color-box bg-danger bg-soft p-1":"d-flex justify-content-between color-box bg-success bg-soft p-1"}>
                    <span className="" >
                        Total: {inventory.count},
                    </span>
                    <span>
                        En stock: {inventory.stock},
                    </span>
                    <span className="align-items-end">
                        Utilisé(s): {inventory.using}
                    </span>
                </div>
            ),
        },
      ],
    };
    this.toggle = this.toggle.bind(this);
  }
  

  componentDidMount() {
    const { inventorys, onGetInventory } = this.props;
    if (inventorys && !inventorys.length) {
      onGetInventory();
    }
    this.setState({ inventorys });
    console.log(this.state.inventorys);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { inventorys } = this.props;
    if (!isEmpty(inventorys) && size(prevProps.inventorys) !== size(inventorys)) {
      this.setState({ inventorys: {}, isEdit: false });
        // this.setState({ ...this.state, inventorys: this.props.inventorysData });
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



  render() {
    //meta title

    document.title = "Inventory | Admin";

    // const { inventory } = this.state
    const { SearchBar } = Search;

    const { inventorys } = this.props;

    const inventory = this.state.inventory;

    const pageOptions = {
      sizePerPage: 10,
      totalSize: inventorys.length, // replace later with size(inventory),
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
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Inventory" breadcrumbItem="Inventory List" />
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <Row >

                            <Col lg={8} sm={12} className="mb-2">
                                <Formik>
                                    <Form className="row gy-2 gx-3 align-items-center">
                                        <div className="col-sm-auto">
                                            <Input type="text" className="form-control" id="autoSizingInput" placeholder="Jane Doe" />
                                        </div>
                                        <div className="col-sm-auto">
                                            <label className="visually-hidden" htmlFor="autoSizingSelect">Preference</label>
                                            <select defaultValue="0" className="form-select">
                                            <option value="0">Choose...</option>
                                            <option value="1">Electronique</option>
                                            <option value="2">Chargeur de batterie</option>
                                            <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-auto">
                                            <InputGroup>
                                                <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="dd M,yyyy"
                                                    options={{
                                                    mode: "range",
                                                    dateFormat: "Y-m-d"
                                                    }}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className="col-sm-auto">
                                            <button type="submit" className="btn btn-dark w-md">{this.props.t("Search")}</button>
                                        </div>
                                    </Form> 
                                </Formik>
                            </Col>
                            <Col lg={4} sm={12} 
                                    className="d-flex justify-content-end">
                                <Dropdown
                                    isOpen={this.state.dropdowDownload}
                                    toggle={() =>
                                    this.setState({
                                        dropdowDownload: !this.state.dropdowDownload,
                                    })
                                    }
                                >
                                    <DropdownToggle
                                        tag="button"
                                        className="btn btn-dark"
                                    >
                                        Download <i className="mdi mdi-chevron-down"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>CSV</DropdownItem>
                                        <DropdownItem>PDF</DropdownItem>
                                        <DropdownItem>XLS</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>{' '}
                            </Col>
                            </Row>
                        </CardBody>    
                    </Card>
                </Col>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={inventorys}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={inventorys}
                          search
                        >
                          {toolkitprops => (
                            <React.Fragment>
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

InventoryList.propTypes = {
  inventory: PropTypes.array,
  className: PropTypes.any,
  onGetInventory: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Inventory }) => ({
  inventorys: Inventory.inventory,
});

const mapDispatchToProps = dispatch => ({
  onGetInventory: () => dispatch(getInventory())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(InventoryList)));
