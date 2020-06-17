import React from 'react';
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import NavBar from './nav-bar'
import firebase from "gatsby-plugin-firebase"


const handleToggle = (val, i18n) => {
  let event = "lang_toggle"
  let new_lang = ""
  if (val){
    i18n.changeLanguage('hi')
    new_lang = "hi"
  } else {
    i18n.changeLanguage('en')
    new_lang = "en"
  }
  if (process.env.NODE_ENV !== "development") {
    firebase
      .analytics()
      .logEvent(event, {selection: new_lang})
  }

}

const Header = ({props}) => {
  const { t, i18n } = useTranslation()
  return(
    <header style={{ backgroundColor: `rgb(255, 153, 51)`, backgroundSize: `contain` }}>
        <div className={styles.headerContainer} style={ { padding: `24px`, margin: 'auto', width: 'fit-content', height: `inherit`}}>
          <div>
            <h1 style={{ marginBottom: `0px`, textAlign: `center` }}>
            {t('site_title')}
            </h1>
          </div>
          <div>
            <p style={ { margin: '0px' }}>{t('site_subtitle')}</p>
          </div>
        </div>
        <div style={ { width: `fit-content`, float: `right` }}>
          <NavBar fromHeader={true}/>
          <div className={styles.langToggleContainer}>
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