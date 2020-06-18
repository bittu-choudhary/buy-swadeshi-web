import React from "react"
import { MdCancel } from "react-icons/md"
import { MdCheckCircle } from "react-icons/md"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "gatsby"

var _ = require('lodash') 

const PopulateResultCol = (props) => {
  let icon = <MdCancel/>
  let fontColor = `red`
  const {index, results} = props
  let loopLength = index + 5 <results.length ? index + 5 : (results.length - 1)
  let col = []
  for (let i = index; i <= loopLength ; i++ ) {
    const resultId = results[i]
    // console.log(resultId)
    let remark
    let caption
    if (resultId.type === "category") {
      remark = <span style={{color: `#155724`}} className={styles.searchResultIndianIcon} > See Products
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
      remark = <span style={{color: fontColor}} className={styles.searchResultIndianIcon} >Indian &nbsp;
                  {icon}
                </span>
    }
    col.push(
      <Col style={{ padding: `1px`}} key={resultId.id} id={resultId.id} xs={6} md={6} lg={2} xl={2}>
        <Link
          to={`/${_.lowerCase(caption)}/${resultId.name}`}
          style={{ textDecoration: `none`, color: `inherit` }}
        >
          <div className={styles.categoryCol + " " + styles.productCol } style={{border:`1px solid #dcdcdc` }} >
            <Row style={{height: `20%`}}>
              <div className={styles.searchResultTitle} style={{textAlign: `center`}}>
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
            </Row>
            <Row style={{height: `60%`}}></Row>
            <Row style={{height: `20%`}}>
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
      return (<Row id={`res_row_` + index} key={`res_row_` + index} style={{paddingLeft: `15px`, paddingRight: `15px`, paddingBottom: `5px`}}>
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
    <div class="container" style={{paddingTop: `50px`}}>
      <DisplayResults queryResults={queryResults} />
    </div>
  )
}