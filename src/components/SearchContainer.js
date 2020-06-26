import React, { Component } from "react"
import JSONData from "../../content/raw-data/new_brand_list.json"
import SearchResultViewer from "../components/SearchResultViewer"
import styles from './search-container-css-modules.module.css'
import { withTrans } from '../i18n/withTrans'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "gatsby-plugin-firebase"
import IndexedBrandData from "../../content/indexed-data/new_indexed_data.json"
import Bm25 from "../library/wink-bm25-text-search"

var _ = require('lodash')

const WAIT_INTERVAL = 200;
const ENTER_KEY = 13;
const engine = Bm25()
engine.importJSON(IndexedBrandData)


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
      }
    }
    // this.state = { brandList: brandData.brands }
  }

  componentWillMount() {
    this.timer = null;
  }

  handleChange = (value) => {
    console.log(value)
    console.log("inhanfle")
    clearTimeout(this.timer);

    this.setState({searchQuery: value.toLowerCase() });

    this.timer = setTimeout(() => this.searchData(value), WAIT_INTERVAL);
    // this.searchData(value)
  }

  handleKeyDown = (e) => {
    console.log(e.target.value)
    console.log("in keydown")
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
      this.searchData(e.target.value)
    }
  }

  /**
   * handles the input change and perfom a search with js-search
   * in which the results will be added to the state
   */
  searchData = (value) => {
    const {toggleMessage, toggleView} =  this.props
    if (value.length === 0) {
      toggleView(true)
    } else {
      toggleMessage(false)
      toggleView(false)
    }
    if (process.env.NODE_ENV !== "development") {
      firebase
          .analytics()
          .logEvent("web_search", {query: value})
    }
    // const { search } = this.state
    // const queryResult = search.search(e.target.value)
    var queryResult = []
    console.log(Date.now())
    const results = engine.search( value.toLowerCase(), 50 )
    console.log(Date.now())
    console.log(results.length)
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
            .logEvent("no_result", {query: value})
      }
    }
    console.log(Date.now())
    this.setState({searchResults: queryResult })
    console.log(Date.now())
  }
  handleSubmit = e => {
    e.preventDefault()
  }

  SendFirebaseAnalytics = (event) => {
    if (process.env.NODE_ENV !== "development") {
      firebase
        .analytics()
        .logEvent(event)
    }
  }

  render() {
    const { t } = this.props
    const {
      isError,
      isLoading,
      searchResults,
      searchQuery,
    } = this.state
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
      <>
        <div style={{
          marginTop: `30px`
          }}>
          <form className={styles.searchField} onSubmit={this.handleSubmit}>
            <div className={styles.bar}>
              <input
                className={styles.searchbar}
                id="Search"
                value={searchQuery}
                onChange={(e) => this.handleChange(e.target.value)}
                onKeyDown={(e) => this.handleKeyDown(e)}
                placeholder={t('search_placeholder')}
              />
            </div>
          </form>
          <SearchResultViewer queryResults={queryResults}/>
        </div>
      </>
    )
  }
}

export default withTrans(Search)
