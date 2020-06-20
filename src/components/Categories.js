import React from "react"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Row from 'react-bootstrap/Row';
import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from  'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useSprings, animated } from 'react-spring'
import CategoriesData from "../../content/raw data/new_brand_list.json"


const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.08]
const trans = (x, y, s) => `perspective(600px) scale(${s})`
const CategoriesDataArr = Object.keys(CategoriesData.categories)
const bgColorArr = [`#fdeae4`, `#e8eefb`, `#fff9dd`, `#e8f3dd`, `#e8e8e8`, `#fdebf9`, `#e8f3dd`, `#e8e8e8`, `#e8eefb`, `#d0efed`]
var _ = require('lodash') 

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
    var categoryEndPoint = _.lowerCase(categoryId.name)
    console.log(categoryEndPoint)
    col.push(
      <Col key={categoryId.id} id={categoryId.id} style={{padding: `10px`}} xs={6} md={6} lg={2} xl={2}>
        <Link
          to={`/category/${categoryEndPoint}`}
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
            <div className={styles.categoryTitle}>
          <p style={{textAlign: `center`}}>{categoryId.name}</p>
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
  return (
    <>
      <h3 style={{ margin: `20px`, textAlign: `center` }}>
        Search by Category
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