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
import JsonData from "../../content/raw-data/new_brand_list.json"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import productPlaceHolder from '../images/product-placeholder-white-bg.png'
import firebase from "gatsby-plugin-firebase"
import { withTrans } from '../i18n/withTrans'
import i18next from 'i18next';

const queryString = require('query-string');
var _ = require('lodash')
let isIndianParam
let allc
let cid
let catid

// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = 12
}

class Category extends Component {

  constructor(props) {
    super(props);
    let postsToShow = 12
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow
    }
    this.state = {
      showCategory: true,
      showingMore: postsToShow > 12,
      postsToShow,
     };
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 12 })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
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

  toggleCategoryView = (newVal) => {
    this.setState({showCategory: newVal})
  }

  PopulateProductCol = (props) => {
    const {t} = this.props
    const {index, products, namespace, param} = props
    let loopLength = index + 5 <products.length ? index + 5 : (products.length - 1)
    let col = []
    for (let i = index; i <= loopLength ; i++ ) {
      let fontColor = `#a52014`
      let btnColor = `#ffdeda`
      const productId = products[i]
      let productImage = ((productId.image !== "") ? productId.image : productPlaceHolder)
      let remark
      let remarkText = t('not_indian')
      let caption = `Product`
      if (isIndianParam !== undefined) {
        if (`${productId.isIndian}` !== `${isIndianParam}`) {
          continue
        }
      }
      if (productId.isIndian) {
        btnColor = `#ccf6e3`
        fontColor = `#176f52`
        remarkText = t('indian')
      }
      remark = <span style={{color: fontColor , bottom: `0px`}} >{remarkText}
                  </span>
      var productSlugName = productId.name
      if (productSlugName && productSlugName.split(" ").length === 1){
        productSlugName = ` The ` + productSlugName
      }
      var productEndPoint = _.snakeCase(productSlugName)
      col.push(
        <Col  style={{ padding: `5px`}} key={productId.id} id={productId.id} xs={12} md={4} lg={4} xl={4}

          onClick={() => this.sendFirebaseAnalytics(namespace, productId.id)}>
          <Link
          to={`/${namespace}?${param}=${encodeURIComponent(productId.id)}`}
          style={{
              textDecoration: `none`,
              color: `inherit`
            }}
          >
            <div style={{borderRadius: `0px`}} className={`contianer` + " " + styles.categoryCol + " " + styles.productCol } >
              <Row className={styles.productCardImage} >
                <Col  className={`col-12`} style={{height: `100%`}}>
                  <div className={`container`  + ` ` + styles.catListImage} style={{width: `fit-content`, height: `100%`}}>
                    <Image loading={`lazy`} className={styles.productImage} style={{
                      border: `0px`,
                      borderRadius: `0px`,
                      maxHeight: `100%`,
                      padding: `0px !important`,
                    }} thumbnail src={productImage}></Image>
                  </div>
                </Col>
              </Row>
              <Row style={{fontSize: `14px`}}>
                <Col xs={12} md={12} lg={6} xl={6} className={`col-6` +" " + styles.searchResultTitle}>
                  <Button className={`btn-sm btn-block` + ` ` + styles.btnCustomBlock } style={{backgroundColor: `#fff3cc`, border: `#fff3cc`, color: `#7b5f05`, fontSize: `.85rem`, height: `29px`,
                    overflow: `scroll`}}>{i18next.language === `en` ? productId.name : productId.name_hi}
                  </Button>
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
    const {t} = this.props
    const { PopulateProductCol} = this
    let products
    let namespace
    let param
    let productsArr = []
    if (cid !== undefined) {
      products = JsonData.companies[`${cid}`].products
      for (var key in products){
        if (JsonData.products[products[key].id].categories[selectedCategory] === undefined) {
          continue
        }
        products[key]['isIndian'] = true
        productsArr.push(products[key])
      }
      namespace = "products"
      param = "pid"
    } else {
      if (isIndianParam !== undefined) {
        if (allc !== undefined) {
          products = JsonData.categories[`${selectedCategory}`].companies
          for (var key in products){
            if (!products[key].isIndian) {
              continue
            }
            productsArr.push(products[key])
          }
          namespace = "companies"
          param = "cid"
        } else {
          products = JsonData.categories[`${selectedCategory}`]["products"]
          for (var key in products){
            if (!products[key].isIndian) {
              continue
            }
            productsArr.push(products[key])
          }
          namespace = "products"
          param = "pid"
        }
      } else if (allc !== undefined) {
        products = JsonData.categories[`${selectedCategory}`]["companies"]
        for (var key in products){
          productsArr.push(products[key])
        }
        namespace = "companies"
        param = "cid"
      } else {
        const products = JsonData.categories[`${selectedCategory}`]["products"]
        for (var key in products){
          productsArr.push(products[key])
        }
        namespace = "products"
        param = "pid"
      }
    }
    const productsSortedArr = productsArr.sort((a, b) => a.isIndian < b.isIndian ? 1 : -1).slice(0, this.state.postsToShow)
    // const productsSortedArr = productsArr.sort((a, b) => a.isIndian < b.isIndian ? 1 : -1)
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
              <PopulateProductCol param={param} namespace={namespace} index={index} products={productsSortedArr}/>
            </Row>
          </div>
        )
      }
    })
    return (rows)
  }

  render() {
    let subHeading
    const {pageContext, t} = this.props
    const { DisplayProducts} = this
    isIndianParam = queryString.parse(this.props.location.search).isIndian
    cid = queryString.parse(this.props.location.search).cid
    allc = queryString.parse(this.props.location.search).allc 
    catid = queryString.parse(this.props.location.search).catid || `grocery_staples_8Nj` // default category
    const category =  JsonData.categories[`${catid}`]

    if (cid !== undefined) {
      subHeading = `${t('category.all_pro_from')} ${JsonData.companies[`${cid}`].name}`
    } else {
      if (isIndianParam !== undefined) {
        if (allc !== undefined) {
          subHeading = t('category.all_ind_com')
        } else {
          subHeading =  t('category.all_ind_pro')
        }
      } else if (allc !== undefined) {
        subHeading = t('category.all_companies')
      } else {
        subHeading = t('category.all_products')
      }
    }
    return (
      <Layout showMessage={false} toggleView={this.toggleCategoryView}>
      {this.state.showCategory && <><Row className={styles.homeLink}>
        <Col>
          <ul  className={styles.homeNav} style={{listStyle: `none`, paddingLeft: `0`}}>
            <li style={{display: `inline-block`}}>
              <Link
                to={`/`}
                style={{ textDecoration: `none`, color: `inherit` }}
              >
                <span style={{ fontSize: `14px` ,color: `rgb(181, 181, 181)`}} className={`name`}>{t('home')}</span>
              </Link>
            </li>
            <li style={{display: `inline-block`}}>
              <a> &nbsp;
              <i className={styles.arrow + " " +  styles.right}></i> &nbsp; <span style={{  fontSize: `14px`, color: `rgb(181, 181, 181)`}} >{_.startCase(i18next.language === `en` ? category.name : category.name_hi)}</span>
              </a>
            </li>
          </ul>
          {/* <p style={{color: `rgb(181, 181, 181)`, marginBottom: `0px`}}>Back to home</p> */}
        </Col>
      </Row>
      <Row className={styles.pageTitle}>
        <Col>
          <p>{_.startCase(i18next.language === `en` ? category.name : category.name_hi)} <span style={{  fontSize: `12px`, color: `rgb(181, 181, 181)`}}>
            {subHeading}
          </span></p>
        </Col>
      </Row>
      <DisplayProducts selectedCategory={catid}/>
        {/* <div>{this.props.pageContext.id}</div> */}</>}
      </Layout>
    )
  }
}

export default withTrans(Category)