// import React from "react"
// const Category = ({ pageContext }) => {
//   return <div>{pageContext.id}</div>
// }
// export default Category

import React, { Component } from "react"
import Layout from '../components/layout'
import JsonData from "../../content/raw data/new_brand_list.json"
import styles from '../components/search-container-css-modules.module.css'
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from  'react-bootstrap/Col'
import { MdCancel } from "react-icons/md"
import { MdCheckCircle } from "react-icons/md"

var _ = require('lodash') 

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProduct: true,
     };
  }

  toggleProductView = (newVal) => {
    this.setState({showProduct: newVal})
  }

  DisplayProductInfo = (props) => {
    let product = JsonData.products[`${props.productId}`]
    let icon = <MdCancel/>
    let fontColor = `red`
    if (product.isIndian) {
      icon = <MdCheckCircle/>
      fontColor = `green`
    }
    return(
      <>
        <div className={styles.pageContent + " " + `container-fluid`}>
          <div className="row d-md-block d-block">
            <Col  className={"float-left col-12" + " " + styles.productImage } md={6}>
              <div className={`container`} style={{width: `fit-content`}}>
                <Image className={styles.productImage} style={{
                  border: `0px`,
                  borderRadius: `0px`,
                }} thumbnail src={`https://cdn.grofers.com/app/images/products/sliding_image/333324b.jpg?ts=1588911583`}></Image>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6}  style={{height: `fit-content`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>Key Features</span>
                </div>
                <div className={styles.productAttrDesc}>
                  Made with superior quality wheat 
                  <br/>Prepares soft and delicious roti
                  <br/>Rich source of Fibre
                  <br/>Consists of heavier in feel quality flour
                </div>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6} style={{height: `60px`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>Is Indian?</span>
                </div>
                <div className={styles.productAttrDesc}>
                  <span style={{color: fontColor, fontWeight: `bold`}} >Indian &nbsp;
                    {icon}
                  </span>
                </div>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6}  style={{height: `60px`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>Unit</span>
                </div>
                <div className={styles.productAttrDesc}>
                  10 Kg
                </div>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper}  md={6} style={{height: `60px`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>Shelf Life</span>
                </div>
                <div className={styles.productAttrDesc}>
                  3 months
                </div>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6} style={{height: `60px`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>Company</span>
                </div>
                <div className={styles.productAttrDesc}>
                  ITC Limited
                </div>
              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.productAttrWrapper} md={12}  style={{height: `fit-content`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>Description</span>
                </div>
                <div className={styles.productAttrDesc}>
                  Aashirvaad Shudh Chakki Whole Wheat Atta is ground with utmost precision, using the traditional chakki-grinding process by picking the choicest of grains to give you fresh and 100% pure wheat flour. Enriched with wholesome vitamins, it can be used to prepare the softest of roti's. The use of superior quality grains makes Aashirvaad Whole Wheat Atta a healthy and wholesome choice. Pure wheat grain, without any Maida addition, is used in the preparation of the flour. Helps in making soft and delicious chapatis. Provides fibre content to the body. Extra protein enrichments strengthen the body.
                </div>
              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.productAttrWrapper} md={12} style={{height: `fit-content`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>Disclaimer</span>
                </div>
                <div className={styles.productAttrDesc}>
                  Every effort is made to maintain accuracy of all information. However, actual product packaging and materials may contain more and/or different information. It is recommended not to solely rely on the information presented.
                </div>
              </div>
            </Col>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {pageContext} = this.props
    const { DisplayProductInfo} = this
    const product =  JsonData.products[`${pageContext.id}`]
    return (
      <Layout showMessage={false} toggleView={this.toggleProductView}>
      {this.state.showProduct && <><Row className={styles.homeLink}>
        <Col>
          <ul style={{listStyle: `none`, paddingLeft: `0`}}>
            <li style={{display: `inline-block`}}>
              <Link
                to={`/`}
                style={{ textDecoration: `none`, color: `inherit` }}
              >
                <span style={{ fontSize: `14px` ,color: `rgb(181, 181, 181)`}} class="name">Home</span>
              </Link>
            </li>
            <li style={{display: `inline-block`}}>
              <a> &nbsp;
              <i className={styles.arrow + " " +  styles.right}></i> &nbsp; <span style={{  fontSize: `14px`, color: `rgb(181, 181, 181)`}} >{_.startCase(product.name)}</span>
              </a>
            </li>
          </ul>
          {/* <p style={{color: `rgb(181, 181, 181)`, marginBottom: `0px`}}>Back to home</p> */}
        </Col>
      </Row>
      <Row className={styles.pageTitle}>
        <Col>
          <p>{_.startCase(product.name)}</p>
        </Col>
      </Row>
      <DisplayProductInfo productId={pageContext.id}/>
        {/* <div>{this.props.pageContext.id}</div> */}</>}
      </Layout>
    )
  }
}

export default Product
