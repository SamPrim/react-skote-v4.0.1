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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
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
import FormUpload from "./ui/Dropzone"
//i18n
import { withTranslation } from "react-i18next";

import {
  getProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "store/products/actions";
import {
    getCategories,
} from "store/categories/actions";
import {
  getLocals,
} from "store/local/actions";
import {
  getDeleverys,
} from "store/delevery/actions";

import { isEmpty, size, map } from "lodash";
import Products from "store/products/reducer";
import UiLightbox from "./ui/LightBox"


class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this)
    this.node = React.createRef();
    this.onClickLightBox = this.onClickLightBox.bind(this)
    this.onMovePrevRequest = this.onMovePrevRequest.bind(this)
    this.onMoveNextRequest = this.onMoveNextRequest.bind(this)
    this.onCloseRequest = this.onCloseRequest.bind(this)
    this.state = {
      products: [],
      product: "",
      images: [],
      isGallery: false,
      photoIndex: 0,
      modal: false,
      modal_center: false,
      name: "",
      id: "",
      activeTab: "1",
      searchText:  this.props.location.search.split("=")[1],
      deleteModal: false,
      contactListColumns: [
        {
          text: "#",
          dataField: "id",
          sort: true,
          formatter: (cellContent, product) => <>#{product.id}</>,
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
          dataField: "stock_physic",
          text: "En Stock",
          sort: true,
        },
        {
          dataField: "stock_limit",
          text: "Stock Limite",
          sort: true,
        },
        {
          dataField: "livraison.numero_bordereau",
          text: "Delivery Attach",
          sort: true,
        },
        {
            dataField: "categorie.name",
            text: "Categorie",
            sort: true,
            formatter: (cellContent, product) => (
                <>
                    {product.categorie ? product.categorie.name : 'N/A'}
                </>
            ),
        },
        {
            dataField: "parent.name",
            text: "Parent",
            sort: true,
            formatter: (cellContent, product) => (
                <>
                    {product.parent ? product.parent.name : 'N/A'}
                </>
            ),
        },
        {
          dataField: "manager.fullname",
          text: "Manager",
          sort: true,
      },
        {
          dataField: "menu",
          isDummyField: true,
          editable: false,
          text: "Action",
          formatter: (cellContent, product) => (
            <div className="d-flex gap-3">
              <Link className="text-info" to="#">
                <i
                  className="mdi mdi-file-plus font-size-18"
                  id="edittooltip"
                  onClick={() => this.tog_center(product.id)}
                ></i>
              </Link>
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleProductClick(product)}
                ></i>
              </Link>
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(product)}
                ></i>
              </Link>
              <i
                className="mdi mdi-file-eye font-size-18"
                id="deletetooltip"
                onClick={() => this.onClickLightBox(product.document ? product.document.split(";"):null, 0)}
              ></i>
            </div>
          ),
        },
      ],
    };
    this.handleProductClick = this.handleProductClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onClickLightBox = this.onClickLightBox.bind(this);
    this.tog_center = this.tog_center.bind(this)
    this.handleProductClicks = this.handleProductClicks.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  closeModal(){
    this.setState({ modal_center: false })
  }
  
  removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  tog_center(id) {
    this.setState(prevState => ({
      modal_center: !prevState.modal_center,
    }))
    this.setState({ 
      id: id })
    this.removeBodyCss()
  }

  onClickLightBox(images, id){
    this.setState({ images: images })
    this.setState({ isGallery: true, photoIndex: id })
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onCloseRequest(){this.setState({ isGallery: false })}

  onMovePrevRequest(index){
    this.setState({
      photoIndex:
        (index + this.state.images.length - 1) % this.state.images.length,
    })
  }

  onMoveNextRequest(index){
    this.setState({
      photoIndex: (index + 1) % this.state.images.length,
    })
  }

  componentDidMount() {
    const { products, onGetProducts, onGetCategories, onGetLocals, onGetDeleverys } = this.props;
    if (products && !products.length) {
      onGetProducts();
      onGetCategories();
      onGetLocals();
      onGetDeleverys();
    }
    this.setState({ products });
    console.log(this.state.products);

    if (localStorage.getItem("authUser")) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        this.setState({name: obj.id});
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleProductClicks = () => {
    this.setState({ product: "", isEdit: false });
    this.toggle();
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { products } = this.props;
    if (!isEmpty(products) && size(prevProps.products) !== size(products)) {
      this.setState({ products: {}, isEdit: false });
        // this.setState({ ...this.state, products: this.props.productsData });
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

  onClickDelete = products => {
    this.setState({ products: products });
    this.setState({ deleteModal: true });
  };

  handleDeleteProduct = () => {
    const { onDeleteProduct } = this.props;
    const { products } = this.state;
    if (products.id !== undefined) {
      onDeleteProduct(products, products.id);
      this.setState({ deleteModal: false });
    }
  };

  handleProductClick = arg => {
    const product = arg;

    this.setState({
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        stock_physic: product.stock_physic,
        stock_limit: product.stock_limit,
        stock_desire: product.stock_desire,
        parent_id: product.parent ? product.parent.id : 0
      },
      isEdit: true,
    });

    this.toggle();
  };

  render() {
    //meta title

    document.title = "product | Admin";

    // const { product } = this.state
    const { SearchBar } = Search;

    const { products } = this.props;

    const { isEdit, deleteModal } = this.state;

    const { onAddNewProduct, onUpdateProduct } = this.props;
    const product = this.state.product;
    const pageOptions = {
      sizePerPage: 10,
      totalSize: products.length, // replace later with size(product),
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
          onDeleteClick={this.handleDeleteProduct}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />

        <UiLightbox 
          images={this.state.images} 
          isGallery={this.state.isGallery} 
          photoIndex={this.state.photoIndex}
          onMovePrevRequest={this.onMovePrevRequest}
          onCloseRequest={this.onCloseRequest}
          onMoveNextRequest={this.onMoveNextRequest}
        />

        <Modal
          isOpen={this.state.modal_center}
          toggle={this.tog_center}
          centered={true}
        >

          <div className="modal-header">
            <h5 className="modal-title mt-0">{this.props.t("Add document")}</h5>
            <button
              type="button"
              onClick={() =>
                this.setState({ modal_center: false })
              }
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
              <FormUpload closeModal = {this.closeModal} id = {this.state.id} />
          </div>
        </Modal>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Products" breadcrumbItem="Products List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={this.state.contactListColumns}
                      data={products}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={this.state.contactListColumns}
                          data={products}
                          search={ {
                            defaultSearch: this.state.searchText ? this.state.searchText : ""
                          } }
                          
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
                                      onClick={this.handleProductClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      {this.props.t("Create New Product")}
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
                                        {!!isEdit ? this.props.t("Edit Product") : this.props.t("Add Product")}
                                      </ModalHeader>
                                      <ModalBody>
                                        
                                      <>
                                          <Nav tabs>
                                            <NavItem>
                                              <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                  active: this.state.activeTab === "1",
                                                })}
                                                onClick={() => {
                                                  this.toggleTab("1");
                                                }}
                                              >
                                                Nouveau materiel
                                              </NavLink>
                                            </NavItem>
                                            <NavItem>
                                              <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                  active: this.state.activeTab === "2",
                                                })}
                                                onClick={() => {
                                                  this.toggleTab("2");
                                                }}
                                              >
                                                Materiel existant
                                              </NavLink>
                                            </NavItem>
                                          </Nav>
                      
                                          <TabContent
                                            activeTab={this.state.activeTab}
                                            className="p-3 text-muted"
                                          >
                                            <TabPane tabId="1">
                                              <Formik
                                                enableReinitialize={true}
                                                initialValues={{
                                                  name: (product && product.name) || "",
                                                  description:
                                                    (product && product.description) || "",
                                                  stock_physic: (product && product.stock_physic) || "",
                                                  stock_limit: (product && product.stock_limit) || "",
                                                  stock_desire: (product && product.stock_desire) || "",
                                                  parent_id: (product && product.parent ? product.parent.id:0) || ""
                                                }}
                                                validationSchema={Yup.object().shape({
                                                  name: Yup.string().required(
                                                    this.props.t("Please Enter Name")
                                                  ),
                                                  description: Yup.string().required(
                                                    this.props.t("Please Enter Description")
                                                  ),
                                                  categorie_id: Yup.string().required(
                                                      this.props.t("Please Enter Country")
                                                    ),
                                                })}
                                                onSubmit={values => {
                                                  if (isEdit) {
                                                    const updateProduct = {
                                                      id: product.id,
                                                      name: values.name,
                                                      description: values.description,
                                                      livraison_id: values.livraison_id,
                                                      categorie_id: values.categorie_id,
                                                      stock_desire: values.stock_desire,
                                                      stock_limit: values.stock_limit,
                                                      stock_physic: values.stock_physic,
                                                      parent_id: values.parent_id ? values.parent_id:null
                                                    };

                                                    // update product
                                                    onUpdateProduct(updateProduct);
                                                  } else {
                                                    const newProduct = {
                                                      name: values["name"],
                                                      description:
                                                        values["description"],
                                                      livraison_id: values["livraison_id"],
                                                      categorie_id: values["categorie_id"],
                                                      stock_desire: values["stock_desire"],
                                                      stock_limit: values["stock_limit"],
                                                      stock_physic: values["stock_physic"],
                                                      parent_id: values["parent_id"] ? values["parent_id"]:null,
                                                      manager_id: this.state.name,
                                                      date_created: Date.now()
                                                    };
                                                    // save new Citie
                                                    onAddNewProduct(newProduct);
                                                  }
                                                  this.setState({
                                                    selectedProduct: null,
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
                                                              Livraison
                                                            </Label>
                                                            <Field
                                                              name="livraison_id"
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
                                                                this.props.deleverys.map((delevery) => (
                                                                  <option key={delevery.id} value={delevery.id}>{delevery.numero_bordereau}</option>
                                                                ))
                                                              }
                                                            </Field>
                                                          </div>
                                                          <div className="mb-3">
                                                            <Label className="form-label">
                                                              Categorie
                                                            </Label>
                                                            <Field
                                                              name="categorie_id"
                                                              as="select"
                                                              className={
                                                                "form-control" +
                                                                (errors.categorie_id &&
                                                                touched.categorie_id
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
                                                              Parent
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
                                                                this.props.products.map((product) => (
                                                                  <option key={product.id} value={product.id}>{product.name}</option>
                                                                ))
                                                              }
                                                            </Field>
                                                          </div>
                                                        </Col>
                                                        </Row>
                                                        
                                                        <Row>
                                                          <Col lg={4}>
                                                            <div className="mb-3">
                                                              <Label className="form-label">
                                                                Quantité
                                                              </Label>
                                                              <Field
                                                                name="stock_physic"
                                                                type="number"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.stock_physic &&
                                                                  touched.stock_physic
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="stock_physic"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </div>
                                                          </Col>
                                                          <Col lg={4}>
                                                            <div className="mb-3">
                                                              <Label className="form-label">
                                                                Stock Désiré
                                                              </Label>
                                                              <Field
                                                                name="stock_desire"
                                                                type="number"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.stock_desire &&
                                                                  touched.stock_desire
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="stock_desire"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </div>
                                                          </Col>
                                                          <Col lg={4}>
                                                            <div className="mb-3">
                                                              <Label className="form-label">
                                                                Limite en Stock
                                                              </Label>
                                                              <Field
                                                                name="stock_limit"
                                                                type="number"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.stock_limit &&
                                                                  touched.stock_limit
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="stock_limit"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </div>
                                                          </Col>
                                                        </Row>

                                                        <Row>
                                                          <Col>
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
                                            </TabPane>

                                            <TabPane tabId="2">
                                              <Formik
                                                enableReinitialize={true}
                                                initialValues={{
                                                  name: (product && product.name) || "",
                                                  description:
                                                    (product && product.description) || "",
                                                  stock_physic: (product && product.stock_physic) || "",
                                                  stock_limit: (product && product.stock_limit) || "",
                                                  stock_desire: (product && product.stock_desire) || "",
                                                  parent_id: (product && product.parent ? product.parent.id:0) || ""
                                                }}
                                                validationSchema={Yup.object().shape({
                                                  description: Yup.string().required(
                                                    this.props.t("Please Enter Description")
                                                  ),
                                                })}
                                                onSubmit={values => {
                                                  if (isEdit) {
                                                    for(let i=0;i<products.length;i++){
                                                      if(products[i].id==values["product"]){
                                                         const updateProduct = {
                                                          id: product.id,
                                                          name: products[i].name,
                                                          description:
                                                            values["description"],
                                                          livraison_id: products[i].livraison.id,
                                                          categorie_id: products[i].categorie.id,
                                                          stock_desire: products[i].stock_desire,
                                                          stock_limit: products[i].stock_limit,
                                                          stock_physic: values.stock_physic,
                                                          parent_id: products[i].parent ? products[i].parent.id:null,
                                                          // manager_id: products[i].manager ? products[i].manager.id: null,
                                                          // date_created: Date.now()
                                                        };
                                                        // update product
                                                        onUpdateProduct(updateProduct);
                                                      }
                                                    }
                                                    // const updateProduct = {
                                                    //   id: product.id,
                                                    //   name: values.name,
                                                    //   description: values.description,
                                                    //   livraison_id: values.livraison_id,
                                                    //   categorie_id: values.categorie_id,
                                                    //   stock_desire: values.stock_desire,
                                                    //   stock_limit: values.stock_limit,
                                                    //   stock_physic: values.stock_physic,
                                                    //   parent_id: values.parent_id ? values.parent_id:null
                                                    // };

                                                    // update product
                                                  } else {
                                                    for(let i=0;i<products.length;i++){
                                                      if(products[i].id==values['product']){
                                                         const newProduct = {
                                                          name: products[i].name,
                                                          description:
                                                            values["description"],
                                                          livraison_id: products[i].livraison.id,
                                                          categorie_id: products[i].categorie.id,
                                                          stock_desire: products[i].stock_desire,
                                                          stock_limit: products[i].stock_limit,
                                                          stock_physic: values["stock_physic"],
                                                          parent_id: products[i].parent ? products[i].parent.id:null,
                                                          manager_id: products[i].manager ? products[i].manager.id: null,
                                                          date_created: Date.now()
                                                        };
                                                        
                                                        onAddNewProduct(newProduct);
                                                      }
                                                    }
                                                  }
                                                  this.setState({
                                                    selectedProduct: null,
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
                                                              Materiel
                                                            </Label>
                                                            <Field
                                                              name="product"
                                                              as="select"
                                                              className={
                                                                "form-control" +
                                                                (errors.product &&
                                                                touched.product
                                                                  ? " is-invalid"
                                                                  : "")
                                                              }
                                                              multiple={false}
                                                            >
                                                              <option>---</option>
                                                              {
                                                                this.props.products.map((product) => (
                                                                  <option key={product.id} value={product.id}>{product.name}</option>
                                                                ))
                                                              }
                                                            </Field>
                                                          </div>
                                                        </Col>
                                                        </Row>
                                                        
                                                        <Row>
                                                          <Col lg={12}>
                                                            <div className="mb-3">
                                                              <Label className="form-label">
                                                                Quantité
                                                              </Label>
                                                              <Field
                                                                name="stock_physic"
                                                                type="number"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.stock_physic &&
                                                                  touched.stock_physic
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="stock_physic"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </div>
                                                          </Col>
                                                        </Row>

                                                        <Row>
                                                          <Col>
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
                                            </TabPane>
                                          </TabContent>
                                        </>
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

ProductsList.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  deleverys: PropTypes.array,
  locals: PropTypes.array,
  className: PropTypes.any,
  onGetProducts: PropTypes.func,
  onAddNewProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onUpdateProduct: PropTypes.func,
  onGetCategories: PropTypes.func,
  onGetLocals: PropTypes.func,
  onGetDeleverys: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = ({ Products, Deleverys, Categories, Locals }) => ({
  products: Products.products,
  deleverys: Deleverys.deleverys,
  categories: Categories.categories,
  locals: Locals.locals
});

const mapDispatchToProps = dispatch => ({
  onGetProducts: () => dispatch(getProducts()),
  onAddNewProduct: categorie => dispatch(addNewProduct(categorie)),
  onUpdateProduct: categorie => dispatch(updateProduct(categorie)),
  onDeleteProduct: categorie => dispatch(deleteProduct(categorie)),
  onGetCategories: () => dispatch(getCategories()),
  onGetLocals: () => dispatch(getLocals()),
  onGetDeleverys: () => dispatch(getDeleverys()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(ProductsList)));
