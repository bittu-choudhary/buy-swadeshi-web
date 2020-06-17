import React, {Component} from "react"
import { withTrans } from '../i18n/withTrans'
import Footer from './footer'
import Header from './header'
import Search from "../components/SearchContainer"
import styles from '../components/search-container-css-modules.module.css'
import SEO from "../components/seo"
import NavBar from '../components/nav-bar'
import HomePageMessage from '../components/home-page-message'

// Menu = (props) => {
//   return(
//     <table>
//       <tbody>
//         <tr>
//           <td></td>
//         </tr>
//       </tbody>
//     </table>
//   )
// }


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showMessage: this.props.showMessage
     };
  }

  toggleMessage = (newVal) => {
    this.setState({showMessage: newVal})
  }

  render() {
    const {toggleMessage} = this.props
    return (
      <div>
        <Header/>
        <SEO/>
        <div style={{marginBottom: '6rem'}}>
          <div className={styles.searchContainer}>
            <NavBar fromHeader={false}/>
            <HomePageMessage showAlert={this.state.showMessage}/>
            <Search toggleMessage={this.toggleMessage} toggleCategoryView={this.props.toggleCategoryView}/>
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default withTrans(Layout)