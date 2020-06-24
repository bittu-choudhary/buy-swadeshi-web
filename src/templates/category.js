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
import JsonData from "../../content/raw data/new_brand_list.json"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import productPlaceHolder from '../images/product-placeholder-white-bg.png'

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
    let fontColor = `black`
    let btnColor = `#f0745b`
    for (let i = index; i <= loopLength ; i++ ) {
      const productId = products[i]
      let remark
      let remarkText = "Not Indian"
      let caption = `Product`
      if (isIndianParam !== undefined) {
        if (`${productId.isIndian}` !== `${isIndianParam}`) {
          continue
        }
      }
      if (productId.isIndian) {
        btnColor = `#85c8ab`
        remarkText = "Indian"
      }
      remark = <span style={{color: fontColor, bottom: `0px`}} >{remarkText}
                  </span>
      var productEndPoint = _.snakeCase(productId.name)
      col.push(
        <Col  style={{ padding: `5px`}} key={productId.id} id={productId.id} xs={12} md={4} lg={4} xl={4}>
          <Link
          to={`/product/${productEndPoint}`}
          style={{
              textDecoration: `none`,
              color: `inherit`
            }}
          >
            <div style={{borderRadius: `0px`}} className={`contianer` + " " + styles.categoryCol + " " + styles.productCol } >
              <Row className={styles.productCardImage} >
                <Col  className={`col-12` } style={{height: `100%`}}>
                  <div className={`container`} style={{width: `fit-content`, height: `100%`}}>
                    <Image className={styles.productImage} style={{
                      border: `0px`,
                      borderRadius: `0px`,
                      maxHeight: `100%`,
                      padding: `0px !important`,
                    }} thumbnail src={productPlaceHolder}></Image>
                  </div>
                </Col>
              </Row>
              <Row style={{fontSize: `14px`}}>
                <Col xs={12} md={12} lg={6} xl={6} className={`col-6` +" " + styles.searchResultTitle}>
                  <Button className={`btn-sm btn-block` + ` ` + styles.btnCustomBlock } style={{backgroundColor: `#f9f1bb`, border: `#f9f1bb`, color: `black`, fontSize: `.85rem`}}>{productId.name}</Button>
                  {/* <div style={{textAlign: `center`}}>
                    <p style={{textAlign: `center`, marginBottom: `0px`}}>
                      {productId.name}
                    </p>
                  </div> */}
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} className={styles.isIndianBtn} >
                  <Button className={`btn-sm` + ` ` + styles.btnCustomBlock } style={{backgroundColor: btnColor, border: btnColor}}>{remark}</Button>
                </Col>
              </Row>
            </div>
          </Link>
        </Col>
      )
    }
    // idth: fit-content;
    // margin: auto;
    // background-color: #d4edda;
    // min-width: 109px;
    // min-height: 29px;
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
      var topLeft = `0px`
      var bottomLeft = `0px`
      var topRight = `0px`
      var bottomRight = `0px`
      var topPadding = `0px`
      var bottomPadding = `0px`
      if (index === 0){
        topLeft = `14px`
        topRight = `14px`
        topPadding = `8px`
      } else if ((((productsSortedArr.length - 1) - index * 6) <= 6)) {
        bottomLeft = `14px`
        bottomRight = `14px`
        bottomPadding = `8px`
      }
      if( index%6 === 0) {
        console.log(index)
        return (
          <div  key={`pro_row_` + index} style={{
            backgroundColor: `#f7f5f5`,
            borderTopLeftRadius: topLeft,
            borderTopRightRadius: topRight,
            borderBottomLeftRadius: bottomLeft,
            borderBottomRightRadius: bottomRight,
            paddingTop: topPadding,
            paddingBottom: bottomPadding
          }}>
            <Row className={styles.pageContent} id={`pro_row_` + index} >
              <PopulateProductCol index={index} products={productsSortedArr}/>
            </Row>
          </div>
        )
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
                <span style={{ fontSize: `14px` ,color: `rgb(181, 181, 181)`}} className={`name`}>Home</span>
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
