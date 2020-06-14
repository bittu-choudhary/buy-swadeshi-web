import React from "react"
import { MdCancel } from "react-icons/md"
import { MdCheckCircle } from "react-icons/md"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PopulateResultCol = (props) => {
  let icon = <MdCancel/>
  let fontColor = `red`
  const {index, results} = props
  let loopLength = index + 5 <results.length ? index + 5 : (results.length - 1)
  let col = []
  for (let i = index; i <= loopLength ; i++ ) {
    const resultId = results[i]
    console.log(resultId)
    if (resultId.isIndian) {
      icon = <MdCheckCircle/>
      fontColor = `green`
    }
    col.push(
      <Col style={{ padding: `1px`}} key={resultId.name} id={resultId.name} xs={6} md={6} lg={2} xl={2}>
        <div className={styles.categoryCol + " " + styles.productCol } style={{border:`1px solid #dcdcdc` }} >
          <Row style={{height: `20%`}}>
            <div className={styles.searchResultTitle}>
              <p style={{textAlign: `center`}}>
                {resultId.name}
              </p>
                {/* <Image src={CartIcon} thumbnail /> */}
            </div>
          </Row>
          <Row style={{height: `60%`}}></Row>
          <Row style={{height: `20%`}}>
            <span style={{color: fontColor}} className={styles.searchResultIndianIcon} >Indian &nbsp;
                {icon}
              </span>
          </Row>
        </div>
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
  const resultsSortedArr = queryResults.sort((a, b) => a.isIndian < b.isIndian ? 1 : -1)
  const rows =resultsSortedArr.map((result, index) => {
    if( index%6 === 0) {
      return (<Row id={`res_row_` + index} key={`res_row_` + index} style={{paddingLeft: `15px`, paddingRight: `15px`, paddingBottom: `5px`}}>
        <PopulateResultCol index={index} results={resultsSortedArr}/>
      </Row>)
    }
  })
  return (rows)
}

export default function SearchResultViewer ( props  ) {
  const { t } = useTranslation()
  const queryResults = props.queryResults
  let fontColor = "red"
  let icon = <MdCheckCircle/>

  if (queryResults.length === 0) {
    return <div></div>
  }

  return (
    <div class="container" style={{paddingTop: `50px`}}>
      <DisplayResults queryResults={queryResults} />
    </div>
  )
  
  // return (<div>
  //   {/* Number of items:
  //   {queryResults.length} */}
  //   <table className={styles.searchResultTable}
  //     style={{
  //       borderSpacing: `0 5px`,
  //       marginTop: `1rem`,
  //       width: `100%`,
  //       borderRadius: `4px`,
  //       backgroundColor: `#ff9933`,
  //       borderCollapse: `separate`
  //     }}
  //   >
  //     <thead style={{ border: `1px solid #808080` }}>
  //       <tr>
  //         <th
  //           style={{
  //             textAlign: `left`,
  //             padding: `5px`,
  //             fontSize: `18px`,
  //             fontWeight: 600,
  //             cursor: `pointer`,
  //             borderTopLeftRadius: `5px`,
  //             borderBottomLeftRadius: `5px`,
  //             backgroundColor: `#ffffff`,
  //             width: `33%`
  //           }}
  //         >
  //            {t('brand_name')}
  //         </th>
  //         <th
  //           style={{
  //             textAlign: `left`,
  //             padding: `5px`,
  //             fontSize: `18px`,
  //             fontWeight: 600,
  //             cursor: `pointer`,
  //             backgroundColor: `#ffffff`,
  //             width: `33%`
  //           }}
  //         >
  //            {t('brand_category')}
  //         </th>
  //         <th
  //           style={{
  //             textAlign: `center`,
  //             padding: `5px`,
  //             fontSize: `18px`,
  //             fontWeight: 600,
  //             cursor: `pointer`,
  //             borderTopRightRadius: `5px`,
  //             borderBottomRightRadius: `5px`,
  //             backgroundColor: `#ffffff`,
  //             width: `33%`
  //           }}
  //         >
  //            {t('is_indian')}
  //         </th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {/* eslint-disable */}
  //       {queryResults.sort((a, b) => a.isIndian < b.isIndian ? 1 : -1).map((item, index) => {
  //         if (item.isIndian) {
  //           fontColor = "green"
  //           icon = <MdCheckCircle/>
  //         } else {
  //           fontColor = "red"
  //           icon = <MdCancel/>
  //         }
  //         return (
  //           <tr  style={{ color: fontColor }} key={`row_${item.name}_${index}`}>
  //             <td
  //               style={{
  //                 fontSize: `18px`,
  //                 padding: `5px`,
  //                 borderTopLeftRadius: `5px`,
  //                 borderBottomLeftRadius: `5px`,
  //                 backgroundColor: `#ffffff`,
  //               }}
  //             >
  //               {item.name}
  //             </td>
  //             <td
  //               style={{
  //                 fontSize: `18px`,
  //                 padding: `5px`,
  //                 backgroundColor: `#ffffff`,
  //               }}
  //             >
  //               {item.category}
  //             </td>
  //             <td
  //               style={{
  //                 textAlign: `center`,
  //                 fontSize: `18px`,
  //                 padding: `5px`,
  //                 borderTopRightRadius: `5px`,
  //                 borderBottomRightRadius: `5px`,
  //                 backgroundColor: `#ffffff`,
  //               }}
  //             >
  //               {icon}
  //             </td>
  //           </tr>
  //         )
  //       })}
  //       {/* eslint-enable */}
  //     </tbody>
  //   </table>
  // </div>)
}