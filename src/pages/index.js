import React, { Component } from "react"
import Layout from '../components/layout'
import Categories from "../components/Categories"

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showCategory: true,
     };
  }


  toggleCategoryView = (newVal) => {
    this.setState({showCategory: newVal})
  }


  render() {
    return (
      <Layout showMessage={true} toggleView={this.toggleCategoryView}>
        {this.state.showCategory && <Categories/>}
      </Layout>
    )
  }
}

export default IndexPage
