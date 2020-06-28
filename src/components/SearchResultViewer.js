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
import firebase from "gatsby-plugin-firebase"

var _ = require('lodash')

const sendFirebaseAnalytics = (type, resourceId) => {
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

const PopulateResultCol = (props) => {
  const {index, results, toggleInput} = props
  let loopLength = index + 5 <results.length ? index + 5 : (results.length - 1)
  let col = []
  for (let i = index; i <= loopLength ; i++ ) {
    let resultImage = productPlaceHolder
    const resultId = results[i]
    let remark
    let remarkText = "Not Indian"
    let caption = ""
    let fontColor = `#a52014`
    let btnColor = `#ffdeda`
    let nameSpace
    let param
    if (resultId.type === "category") {
      remark = <span style={{color: fontColor, bottom: `0px`}} >See Brands</span>
      nameSpace = `categories`
      param = `catid`
    } else {
      if (resultId.type === `product`){
        nameSpace = `products`
        param = `pid`
      } else {
        nameSpace = `companies`
        param = `cid`
        resultImage = companyPlaceHolder
      }
      if (resultId.isIndian) {
        btnColor = `#ccf6e3`
        remarkText = "Indian"
        fontColor = `#176f52`
      }
      remark = <span style={{color: fontColor, bottom: `0px`}} >{remarkText}</span>
    }
    if  (resultId.image !== "") {
      resultImage = resultId.image
    }
    var searchSlugName = resultId.name
    if (searchSlugName && searchSlugName.split(" ").length === 1){
      searchSlugName = ` The ` + searchSlugName
    }
    var resultEndPoint = _.snakeCase(searchSlugName)
    col.push(
      <Col onClick={() => sendFirebaseAnalytics(resultId.type, resultId.id)} style={{padding: `5px`}} key={resultId.id} id={resultId.id} xs={12} md={4} lg={4} xl={4}>
        <Link
          to={`/${nameSpace}?${param}=${encodeURIComponent(resultId.id)}`}
          style={{ textDecoration: `none`, color: `inherit` }}
        >
          <div onClick={() => toggleInput()} style={{borderRadius: `0px`}} className={`container` + ` ` + styles.categoryCol + " " + styles.productCol } style={{
            paddingLeft: `0px`,
            paddingRight: `0px`
          }}>
            <Row className={styles.productCardImage}>
              <Col className={`col-12`}  style={{height: `100%`}}>
                <div className={`container`  + ` ` + styles.resultImage} style={{width: `fit-content`, height: `100%`}}>
                  <Image className={styles.productImage} style={{
                    border: `0px`,
                    borderRadius: `0px`,
                    maxHeight: `100%`,
                    padding: `0px !important`,
                  }} thumbnail src={resultImage}></Image>
                </div>
              </Col>
            </Row>
            <Row>
              <Col style={{minHeight: `24px`}} xs={12} md={12} lg={6} xl={6} className={`col-6` +" " + styles.searchResultTitle}>
                 <Button className={`btn-sm btn-block` + ` ` + styles.btnCustomBlock } style={{backgroundColor: `#fff3cc`, border: `#fff3cc`, color: `#7b5f05`, fontSize: `.85rem`, height: `29px`,
    overflow: `scroll`}}>{resultId.name}
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
  const {queryResults, toggleInput} = props
  let order = { product: 1, category: 2, company: 3 };
  queryResults.sort(function (a, b) {
    return order[a.type] - order[b.type];
  })
  const rows =queryResults.map((result, index) => {
    if( index%6 === 0) {
      return (<Row id={`res_row_` + index} key={`res_row_` + index} style={{paddingLeft: `15px`, paddingRight: `15px`}}>
        <PopulateResultCol toggleInput={toggleInput} index={index} results={queryResults} />
      </Row>)
    }
  })
  return (rows)
}

export default function SearchResultViewer ( props  ) {
  const { t } = useTranslation()
  const {queryResults, toggleInput} = props

  if (queryResults.length === 0) {
    return <div></div>
  }

  return (
    <div class="container" style={{
      padding: `8px`,
      marginTop: `40px`,
      backgroundColor: `#f7f5f5`,
      borderRadius: `14px`}}>
      <DisplayResults toggleInput={toggleInput} queryResults={queryResults} />
    </div>
  )
}
