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
import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from  'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { MdCancel } from "react-icons/md"
import { MdCheckCircle } from "react-icons/md"
import companyPlaceHolder from '../images/company-96.png'
import companyPlaceHolderGreen from '../images/company-96.png'
import Button from 'react-bootstrap/Button';
import firebase from "gatsby-plugin-firebase"
import { withTrans } from '../i18n/withTrans'
import i18next from 'i18next';
import Axios from "axios"
import LoaderSVG from '../images/loader.svg'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

var _ = require('lodash')
const queryString = require('query-string');
let cid

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCompany: true,
      company: {},
      isLoading: true,
      cid: null,
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

  toggleCompanyView = (newVal) => {
    this.setState({showCompany: newVal})
  }
  
  async componentDidMount() {
    Axios.get(`https://buy-swadeshi-backend-prod.herokuapp.com/company.json?cid=${encodeURIComponent(this.state.cid)}`)
      .then(result => {
        this.setState({ company: result.data, isLoading: false })
      })
      .catch(err => {
        console.log(`====================================`)
        console.log(`Something bad happened while fetching the data\n${err}`)
        console.log(`====================================`)
      })
  }

  async componentDidUpdate(){
    if (this.state.cid !== queryString.parse(this.props.location.search).cid) {
      Axios.get(`https://buy-swadeshi-backend-prod.herokuapp.com/company.json?cid=${encodeURIComponent(queryString.parse(this.props.location.search).cid)}`)
        .then(result => {
          this.setState({ company: result.data, isLoading: false, cid: queryString.parse(this.props.location.search).cid })
          // this.rebuildIndex()
        })
        .catch(err => {
          // this.setState({ isError: true })
          console.log(`====================================`)
          console.log(`Something bad happened while fetching the data\n${err}`)
          console.log(`====================================`)
        })
    }
  }

  componentWillMount(){
    this.setState({cid: queryString.parse(this.props.location.search).cid})
  }

  DisplayCompanyInfo = (props) => {
    const {t} = this.props
    let company = this.state.company
    let icon = <MdCancel/>
    let alt_or_other = t('alt')
    let altIndianCompanies = []
    let categoriesList = []
    let remark
    let remarkText = t('not_indian')
    let btnColor = `#ffdeda`
    let fontColor = `#a52014`
    let companyImage = ((company.image !== "") ? company.image : companyPlaceHolder)
    let parentCategory
    for (var category in company.categories) {
      if (company.categories[category].isParent && parentCategory === undefined) {
        parentCategory = company.categories[category]
      }
      categoriesList.push(
        <Link
              to={`/categories?catid=${encodeURIComponent(category)}&cid=${encodeURIComponent(company.id)}`}
              style={{ textDecoration: `none`, color: `maroon` }}
            >
          <span onClick={() => this.sendFirebaseAnalytics(`category`,  company.categories[category]["id"])} className={styles.altBrand} key={company.categories[category]["name"]} style={{bottom: `0px`}}  >{i18next.language === `hi` ? company.categories[category]["name_hi"] : company.categories[category]["name"]}, </span>
        </Link>
      )
    }


    for (var altCompanyId in company.alt_companies) {
      let altCompany = company.alt_companies[altCompanyId]
      let altCompImage = altCompany.image === "" ? companyPlaceHolderGreen : altCompany.image
      altIndianCompanies.push(
        <Col className={styles.otherCompanyScroller} xs={12} md={12} lg={12} xl={12}>
          <Row>
            <Col xs={2} md={2} lg={2} xl={2} style={{
                borderRightColor: `white`,
                borderRightStyle: `solid`,
                borderRightWidth: `2px`
              }} onClick={() => this.sendFirebaseAnalytics(`company`,  company.categories[category]["id"])} >
              <Link
                to={`/companies?cid=${encodeURIComponent(altCompany.id)}`}
                style={{ textDecoration: `none`}}
              >
                <Image  style={{
                    border: `0px`,
                    borderRadius: `0px`,
                    padding: `0px`,
                    height: `auto !important`,
                    maxWidth: `100%`
                    }} thumbnail src={altCompImage}>
                </Image>
              </Link>
            </Col>
            <Col xs={6} md={6} lg={6} xl={6} style={{
                borderRightColor: `white`,
                borderRightStyle: `solid`,
                borderRightWidth: `2px`,
                maxHeight: `40px`,
                overflow: `scroll`
              }} onClick={() => this.sendFirebaseAnalytics(`company`,  altCompany.id)}>
              <Link
                to={`/companies?cid=${encodeURIComponent(altCompany.id)}`}
                style={{ textDecoration: `none`, color: `#176f52`}}
              >
                <p>{i18next.language === `hi` ? altCompany.name_hi : altCompany.name}</p>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4} xl={4} style={{
              maxHeight: `40px`
            }} onClick={() => this.sendFirebaseAnalytics(`company`,  company.id)}>
              <Link
                to={`/categories?catid=${encodeURIComponent(altCompany.parent_category)}&cid=${encodeURIComponent(altCompany.id)}`}
                style={{ textDecoration: `none`, color: `#176f52`}}
              >
              <p>{t('see_products')}</p>
              </Link>
            </Col>
          </Row>
        </Col>
      )

      let seeMoreText = t('see_more')
      let seeMoreLink = `/categories?catid=${encodeURIComponent(parentCategory.id)}&isIndian=true&allc=true`
      if (altIndianCompanies.length === 0) {
        seeMoreText = t('no_indian_com_found')
        seeMoreLink = "#"
      } else if ((altIndianCompanies.length === 10)) {
        altIndianCompanies.push(
          <Col className={styles.otherCompanyScroller} xs={12} md={12} lg={12} xl={12}>
            <Row>
              <Link
                to={seeMoreLink}
                style={{ textDecoration: `none`, color: `#176f52`, margin: `auto`}}
              >
                <Col xs={12} md={12} lg={12} xl={12} style={{
                  marginTop: `10px`
                }} onClick={() => this.sendFirebaseAnalytics(`company`,  `see_more`)}>
                  <p>{seeMoreText}</p>
                </Col>
              </Link> &nbsp;
            </Row>
          </Col>
        )
        break
      }
    }


    if (company.isIndian) {
      remarkText = t('indian')
      btnColor = `#ccf6e3`
      fontColor = `#176f52`
      fontColor = `green`
      alt_or_other = t('other')
    }
    remark = <span style={{color: fontColor , bottom: `0px`}} >{remarkText}
                  </span>
    return(
      <>
        <div className={styles.pageContent + " " + `container-fluid`}>
          <div className="row d-md-block d-block">
            <Col  className={"float-left col-12" + " " + styles.companyImage } md={6}>
              <div className={`container`} style={{width: `fit-content`}}>
                <Image className={styles.companyImage} style={{
                  border: `0px`,
                  borderRadius: `0px`,
                }} thumbnail src={companyImage}></Image>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.companyAttrWrapper} md={6} style={{height: `60px`}}>
              <div className={styles.companyAttr}>
                {/* <div className={styles.companyAttrKey}>
                  <span>Is Indian?</span>
                </div> */}
                <div className={styles.companyAttrDesc}>
                  <Button style={{backgroundColor: btnColor, border: btnColor, marginTop: `10px`}}>{remark}</Button>
                  {/* <span style={{color: fontColor, fontWeight: `bold`}} >Indian &nbsp;
                    {icon}
                  </span> */}
                </div>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.companyAttrWrapper} md={6}  style={{height: `fit-content`}}>
              <div className={styles.companyAttr}>
                <div className={styles.companyAttrKey}>
                  <span>Categories</span>
                </div>
                <div className={styles.companyAttrDesc} style={{
                  overflow: `scroll`,
                  maxHeight: `60px`
                }}>
                  {categoriesList}
                </div>
              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.companyAttrWrapper}  md={6} style={{height: `fit-content`}}>
              <div className={styles.companyAttr}>
                <div className={styles.companyAttrKey}>
                  <span>{alt_or_other} {t('alt_indian_comp')}</span>
                </div>
                <Row style={{height: `200px`, overflow: `scroll`, marginRight: `0px`, marginLeft: `0px`}}>
                  {altIndianCompanies}
                </Row>
              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.companyAttrWrapper} md={12}  style={{height: `fit-content`}}>
              <div className={styles.companyAttr}>

              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.companyAttrWrapper} md={12} style={{height: `fit-content`}}>
              <div className={styles.companyAttr}>
                <div className={styles.companyAttrKey}>
                  <span>{t('disclaimer')}</span>
                </div>
                <div className={styles.companyAttrDesc}>{t('disclaimer_text')}</div>
              </div>
            </Col>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {pageContext, t} = this.props
    const { DisplayCompanyInfo} = this
    var {isLoading} = this.state
    if (this.state.cid !== queryString.parse(this.props.location.search).cid) {
      isLoading = true
    }
    const company = this.state.company
    if (isLoading) {
      let altIndianBrands = []
      for (let index = 0; index < 3; index++) {
        altIndianBrands.push(
          <Col xs={12} md={12} lg={12} xl={12}>
          <Row>
            <Col xs={12} md={12} lg={12} xl={12}>
              <Skeleton count={1} height= {`60px`}/>
            </Col>
          </Row>
        </Col>
        )
        
      }
      return (
        <Layout showMessage={false} toggleView={this.toggleProductView}>
        <Row className={styles.homeLink}>
          <Col>
            <Skeleton count={1} width={150}/>
            {/* <p style={{color: `rgb(181, 181, 181)`, marginBottom: `0px`}}>Back to home</p> */}
          </Col>
        </Row>
        <Row className={styles.pageTitle}>
          <Col>
            <Skeleton count={1} width={80}/>
          </Col>
        </Row>
        <div className={styles.pageContent + " " + `container-fluid`}>
          <div className="row d-md-block d-block">
            <Col  className={"float-left col-12" + " " + styles.productImage } md={6}>
              <div className={`container`} style={{minWidth: `100%`}}>
                <Skeleton count={1} height= {`200px`}/>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6} style={{height: `60px`}}>
              <Skeleton count={1} height= {`100%`}/>
            </Col>
            <Col className={"float-left col-6" + " " + styles.productAttrWrapper} md={6} style={{height: `60px`}}>
              <Skeleton count={1} height= {`100%`}/>
            </Col>
            <Col className={"float-left col-12" + " " + styles.productAttrWrapper} md={6}>
              <div className={styles.productAttr}>
                  <div className={styles.productAttrKey}>
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
        </Layout>
      )
    }
    return (
      <Layout showMessage={false} toggleView={this.toggleCompanyView}>
      {this.state.showCompany && <><Row className={styles.homeLink}>
        <Col>
          <ul  className={styles.homeNav} style={{listStyle: `none`, paddingLeft: `0`}}>
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
              <i className={styles.arrow + " " +  styles.right}></i> &nbsp; <span style={{  fontSize: `14px`, color: `rgb(181, 181, 181)`}} >{_.startCase(i18next.language === `hi` ? company.name_hi : company.name)}</span>
              </a>
            </li>
          </ul>
          {/* <p style={{color: `rgb(181, 181, 181)`, marginBottom: `0px`}}>Back to home</p> */}
        </Col>
      </Row>
      <Row className={styles.pageTitle}>
        <Col>
          <p>{_.startCase(i18next.language === `hi` ? company.name_hi : company.name)}</p>
        </Col>
      </Row>
      <DisplayCompanyInfo companyId={cid}/>
        {/* <div>{this.props.pageContext.id}</div> */}</>}
      </Layout>
    )
  }
}

export default withTrans(Company)
