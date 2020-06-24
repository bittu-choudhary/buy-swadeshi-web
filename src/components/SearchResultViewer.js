import React from "react"
import { MdCancel } from "react-icons/md"
import { MdCheckCircle } from "react-icons/md"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "gatsby"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import productPlaceHolder from '../images/product-placeholder-white-bg.png'
import companyPlaceHolder from '../images/company-icon.png'

var _ = require('lodash') 

const PopulateResultCol = (props) => {
  const {index, results} = props
  let loopLength = index + 5 <results.length ? index + 5 : (results.length - 1)
  let col = []
  let placeholder = productPlaceHolder
  for (let i = index; i <= loopLength ; i++ ) {
    const resultId = results[i]
    // console.log(resultId)
    let remark
    let remarkText = "Not Indian"
    let caption = ""
    let fontColor = `black`
    let btnColor = `#f0745b`
    let nameSpace
    if (resultId.type === "category") {
      remark = <span style={{color: fontColor, bottom: `0px`}} >See Brands</span>
      nameSpace = `category`
    } else {
      if (resultId.type === `product`){
        nameSpace = `product`
      } else {
        nameSpace = `company`
        placeholder = companyPlaceHolder
      }
      if (resultId.isIndian) {
        btnColor = `#85c8ab`
        remarkText = "Indian"
      }
      remark = <span style={{color: fontColor, bottom: `0px`}} >{remarkText}</span>
    }
    var resultEndPoint = _.snakeCase(resultId.name)
    col.push(
      <Col style={{padding: `5px`}} key={resultId.id} id={resultId.id} xs={12} md={4} lg={4} xl={4}>
        <Link
          to={`/${nameSpace}/${resultEndPoint}`}
          style={{ textDecoration: `none`, color: `inherit` }}
        >
          <div style={{borderRadius: `0px`}} className={`container` + ` ` + styles.categoryCol + " " + styles.productCol } style={{
            paddingLeft: `0px`,
            paddingRight: `0px`
          }}>
            <Row className={styles.productCardImage}>
              <Col className={`col-12` }  style={{height: `100%`}}>
                <div className={`container`} style={{width: `fit-content`, height: `100%`}}>
                  <Image className={styles.productImage} style={{
                    border: `0px`,
                    borderRadius: `0px`,
                    maxHeight: `100%`,
                    padding: `0px !important`,
                  }} thumbnail src={placeholder}></Image>
                </div>
              </Col>
            </Row>
            <Row>
              <Col style={{minHeight: `24px`}} xs={12} md={12} lg={6} xl={6} className={`col-6` +" " + styles.searchResultTitle}>
                 <Button className={`btn-sm btn-block` + ` ` + styles.btnCustomBlock } style={{backgroundColor: `#f9f1bb`, border: `#f9f1bb`, color: `black`, fontSize: `.85rem`}}>{resultId.name}
                 <span 
                    style={{
                      fontSize: `12px`,
                      color: `gray`}}>
                      {caption}
                    </span>
                    </Button>
                {/* <div style={{textAlign: `center`}}>
                  <p style={{textAlign: `center`, marginBottom: `0px`}}>
                    {resultId.name}
                    <span 
                    style={{
                      fontSize: `12px`,
                      color: `gray`}}>
                      {caption}
                    </span>
                  </p> */}
                    {/* <Image src={CartIcon} thumbnail /> */}
                {/* </div> */}
              </Col>
              <Col xs={12} md={12} lg={6} xl={6} className={styles.isIndianBtn}>
                  <Button className={`btn-sm` + ` ` + styles.btnCustomBlock } style={{backgroundColor: btnColor, border: btnColor}}>{remark}</Button>
                </Col>
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

const DisplayResults = (props) => {
  const {queryResults} = props
  // console.log(selectedCategory)
  // const products = CategoriesData.categories[`${selectedCategory}`]["products"]
  // console.log(products)
  let order = { product: 1, category: 2, company: 3 };
  queryResults.sort(function (a, b) {
    return order[a.type] - order[b.type];
  })
  const rows =queryResults.map((result, index) => {
    if( index%6 === 0) {
      return (<Row id={`res_row_` + index} key={`res_row_` + index} style={{paddingLeft: `15px`, paddingRight: `15px`}}>
        <PopulateResultCol index={index} results={queryResults} />
      </Row>)
    }
  })
  return (rows)
}

export default function SearchResultViewer ( props  ) {
  const { t } = useTranslation()
  const {queryResults} = props

  if (queryResults.length === 0) {
    return <div></div>
  }

  return (
    <div class="container" style={{
      padding: `8px`,
      marginTop: `40px`,
      backgroundColor: `#f7f5f5`,
      borderRadius: `14px`}}>
      <DisplayResults queryResults={queryResults} />
    </div>
  )
}