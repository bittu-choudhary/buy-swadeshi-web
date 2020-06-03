import React from "react"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "gatsby"

const NavBar = ({props}) => {
  const { t, i18n } = useTranslation()
  return (
    <div className={styles.navBarHeader} style={{
      width: `fit-content`,
      float: `right`,
      marginRight: `80px`,
      marginTop: `-30px`,
      display: `none`
    }}>
      <Button href="https://forms.gle/fB2VUuEHCfpadnrv8" target="_blank" variant="info" style={{marginRight: `2px`, padding: `.075rem .375rem`}}>Feedback</Button>
      <Button variant="info" style={{marginRight: `2px`, padding: `.075rem .375rem`}}>Download App</Button>
      <Button href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share" variant="info" style={{padding: `.075rem .375rem`}}>Share</Button>
    </div>
  )
}

export default NavBar