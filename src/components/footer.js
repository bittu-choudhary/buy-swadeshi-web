import React from "react"
import { BsHeartFill } from "react-icons/bs"
import IndiaFLagImg from '../images/india-flag-16.png'
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'

const Footer = (props) => {
  const { t, i18n } = useTranslation()
  return (
    <footer className={styles.footerContainer} style={{ backgroundColor: `rgb(255, 153, 51)`, backgroundSize: `contain` }}>
      <div style={ { width: 'fit-content', margin: 'auto' }}>
        <p style={ {  }}>{t('footer_text_made')} <BsHeartFill style={{color: 'red', marginBottom: '-3px'}}/> {t('footer_text_made_hi')} {t('footer_text_by')} <img src={IndiaFLagImg} alt=""></img> {t('footer_text_for')} <img alt="" src={IndiaFLagImg}></img> {t('footer_text_by2')} </p>
      </div>
    </footer>
  )
}

export default Footer