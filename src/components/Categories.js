import React from "react"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from  'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ReactDOM from 'react-dom'
import { useSpring, useSprings, animated, interpolate } from 'react-spring'
import CategoriesData from "../../content/sample-buy-swadeshi.json"
import CartIcon from '../images/cart-icon.png'
import CartIcon2 from '../images/cart-icon-2.png'
import Search from "./SearchContainer"

var _ = require('lodash') 

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.08]
const trans = (x, y, s) => `perspective(600px) scale(${s})`
const CategoriesDataArr = Object.keys(CategoriesData.categories)
const bgColorArr = [`#fdeae4`, `#e8eefb`, `#fff9dd`, `#e8f3dd`, `#e8e8e8`, `#fdebf9`, `#e8f3dd`, `#e8e8e8`, `#e8eefb`, `#d0efed`]

const PopulateCategoriesCol = (props) => {
  const {index, selectCategory} = props
  let loopLength = index + 5 <CategoriesDataArr.length ? index + 5 : (CategoriesDataArr.length - 1)
  let col = []
  const [springs, set] = useSprings(6, j => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }))
  for (let i = index; i <= loopLength ; i++ ) {
    const categoryId = CategoriesData.categories[CategoriesDataArr[i]]
    let springIndex = (index === 0) ? 6 : index
    col.push(
      <Col key={categoryId.id} id={categoryId.id} style={{padding: `10px`}} xs={6} md={6} lg={2} xl={2}>
        <animated.div
          className={styles.card + " " + styles.categoryCol + " " + styles.cardTransition}
          onMouseMove={({ clientX: x, clientY: y }) => set(j => {
            if (j !== (i%springIndex)) return;
            return { xys: calc(x, y) };
          })}
          onClick={() => selectCategory(categoryId.id)}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ backgroundColor: bgColorArr[i%10], transform: springs[i%springIndex].xys.interpolate(trans) }}
        >
          <div className={styles.categoryTitle}>
        <p style={{textAlign: `center`}}>{categoryId.name}</p>
            {/* <Image src={CartIcon} thumbnail /> */}
          </div>
        </animated.div>
      </Col>
    )
  }
  return (
    col
  )
}

const PopulateCategoriesRow = (props) => {
  const rows = CategoriesDataArr.map((item, index) => {
    if( index%6 === 0) {
      return (<Row id={`cat_row_` + index} key={`cat_row_` + index} style={{padding: `5px`}}>
        <PopulateCategoriesCol selectCategory={props.selectCategory} index={index}/>
      </Row>)
    }
  })
  return (rows)
}

const PopulateProductCol = (props) => {
  const {index, products} = props
  let loopLength = index + 5 <products.length ? index + 5 : (products.length - 1)
  let col = []
  for (let i = index; i <= loopLength ; i++ ) {
    const productId = products[i]
    col.push(
      <Col style={{ padding: `1px`}} key={productId.id} id={productId.id} xs={6} md={6} lg={2} xl={2}>
        <div className={styles.categoryCol + " " + styles.productCol } style={{border:`1px solid #dcdcdc` }} >
          <div className={styles.categoryTitle}>
            <p style={{textAlign: `center`}}>
              {productId.name}
            </p>
              {/* <Image src={CartIcon} thumbnail /> */}
          </div>
        </div>
      </Col>
    )
  }
  return (
    col
  )
}

const DisplayProducts = (props) => {
  const {selectedCategory} = props
  console.log(selectedCategory)
  const products = CategoriesData.categories[`${selectedCategory}`]["products"]
  console.log(products)
  const productsSortedArr = products.sort((a, b) => a.isIndian < b.isIndian ? 1 : -1)
  const rows = productsSortedArr.map((product, index) => {
    if( index%6 === 0) {
      return (<Row id={`pro_row_` + index} key={`pro_row_` + index} style={{paddingLeft: `15px`, paddingRight: `15px`, paddingBottom: `5px`}}>
        <PopulateProductCol index={index} products={productsSortedArr}/>
      </Row>)
    }
  })
  return (rows)
}

const CategoryList = (props) => {
  const {selectedCategory, clickToHome} = props
  const category =  CategoriesData.categories[`${selectedCategory}`]
  if (selectedCategory !== undefined) {
    return (
      <>
        <Row>
          <Col>
            <ul style={{listStyle: `none`, paddingLeft: `0`}}>
              <li style={{display: `inline-block`}}>
                <a href="#" onClick={() => clickToHome()}>
                  <span style={{ fontSize: `14px` ,color: `rgb(181, 181, 181)`}} class="name">Home</span>
                </a>
              </li>
              <li style={{display: `inline-block`}}>
                <a> &nbsp;
                <i className={styles.arrow + " " +  styles.right}></i> &nbsp; <span style={{  fontSize: `14px`, color: `rgb(181, 181, 181)`}} >{_.startCase(category.name)}</span>
                </a>
              </li>
            </ul>
            {/* <p style={{color: `rgb(181, 181, 181)`, marginBottom: `0px`}}>Back to home</p> */}
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{_.startCase(category.name)}</p>
          </Col>
        </Row>
        <DisplayProducts selectedCategory={selectedCategory}/>
      </>
    )
  } else {
    return (
      <>
        <h3 style={{ margin: `20px`, textAlign: `center` }}>
          Search by Category
        </h3>
        <PopulateCategoriesRow selectCategory={props.selectCategory}/>
      </>
    )
  }
}

const Categories = (props) => {
  const { t } = useTranslation()
  const {showComponent, selectedCategory, selectCategory, clickToHome} = props
  const [properties, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  let marginTop = `10px`
  if (selectedCategory === undefined) {
    marginTop = `50px`
  }
  console.log(`bnana - > ${selectedCategory}`)
  if (showComponent) {
    return (
      <Container style={{marginTop: marginTop}}>
        <CategoryList clickToHome={clickToHome} selectedCategory={selectedCategory} selectCategory={selectCategory}/>
        {/* <Row style={{padding: `10px`}}>
          <Col style={{padding: `10px`}} xs={6} md={6} lg={2} xl={2}>
          <animated.div
            className={styles.card}
            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ borderRadius: `20px`, height: `180px`, backgroundColor: `#fdeae4`, transform: properties.xys.interpolate(trans) }}
          ><p>Sports and Yoga</p></animated.div>
            <div style={{borderRadius: `20px`, height: `180px`, backgroundColor: `#fdeae4`}}>
              <p>Sports and Yoga</p>
            </div>
          </Col>
        </Row> */}
      </Container>
    ) 
  } else {
    return (
      <div></div>
    )
  }
}

export default Categories