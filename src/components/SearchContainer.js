import React, { Component } from "react"
import * as JsSearch from "js-search"
import JSONData from "../../content/new_json_english.json"
import SearchResultViewer from "../components/SearchResultViewer"
import styles from './search-container-css-modules.module.css'
import { useTranslation } from "react-i18next"
import { withTrans } from '../i18n/withTrans'



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
    console.log(brandData.brands)
    if (!this.state) {
      this.state = {
        brandList: brandData.brands,
        search: [],
        searchResults: [],
        isLoading: false,
        isError: false,
        searchQuery: ``,
        showAlert: true,
      } 
    }
    // this.state = { brandList: brandData.brands }
    this.rebuildIndex()
  }
  // async componentDidMount() {
  //   Axios.get(`http://ac11fd22fec6.ngrok.io/new_json_english.json`)
  //     .then(result => {
  //       const brandData = result.data
  //       this.setState({ brandList: brandData.brands })
  //       this.rebuildIndex()
  //     })
  //     .catch(err => {
  //       this.setState({ isError: true })
  //       console.log(`====================================`)
  //       console.log(`Something bad happened while fetching the data\n${err}`)
  //       console.log(`====================================`)
  //     })
  // }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    console.log(this.state)
    const { brandList } = this.state

    const dataToSearch = new JsSearch.Search(`name`)

    /**
     *  defines a indexing strategy for the data
     * more more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()

    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()

    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex(`name`)

    dataToSearch.addIndex(`name`) // sets the index attribute for the data
    dataToSearch.addIndex(`category`) // sets the index attribute for the data
    console.log(brandList)
    dataToSearch.addDocuments(brandList) // adds the data to be searched
    this.state = {
      brandList: brandList,
      search: dataToSearch,
      searchResults: [],
      isLoading: false,
      isError: false,
      searchQuery: ``,
      showAlert: true,
    }
    // this.setState({ search: dataToSearch, isLoading: false })
  }

  /**
   * handles the input change and perfom a search with js-search
   * in which the results will be added to the state
   */
  searchData = e => {
    if (e.target.value.length === 0) {
      this.setState({showAlert: true})
    } else {
      this.setState({showAlert: false})
    }
    const { search } = this.state
    const queryResult = search.search(e.target.value)
    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
  }
  handleSubmit = e => {
    e.preventDefault()
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
  
  render() {
    const { t } = this.props
    const {
      isError,
      isLoading,
      searchResults,
      searchQuery,
    } = this.state
    const {CreateAlert} = this
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
        <CreateAlert/>
        <div style={{ margin: `0 auto` }}>
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
          <SearchResultViewer queryResults={queryResults}/>
        </div>
      </div>
    )
  }
}

export default withTrans(Search)
