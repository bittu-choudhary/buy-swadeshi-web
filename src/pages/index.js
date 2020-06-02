import React from "react"
import Search from "../components/SearchContainer"
import styles from '../components/search-container-css-modules.module.css'
import Layout from '../components/layout'


const IndexPage = () => (
  <Layout>
    <div style={{marginBottom: '6rem'}}>
      <div className={styles.searchContainer}>
        <Search />
      </div>
    </div>
  </Layout>
)

export default IndexPage
