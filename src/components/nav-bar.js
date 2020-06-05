import React from "react"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import GooglePlayBadgeEn from '../images/google-play-badge.png'
import GooglePlayBadgeHi from '../images/google-play-badge-hi.png'
import Image from  'react-bootstrap/Image'
import firebase from "gatsby-plugin-firebase"


const sendFirebaseAnalytics = (event) => {
  firebase
      .analytics()
      .logEvent(event)
}


const NavBar = ({props}) => {
  const { t, i18n } = useTranslation()
  let GooglePlayBadge = GooglePlayBadgeEn
  if (i18n.language === "hi") {
    GooglePlayBadge = GooglePlayBadgeHi
  }

  return (
    <div className={styles.navBarHeader}>
      <Button onClick={() => sendFirebaseAnalytics("feedback_click")} rel="noreferrer" className={styles.navBarButton} href="https://forms.gle/fB2VUuEHCfpadnrv8" target="_blank" variant="info" style={{ width: `85px`, marginRight: `2px`, padding: `.075rem .375rem`}}>{t('feedback')}</Button>
      <a onClick={() => sendFirebaseAnalytics("play_button_click")}  title="Download our Android app" rel="noreferrer" href="https://play.google.com/store/apps/details?id=store.buyswadeshi.android" target="_blank"  >
      <Image style={{ marginRight: `2px`, padding: `.075rem .375rem`}} src={GooglePlayBadge} style={{width: `112px`}} alt="Download our Android App">
      </Image></a>
      <Button onClick={() => sendFirebaseAnalytics("web_share")} className={styles.navBarButton} href={"whatsapp://send?text=" + t('share_text')} data-action="share/whatsapp/share" variant="info" style={{width: `85px`, padding: `.075rem .375rem`}}>{t('share')}</Button>
    </div>
  )
}

export default NavBar