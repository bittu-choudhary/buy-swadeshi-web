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
import companyPlaceHolder from '../images/company-icon-360.png'
import companyPlaceHolderGreen from '../images/company-icon-light-green.png'
import Button from 'react-bootstrap/Button';
import firebase from "gatsby-plugin-firebase"


var _ = require('lodash')
const queryString = require('query-string');
let cid

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCompany: true,
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

  DisplayCompanyInfo = (props) => {
    let company = JsonData.companies[`${props.companyId}`]
    let icon = <MdCancel/>
    let alt_or_other = "Alternate"
    let altIndianCompanies = []
    let categoriesList = []
    let remark
    let remarkText = "Not Indian"
    let btnColor = `#ffdeda`
    let fontColor = `#a52014`
    let companyImage = ((company.image !== "") ? company.image : companyPlaceHolder)
    for (var category in company.categories) {
      var categorySlugName = company.categories[category]["name"]
      if (categorySlugName && categorySlugName.split(" ").length === 1){
        categorySlugName = ` The ` + categorySlugName
      }
      var categoryEndPoint = _.snakeCase(categorySlugName)
      categoriesList.push(
        <Link
              to={`/categories?catid=${encodeURIComponent(category)}&cid=${encodeURIComponent(company.id)}`}
              style={{ textDecoration: `none`, color: `maroon` }}
            >
          <span onClick={() => this.sendFirebaseAnalytics(`category`,  company.categories[category]["id"])} className={styles.altBrand} key={company.categories[category]["name"]} style={{bottom: `0px`}}  >{company.categories[category]["name"]}, </span>
        </Link>
      )
      if (company.categories[category].isParent && altIndianCompanies.length < 10) {
        let categoryCompanies = JsonData.categories[category].companies
        let index = 0
        let altComCount = 0
        for (var altCompanyId in categoryCompanies) {
          let altCompany = categoryCompanies[altCompanyId]
          index = index + 1
          if (altCompanyId === props.companyId) {
            continue
          }
          if (altCompany.isIndian) {
            altComCount =  altComCount + 1
            var altCompanySlugName = altCompany.name
            if (altCompanySlugName && altCompanySlugName.split(" ").length === 1){
              altCompanySlugName = ` The ` + altCompanySlugName
            }
            var altCompanyEndPoint = _.snakeCase(altCompanySlugName)
            altIndianCompanies.push(
              <Col className={styles.otherCompanyScroller} xs={12} md={12} lg={12} xl={12}>
                <Row>
                  <Col xs={2} md={2} lg={2} xl={2} style={{
                      borderRightColor: `white`,
                      borderRightStyle: `solid`,
                      borderRightWidth: `2px`
                    }} onClick={() => this.sendFirebaseAnalytics(`company`,  company.categories[category]["id"])} >
                    <Link
                      to={`/categories?catid=${encodeURIComponent(category)}&isIndian=true&allc=true`}
                      style={{ textDecoration: `none`}}
                    >
                      <Image  style={{
                          border: `0px`,
                          borderRadius: `0px`,
                          padding: `0px`,
                          height: `auto !important`,
                          maxWidth: `100%`
                          }} thumbnail src={companyPlaceHolderGreen}>
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
                      <p>{altCompany.name}</p>
                    </Link>
                  </Col>
                  <Col xs={4} md={4} lg={4} xl={4} style={{
                    maxHeight: `40px`
                  }} onClick={() => this.sendFirebaseAnalytics(`company`,  company.id)}>
                    <Link
                      to={`/categories?catid=${encodeURIComponent(category)}&cid=${encodeURIComponent(altCompany.id)}`}
                      style={{ textDecoration: `none`, color: `#176f52`}}
                    >
                    <p>See Products</p>
                    </Link>
                  </Col>
                </Row>
              </Col>
            )
          }
          let seeMoreText = "See more"
          let seeMoreLink = `/categories?${encodeURIComponent(category)}&isIndian=true&allc=true`
          if (altIndianCompanies.length === 0) {
            seeMoreText = "No Indian company found"
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
      }
    }
    if (company.isIndian) {
      remarkText = "Indian"
      btnColor = `#ccf6e3`
      fontColor = `#176f52`
      fontColor = `green`
      alt_or_other = "Other"
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
                  <span>{alt_or_other} Indian Companies</span>
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
                  <span>Disclaimer</span>
                </div>
                <div className={styles.companyAttrDesc}>
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
    const { DisplayCompanyInfo} = this
    cid = queryString.parse(this.props.location.search).cid || `s.narendrakumar_&_co_9Se` // default company
    const company =  JsonData.companies[`${cid}`]
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
                <span style={{ fontSize: `14px` ,color: `rgb(181, 181, 181)`}} class="name">Home</span>
              </Link>
            </li>
            <li style={{display: `inline-block`}}>
              <a> &nbsp;
              <i className={styles.arrow + " " +  styles.right}></i> &nbsp; <span style={{  fontSize: `14px`, color: `rgb(181, 181, 181)`}} >{_.startCase(company.name)}</span>
              </a>
            </li>
          </ul>
          {/* <p style={{color: `rgb(181, 181, 181)`, marginBottom: `0px`}}>Back to home</p> */}
        </Col>
      </Row>
      <Row className={styles.pageTitle}>
        <Col>
          <p>{_.startCase(company.name)}</p>
        </Col>
      </Row>
      <DisplayCompanyInfo companyId={cid}/>
        {/* <div>{this.props.pageContext.id}</div> */}</>}
      </Layout>
    )
  }
}

export default Company
