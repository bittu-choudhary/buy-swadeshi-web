import React, { Component } from "react"
import * as JsSearch from "js-search"
import JSONData from "../../content/new_brand_list.json"
import SearchResultViewer from "../components/SearchResultViewer"
import styles from './search-container-css-modules.module.css'
import { withTrans } from '../i18n/withTrans'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from  'react-bootstrap/Image'
import GooglePlayBadgeEn from '../images/google-play-badge.png'
import GooglePlayBadgeHi from '../images/google-play-badge-hi.png'
import firebase from "gatsby-plugin-firebase"
import IndexedBrandData from "../../content/new_indexed_data.json"
import Bm25 from "../library/wink-bm25-text-search"
import Categories from "../components/Categories"

var _ = require('lodash') 

class Search extends Component {
  // state = {
  //   bookList: [],
  //   search: [],
  //   searchResults: [],
  //   isLoading: true,
  //   isError: false,
  //   searchQuery: ``,
  // }
  /**
   * React lifecycle method to fetch the data
   */

  constructor(props) {
    super (props)
    const brandData = JSONData
    if (!this.state) {
      this.state = {
        brandList: brandData.brands,
        search: [],
        searchResults: [],
        isLoading: false,
        isError: false,
        searchQuery: ``,
        showAlert: true,
        showCategory: true,
        selectedCategory: undefined,
      } 
    }
    // this.state = { brandList: brandData.brands }
  }

  /**
   * handles the input change and perfom a search with js-search
   * in which the results will be added to the state
   */
  searchData = e => {
    const { brandList } = this.state
    if (e.target.value.length === 0) {
      this.setState({showCategory: true})
    } else {
      this.setState({showAlert: false, showCategory: false})
    }
    if (process.env.NODE_ENV !== "development") {
      firebase
          .analytics()
          .logEvent("web_search", {query: e.target.value})
    }
    // const { search } = this.state
    // const queryResult = search.search(e.target.value)
    var queryResult = []
    const engine = Bm25()
    engine.importJSON(IndexedBrandData)
    const results = engine.search( e.target.value.toLowerCase() )
    results.map ((indexedResult) => {
      var resultObjectId = indexedResult[0].split("_type")[0]
      var resultType = indexedResult[0].split("_type")[1]
      var resultData = {}
      switch (resultType) {
        case "Category":
          resultData = _.pick(JSONData.categories[resultObjectId], ['id', 'name', 'image']) // extract id, name, image from object
          resultData["type"] = "category"
          break;
        case "Company":
          resultData = _.pick(JSONData.companies[resultObjectId], ['id', 'name', 'image', 'isIndian']) 
          resultData["type"] = "company"
          break;
        case "Product":
          resultData = _.pick(JSONData.products[resultObjectId], ['id', 'name', 'image', 'isIndian']) 
          resultData["type"] = "product"
          break;
        default:
          break;
      }
      queryResult.push(resultData)
    })
    if (process.env.NODE_ENV !== "development") {
      if(queryResult.length === 0) {
        firebase
            .analytics()
            .logEvent("no_result", {query: e.target.value})
      }
    }
    // console.log( '%d entries found.', results.length )
    // console.log(queryResult[0])
    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
  }
  handleSubmit = e => {
    e.preventDefault()
  }

  selectCategory = (category) => {
    console.log(category)
    if (category !== undefined) {
      this.setState({searchQuery: ``, showAlert: false, selectedCategory: category, showCategory: true})
    }
  }

  home = () => {
    this.setState({showAlert: true, selectedCategory: undefined})
  }

  CreateAlert = (props) => {
    const { t } = this.props
    if (this.state.showAlert) {
      return (<div>
        <div className={styles.alertSuccess } variant="success"><p>{t('home_desc')}</p></div>
      </div>)
    } else {
      return (<div></div>)
    }
  } 

  SendFirebaseAnalytics = (event) => {
    if (process.env.NODE_ENV !== "development") {
      firebase
        .analytics()
        .logEvent(event)
    }
  }

  NavBarBody = (props) => {
    const { t , i18n} = this.props
    let GooglePlayBadge = GooglePlayBadgeEn
    if (i18n.language === "hi") {
      GooglePlayBadge = GooglePlayBadgeHi
    }
    return(
      <div className={styles.navBarBody} style={{
        width: `fit-content`,
        margin: `5% auto`
      }}>
        <Button  onClick={() => this.SendFirebaseAnalytics("feedback_click")} rel="noreferrer" className={styles.navButton} href="https://forms.gle/fB2VUuEHCfpadnrv8" target="_blank" variant="info" style={{ width: `85px`, marginRight: `6px`, padding: `.075rem .375rem`}}>{t('feedback')}</Button>
        <a onClick={() => this.SendFirebaseAnalytics("play_button_click")} title="Download our Android app"  rel="noreferrer" href="https://play.google.com/store/apps/details?id=store.buyswadeshi.android" target="_blank"  >
          <Image className={styles.navAppButton} style={{ marginRight: `2px`, padding: `.075rem .375rem`}} src={GooglePlayBadge} style={{width: `112px`, marginRight: `6px`}} alt="Download our Android App">
          </Image>
          </a>      
         <Button onClick={() => this.SendFirebaseAnalytics("web_share")} className={styles.navButton} href={"whatsapp://send?text=" + t('share_text')} data-action="share/whatsapp/share" variant="info" style={{ width: `85px`, padding: `.075rem .375rem`}}>{t('share')}</Button>
      </div>
    )
  }
  
  render() {
    const { t } = this.props
    const {
      isError,
      isLoading,
      searchResults,
      searchQuery,
    } = this.state
    const {CreateAlert, NavBarBody} = this
    const queryResults = searchQuery === `` ? [] : searchResults

    if (isLoading) {
      return (
        <div style={{ margin: `1.2rem 1rem 1.2rem 1rem` }}>
          <h1 style={{ marginTop: `3em`, textAlign: `center` }}>
            Getting the search all setup
          </h1>
        </div>
      )
    }
    if (isError) {
      return (
        <div style={{ margin: `1.2rem 1rem 1.2rem 1rem` }}>
          <h1 style={{ marginTop: `3em`, textAlign: `center` }}>Ohh no!!!!!</h1>
          <h3
            style={{
              marginTop: `2em`,
              padding: `2em 0em`,
              textAlign: `center`,
            }}
          >
            Something really bad happened
          </h3>
        </div>
      )
    }
    return (
      <div>
        <NavBarBody/>
        <CreateAlert/>
        <div style={{ 
          marginTop: `30px`,
          paddingLeft: `24px`,
          paddingRight: `24px` 
          }}>
          <form className={styles.searchField} onSubmit={this.handleSubmit}>
            <div className={styles.bar}>
              <input
                className={styles.searchbar}
                id="Search"
                value={searchQuery}
                onChange={this.searchData}
                placeholder={t('search_placeholder')}
              />
            </div>
          </form>
          <SearchResultViewer  selectCategory={this.selectCategory} queryResults={queryResults}/>
        </div>
        <Categories clickToHome={this.home} selectCategory={this.selectCategory} selectedCategory={this.state.selectedCategory} showComponent={this.state.showCategory}/>
      </div>
    )
  }
}

export default withTrans(Search)
