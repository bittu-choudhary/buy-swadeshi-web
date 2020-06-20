// import React from "react"
// const Category = ({ pageContext }) => {
//   return <div>{pageContext.id}</div>
// }
// export default Category

import React, { Component } from "react"
import Layout from '../components/layout'
import styles from '../components/search-container-css-modules.module.css'
import Row from 'react-bootstrap/Row';
import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from  'react-bootstrap/Col'
import { MdCancel } from "react-icons/md"
import { MdCheckCircle } from "react-icons/md"
import JsonData from "../../content/raw data/new_brand_list.json"
import Image from 'react-bootstrap/Image'

const queryString = require('query-string');
var _ = require('lodash') 
let isIndianParam
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedCategory: props.pageContext.id,
      showCategory: true,
     };
  }

  toggleCategoryView = (newVal) => {
    this.setState({showCategory: newVal})
  }

  PopulateProductCol = (props) => {
    const {index, products} = props
    let loopLength = index + 5 <products.length ? index + 5 : (products.length - 1)
    let col = []
    let icon = <MdCancel/>
    let fontColor = `red`
    for (let i = index; i <= loopLength ; i++ ) {
      const productId = products[i]
      let remark
      let caption = `Product`
      if (isIndianParam !== undefined) {
        if (`${productId.isIndian}` !== `${isIndianParam}`) {
          continue
        }
      }
      if (productId.isIndian) {
        icon = <MdCheckCircle/>
        fontColor = `green`
      }
      remark = <span style={{color: fontColor, bottom: `0px`}} className={styles.searchResultIndianIcon} >Indian &nbsp;
                    {icon}
                  </span>
      var productEndPoint = _.lowerCase(productId.name)
      col.push(
        <Col  style={{ padding: `5px`}} key={productId.id} id={productId.id} xs={6} md={4} lg={2} xl={2}>
          <Link
          to={`/product/${productEndPoint}`}
          style={{
              textDecoration: `none`,
              color: `inherit`
            }}
          >
            <div style={{borderRadius: `0px`}} className={styles.categoryCol + " " + styles.productCol } >
              <Row >
                <Col  className={`col-12` }>
                  <div className={`container`} style={{width: `fit-content`, height: `80px`}}>
                    <Image className={styles.productImage} style={{
                      border: `0px`,
                      borderRadius: `0px`,
                      maxHeight: `100%`,
                      padding: `0px !important`,
                    }} thumbnail src={`http://cdn.grofers.com/app/images/products/normal/pro_380157.jpg?ts=1582006627`}></Image>
                  </div>
                </Col>
              </Row>
              <Row style={{fontSize: `14px`}}>
                <Col className={`col-12` +" " + styles.searchResultTitle}>
                  <div style={{textAlign: `center`}}>
                    <p style={{textAlign: `center`, marginBottom: `0px`}}>
                      {productId.name}
                    </p>
                    <span 
                    style={{
                      fontSize: `12px`,
                      color: `gray`}}>
                    {caption}
                  </span>
                      {/* <Image src={CartIcon} thumbnail /> */}
                  </div>
                </Col>
              </Row>
              <Row>
                {remark}
              </Row>
            </div>
          </Link>
        </Col>
      )
    }
    return (
      col
    )
  }

  
  DisplayProducts = (props) => {
    const {selectedCategory} = props
    const { PopulateProductCol} = this
    const products = JsonData.categories[`${selectedCategory}`]["products"]
    let productsArr = []
    for (var key in products){
      productsArr.push(products[key])
    }
    const productsSortedArr = productsArr.sort((a, b) => a.isIndian < b.isIndian ? 1 : -1)
    const rows = productsSortedArr.map((product, index) => {
      if( index%6 === 0) {
        return (<Row className={styles.pageContent} id={`pro_row_` + index} key={`pro_row_` + index} >
          <PopulateProductCol index={index} products={productsSortedArr}/>
        </Row>)
      }
    })
    return (rows)
  }

  render() {
    const {pageContext} = this.props
    const { DisplayProducts} = this
    const category =  JsonData.categories[`${pageContext.id}`]
    isIndianParam = queryString.parse(this.props.location.search).isIndian
    return (
      <Layout showMessage={false} toggleView={this.toggleCategoryView}>
      {this.state.showCategory && <><Row className={styles.homeLink}>
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
              <i className={styles.arrow + " " +  styles.right}></i> &nbsp; <span style={{  fontSize: `14px`, color: `rgb(181, 181, 181)`}} >{_.startCase(category.name)}</span>
              </a>
            </li>
          </ul>
          {/* <p style={{color: `rgb(181, 181, 181)`, marginBottom: `0px`}}>Back to home</p> */}
        </Col>
      </Row>
      <Row className={styles.pageTitle}>
        <Col>
          <p>{_.startCase(category.name)}</p>
        </Col>
      </Row>
      <DisplayProducts selectedCategory={pageContext.id}/>
        {/* <div>{this.props.pageContext.id}</div> */}</>}
      </Layout>
    )
  }
}

export default Category
