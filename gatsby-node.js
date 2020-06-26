// import Nlp from "wink-nlp-utils"
const write = require("write");
const path = require("path");
const Bm25 = require( "./src/library/wink-bm25-text-search")
const JSONData = require("./content/raw data/new_brand_list.json")

var _ = require('lodash')
const brandList = JSONData.brands
const engine = Bm25()
engine.defineConfig( { fldWeights: { name: 1} } )
const pageObj = []

for (var key in JSONData) {
  if (key === "version") {
    continue
  }
  for (const dataPoints in JSONData[key]) {
    let slug;
    var dataPointType;
    var dataPointSlugName = JSONData[key][dataPoints]["name"]
    if (dataPointSlugName.split(" ").length === 1){
      dataPointSlugName = ` The ` + dataPointSlugName
    }
    var endPoint = _.snakeCase(dataPointSlugName)
    switch (key) {
      case "categories":
        dataPointType = "_typeCategory"
        slug = `/category/${endPoint}/`
        pageObj.push({type: `category`, slug: slug, id: JSONData[key][dataPoints]["id"] })
        break;
      case "companies":
        dataPointType = "_typeCompany"
        slug = `/company/${endPoint}/`
        pageObj.push({type: `company`, slug: slug, id: JSONData[key][dataPoints]["id"] })
        break;
      case "products":
        dataPointType = "_typeProduct"
        slug = `/product/${endPoint}/`
        pageObj.push({type: `product`, slug: slug, id: JSONData[key][dataPoints]["id"] })
        break;
      default:
        break;
    }
    var indexId =JSONData[key][dataPoints]["id"] + dataPointType
    doc = _.pick(JSONData[key][dataPoints], ['name']) // extract name from object
    engine.addDoc( doc, indexId )
  }
}
engine.consolidate()
const consolidatedJson =  engine.exportJSON()
write.sync("./content/indexed data/new_indexed_data.json", JSON.stringify(consolidatedJson))

const { createFilePath } = require(`gatsby-source-filesystem`)

console.log(pageObj)
exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  pageObj.forEach((node) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/${node.type}.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
        id: node.id,
      },
    })
  })
}
