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
import productPlaceHolder from '../images/product-placeholder-white-bg-480.png'
import productPlaceHolderTrans from '../images/product-placeholder-light-green.png'
import Button from 'react-bootstrap/Button';
import firebase from "gatsby-plugin-firebase"


var _ = require('lodash') 


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProduct: true,
     };
  }

  sendFirebaseAnalytics = (type, resourceId) => {
    if (process.env.NODE_ENV !== "development") {
      if (type === `category`){
        firebase
        .analytics()
        .logEvent(`category_clk`, {category_id: resourceId})
      } else if (type === `product`) {
        firebase
        .analytics()
        .logEvent(`product_clk`, {product_id: resourceId})
      } else {
        firebase
        .analytics()
        .logEvent(`company_clk`, {company_id: resourceId})
      }
    }
    console.log(`Logging ${type} with param ${resourceId}`)
  }

  toggleProductView = (newVal) => {
    this.setState({showProduct: newVal})
  }

  DisplayProductInfo = (props) => {
    let product = JsonData.products[`${props.productId}`]
    let productImage = (product.image !== "" ? product.image : productPlaceHolder)
    let icon = <MdCancel/>
    let alt_or_other = "Alternate"
    let altIndianBrands = []
    let categoriesList = []
    let remark
    let remarkText = "Not Indian"
    let btnColor = `#ffdeda`
    let fontColor = `#a52014`
    for (var category in product.categories) {
      var categorySlugName = product.categories[category]["name"]
      if (categorySlugName && categorySlugName.split(" ").length === 1){
        categorySlugName = ` The ` + categorySlugName
      }
      var categoryEndPoint = _.snakeCase(categorySlugName)
      categoriesList.push(
        <Link
              to={`/category/${categoryEndPoint}`}
              style={{ textDecoration: `none`, color: `maroon` }}
            >
          <span onClick={() => this.sendFirebaseAnalytics(`category`,  product.categories[category]["id"])} className={styles.altBrand} key={product.categories[category]["name"]} style={{bottom: `0px`}}  >{product.categories[category]["name"]} &nbsp;
          </span>
        </Link>
      )
      let categoryProducts = JsonData.categories[category].products
      let index = 0
      for (var altProductId in categoryProducts) {
        let altProduct = categoryProducts[altProductId]
        if (index === 10) {
          let seeMoreText = "See more"
          let seeMoreLink = `/category/${categoryEndPoint}?isIndian=true`
          if (altIndianBrands.length === 0) {
            seeMoreText = "No Indian prduct found"
            seeMoreLink = "#"
          }
          altIndianBrands.push(
            <Col className={styles.otherBrandScroller} xs={12} md={12} lg={12} xl={12}>
              <Row>
                <Link
                  to={seeMoreLink}
                  style={{ textDecoration: `none`, color: `#176f52`, margin: `auto`}}
                >
                  <Col xs={12} md={12} lg={12} xl={12} style={{
                    marginTop: `10px`
                  }}
                  onClick={() => this.sendFirebaseAnalytics(`product`,  `see_more`)}>
                    <p>{seeMoreText}</p>
                  </Col>
                </Link> &nbsp;
              </Row>
            </Col>
            // <span className={styles.altBrand} key={altProduct.name} style={{bottom: `0px`}}  >
            //   <Link
            //     to={`/category/${categoryEndPoint}?isIndian=true`}
            //     style={{ textDecoration: `none`, color: `maroon` }}
            //   >
            //     See more
            //   </Link> &nbsp;
            // </span>
          )
          break
        } 
        index = index + 1
        if (altProductId === props.productId) {
          continue 
        }
        if (altProduct.isIndian) {
          var altProductSlugName = altProduct.name
          if (altProductSlugName && altProductSlugName.split(" ").length === 1){
            altProductSlugName = ` The ` + altProductSlugName
          }
          var altProEndPoint = _.snakeCase(altProductSlugName)
          var altProCompany = JsonData.products[altProduct.id].company
          var altProCompanySlugName = altProCompany.name
          if (altProCompanySlugName && altProCompanySlugName.split(" ").length === 1){
            altProCompanySlugName = ` The ` + altProCompanySlugName
          }
          var altProCompanyEndPoint = _.snakeCase(altProCompanySlugName)
          // altIndianBrands.push(
          //   <span className={styles.altBrand} key={altProduct.name} style={{bottom: `0px`}}  >
          //     <Link
          //       to={`/product/${altProEndPoint}`}
          //       style={{ textDecoration: `none`, color: `maroon` }}
          //     >
          //       {altProduct.name},
          //     </Link> &nbsp;
          //   </span>
          // )
          altIndianBrands.push(
            <Col className={styles.otherBrandScroller} xs={12} md={12} lg={12} xl={12}>
              <Row>
                  <Col xs={2} md={2} lg={2} xl={2} style={{
                      borderRightColor: `white`,
                      borderRightStyle: `solid`,
                      borderRightWidth: `2px`
                    }}
                    onClick={() => this.sendFirebaseAnalytics(`category`,  product.categories[category]["id"])}
                    >
                    <Link
                      to={`/category/${categoryEndPoint}?isIndian=true`}
                      style={{ textDecoration: `none`}}
                    >
                      <Image  style={{
                          border: `0px`,
                          borderRadius: `0px`,
                          padding: `0px`,
                          height: `auto !important`,
                          maxWidth: `100%`
                          }} thumbnail src={productPlaceHolderTrans}>
                      </Image>
                    </Link>
                  </Col>
                  <Col xs={6} md={6} lg={6} xl={6} style={{
                      borderRightColor: `white`,
                      borderRightStyle: `solid`,
                      borderRightWidth: `2px`
                    }}
                    onClick={() => this.sendFirebaseAnalytics(`product`,  altProduct.id)}>
                    <Link
                      to={`/product/${altProEndPoint}`}
                      style={{ textDecoration: `none`, color: `#176f52`}}
                    >
                      <p>{altProduct.name}</p>
                    </Link>
                  </Col>
                  <Col xs={4} md={4} lg={4} xl={4} style={{
                    maxHeight: `40px`,
                    overflow: `scroll`
                  }}
                  onClick={() => this.sendFirebaseAnalytics(`company`,  altProCompany.id)}>
                    <Link
                      to={`/company/${altProCompanyEndPoint}`}
                      style={{ textDecoration: `none`, color: `#176f52`}}
                    >
                      <p>{altProCompany.name}</p>
                    </Link>
                  </Col>
              </Row>
            </Col>
          )
        }
      }
    }
    if (product.isIndian) {
      remarkText = "Indian"
      btnColor = `#ccf6e3`
      fontColor = `#176f52`
      alt_or_other = `Other`
    }
    remark = <span style={{color: fontColor , bottom: `0px`}} >{remarkText}
                  </span>
    var compamySlugName = product.company.name
    if (compamySlugName && compamySlugName.split(" ").length === 1){
      compamySlugName = ` The ` + compamySlugName
    }
    var companyEndPoint = _.snakeCase(compamySlugName)
    return(
      <>
        <div className={styles.pageContent + " " + `container-fluid`}>
          <div className="row d-md-block d-block">
            <Col  className={"float-left col-12" + " " + styles.productImage } md={6}>
              <div className={`container`} style={{width: `fit-content`}}>
                <Image className={styles.productImage} style={{
                  border: `0px`,
                  borderRadius: `0px`,
                }} thumbnail src={productImage}></Image>
              </div>
            </Col>
            {/* <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6}  style={{height: `fit-content`}}>
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
            </Col> */}
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6} style={{height: `60px`}}>
              <div className={styles.productAttr}>
                {/* <div className={styles.productAttrKey}>
                  <span>Is Indian?</span>
                </div> */}
                <div className={styles.productAttrDesc}>
                  <Button style={{backgroundColor: btnColor, border: btnColor, marginTop: `10px`}}>{remark}</Button>
                  {/* <span style={{color: fontColor, fontWeight: `bold`}} >Indian &nbsp;
                    {icon}
                  </span> */}
                </div>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6} style={{height: `60px`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>Company</span>
                </div>
                <div className={styles.productAttrDesc + " " + styles.altBrand}
                onClick={() => this.sendFirebaseAnalytics(`company`,  product.company.id)}
                >
                  <Link
                    to={`/company/${companyEndPoint}`}
                    style={{ textDecoration: `none`, color: `maroon` }}
                  >
                    {product.company.name}
                  </Link>
                </div>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper}  md={6} style={{height: `60px`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>Categories</span>
                </div>
                <div className={styles.productAttrDesc}>
                  {categoriesList}
                </div>
              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.productAttrWrapper} md={6}>
              <div className={styles.productAttr}>
                  <div className={styles.productAttrKey}>
                    <span>{alt_or_other} Indian Brands</span>
                  </div>
                  <Row style={{height: `200px`, overflow: `scroll`, marginRight: `0px`, marginLeft: `0px`}}>
                    {altIndianBrands}
                    {/* <Col className={styles.otherBrandScroller} xs={12} md={12} lg={12} xl={12}>
                      <Row>
                        <Col xs={2} md={2} lg={2} xl={2}>
                          <Image className={styles.productImage} style={{
                              border: `0px`,
                              borderRadius: `0px`,
                              padding: `0px`
                              }} thumbnail src={productPlaceHolderTrans}>
                          </Image>
                        </Col>
                        <Col xs={6} md={6} lg={6} xl={6}>
                          <p>Traditional Chakki Grinding</p>
                        </Col>
                        <Col xs={4} md={4} lg={4} xl={4}>
                          <p>Traditional Chakki</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col className={styles.otherBrandScroller} xs={12} md={12} lg={12} xl={12}>
                      <Row>
                        <Col xs={2} md={2} lg={2} xl={2}>
                          <p>C11</p>
                        </Col>
                        <Col xs={6} md={6} lg={6} xl={6}>
                          <p>C12</p>
                        </Col>
                        <Col xs={4} md={4} lg={4} xl={4}>
                          <p>C13</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col className={styles.otherBrandScroller} xs={12} md={12} lg={12} xl={12}>
                      <Row>
                        <Col xs={2} md={2} lg={2} xl={2}>
                          <p>C11</p>
                        </Col>
                        <Col xs={6} md={6} lg={6} xl={6}>
                          <p>C12</p>
                        </Col>
                        <Col xs={4} md={4} lg={4} xl={4}>
                          <p>C13</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col className={styles.otherBrandScroller} xs={12} md={12} lg={12} xl={12}>
                      <Row>
                        <Col xs={2} md={2} lg={2} xl={2}>
                          <p>C11</p>
                        </Col>
                        <Col xs={6} md={6} lg={6} xl={6}>
                          <p>C12</p>
                        </Col>
                        <Col xs={4} md={4} lg={4} xl={4}>
                          <p>C13</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col className={styles.otherBrandScroller} xs={12} md={12} lg={12} xl={12}>
                      <Row>
                        <Col xs={2} md={2} lg={2} xl={2}>
                          <p>C11</p>
                        </Col>
                        <Col xs={6} md={6} lg={6} xl={6}>
                          <p>C12</p>
                        </Col>
                        <Col xs={4} md={4} lg={4} xl={4}>
                          <p>C13</p>
                        </Col>
                      </Row>
                    </Col> */}
                  </Row>
                </div>

              {/* <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>{alt_or_other} Indian Brands</span>
                </div>
                <div className={styles.productAttrDesc}>
                  {altIndianBrands}
                </div>
              </div> */}
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
