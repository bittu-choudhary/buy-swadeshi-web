// import Nlp from "wink-nlp-utils"
const write = require("write");
const path = require("path");
const Bm25 = require( "./src/library/wink-bm25-text-search")
const JSONData = require("./content/new_brand_list.json")

var _ = require('lodash') 
const brandList = JSONData.brands
const engine = Bm25()
engine.defineConfig( { fldWeights: { name: 1} } )
for (var key in JSONData) {
  if (key === "version") {
    continue
  }
  for (const dataPoints in JSONData[key]) {
    var dataPointType;
    switch (key) {
      case "categories":
        dataPointType = "_typeCategory"
        break;
      case "companies":
        dataPointType = "_typeCompany"
        break;
      case "products":
        dataPointType = "_typeProduct"
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
write.sync("./content/new_indexed_data.json", JSON.stringify(consolidatedJson))