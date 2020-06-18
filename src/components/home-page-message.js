import React from "react"
import { useTranslation } from "react-i18next"
import styles from './search-container-css-modules.module.css'

const CreateAlert = (props) => {
  const { t } = useTranslation()
  const { showAlert } = props
    if (showAlert) {
      return (<div>
        <div className={styles.alertSuccess } variant="success"><p>{t('home_desc')}</p></div>
      </div>)
    } else {
      return (<div></div>)
    }
}

export default CreateAlert