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

var _ = require('lodash') 

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
      if (productId.isIndian) {
        icon = <MdCheckCircle/>
        fontColor = `green`
      }
      remark = <span style={{color: fontColor}} className={styles.searchResultIndianIcon} >Indian &nbsp;
                    {icon}
                  </span>
      col.push(
        <Col  style={{ padding: `1px`}} key={productId.id} id={productId.id} xs={6} md={6} lg={2} xl={2}>
          <Link
          to={`/product/${productId.name}`}
          style={{
              textDecoration: `none`,
              color: `inherit`
            }}
          >
            <div className={styles.categoryCol + " " + styles.productCol } style={{border:`1px solid #dcdcdc` }} >
              <Row style={{height: `20%`}}>
                <div className={styles.searchResultTitle} style={{textAlign: `center`}}>
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
              </Row>
              <Row style={{height: `60%`}}></Row>
              <Row style={{height: `20%`}}>
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
    console.log(selectedCategory)
    const products = JsonData.categories[`${selectedCategory}`]["products"]
    console.log(products)
    let productsArr = []
    for (var key in products){
      productsArr.push(products[key])
    }
    const productsSortedArr = productsArr.sort((a, b) => a.isIndian < b.isIndian ? 1 : -1)
    const rows = productsSortedArr.map((product, index) => {
      if( index%6 === 0) {
        return (<Row className={styles.pageContent} id={`pro_row_` + index} key={`pro_row_` + index} style={{paddingBottom: `5px`}}>
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
