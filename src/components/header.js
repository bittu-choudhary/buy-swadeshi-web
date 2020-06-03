import React from 'react';
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import NavBar from './nav-bar'


const handleToggle = (val, i18n) => {
  if (val){
    i18n.changeLanguage('hi')
  } else {
    i18n.changeLanguage('en')
  }
  console.log(val)
}

const Header = ({props}) => {
  const { t, i18n } = useTranslation()
  return(
    <header style={{ backgroundColor: `rgb(255, 153, 51)`, backgroundSize: `contain` }}>
        <div className={styles.headerContainer} style={ { margin: 'auto', width: 'fit-content'}}>
          <div>
            <h1 style={{  paddingTop: `5px`, marginTop: `0px`, marginBottom: `0px`, textAlign: `center` }}>
            {t('site_title')}
            </h1>
          </div>
          <div>
            <p style={ { marginTop: '0px', paddingBottom: '16px' }}>{t('site_subtitle')}</p>
          </div>
        </div>
        <div>
          <NavBar/>
          <div style={{
            marginTop: `-15px`,
            width: `fit-content`,
            float: `right`
          }}>
            <div style={{
              width: `fit-content`,
              float: `right`,
              marginRight: `35px`
          }}><p style={ { 
            fontSize: '12px',
            margin: `0`,
            float: `right`
           }}>हिंदी</p></div>
            <div className={styles.buttonToggle + " " + styles.r} id={`button-3`} style={{
              float: `right`,
              marginRight: `-82px`
            }}>
              <input onChange={e => handleToggle(e.target.checked, i18n)} type={`checkbox`} className={styles.checkboxToggle}></input>
              <div className={styles.knobs}></div>
              <div className={styles.layer}></div>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header