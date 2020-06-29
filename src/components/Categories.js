import React from "react"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Row from 'react-bootstrap/Row';
import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from  'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useSprings, animated } from 'react-spring'
import CategoriesData from "../../content/raw-data/new_brand_list.json"
import firebase from "gatsby-plugin-firebase"
import i18next from 'i18next';
import Image from 'react-bootstrap/Image'
import categoryPlaceHolder from '../images/category-96.png'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.08]
const trans = (x, y, s) => `perspective(600px) scale(${s})`
let CategoriesDataArr = Object.keys(CategoriesData.categories)
const bgColorArr = [`#fdeae4`, `#e8eefb`, `#fff9dd`, `#e8f3dd`, `#e8e8e8`, `#fdebf9`, `#e8f3dd`, `#e8e8e8`, `#e8eefb`, `#d0efed`]
var _ = require('lodash')

const sendFirebaseAnalytics = (event, catId) => {
  if (process.env.NODE_ENV !== "development") {
    firebase
      .analytics()
      .logEvent(event, {category_id: catId})
  }
}


const PopulateCategoriesCol = (props) => {
  const {index} = props
  let loopLength = index + 5 <CategoriesDataArr.length ? index + 5 : (CategoriesDataArr.length - 1)
  let col = []
  const [springs, set] = useSprings(6, j => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }))
  for (let i = index; i <= loopLength ; i++ ) {
    const categoryId = CategoriesData.categories[CategoriesDataArr[i]]
    let springIndex = (index === 0) ? 6 : index
    var categorySlugName = categoryId.name
    if (categorySlugName && categorySlugName.split(" ").length === 1){
      categorySlugName = ` The ` + categorySlugName
    }
    let catImage
    var categoryEndPoint = _.snakeCase(categorySlugName)
    try{
        catImage = require(`../images/${_.kebabCase(categoryId.name)}.png`)
    }
    catch(err){
        catImage = categoryPlaceHolder
        //Do whatever you want when the image failed to load here
    }
    col.push(
      <Col  onClick={() => sendFirebaseAnalytics("category_clk", categoryId.id)} key={categoryId.id} id={categoryId.id} style={{padding: `10px`}} xs={6} md={6} lg={2} xl={2}>
        <Link
          to={`/categories?catid=${encodeURIComponent(categoryId.id)}`}
          style={{
                textDecoration: `none`,
                color: `inherit`
              }}
        >
          <animated.div
            className={styles.card + " " + styles.categoryCol + " " + styles.cardTransition}
            onMouseMove={({ clientX: x, clientY: y }) => set(j => {
              if (j !== (i%springIndex)) return;
              return { xys: calc(x, y) };
            })}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ backgroundColor: bgColorArr[i%10], transform: springs[i%springIndex].xys.interpolate(trans) }}
          >
            <Row className={styles.productCardImage + ` ` + styles.homeImageCard} >
              <Col  className={`col-12`} style={{height: `100%`}}>
                <div className={`container`  + ` ` + styles.catListImage} style={{width: `fit-content`, height: `100%`}}>
                  <Image oading={`lazy`} className={styles.productImage + ` ` + styles.homeCatImage} style={{
                    border: `0px`,
                    borderRadius: `0px`,
                    maxHeight: `100%`,
                    padding: `0px !important`,
                  }} thumbnail src={catImage}></Image>
                </div>
              </Col>
            </Row>
            <div className={styles.categoryTitle}>
          <p style={{textAlign: `center`}}>{i18next.language === `hi` ? categoryId.name_hi : categoryId.name}</p>
              {/* <Image src={CartIcon} thumbnail /> */}
            </div>
          </animated.div>
        </Link>
      </Col>
    )
  }
  return (
    col
  )
}

const PopulateCategoriesRow = (props) => {
  CategoriesDataArr = CategoriesDataArr.filter(item => CategoriesData.categories[item].isParent === true)
  CategoriesDataArr = CategoriesDataArr.sort((a, b) => CategoriesData.categories[a].name.localeCompare(CategoriesData.categories[b].name))
  const rows = CategoriesDataArr.map((item, index) => {
    if( index%6 === 0) {
      return (<Row id={`cat_row_` + index} key={`cat_row_` + index} style={{padding: `5px`}}>
        <PopulateCategoriesCol index={index}/>
      </Row>)
    }
  })
  return (rows)
}

const CategoryList = (props) => {
  const { t } = useTranslation()
  return (
    <>
      <h3 style={{ margin: `20px`, textAlign: `center` }}>
        {t('search_by_category')}
      </h3>
      <PopulateCategoriesRow />
    </>
  )
}

const Categories = (props) => {
  const { t } = useTranslation()
  return (
    <Container style={{marginTop: `50px`}}>
      <CategoryList/>
    </Container>
  )
}

export default Categories
