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
    return(
      <div></div>
    )
  }

  render() {
    const {pageContext} = this.props
    const { DisplayCompanyInfo} = this
    const company =  JsonData.companies[`${pageContext.id}`]
    return (
      <Layout showMessage={false} toggleView={this.toggleCompanyView}>
      {this.state.showCompany && <><Row>
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
      <Row>
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
