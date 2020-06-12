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


const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.08]
const trans = (x, y, s) => `perspective(600px) scale(${s})`
const CategoriesDataArr = Object.keys(CategoriesData.categories)
const bgColorArr = [`#fdeae4`, `#e8eefb`, `#fff9dd`, `#e8f3dd`, `#e8e8e8`, `#fdebf9`, `#e8f3dd`, `#e8e8e8`, `#e8eefb`, `#d0efed`]

const PopulateCategoriesCol = (props) => {
  const {index} = props
  let loopLength = index + 5 <CategoriesDataArr.length ? index + 5 : (CategoriesDataArr.length - 1)
  let col = []
  const [springs, set] = useSprings(6, j => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }))
  for (let i = index; i <= loopLength ; i++ ) {
    let springIndex = (index === 0) ? 6 : index
    col.push(
      <Col key={i + loopLength} style={{padding: `10px`}} xs={6} md={6} lg={2} xl={2}>
        <animated.div
          className={styles.card + " " + styles.categoryCol}
          onMouseMove={({ clientX: x, clientY: y }) => set(j => {
            if (j !== (i%springIndex)) return;
            return { xys: calc(x, y) };
          })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ backgroundColor: bgColorArr[i%10], transform: springs[i%springIndex].xys.interpolate(trans) }}
        >
          <div className={styles.categoryTitle}>
        <p style={{textAlign: `center`}}>{CategoriesData.categories[CategoriesDataArr[i]].name}</p>
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
      return (<Row key={index} style={{padding: `5px`}}>
        <PopulateCategoriesCol index={index}/>
      </Row>)
    }
  })
  return (rows)
}
const Categories = (props) => {
  const { t } = useTranslation()
  const {showComponent} = props
  const [properties, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  console.log(showComponent)
  if (showComponent) {
    return (
      <Container style={{marginTop: `50px`}}>
        <h3 style={{ margin: `20px`, textAlign: `center` }}>
          Search by Category
        </h3>
        <PopulateCategoriesRow/>
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