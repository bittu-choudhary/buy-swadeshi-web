import React from "react"
import { MdCancel } from "react-icons/md"
import { MdCheckCircle } from "react-icons/md"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "gatsby"
import Image from 'react-bootstrap/Image'

var _ = require('lodash') 

const PopulateResultCol = (props) => {
  const {index, results} = props
  let loopLength = index + 5 <results.length ? index + 5 : (results.length - 1)
  let col = []
  for (let i = index; i <= loopLength ; i++ ) {
    const resultId = results[i]
    // console.log(resultId)
    let remark
    let caption
    let icon = <MdCancel/>
    let fontColor = `red`
    if (resultId.type === "category") {
      remark = <span style={{color: `#155724`, bottom: `0px`}} className={styles.searchResultIndianIcon} > See Products
                </span>
      caption = `Category`
    } else {
      if (resultId.type === `product`){
        caption = `Product`
      } else {
        caption = `Company`
      }
      if (resultId.isIndian) {
        icon = <MdCheckCircle/>
        fontColor = `green`
      }
      remark = <span style={{color: fontColor, bottom: `0px`}} className={styles.searchResultIndianIcon} >Indian &nbsp;
                  {icon}
                </span>
    }
    var resultEndPoint = _.snakeCase(resultId.name)
    col.push(
      <Col style={{padding: `5px`}} key={resultId.id} id={resultId.id} xs={6} md={4} lg={4} xl={4}>
        <Link
          to={`/${_.snakeCase(caption)}/${resultEndPoint}`}
          style={{ textDecoration: `none`, color: `inherit` }}
        >
          <div className={styles.categoryCol + " " + styles.productCol }>
            <Row>
              <Col className={`col-12` }>
                <div className={`container`} style={{width: `fit-content`, height: `80px`}}>
                  <Image className={styles.productImage} style={{
                    border: `0px`,
                    borderRadius: `0px`,
                    maxHeight: `100%`,
                    padding: `0px !important`,
                  }} thumbnail src={`http://cdn.grofers.com/app/images/products/normal/pro_380157.jpg?ts=1582006627`}></Image>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={`col-12` +" " + styles.searchResultTitle}>
                <div style={{textAlign: `center`}}>
                  <p style={{textAlign: `center`, marginBottom: `0px`}}>
                    {resultId.name}
                  </p>
                  <span 
                  style={{
                    fontSize: `12px`,
                    color: `gray`}}>
                  {caption}
                </span>
                    {/* <Image src={CartIcon} thumbnail /> */}
                </div>
              </Col>
            </Row>
            <Row>
              {remark}
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