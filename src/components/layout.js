import React from "react"
import { Link } from "gatsby"
import { BsHeartFill } from "react-icons/bs"
import IndiaFLagImg from '../images/india-flag-16.png'

export default function Layout({ children }) {
  return (
    <div>
      <header style={{ marginBottom: `4rem`, backgroundColor: `rgb(255, 153, 51)`, backgroundSize: `contain` }}>
        <div style={ { margin: 'auto', width: 'fit-content' }}>
          <div>
            <h1 style={{ marginTop: `0px`, marginBottom: `0px`, textAlign: `center` }}>
              Buy Swadeshi
            </h1>
          </div>
          <div>
            <p style={ { marginTop: '0px', paddingBottom: '16px' }}>(An initiative under Aatma Nirbhar Bharat)</p>
          </div>
        </div>
      </header>
      {children}
      <footer style={{ backgroundColor: `rgb(255, 153, 51)`, backgroundSize: `contain` }}>
        <div style={ { width: 'fit-content', margin: 'auto' }}>
          <p style={ {  }}>Made with <BsHeartFill style={{color: 'red', marginBottom: '-3px'}}/> by <img src={IndiaFLagImg}></img> for <img src={IndiaFLagImg}></img></p>
        </div>
      </footer>
    </div>
  )
}