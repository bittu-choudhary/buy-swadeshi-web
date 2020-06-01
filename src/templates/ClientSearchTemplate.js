import React from "react"
import ClientSearch from "../components/ClientSearch"

const SearchTemplate = props => {
  const { pageContext } = props
  const { brandData } = pageContext
  const { allBrands, options } = brandData
  return (
    <div>
      <h1 style={{ marginTop: `3em`, textAlign: `center` }}>
        Search Swadeshi brands in all product categories
      </h1>
      <div>
        <ClientSearch brands={allBrands} engine={options} />
      </div>
    </div>
  )
}

export default SearchTemplate
