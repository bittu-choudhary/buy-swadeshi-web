import React from "react"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import GooglePlayBadgeEn from '../images/google-play-badge.png'
import GooglePlayBadgeHi from '../images/google-play-badge-hi.png'
import Image from  'react-bootstrap/Image'
import firebase from "gatsby-plugin-firebase"
import {IoMdShare} from 'react-icons/io'


const sendFirebaseAnalytics = (event) => {
  if (process.env.NODE_ENV !== "development") {
    firebase
      .analytics()
      .logEvent(event)
  }
}

const NavMenu = (props) => {
  const { t, i18n } = useTranslation()
  let GooglePlayBadge = GooglePlayBadgeEn
  if (i18n.language === "hi") {
    GooglePlayBadge = GooglePlayBadgeHi
  }
  return (
    <>
      <Button  onClick={() => sendFirebaseAnalytics("feedback_click")} rel="noreferrer" className={styles.navButton + " " + styles.feedbackButton} href="https://forms.gle/fB2VUuEHCfpadnrv8" target="_blank" variant="info">{t('feedback')}</Button>
        <a onClick={() => sendFirebaseAnalytics("play_button_click")} title="Download our Android app"  rel="noreferrer" href="https://play.google.com/store/apps/details?id=store.buyswadeshi.android" target="_blank"  >
        <Image className={styles.navAppButton + " " + styles.playStoreButton} src={GooglePlayBadge} alt="Download our Android App">
        </Image></a>      
  <Button onClick={() => sendFirebaseAnalytics("web_share")} className={styles.navButton} href={"whatsapp://send?text=" + t('share_text')} data-action="share/whatsapp/share" variant="info" style={{ width: `85px`, padding: `.075rem .375rem`}}>{t('share')} <IoMdShare/></Button>
    </>
  )
}


const NavBar = (props) => {
  const {fromHeader} = props
  if (fromHeader) {
    return(
        <div className={styles.navBarHeader}>
          <NavMenu/>
        </div>
      )
  } else {
    return(
      <div className={styles.navBarBody}>
        <NavMenu/>
      </div>
      )
  }
}

export default NavBar