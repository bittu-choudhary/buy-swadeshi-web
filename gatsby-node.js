// import Nlp from "wink-nlp-utils"
const write = require("write");
const path = require("path");
const Bm25 = require( "./src/library/wink-bm25-text-search")
const JSONData = require("./content/brand_list.json")

const brandList = JSONData.brands
const engine = Bm25()
engine.defineConfig( { fldWeights: { name: 1, category: 2 } } )
brandList.map( ( doc, i ) => {
  // Note, 'i' becomes the unique id for 'doc'
  engine.addDoc( doc, i )
} )
engine.consolidate()
const consolidatedJson =  engine.exportJSON()
write.sync("./content/indexed_data.json", JSON.stringify(consolidatedJson))
