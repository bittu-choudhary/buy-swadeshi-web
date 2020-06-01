import React from "react"
import Search from "../components/SearchContainer"
import styles from '../components/search-container-css-modules.module.css'


const IndexPage = () => (
  <div>
    <h1 style={{ marginTop: `1em`, marginBottom: `4em`, textAlign: `center` }}>
      Buy Swadeshi
    </h1>
    <div className={styles.searchContainer}>
      <Search />
    </div>
  </div>
)

export default IndexPage
