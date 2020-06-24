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
import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from  'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { MdCancel } from "react-icons/md"
import { MdCheckCircle } from "react-icons/md"
import companyPlaceHolder from '../images/company-icon-360.png'


var _ = require('lodash') 

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCompany: true,
     };
  }

  toggleCompanyView = (newVal) => {
    this.setState({showCompany: newVal})
  }

  DisplayCompanyInfo = (props) => {
    let company = JsonData.companies[`${props.companyId}`]
    let icon = <MdCancel/>
    let fontColor = `red`
    let alt_or_other = "Alternate"
    let altIndianCompanies = []
    let categoriesList = []
    for (var category in company.categories) {
      var categoryEndPoint = _.snakeCase(company.categories[category]["name"])
      categoriesList.push(
        <Link
              to={`/category/${categoryEndPoint}`}
              style={{ textDecoration: `none`, color: `maroon` }}
            >
          <span className={styles.altBrand} key={company.categories[category]["name"]} style={{bottom: `0px`}}  >{company.categories[category]["name"]} &nbsp;
          </span>
        </Link>
      )
      let categoryCompanies = JsonData.categories[category].companies
      let index = 0
      for (var altCompanyId in categoryCompanies) {
        let altCompany = categoryCompanies[altCompanyId]
        if (index === 10) {
          altIndianCompanies.push(
            <span className={styles.altBrand} key={altCompany.name} style={{bottom: `0px`}}  >
              <Link
                to={`/category/${categoryEndPoint}?isIndian=true`}
                style={{ textDecoration: `none`, color: `maroon` }}
              >
                See more
              </Link> &nbsp;
            </span>
          )
          break
        } 
        index = index + 1
        if (altCompanyId === props.companyId) {
          continue 
        }
        if (altCompany.isIndian) {
          var altCompanyEndPoint = _.snakeCase(altCompany.name)
          altIndianCompanies.push(
            <span className={styles.altBrand} key={altCompany.name} style={{bottom: `0px`}}  >
              <Link
                to={`/company/${altCompanyEndPoint}`}
                style={{ textDecoration: `none`, color: `maroon` }}
              >
                {altCompany.name},
              </Link> &nbsp;
            </span>
          )
        }
      }
    }
    if (company.isIndian) {
      icon = <MdCheckCircle/>
      fontColor = `green`
    }
    return(
      <>
        <div className={styles.pageContent + " " + `container-fluid`}>
          <div className="row d-md-block d-block">
            <Col  className={"float-left col-12" + " " + styles.companyImage } md={6}>
              <div className={`container`} style={{width: `fit-content`}}>
                <Image className={styles.companyImage} style={{
                  border: `0px`,
                  borderRadius: `0px`,
                }} thumbnail src={companyPlaceHolder}></Image>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.companyAttrWrapper} md={6}  style={{height: `fit-content`}}>
              <div className={styles.companyAttr}>
                <div className={styles.companyAttrKey}>
                  <span>Key Features</span>
                </div>
                <div className={styles.companyAttrDesc}>
                  Made with superior quality wheat 
                  <br/>Prepares soft and delicious roti
                  <br/>Rich source of Fibre
                  <br/>Consists of heavier in feel quality flour
                </div>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.companyAttrWrapper} md={6} style={{height: `60px`}}>
              <div className={styles.companyAttr}>
                <div className={styles.companyAttrKey}>
                  <span>Is Indian?</span>
                </div>
                <div className={styles.companyAttrDesc}>
                  <span style={{color: fontColor, fontWeight: `bold`}} >Indian &nbsp;
                    {icon}
                  </span>
                </div>
              </div>
            </Col>
            <Col className={"float-left col-6" + " " + styles.companyAttrWrapper} md={6}  style={{height: `fit-content`}}>
              <div className={styles.companyAttr}>
                <div className={styles.companyAttrKey}>
                  <span>Categories</span>
                </div>
                <div className={styles.companyAttrDesc}>
                  {categoriesList}
                </div>
              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.companyAttrWrapper}  md={6} style={{height: `fit-content`}}>
              <div className={styles.companyAttr}>
                <div className={styles.companyAttrKey}>
                  <span>{alt_or_other} Indian Companies</span>
                </div>
                <div className={styles.companyAttrDesc}>
                  {altIndianCompanies}
                </div>
              </div>
            </Col>
            <Col className={"float-left col-12" + " " + styles.companyAttrWrapper} md={12}  style={{height: `fit-content`}}>
              <div className={styles.companyAttr}>
                <div className={styles.companyAttrKey}>
                  <span>Description</span>
                </div>
                <div className={styles.companyAttrDesc}>
                  Aashirvaad Shudh Chakki Whole Wheat Atta is ground with utmost precision, using the traditional chakki-grinding process by picking the choicest of grains to give you fresh and 100% pure wheat flour. Enriched with wholesome vitamins, it can be used to prepare the softest of roti's. The use of superior quality grains makes Aashirvaad Whole Wheat Atta a healthy and wholesome choice. Pure wheat grain, without any Maida addition, is used in the preparation of the flour. Helps in making soft and delicious chapatis. Provides fibre content to the body. Extra protein enrichments strengthen the body.
                </div>
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
    const company =  JsonData.companies[`${pageContext.id}`]
    return (
      <Layout showMessage={false} toggleView={this.toggleCompanyView}>
      {this.state.showCompany && <><Row className={styles.homeLink}>
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
      <DisplayCompanyInfo companyId={pageContext.id}/>
        {/* <div>{this.props.pageContext.id}</div> */}</>}
      </Layout>
    )
  }
}

export default Company
