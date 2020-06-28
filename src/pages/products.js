// import React from "react"
// const Category = ({ pageContext }) => {
//   return <div>{pageContext.id}</div>
// }
// export default Category

import React, { Component } from "react"
import Layout from '../components/layout'
import JsonData from "../../content/raw-data/new_brand_list.json"
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
import { withTrans } from '../i18n/withTrans'
import i18next from 'i18next';

var _ = require('lodash')
const queryString = require('query-string');
let pid

class ProductPage extends Component {
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
  }

  toggleProductView = (newVal) => {
    this.setState({showProduct: newVal})
  }

  DisplayProductInfo = (props) => {
    const {t} = this.props
    let product = JsonData.products[`${props.productId}`]
    let productImage = (product.image !== "" ? product.image : productPlaceHolder)
    let icon = <MdCancel/>
    let alt_or_other = t('alt')
    let altIndianBrands = []
    let categoriesList = []
    let remark
    let remarkText = t('not_indian')
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
              to={`/categories?catid=${encodeURIComponent(category)}`}
              style={{ textDecoration: `none`, color: `maroon` }}
            >
          <span onClick={() => this.sendFirebaseAnalytics(`category`,  product.categories[category]["id"])} className={styles.altBrand} key={product.categories[category]["name"]} style={{bottom: `0px`}}  >{i18next.language === `en` ? product.categories[category]["name"] : product.categories[category]["name_hi"]}, </span>
        </Link>
      )
      if (product.categories[category].isParent) {
        let categoryProducts = JsonData.categories[category].products
        let index = 0
        let altProCount = 0
        for (var altProductId in categoryProducts) {
          let altProduct = categoryProducts[altProductId]
          index = index + 1
          if (altProductId === props.productId) {
            continue
          }
          if (altProduct.isIndian) {
            altProCount = altProCount + 1
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
                        to={`/categories?catid=${encodeURIComponent(category)}&isIndian=true`}
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
                        borderRightWidth: `2px`,
                        maxHeight: `40px`,
                        overflow: `scroll`
                      }}
                      onClick={() => this.sendFirebaseAnalytics(`product`,  altProduct.id)}>
                      <Link
                        to={`/products?pid=${encodeURIComponent(altProduct.id)}`}
                        style={{ textDecoration: `none`, color: `#176f52`}}
                      >
                        <p>{i18next.language === `en` ? altProduct.name : altProduct.name_hi}</p>
                      </Link>
                    </Col>
                    <Col xs={4} md={4} lg={4} xl={4} style={{
                      maxHeight: `40px`,
                      overflow: `scroll`
                    }}
                    onClick={() => this.sendFirebaseAnalytics(`company`,  altProCompany.id)}>
                      <Link
                        to={`/companies?cid=${encodeURIComponent(altProCompany.id)}`}
                        style={{ textDecoration: `none`, color: `#176f52`}}
                      >
                        <p>{i18next.language === `en` ? altProCompany.name : altProCompany.name_hi}</p>
                      </Link>
                    </Col>
                </Row>
              </Col>
            )
          }

          if ( (Object.keys(categoryProducts).length === index) ||  (altProCount === 10)) {
            let seeMoreText = t('see_more')
            let seeMoreLink = `/categories?catid=${encodeURIComponent(category)}&isIndian=true`
            if (altIndianBrands.length === 0) {
              seeMoreText = t('no_indian_pro_found')
              seeMoreLink = "#"
            } else if ((altIndianBrands.length === 10)) {
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
              )
              break
            }
          }
        }
      }
      
    }
    if (product.isIndian) {
      remarkText = t('indian')
      btnColor = `#ccf6e3`
      fontColor = `#176f52`
      alt_or_other = t('other')
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
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6} style={{height: `60px`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrDesc}>
                  <Button style={{backgroundColor: btnColor, border: btnColor, marginTop: `10px`}}>{remark}</Button>
                </div>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6} style={{height: `60px`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>{t('company')}</span>
                </div>
                <div className={styles.productAttrDesc + " " + styles.altBrand}
                onClick={() => this.sendFirebaseAnalytics(`company`,  product.company.id)}
                >
                  <Link
                    to={`/companies?cid=${encodeURIComponent(product.company.id)}`}
                    style={{ textDecoration: `none`, color: `maroon` }}
                  >
                    {i18next.language === `en` ? product.company.name : product.company.name_hi}
                  </Link>
                </div>
              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.productAttrWrapper}  md={6} style={{height: `60px`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>{t('categories')}</span>
                </div>
                <div className={styles.productAttrDesc} style={{
                  overflow: `scroll`,
                  maxHeight: `60px`
                }}>
                  {categoriesList}
                </div>
              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.productAttrWrapper} md={6}>
              <div className={styles.productAttr}>
                  <div className={styles.productAttrKey}>
              <span>{alt_or_other} {t('other_indian_brands')}</span>
                  </div>
                  <Row style={{height: `200px`, overflow: `scroll`, marginRight: `0px`, marginLeft: `0px`}}>
                    {altIndianBrands}
                  </Row>
                </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.productAttrWrapper} md={12}  style={{height: `fit-content`}}>
              <div className={styles.productAttr}>
                
              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.productAttrWrapper} md={12} style={{height: `fit-content`}}>
              <div className={styles.productAttr}>
                <div className={styles.productAttrKey}>
                  <span>{t('disclaimer')}</span>
                </div>
                <div className={styles.productAttrDesc}>{t('disclaimer_text')}</div>
              </div>
            </Col>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {pageContext} = this.props
    const {t} = this.props
    pid = queryString.parse(this.props.location.search).pid || `everest_turmeric_powder/haldi_J7X` // default product
    const { DisplayProductInfo} = this
    const product =  JsonData.products[`${pid}`]
    return (
      <Layout showMessage={false} toggleView={this.toggleProductView}>
      {this.state.showProduct && <><Row className={styles.homeLink}>
        <Col>
          <ul className={styles.homeNav} style={{listStyle: `none`, paddingLeft: `0`}}>
            <li style={{display: `inline-block`}}>
              <Link
                to={`/`}
                style={{ textDecoration: `none`, color: `inherit` }}
              >
                <span style={{ fontSize: `14px` ,color: `rgb(181, 181, 181)`}} class="name">{t('home')}</span>
              </Link>
            </li>
            <li style={{display: `inline-block`}}>
              <a> &nbsp;
              <i className={styles.arrow + " " +  styles.right}></i> &nbsp; <span style={{  fontSize: `14px`, color: `rgb(181, 181, 181)`}} >{_.startCase(i18next.language === `en` ? product.name : product.name_hi)}</span>
              </a>
            </li>
          </ul>
          {/* <p style={{color: `rgb(181, 181, 181)`, marginBottom: `0px`}}>Back to home</p> */}
        </Col>
      </Row>
      <Row className={styles.pageTitle}>
        <Col>
          <p>{_.startCase(i18next.language === `en` ? product.name : product.name_hi)}</p>
        </Col>
      </Row>
      <DisplayProductInfo productId={pid}/>
        {/* <div>{this.props.pageContext.id}</div> */}</>}
      </Layout>
    )
  }
}

export default withTrans(ProductPage)
