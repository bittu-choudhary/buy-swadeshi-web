import React from "react"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import GooglePlayBadgeEn from '../images/google-play-badge.png'
import GooglePlayBadgeHi from '../images/google-play-badge-hi.png'
import { Link } from "gatsby"
import Image from  'react-bootstrap/Image'

const NavBar = ({props}) => {
  const { t, i18n } = useTranslation()
  let GooglePlayBadge = GooglePlayBadgeEn
  if (i18n.language === "hi") {
    GooglePlayBadge = GooglePlayBadgeHi
  }
  return (
    <div className={styles.navBarHeader}>
      <Button href="https://forms.gle/fB2VUuEHCfpadnrv8" target="_blank" variant="info" style={{ width: `85px`, marginRight: `2px`, padding: `.075rem .375rem`}}>{t('feedback')}</Button>
      <a  href="https://www.google.com" target="_blank"  >
      <Image style={{ marginRight: `2px`, padding: `.075rem .375rem`}} src={GooglePlayBadge} style={{width: `112px`}} alt="">
      </Image></a>
      <Button href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share" variant="info" style={{width: `85px`, padding: `.075rem .375rem`}}>{t('share')}</Button>
    </div>
  )
}

export default NavBar